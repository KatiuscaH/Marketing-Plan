import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';

class Proveedores extends Component {
    render() {
        return (
            <div>
               <h1 style={{ textAlign: 'center' }}>Proveedores</h1>
               <EditorDraft />
            </div>
        );
    }
}


export default Proveedores;