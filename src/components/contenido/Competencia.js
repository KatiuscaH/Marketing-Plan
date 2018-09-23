import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class Competencia extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Competencia</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default Competencia;