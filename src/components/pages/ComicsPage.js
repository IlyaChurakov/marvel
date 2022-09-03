import { useState } from 'react';
import { Helmet } from 'react-helmet';
import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList'

const ComicsPage = () => {

    const [selectedComic, setSelectedComic] = useState(null);

    const onComicsSelected = (id) => {
        setSelectedComic(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Marvel information portal: Comics</title>
            </Helmet>
            <AppBanner/>
            <ComicsList onComicsSelected={onComicsSelected}/>
        </>
    )
}

export default ComicsPage