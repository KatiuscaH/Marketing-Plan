import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class AnalisisPes extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Análisis PES</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default AnalisisPes;