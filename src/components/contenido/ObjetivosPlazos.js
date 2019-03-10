import React, { Component } from 'react';
import FormObjetivoPlazos from './FormObjetivoPlazos';
class ObjetivoAPlazos extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center', color: 'black'  }}>Objetivos a largo plazo</h1>
                <FormObjetivoPlazos/>
            </div>
        );
    }
}


export default ObjetivoAPlazos;