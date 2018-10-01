import React, { Component } from 'react';
import TablaProgresoEmpresario from './TablaProgresoEmpresario';

class ProgresoEmpresario extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Progreso de empresarios</h1>
                <TablaProgresoEmpresario/>
            </div>
        );
    }
}


export default ProgresoEmpresario;