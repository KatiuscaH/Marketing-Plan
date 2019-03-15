import React, { Component } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { VER_PLANES_MARKETING , ELIMINAR_DATOS_INICIALES_PLAN} from '../../config';
import VerPlanesMarketing from '../contenidoDocente/VerPlanesMarketing';
import MostrarProgresoEstudiante from './MostrarProgresoEstudiante';
import { createPublicKey } from 'crypto';




class TablaProgresoEstudiante extends Component {

    constructor(props){
        super(props);
        this.state = {
            datas: [],
        }
        this.columns = [{
            title: 'Nombre',
            dataIndex: 'nombre',
        
        }, {
            title: 'Grupo',
            dataIndex: 'grupo',
        
        }, {
            title: 'Empresario asignado',
            dataIndex: 'empresario',
        
        }, , {
            title: 'Operación',
            key: 'operacion',
            // onClick: () => { clic('fhg'); },
            render: (text, record) => (
                <div>
                    <Button onClick={()=>this.clic(record.id)} type="primary" style={{ marginRight: '10px' }} >
                        Ver Plan
                    </Button>
                    <Button type="primary" href="https://google.com">
                        Ver Estrategias
                     </Button>
                </div>
            ),
        }
        ];
    }

    clic=(id)=>{
        axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(':id', id), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
        .then(res => {
           this.setState({datas2: res.data})
        }).catch(err => {
            console.log(err.res)
        });
    }
   
    componentDidMount() {
        axios.get(VER_PLANES_MARKETING, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const datas = res.data
                this.setState({ datas });
            }).catch(err => {
                console.log(err.res)
            })
    }


    render() {
        console.log('weje',this.state.datas2)
        return (
            <div>
                <Table rowKey="id" columns={this.columns} dataSource={this.state.datas} bordered></Table>
                <MostrarProgresoEstudiante  />
            </div>
        )
    }
}

export default TablaProgresoEstudiante;