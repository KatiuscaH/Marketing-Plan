import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class ObjetivoAPlazos extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Objetivos a largo plazo</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default ObjetivoAPlazos;