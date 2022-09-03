import {lazy, Suspense} from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import AppHeader from "../appHeader/AppHeader";
import SingleCharPage from '../pages/SingleCharPage';
import Spinner from '../spinner/Spinner';
import './app.scss'

const Page404 = lazy(() => import ('../pages/404'))
const MainPage = lazy(() => import ('../pages/MainPage'))
const ComicsPage = lazy(() => import ('../pages/ComicsPage'))
const SingleComicPage = lazy(() => import ('../pages/SingleComicPage'))

const App = () => {
    const location = useLocation()

    return (
        <div className="app">
            <AppHeader/>
            <main>
                <Suspense fallback={<Spinner/>}>
                    <Routes location={location}>
                        <Route path="/" element={<MainPage/>} exact/>
                        <Route path="/comics" element={<ComicsPage/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="/:charId" element={<SingleCharPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
           </main>
        </div>
    )
}

export default App;