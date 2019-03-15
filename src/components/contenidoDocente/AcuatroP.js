import React, { Component } from 'react';
import axios from 'axios';
import {ELIMINAR_DATOS_INICIALES_PLAN} from '../../config';
import EditorDraft from '../contenido/editorTexto/editorDraft';
import { EditorState, convertFromRaw } from 'draft-js';

class AcuatroP extends Component {
  state = {
      editorState: EditorState.createEmpty(),
  }

// * Presentacion
componentDidMount(){
  const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
  axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(":id", campo),{ headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
  .then(res=>{
    const {presentacion,historia,pest,porter,coatrop,clientes,competencia,proveedores,bcg,dofa,mefi,ansoff} = res.data;
     this.setState({datas: res.data});
     if (res.data.coatrop) {
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse( res.data.coatrop))) })
  } else {
      this.setState({ editorState: EditorState.createEmpty() });
  }
  }).catch(err=>{
      console.log(err.res);
  })
}

onChangeEditor = (v) => {
  console.log("onChangeEditor", v);
  this.setState({
      convertedContent: v
  })
}

onEditorStateChange = (editorState) => {
  console.log("onEditorStateChange", { editorState });
  this.setState({ editorState });
};

 //* Cuatro P
 //* Clientes actuales
// * Competencia
 //* Proveedores
// * BCG
// * Dofa
 //* Mefi-mefe
// * Ansoff
// * Objetivos
// * Plan de medios
 //* Plan de accion
 //* Anexos-->No es editor
 


  render() {
    console.log('state',this.state.datas);
      return (
          <div>
            <h1>Cuatro P</h1>
               <EditorDraft readOnly={true} onChange={this.onChangeEditor} onEditorStateChange={this.onEditorStateChange} content={this.state.editorState} />
          </div>
      )
  }
}

export default AcuatroP;