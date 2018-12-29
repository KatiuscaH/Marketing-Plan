import React, { Component } from 'react';
import { Table, Button } from 'antd';
import axios from 'axios';
import { VER_PLANES_MARKETING } from '../../config';

const columns = [{
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
            <Button type="primary" style={{marginRight: '10px'}} href="https://google.com">
                Ver Plan
            </Button>
            <Button type="primary" href="https://google.com">
                Ver Estrategias
             </Button>
        </div>
    ),
}
];


class TablaProgresoEstudiante extends Component {
    state = {
        datas: []
    }
    componentDidMount(){
        axios.get(VER_PLANES_MARKETING,{ headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
        .then(res=>{
            const datas = res.data
            this.setState({datas});
        }).catch(err=>{
            console.log(err.res)
        })
    }
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={this.state.datas} bordered></Table>
            </div>
        )
    }
}

export default TablaProgresoEstudiante;