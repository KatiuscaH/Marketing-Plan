import React, { Component } from 'react';
import EditorTexto from './editorTexto/EditorTexto';
//import editorEjemplo from './editorTexto/editorEjemplo';
class PresentacionEmpresa extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Presentación de la empresa</h1>
                <EditorTexto/>
                
            </div>
        );
    }
}


export default PresentacionEmpresa;