import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch} from 'react-router-dom';

import SiderDocente from '../src/components/SideBar/sideBarDocente';
import SiderEstudiante from '../src/components/SideBar/sideBar';
import Login from './components/login/Login';
import Sider from 'antd/lib/layout/Sider';


class App extends Component {
    //TRATAR DE RENDERIZAR SEGUN EL TIPO DE USER 
    /*state = {
        rol: this.rol,
    }*/

    render() {
        /*
        <Router>
           <Switch>

                <Route exact path="/login" component={Login} />
           </Switch>
        </Router>  
                    */
        let rol = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).rol;

        console.log(rol)
        
        if (rol == 0){
            return(
                <div>

                    <Route component={SiderDocente}/>
                    {/*<Route component={props => <SiderDocente timestamp={new Date().toString()} {...props} />} /> */}
                </div>
            )
        }
         if(rol == 1){
                return(
                    <div>
                        <Route component={SiderEstudiante} />
                        {/*  <Route component={(props) => (
                        <SiderEstudiante timestamp={new Date().toString()} {...props} />
                    )} />*/}
                    </div>
                )
            }
       
        if(rol == 2){//EMPRESARIO aqui falta la vista de empresario
            return(
                
                <div>
                    <Route component={SiderEstudiante} />
                    {/* 
                    <Route component={(props) => (
                    <SiderEstudiante timestamp={new Date().toString()} {...props} />
                )} />*/}
                </div> 
            )
            }

            return <span>asdsadas</span>
        
    }
}


export default App;