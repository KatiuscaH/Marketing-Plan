import React, { Component } from 'react'
import {ELIMINAR_DATOS_INICIALES_PLAN} from '../../config';
import { message, Button, Spin } from 'antd';
import axios from 'axios'
import MostrarProgresoEstudiante from '../contenidoDocente/MostrarProgresoEstudiante';
export class VerPlanMarketing extends Component {

  state={
    datas:{},
    cargando: false
  }

  componentDidMount(){
    this.setState({cargando: true})
    const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
    axios.get((ELIMINAR_DATOS_INICIALES_PLAN).replace(':id',campo), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
    .then(res => {
        const datas = res.data
        this.setState({ datas, cargando: false });
    }).catch(err => {
    this.setState({cargando: true})
    message.error('No se ha podido cargar los datos. Intenta nevamente');
    })
  }
  render() {
    if (this.state.cargando) {
      return <div> 
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>
              <Spin size="large" />
          </div>
      </div>
  }
    return (
      <div style={{padding: '10px 10px 10px 10px'}}>
          <div style={{background: '#1B212A', borderRadius: '8px'}}>
        <Button type="primary" onClick={()=>this.props.estadoCambiado(1)}>Atrás</Button>
        </div>
        <div style={{paddingTop: '30px'}} >
          <h1>Plan de marketing</h1>
          <p>Aquí podrá ver el plan de marketing que ha sido creado para usted.</p>
       <MostrarProgresoEstudiante propiedad={this.state.datas}/>
       </div>
      </div>
    )
  }
}

export default VerPlanMarketing;
