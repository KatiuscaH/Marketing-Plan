import React, { Component } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { VER_PLANES_MARKETING, ADD_OBJETIVOS, LISTAR_ESTRATEGIAS } from '../../config';
import VerPlanesMarketing from '../contenidoDocente/VerPlanesMarketing';
import MostrarProgresoEstudiante from './MostrarProgresoEstudiante';
import MostrarProgresoEstrategiasEstudiante from './MostrarProgresoEstrategiasEstudiante';

class TablaProgresoEmpresario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
        }
        this.columns = [{
            title: 'Nombre',
            dataIndex: 'nombre',

        },  {
            title: '¿Cumplido?',
            key: 'operacion',
            render: (text, record) => (
              <div>
                {record.cumplido ? 'SI cumplido' : 'NO cumplido'}
              </div>
            ),
        }
        ];
    }

    verificarObjCumplido = () => {

    }

    componentDidMount() {
        axios.get(ADD_OBJETIVOS, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const datas = res.data
                        this.setState({ datas });
                
            }).catch(err => {

            })
    }


    render() {

        return (
            <div>
                <Table rowKey="id" columns={this.columns} dataSource={this.state.datas} bordered></Table>
            </div>
        )
    }
}

export default TablaProgresoEmpresario;