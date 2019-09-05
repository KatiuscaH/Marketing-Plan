import React, { Component } from 'react';
import { Table, Button, message, Input, Icon, Spin } from 'antd';
import axios from 'axios';
import { VER_PLANES_MARKETING, ELIMINAR_DATOS_INICIALES_PLAN, LISTAR_ESTRATEGIAS } from '../../config';
import VerPlanesMarketing from '../contenidoDocente/VerPlanesMarketing';
import MostrarProgresoEstudiante from './MostrarProgresoEstudiante';
import MostrarProgresoEstrategiasEstudiante from './MostrarProgresoEstrategiasEstudiante';
import Highlighter from 'react-highlight-words';

class TablaProgresoEstudiante extends Component {

  constructor(props) {
    super(props);
    this.state = {
      datas: [],
      datas2: { presentacion: null },//Plan
      datas3: [],//estrategias,
      iconLoading: false,
      searchText: '',
      cargando: false

    }

    this.columns = [{
      title: 'Nombre del plan de marketing',
      dataIndex: 'nombre',
      width: 200,
      ...this.getColumnSearchProps('nombre')


    }, {
      title: 'Grupo',
      width: 200,
      dataIndex: 'grupo',

    }, {
      title: 'Empresario asignado',
      dataIndex: 'empresario',
      width: 200,

    }, , {
      title: 'Progreso',
      key: 'operacion',
      width: 200,
      render: (text, record) => (
        <div>
          <Button onClick={() => this.clic(record.id)} type="primary" icon="eye" style={{ marginRight: '10px' }} loading={this.state.iconLoading} >
            Ver Plan
                    </Button>
          <Button type="primary" onClick={() => this.clicEstrategias(record.id)} icon="bar-chart" style={{ marginRight: '10px' }} loading={this.state.iconLoading} >
            Ver Estrategias
                     </Button>
        </div>
      ),
    }
    ];
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8, backgroundColor: 'antiquewhite' }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}

        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Buscar
            </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Borrar filtros
            </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  clic = (id) => {
    this.setState({ iconLoading: true })
    axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(':id', id), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
      .then(res => {
        this.setState({ datas2: res.data, iconLoading: false })
        message.success('Plan de marketing seleccionado cargado con éxito.')
      }).catch(err => {
        this.setState({ iconLoading: false })
        message.error('No se ha podido cargar el plan de marketing seleccionado. Intente nuevamente')
      });
  }

  clicEstrategias = (id) => {
    axios.get(LISTAR_ESTRATEGIAS.replace(':id', id), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
      .then(res => {
        console.log('estrategias', res.data);
        message.success('Estrategias cargadas con éxito.')

        this.setState({ datas3: res.data })
      }).catch(err => {
        message.error('No se han podido cargar las estrategias seleccionadas. Intente nuevamente')

      });
  }

  componentDidMount() {
    this.setState({ cargando: true })
    axios.get(VER_PLANES_MARKETING, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
      .then(res => {
        const datas = res.data
        this.setState({ datas, cargando: false });
        message.success('Datos cargados correctamente')
      }).catch(err => {
        message.error('Los datos no han podido cargarse. Intente nuevamente')
        this.setState({ cargando: false })

      })
  }


  render() {
    const { cargando } = this.state


    return (

      <div>
        {
          cargando ? <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>
              <Spin size="large" />
            </div>
          </div> : <div id="plan">
              <Table rowKey="id" columns={this.columns} dataSource={this.state.datas} bordered></Table>
              <hr></hr>
              <MostrarProgresoEstudiante propiedad={this.state.datas2} />
              <hr></hr>

              <MostrarProgresoEstrategiasEstudiante propiedades={this.state.datas3} id="estrategias" />
              <hr></hr>

            </div>
        }
      </div>


    )
  }
}

export default TablaProgresoEstudiante;