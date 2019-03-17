import React, { Component } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { VER_PLANES_MARKETING , ELIMINAR_DATOS_INICIALES_PLAN,ELIMINAR_PLAN_ACCION} from '../../config';
import VerPlanesMarketing from '../contenidoDocente/VerPlanesMarketing';
import MostrarProgresoEstudiante from './MostrarProgresoEstudiante';
import MostrarProgresoEstrategiasEstudiante from './MostrarProgresoEstrategiasEstudiante';

class TablaProgresoEstudiante extends Component {

    constructor(props){
        super(props);
        this.state = {
            datas: [],
            datas2: {presentacion:null},//Plan
            datas3:{}//estrategias
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
            render: (text, record) => (
                <div>
                    <Button onClick={()=>this.clic(record.id)} type="primary" style={{ marginRight: '10px' }} >
                        Ver Plan
                    </Button>
                    <Button type="primary" onClick={()=>this.clicEstrategias(record.id)} >
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
             
        });
    }
   
    clicEstrategias=(id)=>{
        axios.get(ELIMINAR_PLAN_ACCION.replace(':id', id), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
        .then(res => {
             
           this.setState({datas3: res.data})
        }).catch(err => {
             
        });
    }

    componentDidMount() {
        axios.get(VER_PLANES_MARKETING, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
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
                <hr></hr>
                <MostrarProgresoEstudiante propiedad={this.state.datas2} />
                <MostrarProgresoEstrategiasEstudiante propiedades={this.state.datas3}/>
            </div>
        )
    }
}

export default TablaProgresoEstudiante;