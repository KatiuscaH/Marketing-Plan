import React, { Component } from 'react';
import axios from 'axios';
import {ELIMINAR_DATOS_INICIALES_PLAN} from '../../config';
import EditorDraft from '../contenido/editorTexto/editorReadOnly';
import { EditorState, convertFromRaw } from 'draft-js';

class Ahistoria extends Component {
  state = {
    editorState : EditorState.createEmpty(),
}

componentDidMount(){
   
  if(this.props.data){
    this.setState({editorState:  EditorState.createWithContent(convertFromRaw(JSON.parse( this.props.data)))})
  }
}

componentWillReceiveProps(nextProps) { 
  if(nextProps.data !== undefined && nextProps.data === null){
    this.setState({editorState: EditorState.createEmpty()})
  } 
  if(nextProps.data){
    this.setState({editorState:  EditorState.createWithContent(convertFromRaw(JSON.parse( nextProps.data)))})
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
  console.log('Render', this.state.editorState);
  
    return (
        <div>
          <h1>Historia</h1>
             <EditorDraft onChange={this.onChangeEditor} onEditorStateChange={this.onEditorStateChange} content={this.state.editorState} />
        </div>
    )
}
}

export default Ahistoria;