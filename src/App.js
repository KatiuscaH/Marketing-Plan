import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import SiderDocente from '../src/components/SideBar/sideBarDocente';
import SiderEstudiante from '../src/components/SideBar/sideBar';
import inicioEmpresario from '../src/components/contenidoEmpresario/inicioEmpresario';


class App extends Component {


    render() {
        let rol = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).rol;

        console.log(rol)

        if (rol == 0) {
            return (
                <Switch>
                    <Route component={(props) => (
                        <SiderDocente
                  /* timestamp={new Date().toString()}*/ {...props} />)}
                    />
                </Switch>
            )
        }
        if (rol == 1) {
            return (
                <Switch>
                    <Route component={(props) => (
                        <SiderEstudiante /*timestamp={new Date().toString()}*/ {...props} />
                    )} />
                </Switch>
            )
        }

        if (rol == 2) {
            return (

                <Switch>
                    <Route component={(props) => (
                        <inicioEmpresario /*timestamp={new Date().toString()}*/ {...props} />
                    )} />
                </Switch>
               
            )
        }

        return <span>asdsadas</span>

    }
}


export default App;