import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
class PlanMedios extends Component {
    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Plan de medios</h1>
                <EditorDraft />
            </div>
        );
    }
}


export default PlanMedios;