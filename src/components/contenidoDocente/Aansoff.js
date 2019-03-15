import React, { Component } from 'react';
import axios from 'axios';
import {ELIMINAR_DATOS_INICIALES_PLAN, ADD_ESTUDIANTES} from '../../config';
import EditorDraft from '../contenido/editorTexto/editorDraft';
import { EditorState, convertFromRaw } from 'draft-js';

class Aansoff extends Component {
  state = {
      editorState: EditorState.createEmpty(),
      readOnly: true,
  }

// getMarketingId() {
//   //const idMarketing;
//   axios.get(ADD_ESTUDIANTES, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
//   .then(res => {
//     idMarketing = res.data.marketing_id;
//   }).catch(err=>{
//     console.log(err.res)  });
//   return idMarketing;
// }


componentDidMount(){
  const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
  axios.get(ELIMINAR_DATOS_INICIALES_PLAN.replace(":id", campo),{ headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
  .then(res=>{
    const {presentacion,historia,pest,porter,coatrop,clientes,competencia,proveedores,bcg,dofa,mefi,ansoff} = res.data;
     this.setState({datas: res.data});
     if (res.data.ansoff) {
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse( res.data.ansoff))) })
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

  render() {
    console.log('state',this.state.datas);
      return (
          <div>
            <h1>Ansoff</h1>
               <EditorDraft readOnly={this.state.readOnly} onChange={this.onChangeEditor} onEditorStateChange={this.onEditorStateChange} content={this.state.editorState} />
          </div>
      )
  }
}

export default Aansoff;
