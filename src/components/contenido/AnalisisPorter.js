import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class AnalisisPorter extends Component {
    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Fuerzas de Porter</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default AnalisisPorter;