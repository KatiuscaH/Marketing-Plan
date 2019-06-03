import React, { Component } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { ADD_OBJETIVOS, ELIMINAR_DATOS_INICIALES_PLAN } from '../../config';
import VerPlanesMarketing from '../contenidoDocente/VerPlanesMarketing';
import MostrarProgresoEstudiante from './MostrarProgresoEstudiante';
import MostrarProgresoEstrategiasEstudiante from './MostrarProgresoEstrategiasEstudiante';

class TablaProgresoEmpresario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            idMark: 1
        }
        this.columns = [{
            title: 'Objetivo',
            dataIndex: 'nombre',

        },  {
            title: 'Nombre Marketing',
            dataIndex: ''

        },  {
            title: 'Indicador de logro',
            key: 'operacion',
            render: (text, record) => (
              <div>
                {record.cumplido ? 'Objetivo cumplido' : 'Objetivo NO cumplido'}
              </div>
            ),
        }
        ];
    }
//////TERMINAR ESTO
    verificarObjCumplido = () => {
        this.setState({ cargando: true })
        axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(":id", this.state.idMark),{ headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } }).then(res => {
            const idMarketing = res.data.marketing_id;
            console.log(res.data.marketing_id);
            this.setState({idMark: idMarketing})
        })
    }

    componentDidMount() {
        axios.get(ADD_OBJETIVOS, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const datas = res.data
                // console.log(datas[0].marketing_id);
                this.setState({ datas: datas});
                // this.verificarObjCumplido();
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