import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import SiderDemo from '../src/components/SideBar/sideBar';


ReactDOM.render(
    <Router>
       <Route path="/" component={SiderDemo} />
    </Router>,

    document.getElementById('root'));
registerServiceWorker();
