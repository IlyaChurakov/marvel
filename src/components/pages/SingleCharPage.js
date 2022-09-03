import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react';
import { Helmet } from 'react-helmet';
import './singleCharPage.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';

const SingleCharPage = () => {
    const {charId} = useParams()
    const [char, setChar] = useState(null);
    const {error, loading, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charId])

    const updateChar = () => {
        clearError()
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Marvel information portal: Character</title>
            </Helmet>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, title} = char

    return (
        <div className="single-char">
            <img src={thumbnail} alt={title} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link to="/" className="single-char__back">Back to all</Link>
        </div>
    )
}

export default SingleCharPage;