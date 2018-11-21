import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Button } from 'antd';

class AnalisisClientes extends Component {

    state = {
        editorState: EditorState.createEmpty(),
    }

    //OnChange
    onEditorStateChange = (editorState) => {
        this.setState({ editorState: editorState });
    };

    componentDidMount() {
        // fetch('/content').then(val => val.json())
        //     .then(rawContent => {
        //         if (rawContent) {
        //             this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
        //         } else {
        //             this.setState({ editorState: EditorState.createEmpty() });
        //         }
        //     });
    }

    save = () => {
        console.log(this.state.editorState);
        // fetch('/contenido', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         content: convertToRaw(this.state.editorState),
        
        //     }),
        //     header: new Headers({
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem('id_token')}`
        //     })
        // })
    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: 'center'}}>Identificación de clientes actuales</h1>
                <EditorDraft onEditorStateChange={this.onEditorStateChange} content={this.state.editorState} />
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button type="primary" icon="save" onClick={this.save}>Guardar</Button>
                </div>
            </div>
        );
    }
}


export default AnalisisClientes;