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
                Ver Progreso
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
}, {
    key: '4',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '5',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '6',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '7',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '8',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '9',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '10',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '11',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '12',
    nombre: 'John Brown',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}, {
    key: '13',
    nombre: 'John ddd',
    grupo: 'Juan 1. Juan 2 Juan 3',
    emp_asignado: 'Pepito Perez'
}];

class TablaProgresoEmpresario extends Component {
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} bordered></Table>
            </div>
        )
    }
}

export default TablaProgresoEmpresario;