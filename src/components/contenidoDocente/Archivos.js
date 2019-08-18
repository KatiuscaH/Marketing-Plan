import React, { Component } from 'react';
import { VER_ARCHIVOS_ADMIN } from "../../config";
import { Table, Icon, message, Input, Button , Spin} from 'antd';
import '../contenido/TablaDatosPlan.css';
import axios from 'axios';
import Highlighter from 'react-highlight-words';

class VisualizarArchivos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      cargando: false
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
      width: 400


    }, {
      title: 'Visualizar',
     dataIndex: 'url',
     className: 'fecha',
     width: 200,

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
    this.setState({cargando: true})
    axios.get(VER_ARCHIVOS_ADMIN, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
      .then(res => {
        const files = res.data;
        this.setState({ files, cargando: false });
        message.success('Archivos cargados correctamente')

      }).catch(err => {
        message.error('No se pudo cargar los archivos. Intente nuevamente')
    this.setState({cargando: false})

      })
  }

  render() {
const { cargando } = this.state

    return (
      <div>
      {
        cargando ? <div>
        <h1 style={{paddingBottom: '20px'}}>Visualizar Archivos Anexos</h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>
            <Spin size="large" />
          </div>
        </div> :       <div>
        <h1 style={{paddingBottom: '20px'}}>Visualizar Archivos Anexos</h1>
        <Table rowKey="id" columns={this.columns} dataSource={this.state.files} bordered></Table>
      </div>
      }
    </div>

    );
  }
}

export default VisualizarArchivos;
