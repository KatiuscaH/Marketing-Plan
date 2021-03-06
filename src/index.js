import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import Login from '../src/components/login/Login';
import App from './App';
import ProtectedRoute from './components/routes/ProtectedRoute';
import CierreSesion from './components/login/CierreSesion';
/*
<Route exact path="/login" component={Login} />
            <ProtectedRoute path="/" component={App} />
*/ 

ReactDOM.render(

    <Router>
        <Switch>
        <Route path="/login" component={Login} />
        <Route path="/cierre-sesion" component={CierreSesion} />
        <ProtectedRoute path="/" component={App} />
        </Switch>
    </Router>,

    document.getElementById('root'));
registerServiceWorker();