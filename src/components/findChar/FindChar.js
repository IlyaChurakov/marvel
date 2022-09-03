import {useFormik} from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
// import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';

import './findChar.scss'

const FindChar = () => {

    const {getCharacterByName} = useMarvelService();
    const [answer, setAnswer] = useState(null)
    const [answerBoolean, setAnswerBoolean] = useState(false)
    const [data, setData] = useState({})
    const formik = useFormik({
            initialValues: {
                name: ''
            }
        }
    )

    const findChar = (value) => {
        getCharacterByName(value)
            .then(res => {
                setData({...res})
                setAnswer(`There is! Visit ${res.name} page?`)
                setAnswerBoolean(true)
                console.log(res.name)
            })
            .catch(() => {
                setAnswer('The character was not found. Check the name and try again')
                setAnswerBoolean(false)
            })
    }

    return (
        <div className="char__find">
            <form className="char__find_form" onSubmit={(e) => {
                    e.preventDefault()
                    if(formik.values.name === '') {
                        setAnswer('This field is required')
                    } else {
                        findChar(formik.values.name)
                    }
                }  
            }>
                <div className='char__find_form-title'>Or find a character by name:</div>
                <input 
                    id="name"
                    name="name"
                    type="text"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Enter name"/>
                <button>
                    <div className='button__inner'>FIND</div>
                </button>
            </form>
            
            {answerBoolean ? 
                <div className='char__find_success'>
                    {answer}
                    <Link to={`/${data.id}`} className='button link'>TO PAGE</Link>
                </div> : 
                <div className='char__find_error'>
                    {answer}
                </div>}
        </div>
    )
}

export default FindChar