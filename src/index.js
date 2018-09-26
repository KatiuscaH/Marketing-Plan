import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import SiderDemo from '../src/components/SideBar/sideBar';
import SiderDocente from '../src/components/SideBar/sideBarDocente';


ReactDOM.render(

    <Router>
        <SiderDocente />
   </Router>,

    document.getElementById('root'));
registerServiceWorker();
