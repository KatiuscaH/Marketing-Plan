import React, { Component } from 'react';
import axios from 'axios';
import {ELIMINAR_DATOS_INICIALES_PLAN, ADD_ESTUDIANTES} from '../../config';
import EditorDraft from '../contenido/editorTexto/editorReadOnly';
import { EditorState, convertFromRaw } from 'draft-js';

class Aansoff extends Component {
  state = {
    editorState : EditorState.createEmpty(),
}

componentDidMount(){
  if(this.props.data){
    this.setState({editorState:  EditorState.createWithContent(convertFromRaw(JSON.parse( this.props.data)))})
  }
}

componentWillReceiveProps(nextProps) {
 
  
  if(nextProps.data ){
    
    this.setState({editorState:  EditorState.createWithContent(convertFromRaw(JSON.parse( nextProps.data)))})
  }else{
     
    this.setState({editorState: EditorState.createEmpty()})
  }
}

onChangeEditor = (v) => {
  this.setState({
      convertedContent: v
  })
}

onEditorStateChange = (editorState) => {
  this.setState({ editorState });
};

render() {
    return (
        <div>
          <h1>Matríz de Ansoff</h1>
             <EditorDraft  onChange={this.onChangeEditor} onEditorStateChange={this.onEditorStateChange} content={this.state.editorState} />
        </div>
    )
}
}

export default Aansoff;
