import React, { Component } from 'react';
import { Table, Button } from 'antd';

const columns = [{
    title: 'Nombre',
    dataIndex: 'nombre',

}, {
    title: 'Grupo',
    dataIndex: 'grupo',

}, {
    title: 'Empresario asignado',
    dataIndex: 'emp_asignado',

}, , {
    title: 'Operación',
    key: 'operacion',
    render: (text, record) => (
        <div>
            <Button type="primary" style={{marginRight: '10px'}}>
                Ver Plan
            </Button>

            <Button type="primary">
                Ver Estrategias
             </Button>
        </div>
    ),
}
];

const data = [{
    key: '1',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '2',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '3',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}];

class TablaProgresoEstudiante extends Component {
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} bordered></Table>
            </div>
        )
    }
}

export default TablaProgresoEstudiante;