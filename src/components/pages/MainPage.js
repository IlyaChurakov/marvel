import { useState } from "react";
import {Helmet} from 'react-helmet';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import ironman from '../../resources/img/ironman.png';
import FindChar from "../findChar/FindChar";

const MainPage = () => {

    const [selectedChar, setSelectedChar] = useState(null);
    
    const onCharSelected = (id) => {
        setSelectedChar(id);
    }

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Marvel information portal: Home</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>

            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary>
                <div style={{position: 'sticky'}}>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <FindChar/>
                    </ErrorBoundary>
                </div>
            </div> 
            
            <img className="ironman" src={ironman} alt="vision"/>
        </>
    )
}

export default MainPage 

