import React, { Component } from 'react';
import axios from 'axios';
import {ELIMINAR_DATOS_INICIALES_PLAN} from '../../config';
import Apresentacion from './Apresentacion';

import EditorDraft from '../contenido/editorTexto/editorDraft';
import { EditorState, convertFromRaw } from 'draft-js';
import Ahistoria from './Ahistoria';
import Apest from './Apest';
import Aporter from './Aporter';
import AcuatroP from './AcuatroP';
import AclientesActuales from './AclientesActuales';
import Acompetencia from './Acompetencia';
import Aporveedores from './Aproveedores';
import Abcg from './Abcg';
import Adofa from './Adofa';
import Amefimefe from './Amefimefe';
import Aansoff from './Aansoff';

class MostrarProgresoEstudiante extends Component {
  state = {
  }

//LLamando a todos los editores

// * Presentacion


// * Historia
// * Analisis PEST
 //* Porter
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
  
      return (
          <div>
            <h1>Plan de marketing - Progreso</h1>
               <Apresentacion/>
               <Ahistoria/>
               <Apest/>
               <Aporter/>
               <AcuatroP/>
               <AclientesActuales/>
               <Acompetencia/>
               <Aporveedores/>
               <Abcg/>
               <Adofa/>
               <Amefimefe/>
               <Aansoff/>

          </div>
      )
  }
}

export default MostrarProgresoEstudiante;