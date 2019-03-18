import React, { Component } from 'react'
import {LISTAR_ESTRATEGIAS} from '../../config';
import { message, Button } from 'antd';
import axios from 'axios'
import TablaObjetivosPlanCopia from '../contenido/TablaObjetivosPlazosCopia';

export class ProgesoCumplido extends Component {

 
  state={
    propiedades:{}
  }

  componentDidMount(){
    const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
    axios.get((LISTAR_ESTRATEGIAS).replace(':id',campo), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
    .then(res => {
        const propiedades = res.data
        this.setState({ propiedades });
    }).catch(err => {
         message.error('Erro de servidor. Intente mas tarde');
    })
  }
  render() {
    return (
      <div>
        <Button type="primary" onClick={()=>this.props.estadoCambiado(1)}>Atrás</Button>
        <TablaObjetivosPlanCopia dataSource={this.state.propiedades.objetivos} />
      </div>
    )
  }
}

export default ProgesoCumplido;
