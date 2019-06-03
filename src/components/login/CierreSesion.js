import React, { Component } from 'react';
import { Button } from 'antd';
import './CierreSesion.css';
import logo from './softmark.png'
import logoudc from '../../logoudc2.png'
import { Link } from "react-router-dom";

class CierreSesion extends Component {
  constructor(props) {
    super(props);
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    this.props.history.push('/login');
  }

  render() { 
    return (
      <div className="box flex">
        <img src={logo}/>
        <h1>Gracias por hacer uso de SOFTMARKUDC</h1>
        <h2>Has cerrado sesión correctamente, para volver presiona el botón de inicio</h2>
        <Button type="primary" value="large" icon="home" onClick={this.routeChange}>Inicio</Button>
      </div>
      );
  }
}
 
export default CierreSesion;