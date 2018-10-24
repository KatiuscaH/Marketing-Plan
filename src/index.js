import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import SiderDemo from '../src/components/SideBar/sideBar';
import SiderDocente from '../src/components/SideBar/sideBarDocente';
import Login from '../src/components/login/Login';
import App from './App';


ReactDOM.render(
    
    <Router>
        <div>
          <Route path="/login" component={Login}/>
          
          <Route path="/" component={SiderDocente}/>
           

        </div>
    </Router>,

    document.getElementById('root'));
registerServiceWorker();
