import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PresentacionEmpresa from './PresentacionEmpresa';
import Historia from './Historia';
import AnalisisPes from './AnalisisPes';
import AnalisisPorter from './AnalisisPorter';
import CuatroP from './CuatroP';
import MatrizBcg from './MatrizBcg';
import AnalisisClientes from './AnalisisClientes';
import Competencia from './Competencia';
import Proveedores from './Proveedores';
import MatrizDofa from './MatrizDofa';
import MatrizMefi from './MatrizMefi';
import ObjetivosPlazos from './ObjetivosPlazos';
import PlanMedios from './PlanMedios';
import PlanAccion from './PlanAccion';
import Anexos from './Anexos';


class Contenido extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/presentacion" component={PresentacionEmpresa} />
                    <Route path="/historia" component={Historia} />
                    <Route path="/analisis-pes" component={AnalisisPes} />
                    <Route path="/analisis-porter" component={AnalisisPorter} />
                    <Route path="/cuatro-p" component={CuatroP} />
                    <Route path="/matriz-bcg" component={MatrizBcg} />
                    <Route path="/analisis-clientes" component={AnalisisClientes} />
                    <Route path="/competencia" component={Competencia} />
                    <Route path="/proveedores" component={Proveedores} />
                    <Route path="/matriz-dofa" component={MatrizDofa} />
                    <Route path="/matriz-mefi" component={MatrizMefi} />
                    <Route path="/objetivos-plazos" component={ObjetivosPlazos} />
                    <Route path="/plan-medios" component={PlanMedios} />
                    <Route path="/plan-accion" component={PlanAccion} />
                    <Route path="/subir-anexos" component={Anexos} />
                    </Switch>
                {this.props.children}
            </div>
        );
    }
}


export default Contenido;






