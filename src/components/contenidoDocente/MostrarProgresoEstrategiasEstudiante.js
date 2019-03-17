import React, { Component } from 'react';
import TablaPlanAccion from '../contenido/TablaPlanAccion';
import TablaObjetivosPlan from '../contenido/TablaObjetivosPlazos';
import TablaPlanMedios from '../contenido/TablaPlanMedios';
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
    console.log({
      'propiedades': this.props.propiedades
    });
    
      return (
          <div>
            <h2>Estrategias</h2>
               <TablaPlanAccion dataSource={this.props.propiedades.estrategias}/>
            <h2>Objetivos</h2>
                <TablaObjetivosPlan dataSource={this.props.propiedades.objetivos}/>
            <h2>Plan de medios</h2>
            <TablaPlanMedios dataSource={this.props.propiedades.medios}/>
          </div>
      )
  }
}

export default MostrarProgresoEstrategiasEstudiante;