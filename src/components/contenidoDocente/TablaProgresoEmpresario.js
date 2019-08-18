import React, { Component } from 'react';
import { Table, Button , message, Spin} from 'antd';
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
            cargando: false
        }
        this.columns = [{
            title: 'Objetivo',
            dataIndex: 'nombre',

        }, {
            title: 'Nombre del plan de Marketing',
            dataIndex: 'marketing.plan'

        }, {
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
        axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(":id", this.state.idMark), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } }).then(res => {
            const idMarketing = res.data.marketing_id;
            this.setState({ idMark: idMarketing })
        })
    }

    componentDidMount() {
        this.setState({ cargando: true })
        axios.get(ADD_OBJETIVOS, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const datas = res.data
                // console.log(datas[0].marketing_id);
                this.setState({ datas: datas, cargando: false });
                message.success('Datos cargados correctamente')
                // this.verificarObjCumplido();
                console.log(datas);

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
              </div> :             <div>
                <Table rowKey="id" columns={this.columns} dataSource={this.state.datas} bordered></Table>
            </div>
            }
          </div>
        )
    }
}

export default TablaProgresoEmpresario;