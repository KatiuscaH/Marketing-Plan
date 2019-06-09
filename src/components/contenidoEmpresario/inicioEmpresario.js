import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import AuthService from '../AuthService';
import withAuth from '../withAuth';
import '../login/Login.css';
import './inicioEmpresario.css'
import logoudc from '../../../src/logoudc.png';
import VerPlanMarketing from './VerPlanMarketing';
import ActualizarEstrategias from './ActualizarEstrategias';
import ProgresoCumplido from './ProgresoCumplido';

const Auth = new AuthService();
class InicioEmpresario extends Component {

    state = {
        estadoPlanes: 1,
        name: '',
        lastName: '',
        color: '#f56a00'
    }
 
    componentDidMount() {
      const userNme = JSON.parse(localStorage.getItem("user")).nombre;
      const lastName = JSON.parse(localStorage.getItem("user")).apellido;
      this.setState({ name: userNme, lastName: lastName })
    }

    cambiaEstado=(estado)=>{
        this.setState({estadoPlanes: estado})
    }

    handleLogout() {
        Auth.logout()
        this.props.history.replace('/cierre-sesion');
    }
    render() {

        if (this.state.estadoPlanes === 1) {

            return (
                <div className="fondo">
                    <div className="welcome" style={{display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                    <h3 >Bienvenido {this.state.name} {this.state.lastName}</h3>
                        </div>
                    <div style={{ display: "flex", flexDirection: "column", position: "absolute", top: "35%", left: "50%", margin: "-160px 0 0 -160px", padding: "55px" }}>
                        <img className="logoo" alt="logo" src={logoudc} />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", position: "absolute", top: "50%", left: "50%", margin: "-160px 0 0 -160px", padding: "55px" }}>
                        <Row align="middle" type="flex" justify="center">
                            <div style={{ padding: "10px" }} >
                                <Button onClick={()=>this.cambiaEstado(2)} size="large" type="primary" style={{ width: '200px' }}>Ver plan de Marketing</Button>
                            </div>
                        </Row>
                        <Row align="middle" type="flex" justify="center">
                            <div style={{ padding: "10px" }}>
                                <Button onClick={()=>this.cambiaEstado(3)} block size="large" type="primary" style={{ width: '200px' }}>Ver estrategias</Button>
                            </div>
                        </Row>
                        <Row align="middle" type="flex" justify="center">
                            <div style={{ padding: "10px" }}>
                                <Button onClick={()=>this.cambiaEstado(4)} block size="large" type="primary" style={{ width: '200px' }}>Progreso</Button>
                            </div>
                        </Row>
                        <Row align="middle" type="flex" justify="center">
                            <div style={{ padding: "10px" }}>
                                <Button block size="large" type="danger" style={{ width: '200px' }} onClick={this.handleLogout.bind(this)}>Cerrar Sesión</Button>
                            </div>
                        </Row>

                    </div>
                </div>
            );

        } else if(this.state.estadoPlanes === 2){
            return(
                <VerPlanMarketing estadoCambiado={this.cambiaEstado}/>
            )
        } else if(this.state.estadoPlanes === 3){
            return(
                <ActualizarEstrategias estadoCambiado={this.cambiaEstado}/>
            )
        }else if(this.state.estadoPlanes === 4){
            return(

                <ProgresoCumplido estadoCambiado={this.cambiaEstado}/>
            )
        }
    }
}

export default withAuth(InicioEmpresario);
