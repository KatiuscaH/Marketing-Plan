import React, { Component } from 'react';
import EnviarRetroalimentacion from './EnviarRetroalimentacion';

class Retroalimentacion extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Retroalimentación</h1>
                <EnviarRetroalimentacion/>
            </div>
        );
    }
}


export default Retroalimentacion;