import React, { Component } from 'react';
import FormEstudiante from './FormEstudiante';

class GestionEstudiantes extends Component{
    render(){
        return(
            <div>
                <h1 style={{textAlign: 'center'}}>Gestión de estudiantes</h1>
                <FormEstudiante/>
            </div>
        )
    }
}



export default GestionEstudiantes;

