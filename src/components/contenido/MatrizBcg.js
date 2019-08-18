import React, { Component } from 'react';
import EditorDraft from './editorTexto/editorDraft';
import { EditorState, convertFromRaw } from 'draft-js';
import { Button, Spin, message } from 'antd';
import { ADD_BCG, ELIMINAR_DATOS_INICIALES_PLAN } from '../../config';
import axios from 'axios';

class MatrizBcg extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        convertedContent: {},
        iconLoading: false,
        cargando: false
    }

    //OnChange
    onEditorStateChange = (editorState) => {
         
        this.setState({ editorState });
    };

    componentDidMount() {
        const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
        this.setState({ cargando: true })
        axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(":id", campo),
            { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(({ data }) => {
                if (data.bcg) {
                    this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(data.bcg))) })
                    message.success('Datos cargados correctamente')

                } else {
                    this.setState({ editorState: EditorState.createEmpty() });
                }
                this.setState({ cargando: false })
            }).catch(err => {
                message.error('Los datos no han podido cargarse. Intente nuevamente')
        this.setState({ cargando: false })
                 
            })
    }

    save = () => {
        const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
        this.setState({ iconLoading: true })
        axios.put(ADD_BCG.replace(":id", campo),
            { bcg: JSON.stringify(this.state.convertedContent) },
            { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then((res => {
                this.setState({ iconLoading: false })
                message.success('Los datos se han guardado correctamente')

            })

            ).catch(err => {
                 
                message.error("Error de guardado. Intente nuevamente")
                this.setState({ iconLoading: false })
            })
    }

    onChangeEditor = (v) => {
         
        this.setState({
            convertedContent: v
        })
        // const contentState = v.getCurrentContent();
        //  
    }

    render() {
        const { cargando } = this.state
        return (
            <div>
                {
                    cargando ? <div>
                        <h1 style={{ textAlign: 'center', color: 'black'  }}>Matríz BCG</h1>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '30vh' }}>
                            <Spin size="large" />
                        </div>
                    </div> : <div>
                            <h1 style={{ textAlign: 'center' , color: 'black' }}>Matríz BCG</h1>
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


export default MatrizBcg;