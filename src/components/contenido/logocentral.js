import React, { Component } from 'react';
import logoudc from '../../logoudc.png';
import softmark from '../../softmarkudc.png'
class LogoCentral extends Component {

  render() { 
    return ( 
      <div >
        <h1>Bienvenido a SOFTMARK-UDC</h1>
        <p style={{fontSize: 'x-large'}}>Puedes navegar sobre las diferentes opciones que aparecen en el menú izquierdo</p>
        <img src={softmark}/>
        <img style={{height: '11vh'}} src={logoudc}/>
      </div>
     ); 
  }
}
 
export default LogoCentral;