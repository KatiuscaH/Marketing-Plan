import React, { Component } from 'react';
import { Table, Button } from 'antd';

const columns = [{
    title: 'Nombre',
    dataIndex: 'nombre',

}, {
    title: 'Grupo',
    dataIndex: 'grupo',

}, {
    title: 'Correo',
    dataIndex: 'correo',

}, , {
    title: 'Operación',
    key: 'operacion',
    render: (text, record) => (
        <div>
            <Button type="primary" style={{marginRight: '10px'}}>
                Enviar Correo
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

class EnviarRetroalimentacion extends Component {
    render() {
        return (
            <div>
                <Table columns={columns} dataSource={data} bordered></Table>
            </div>
        )
    }
}

export default EnviarRetroalimentacion;