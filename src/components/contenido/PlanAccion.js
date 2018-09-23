import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class PlanAccion extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Plan de acción</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default PlanAccion;