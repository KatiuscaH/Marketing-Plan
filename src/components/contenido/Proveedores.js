import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
import { EditorState, convertFromRaw } from 'draft-js';
import { Button, Spin } from 'antd';
import { ADD_PROVEEDORES, ELIMINAR_DATOS_INICIALES_PLAN } from '../../config';
import axios from 'axios';

class Proveedores extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        convertedContent: {},
        iconLoading: false,
        cargando: false
    }

    //OnChange
    onEditorStateChange = (editorState) => {
        console.log("onEditorStateChange", { editorState });
        this.setState({ editorState });
    };

    componentDidMount() {
        const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
        this.setState({ cargando: true })
        axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(":id", campo),
            { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(({ data }) => {
                if (data.proveedores) {
                    this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(data.proveedores))) })
                } else {
                    this.setState({ editorState: EditorState.createEmpty() });
                }
                this.setState({ cargando: false })
            }).catch(err => {
                console.log("Error del editor", err)
            })
    }

    save = () => {
        const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
        this.setState({ iconLoading: true })
        axios.put(ADD_PROVEEDORES.replace(":id", campo),
            { proveedores: JSON.stringify(this.state.convertedContent) },
            { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
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
        const { cargando } = this.state
        return (
            <div>
                {
                    cargando ? <div>
                        <h1 style={{ textAlign: 'center' }}>Proveedores</h1>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>
                            <Spin size="large" />
                        </div>
                    </div> : <div>
                            <h1 style={{ textAlign: 'center' }}>Proveedores</h1>
                            <EditorDraft onChange={this.onChangeEditor} onEditorStateChange={this.onEditorStateChange} content={this.state.editorState} />
                            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                                <Button type="primary" icon="save" onClick={this.save} loading={this.state.iconLoading}>Guardar</Button>
                            </div>
                        </div>
                }
            </div>

        );
    }
}


export default Proveedores;