import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Button } from 'antd';
import { ADD_ANALISIS_CLIENTES } from '../../config';
import axios from 'axios';

class AnalisisClientes extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        convertedContent: {},
    }

    //OnChange
    onEditorStateChange = (editorState) => {
        console.log("onEditorStateChange", { editorState });
        this.setState({ editorState });
    };

    componentDidMount() {
        const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
        // axios.(ADD_ANALISIS_CLIENTES.replace(":id", campo)).then(val => val.json())
        //     .then(rawContent => {
        //         if (rawContent) {
        //             this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
        //         } else {
        //             this.setState({ editorState: EditorState.createEmpty() });
        //         }
        //     });
    }

    save = () => {
        const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
        /* fetch(ADD_ANALISIS_CLIENTES.replace(":id", campo), {
             method: 'PUT',
             body: JSON.stringify({
                 content: convertToRaw(this.state.editorState),
 
             }),
             header: new Headers({
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${localStorage.getItem('id_token')}`
             })
         })
 */
        axios.put(ADD_ANALISIS_CLIENTES.replace(":id", campo), {
            headers: { 
                Authorization: `Bearer ${localStorage.getItem('id_token')}`
            }, 
            body: JSON.stringify({
                content: this.state.convertedContent,
            }),
        });
    }

    onChangeEditor = (v) => {
        console.log("onChangeEditor", v);
        this.setState({
            convertedContent: v
        })
        // const contentState = v.getCurrentContent();
        // console.log('content state', convertToRaw(v));
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Identificación de clientes actuales</h1>
                <EditorDraft onChange={this.onChangeEditor} onEditorStateChange={this.onEditorStateChange} content={this.state.editorState} />
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button type="primary" icon="save" onClick={this.save}>Guardar</Button>
                </div>
            </div>
        );
    }
}


export default AnalisisClientes;