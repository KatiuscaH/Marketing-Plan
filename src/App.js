import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import SiderDocente from '../src/components/SideBar/sideBarDocente';
import SiderEstudiante from '../src/components/SideBar/sideBar';
import InicioEmpresario from '../src/components/contenidoEmpresario/inicioEmpresario';


class App extends Component {


    render() {
        let rol = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).rol;

      

        switch (rol) {
            case 0:
                return <Route path="/" component={(props) => (
                    <SiderDocente
               timestamp={new Date().toString()} {...props} />)}
                />
            case 1:
                return <Route path="/" component={(props) => (
                    <SiderEstudiante
               timestamp={new Date().toString()} {...props} />)}
                />
            case 2:
                return <Route path="/" component={(props) => (
                    <InicioEmpresario
               timestamp={new Date().toString()} {...props} />)}
                />

            default:
                break;
        }
    }
}


export default App;