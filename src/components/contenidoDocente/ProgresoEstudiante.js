import React, { Component } from 'react';
import TablaProgresoEstudiante from './TablaProgresoEstudiante';

class ProgresoEstudiantes extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Progreso de estudiantes</h1>
                <TablaProgresoEstudiante/>
            </div>
        );
    }
}


export default ProgresoEstudiantes;