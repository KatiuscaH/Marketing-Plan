import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import SiderDemo from '../src/components/SideBar/sideBar';
import SiderDocente from '../src/components/SideBar/sideBarDocente';
import Login from '../src/components/login/Login';
import App from './App';

//<Route path="/login" component={Login}/>
//<Route path="/" component={App} />

ReactDOM.render(
    
    <Router>
        <div>

        <Switch>
        <Route path="/login" component={Login}/> 
            <Route path="/" component={SiderDocente}/>
           </Switch>
                


        </div>
    </Router>,

    document.getElementById('root'));
registerServiceWorker();
