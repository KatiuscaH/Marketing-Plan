import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';

class Historia extends Component {


    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Historia</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default Historia;