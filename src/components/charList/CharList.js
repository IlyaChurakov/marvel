import React, {useState, useEffect, useRef} from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import './charList.scss'
import useMarvelService from '../../services/MarvelService'
import PropTypes from 'prop-types'

const CharList = (props) => {

    const [charList, setCharList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(210)
    const [charEnded, setCharEnded] = useState(false)

    const {loading, error, getAllCharacters} = useMarvelService()

    function onRequest(offset, initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    // function onScroll({offset}) {
    //     if (newItemLoading) {
    //         return
    //     }
    //     if (charEnded) {
    //         window.removeEventListener("scroll", onScroll)
    //     }
    //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    //         onCharListLoading()
    //         console.log('onCharListLoading in scrolling')
    //         onRequest(offset => offset + 9 )
    //     }
    // } // проблема тут

    useEffect(() => {
        onRequest(offset, true)
        // window.addEventListener('scroll', onScroll)

        // return window.removeEventListener('scroll', onScroll)
    }, [])

    function onCharListLoaded(newCharList) {

        let ended = false
        if(newCharList.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...newCharList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    const itemRefs = useRef([])

    function onFocus(i) {
        itemRefs.current.forEach(item => {
            item.classList.remove('char__item_selected')
        })
        itemRefs.current[i].classList.add('char__item_selected')
        itemRefs.current[i].focus()
    }

    function renderItems(arr) {
        const items =  arr.map((item, i) => {
            let imgStyle = {'objectFit' : 'cover'}
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'}
            }

            const duration = 100

            return (
                <CSSTransition
                    key={item.id} 
                    timeout={duration}
                    classNames="char__item">
                    <li className="char__item"
                        tabIndex={0}
                        ref={(el) => itemRefs.current[i] = el}
                        onClick={() => {
                            props.onCharSelected(item.id)
                            onFocus(i)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id)
                                onFocus(i)
                            }
                        }}>
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
                
            )
        })
        
        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }
    
    const items = renderItems(charList)

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                onClick={() => onRequest(offset)} 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList