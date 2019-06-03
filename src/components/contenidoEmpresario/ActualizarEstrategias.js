import React, { Component } from 'react'
import axios from 'axios';
import {LISTAR_ESTRATEGIAS} from '../../config';
import{message, Button, Spin} from 'antd';
import MostrarProgresoEstrategiasEstudiante from '../contenidoDocente/MostrarProgresoEstrategiasEstudiante';
export class ActualizarEstrategias extends Component {
  
  state={
    propiedades:{},
    cargando: false
  }

  componentDidMount(){
    this.setState({cargando: true})
    const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
    axios.get((LISTAR_ESTRATEGIAS).replace(':id',campo), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
    .then(res => {
        const propiedades = res.data
        this.setState({ propiedades, cargando: false });
    }).catch(err => {
    this.setState({cargando: false })
         message.error('No se pudo cargar la información. Intente nuevamente.');
    })
  }
  render() {
    if(this.state.cargando) {
      return(
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '50vh' }}>
        <Spin size="large" />
    </div>
      )
    } else {
    return (
      <div style={{padding: '10px 10px 10px 10px'}}>
        <div style={{background: '#1B212A', borderRadius: '8px'}}>
        <Button type="primary" onClick={()=>this.props.estadoCambiado(1)}>Atrás</Button>
        </div>
        <div style={{paddingTop: '30px'}} >
          <h1>Estrategias, Objetivos y Plan de medios</h1>
          <p>Aquí podrá ver las estrageias, objetivos y plan de medios creados para usted. Un objetivo está completo en su totalidad cuando todas las estrategias asociadas a este estan completas.</p>
        <MostrarProgresoEstrategiasEstudiante propiedades={this.state.propiedades}/>
        </div>
      </div>
    )
  }
}
}

export default ActualizarEstrategias;
