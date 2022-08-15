import React, {useState, useEffect, useRef} from 'react'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import './comicsList.scss';
import useMarvelService from '../../services/MarvelService'
import {Link} from 'react-router-dom'

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([])
    const [newItemLoading, setNewItemLoading] = useState(false)
    const [offset, setOffset] = useState(0)
    const [comicsEnded, setComicsEnded] = useState(false)

    const {loading, error, getAllComics} = useMarvelService()

    function onRequest(offset, initial) {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onComicsListLoaded)
    }

    useEffect(() => {
        onRequest(offset, true)
        // window.addEventListener('scroll', onScroll)

        // return window.removeEventListener('scroll', onScroll)
    }, [])

    function onComicsListLoaded(newComicsList) {

        let ended = false
        if(newComicsList.length < 8) {
            ended = true
        }

        setComicsList(charList => [...comicsList, ...newComicsList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset => offset + 8)
        setComicsEnded(charEnded => ended)
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

            return (
                <li 
                    className="comics__item"
                    tabIndex={0}
                    key={i}
                    ref={(el) => itemRefs.current[i] = el}
                    onClick={() => {
                        props.onComicsSelected(item.id)
                        onFocus(i)
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onComicsSelected(item.id)
                            onFocus(i)
                        }
                    }}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                    
                </li>
            )
        })
        
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }
    
    const items = renderItems(comicsList)

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading && !newItemLoading ? <Spinner/> : null

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                onClick={() => onRequest(offset)} 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display' : comicsEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;