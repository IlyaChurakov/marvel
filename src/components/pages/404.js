import ErrorMessage from "../errorMessage/ErrorMessage"
import {Link} from 'react-router-dom'

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p style={{'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '28px', 'marginTop': '30px'}}>Page doesn't exist</p>
            <Link style={{'display': 'block', 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '20px', 'marginTop': '30px'}} to="/">
                Back to main page
            </Link>
        </div>
    )
}

export default Page404