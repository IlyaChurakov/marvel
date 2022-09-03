import ErrorMessage from "../errorMessage/ErrorMessage"
import { Helmet } from "react-helmet"
import {Link} from 'react-router-dom'

const Page404 = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"/>
                <title>Marvel information portal: Page is not found</title>
            </Helmet>
            <ErrorMessage />
            <p style={{'color': 'white', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '28px', 'marginTop': '30px'}}>Page doesn't exist</p>
            <Link style={{'color': 'white', 'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '20px', 'marginTop': '30px'}} to="/">
                Back to main page
            </Link>
        </>
    )
}

export default Page404