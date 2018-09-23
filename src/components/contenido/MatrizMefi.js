import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class MatrizMefi extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Matriz MEFI y MEFE</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default MatrizMefi;