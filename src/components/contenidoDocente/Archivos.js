import React, { Component } from 'react';
import { VER_ARCHIVOS_ADMIN } from "../../config";
import { Table, Icon, message, Input, Button } from 'antd';
import '../contenido/TablaDatosPlan.css';
import axios from 'axios';
import Highlighter from 'react-highlight-words';

class VisualizarArchivos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    }
    this.columns = [{
      title: 'Nombres',
      dataIndex: 'user.nombre',

    }, {
      title: 'Apellidos',
      dataIndex: 'user.apellido',

    },
    {
      title: 'Nombre archivo',
      dataIndex: 'nombre',
      width: 200

    }, {
      title: 'Visualizar',
     dataIndex: 'url',
     className: 'fecha',

      render: (dataIndex) => (
        <div>
          <a href={dataIndex} download target="_blank">
            Descargar
            <Icon style={{marginLeft: '4px'}} type="download" />
          </a>
        </div>
      ),
    }
    ];
  }

  componentDidMount() {
    axios.get(VER_ARCHIVOS_ADMIN, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
      .then(res => {
        const files = res.data;
        this.setState({ files });
        message.success('Archivos cargados correctamente')

      }).catch(err => {
        message.error('No se pudo cargar los archivos. Intente nuevamente')
      })
  }

  render() {
    return (
      
      <div>
        <h1>Visualizar Archivos</h1>
        <Table rowKey="id" columns={this.columns} dataSource={this.state.files} bordered></Table>
      </div>
    );
  }
}

export default VisualizarArchivos;