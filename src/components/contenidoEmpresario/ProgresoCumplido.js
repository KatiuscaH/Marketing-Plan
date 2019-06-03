import React, { Component } from 'react'
import {LISTAR_ESTRATEGIAS} from '../../config';
import { message, Button, Spin } from 'antd';
import axios from 'axios'
import TablaObjetivosPlanCopia from '../contenido/TablaObjetivosPlazosCopia';

export class ProgesoCumplido extends Component {

 
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
      this.setState({cargando: false})
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
        <Button type="primary" onClick={()=>this.props.estadoCambiado(1)} >Atrás</Button>
        </div>
        <div style={{paddingTop: '30px'}} >
          <h1>Progreso de objetivos</h1>
          <p>Aquí podrás marcar como completos los objetivos propuestos una vez completes todas las estrategias planteadas. Para marcar como completo, presiona sobre 'Objetivo cumplido' y selecciona Si o No. </p>
        <TablaObjetivosPlanCopia dataSource={this.state.propiedades.objetivos} />
        </div>
      </div>
    )
  }
}

export default ProgesoCumplido;
