import React, { Component } from 'react';
import TablaPlanAccion from '../contenido/TablaPlanAccion';
import TablaObjetivosPlan from '../contenido/TablaObjetivosPlazos';
import TablaPlanMedios from '../contenido/TablaPlanMedios';
import estilosTablas from './estilosTablas.css';
import TablaPlanAccionEmpresario from '../contenidoEmpresario/TablaPlanAccionEmpresario';
import TablaObjetivosPlanEmpresario from '../contenidoEmpresario/TablaObjetivosPlaEmpresario'
import TablaPlanMediosEMpresario from '../contenidoEmpresario/TablaPlanMediosEmpresario'
class MostrarProgresoEstrategiasEstudiante extends Component {
  state = {
    datos: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.datos) {
      this.setState({ datos: nextProps.datos })
    }
  }

  render() {
  
    
    return (
      <div className="table">
        <h2>Objetivos</h2>
        <TablaObjetivosPlanEmpresario dataSource={this.props.propiedades.objetivos} />

        <h2 style={{paddingTop: '30px'}}>Estrategias</h2>
        <TablaPlanAccionEmpresario dataSource={this.props.propiedades.estrategias}/>

        <h2 style={{paddingTop: '30px'}}>Plan de medios</h2>
        <TablaPlanMediosEMpresario dataSource={this.props.propiedades.medios} />
      </div>
    )
  }
}

export default MostrarProgresoEstrategiasEstudiante;