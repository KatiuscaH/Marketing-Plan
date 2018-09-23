import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class MatrizBcg extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Matriz BCG</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default MatrizBcg;