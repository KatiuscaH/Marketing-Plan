import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
import { EditorState, convertFromRaw } from 'draft-js';
import { Button } from 'antd';
import { ADD_BCG, ELIMINAR_DATOS_INICIALES_PLAN } from '../../config';
import axios from 'axios';

class MatrizBcg extends Component {
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
        axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(":id", campo),
            { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(({ data }) => {
                if (data.clientes) {
                    this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(data.clientes))) })
                } else {
                    this.setState({ editorState: EditorState.createEmpty() });
                }

            }).catch(err => {
                console.log("Error del editor", err)
            })
    }

    save = () => {
        const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
        axios.put(ADD_BCG.replace(":id", campo),
            { clientes: JSON.stringify(this.state.convertedContent) },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('id_token')}`
                },
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


export default MatrizBcg;