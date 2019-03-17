import React, { Component } from 'react';
import TablaPlanAccion from '../contenido/TablaPlanAccion';

class MostrarProgresoEstrategiasEstudiante extends Component {
  state = {
    datos:{}
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.datos){
      this.setState({datos:  nextProps.datos})
    }
  }
 
  render() {
      return (
          <div>
            
               <TablaPlanAccion dataSource={this.props.propiedades.datos}/>

          </div>
      )
  }
}

export default MostrarProgresoEstrategiasEstudiante;