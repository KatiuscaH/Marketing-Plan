import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
import { EditorState, convertFromRaw } from 'draft-js';
import { Button } from 'antd';
import { ADD_COMPETENCIA, ELIMINAR_DATOS_INICIALES_PLAN } from '../../config';
import axios from 'axios';

class Competencia extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        convertedContent: {},
        iconLoading: false
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
                if (data.competencia) {
                    this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(data.competencia))) })
                } else {
                    this.setState({ editorState: EditorState.createEmpty() });
                }

            }).catch(err => {
                console.log("Error del editor", err)
            })
    }

    save = () => {
        const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
        this.setState({ iconLoading: true })
        axios.put(ADD_COMPETENCIA.replace(":id", campo),
            { competencia: JSON.stringify(this.state.convertedContent) },
            {headers: {Authorization: `Bearer ${localStorage.getItem('id_token')}`}})
            .then((res => {
                this.setState({ iconLoading: false })
            })
            
        )
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
                <h1 style={{ textAlign: 'center' }}>Competencia</h1>
                <EditorDraft onChange={this.onChangeEditor} onEditorStateChange={this.onEditorStateChange} content={this.state.editorState} />
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button type="primary" icon="save" onClick={this.save} loading={this.state.iconLoading}>Guardar</Button>
                </div>
            </div>
        );
    }
}


export default Competencia;