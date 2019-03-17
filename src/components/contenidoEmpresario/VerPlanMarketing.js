import React, { Component } from 'react'
import {ELIMINAR_DATOS_INICIALES_PLAN} from '../../config';
import { message, Button } from 'antd';
import axios from 'axios'
import MostrarProgresoEstudiante from '../contenidoDocente/MostrarProgresoEstudiante';
export class VerPlanMarketing extends Component {

  state={
    datas:{}
  }

  componentDidMount(){
    const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
    axios.get((ELIMINAR_DATOS_INICIALES_PLAN).replace(':id',campo), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
    .then(res => {
        const datas = res.data
        this.setState({ datas });
    }).catch(err => {
         message.error('Erro de servidor. Intente mas tarde');
    })
  }
  render() {


    return (
      <div><Button type="primary" onClick={()=>this.props.estadoCambiado(1)}>Atrás</Button>
       <MostrarProgresoEstudiante propiedad={this.state.datas}/>
      </div>
    )
  }
}

export default VerPlanMarketing;
