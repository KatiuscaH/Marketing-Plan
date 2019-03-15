import React, { Component } from 'react';
import axios from 'axios';
import {ELIMINAR_OBJETIVOS, ADD_OBJETIVOS} from '../../config';

import EditorDraft from '../contenido/editorTexto/editorDraft';
import { EditorState, convertFromRaw } from 'draft-js';
import TablaObjetivosPlazos from '../contenido/TablaObjetivosPlazos';

class ProgresoEstudianteObj extends Component {
  state = { objetivoList: [],
  }

componentDidMount(){
  const campo = JSON.parse(localStorage.getItem("user")).marketing_id;
  axios.get(ADD_OBJETIVOS, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
  .then(res => {
      const objetivoList = res.data;
      this.setState({ objetivoList });
  }).catch(err => {
      console.log(err.res)
  })
}

  render() {
  
      return (
          <div>
                <TablaObjetivosPlazos dataSource={this.state.objetivoList}/>
          </div>
      )
  }
}

export default ProgresoEstudianteObj;