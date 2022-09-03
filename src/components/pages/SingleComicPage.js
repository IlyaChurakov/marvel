import {useParams, Link} from 'react-router-dom'
import {useState, useEffect} from 'react';
import './singleComicPage.scss';
import { Helmet } from 'react-helmet';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import useMarvelService from '../../services/MarvelService';

const SingleComicPage = () => {
    const {comicId} = useParams()
    const [comic, setComic] = useState(null);
    const {error, loading, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComic()
    }, [comicId]);

    const updateComic = () => {
        clearError()
        getComics(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setComic(comic);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Marvel information portal: Comic Page</title>
            </Helmet>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, pageCount, language, thumbnail, price} = comic

    return (
        <TransitionGroup component={null}>
            <CSSTransition
                timeout={100}
                classNames="single-comic">
                <div className="single-comic">
                    <img src={thumbnail} alt={title} className="single-comic__img"/>
                    <div className="single-comic__info">
                        <h2 className="single-comic__name">{title}</h2>
                        <p className="single-comic__descr">{description}</p>
                        <p className="single-comic__descr">{pageCount === 'No information about the number of pages' ? pageCount : `${pageCount.slice(0, -2)}pages`} </p>
                        <p className="single-comic__descr">Language: {language}</p>
                        <div className="single-comic__price">{price}</div>
                    </div>
                    <Link to="/comics" className="single-comic__back">Back to all</Link>
                </div>
            </CSSTransition>
        </TransitionGroup>
    )
}

export default SingleComicPage;