import React, { Component } from "react";
import { Route } from "react-router-dom";
import PresentacionEmpresa from '../contenido/PresentacionEmpresa';
import Historia from '../contenido/Historia';


class Contenido extends Component {
    render() {
        return (
            <div>
                <Route path="/presentacion" component={PresentacionEmpresa} />
                <Route path="/historia" component={Historia} />
                {this.props.children}
            </div>
        );
    }
}


export default Contenido;






