import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'

import VerPlanMarketing from '../contenidoEmpresario/VerPlanMarketing';
import ActualizarEstrategias from '../contenidoEmpresario/ActualizarEstrategias';

 class contenidoEmpresario extends Component {
  render() {
    return (
      <div>
        <Switch>
            <Route path="/ver-plan" component={VerPlanMarketing}/>
            <Route path="/ver-estrategias" component={ActualizarEstrategias}/>
        </Switch>
        
      </div>
    )
  }
}

export default contenidoEmpresario;
