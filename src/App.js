import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import SiderDocente from '../src/components/SideBar/sideBarDocente';
import SiderEstudiante from '../src/components/SideBar/sideBar';
import Login from './components/login/Login';


class App extends Component {
    //TRATAR DE RENDERIZAR SEGUN EL TIPO DE USER 
    /*state = {
        rol: this.rol,
    }*/

    render() {
        
        /*<Router>
            <div>
                <Route exact path="/login" component={Login} />
                
            </div>
        </Router>*/
        let rol = localStorage.getItem('rol') || 1;
        if(rol === 1){
            return(
                <div><Route component={(props) => (
                    <SiderDocente timestamp={new Date().toString()} {...props} />
                )} /></div>
            )
        }
         if(rol === 2){
                return(
                    <div><Route component={(props) => (
                        <SiderEstudiante timestamp={new Date().toString()} {...props} />
                    )} /></div>
                )
            }
       
        if(rol === 3){//EMPRESARIO
            return(
                <div><Route component={(props) => (
                    <SiderEstudiante timestamp={new Date().toString()} {...props} />
                )} /></div>
            )
            }

            return <span>asdsadas</span>
        
    }
}


export default App;