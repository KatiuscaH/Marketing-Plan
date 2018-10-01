import React, { Component } from 'react';
import FormEmpresario from './FormEmpresario';

class GestionEmpresarios extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Gestión de empresarios</h1>
                <FormEmpresario/>
            </div>
        );
    }
}


export default GestionEmpresarios;