import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import SiderDemo from '../src/components/SideBar/sideBar';
import SiderDocente from '../src/components/SideBar/sideBarDocente';
import Login from '../src/components/login/Login';
import App from './App';
import ProtectedRoute from './components/routes/ProtectedRoute';

/*
<Switch>
        <Route path="/login" component={Login}/> 
            <Route path="/" component={SiderDocente}/>
           </Switch>
*/

ReactDOM.render(

    <Router>
        <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute path="/" component={App} />
        </Switch>
    </Router>,

    document.getElementById('root'));
registerServiceWorker();