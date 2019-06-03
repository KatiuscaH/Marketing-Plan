import React, { Component } from 'react';
import { Table, Button, message } from 'antd';
import axios from 'axios';
import { VER_PLANES_MARKETING , ELIMINAR_DATOS_INICIALES_PLAN,LISTAR_ESTRATEGIAS} from '../../config';
import VerPlanesMarketing from '../contenidoDocente/VerPlanesMarketing';
import MostrarProgresoEstudiante from './MostrarProgresoEstudiante';
import MostrarProgresoEstrategiasEstudiante from './MostrarProgresoEstrategiasEstudiante';

class TablaProgresoEstudiante extends Component {

    constructor(props){
        super(props);
        this.state = {
            datas: [],
            datas2: {presentacion:null},//Plan
            datas3:[],//estrategias,
            iconLoading: false,
        }
        this.columns = [{
            title: 'Nombre del plan de marketing',
            dataIndex: 'nombre',
        
        }, {
            title: 'Grupo',
            dataIndex: 'grupo',
        
        }, {
            title: 'Empresario asignado',
            dataIndex: 'empresario',
        
        }, , {
            title: 'Progreso',
            key: 'operacion',
            render: (text, record) => (
                <div>
                    <Button onClick={()=>this.clic(record.id)} type="primary" icon="eye" style={{ marginRight: '10px' }} loading={this.state.iconLoading}>
                        Ver Plan
                    </Button>
                    <Button type="primary" onClick={()=>this.clicEstrategias(record.id)} icon="bar-chart" style={{ marginRight: '10px' }} loading={this.state.iconLoading} >
                        Ver Estrategias
                     </Button>
                </div>
            ),
        }
        ];
    }

    clic=(id)=>{
        this.setState({iconLoading: true})
        axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(':id', id), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
        .then(res => {
           this.setState({datas2: res.data, iconLoading: false})
           message.success('Plan de marketing seleccionado cargado con éxito.')
        }).catch(err => {
            this.setState({iconLoading: false})
             message.error('No se ha podido cargar el plan de marketing seleccionado. Intente nuevamente')
        });
    }
   
    clicEstrategias=(id)=>{
        axios.get(LISTAR_ESTRATEGIAS.replace(':id', id), { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
        .then(res => {
             console.log('estrategias',res.data);
             
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
        console.log({
            state: this.state
        });
        
        return (
            <div>
                <Table rowKey="id" columns={this.columns} dataSource={this.state.datas} bordered></Table>
                <hr></hr>
                <MostrarProgresoEstudiante propiedad={this.state.datas2} />
                <hr></hr>
                
                <MostrarProgresoEstrategiasEstudiante propiedades={this.state.datas3}/>
                <hr></hr>
                

            </div>
        )
    }
}

export default TablaProgresoEstudiante;