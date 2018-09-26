import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class AnalisisClientes extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Identificación de clientes actuales</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default AnalisisClientes;