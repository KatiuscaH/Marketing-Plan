import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";


import GestionEstudiantes from './GestionEstudiantes';
import GestionEmpresarios from './GestionEmpresarios';
import ProgresoEstudiante from './ProgresoEstudiante';
import ProgresoEmpresario from './ProgresoEmpresario';
import Retroalimentacion from './Retroalimentacion';


class ContenidoDocente extends Component {
    render() {
        return (
            
                        <div>
                            <Switch>
                                <Route path="/gestion-estudiantes" component={GestionEstudiantes} />
                                <Route path="/gestion-empresarios" component={GestionEmpresarios} />
                                <Route path="/progreso-estudiantes" component={ProgresoEstudiante} />
                                <Route path="/progreso-empresarios" component={ProgresoEmpresario} />
                                <Route path="/retroalimentacion" component={Retroalimentacion} />
                            </Switch>
                            {this.props.children}
                        </div>
          
        );
    }
}


export default ContenidoDocente;
