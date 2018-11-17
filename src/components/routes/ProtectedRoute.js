import React from "react";
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component: Component , ...rest}) => {
    //console.log(JSON.parse(localStorage.getItem('user')))

    return <Route {...rest} render={props => 
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to="/login" />
        }
    />
}

export default ProtectedRoute;