import React, { Component } from 'react';
//import EditorTexto from './editorTexto/EditorTexto';
import EditorDraft from './editorTexto/editorDraft';

class PresentacionEmpresa extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Presentación de la empresa</h1>
                <EditorDraft />
                
            </div>
        );
    }
}


export default PresentacionEmpresa;