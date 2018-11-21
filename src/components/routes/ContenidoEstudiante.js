import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import PresentacionEmpresa from '../contenido/PresentacionEmpresa';
import Historia from '../contenido/Historia';
import AnalisisPes from '../contenido/AnalisisPes';
import AnalisisPorter from '../contenido/AnalisisPorter';
import CuatroP from '../contenido/CuatroP';
import MatrizBcg from '../contenido/MatrizBcg';
import AnalisisClientes from '../contenido/AnalisisClientes';
import Competencia from '../contenido/Competencia';
import Proveedores from '../contenido/Proveedores';
import MatrizDofa from '../contenido/MatrizDofa';
import MatrizMefi from '../contenido/MatrizMefi';
import ObjetivosPlazos from '../contenido/ObjetivosPlazos';
import PlanMedios from '../contenido/PlanMedios';
import PlanAccion from '../contenido/PlanAccion';
import Anexos from '../contenido/Anexos';
import MatrizAnsoff from '../contenido/MatrizAnsoff';
import DatosPlanMarketing from '../contenido/DatosPlanMarketing';

class ContenidoEstudiante extends Component {
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
                    <Route path="/matriz-mefi-mefe" component={MatrizMefi} />
                    <Route path="/objetivos-plazos" component={ObjetivosPlazos} />
                    <Route path="/plan-medios" component={PlanMedios} />
                    <Route path="/plan-accion" component={PlanAccion} />
                    <Route path="/subir-anexos" component={Anexos} />
                    <Route path="/matriz-ansoff" component={MatrizAnsoff} />
                    <Route path="/datos-iniciales" component={DatosPlanMarketing} />

                    </Switch>
                {this.props.children}
            </div>
        );
    }
}


export default ContenidoEstudiante;






