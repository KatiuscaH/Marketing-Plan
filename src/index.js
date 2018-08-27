import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import SiderDemo from '../src/components/SideBar/sideBar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<SiderDemo  />, document.getElementById('root'));
registerServiceWorker();
