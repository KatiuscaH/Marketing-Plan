import React from "react";
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component: Component , ...rest}) => {
    // 

    return <Route {...rest} render={props => 
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to="/cierre-sesion" />
        }
    />
}

export default ProtectedRoute;