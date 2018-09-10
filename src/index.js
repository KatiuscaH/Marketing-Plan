import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import SiderDemo from '../src/components/SideBar/sideBar';


ReactDOM.render(
    <Router>
        <SiderDemo />
   </Router>,

    document.getElementById('root'));
registerServiceWorker();
