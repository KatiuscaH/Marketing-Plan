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
 
  render() {
  
      return (
          <div>
               <Apresentacion data={this.props.propiedad.presentacion}/>
               <Ahistoria data={this.props.propiedad.historia}/>
               <Apest data={this.props.propiedad.pest}/>
               <Aporter data={this.props.propiedad.porter}/>
               <AcuatroP data={this.props.propiedad.coatrop}/>
               <AclientesActuales data={this.props.propiedad.clientes}/>
               <Acompetencia data={this.props.propiedad.competencia}/>
               <Aporveedores data={this.props.propiedad.proveedores}/>
               <Abcg data={this.props.propiedad.bcg}/>
               <Adofa data={this.props.propiedad.dofa}/>
               <Amefimefe data={this.props.propiedad.mefi}/>
               <Aansoff data={this.props.propiedad.ansoff}/>

          </div>
      )
  }
}

export default MostrarProgresoEstudiante;