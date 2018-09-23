import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class MatrizDofa extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Matriz DOFA</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default MatrizDofa;