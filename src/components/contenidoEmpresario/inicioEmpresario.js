import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';
import { Button, Row, Col } from 'antd';
import AuthService from '../AuthService';
import withAuth from '../withAuth';
import '../login/Login.css';
import './inicioEmpresario.css'
import logoudc from '../../../src/logoudc.png';

const Auth = new AuthService();

class InicioEmpresario extends Component {

    handleLogout() {
        Auth.logout()
        this.props.history.replace('/login');
    }
    render() {
        return (
            <div>
                <div style={{display: "flex", flexDirection: "column", position: "absolute", top: "35%", left: "50%", margin: "-160px 0 0 -160px", padding: "55px"}}>
                    <img alt="logo" src={logoudc} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", position: "absolute", top: "50%", left: "50%", margin: "-160px 0 0 -160px", padding: "55px" }}>
                    <Row align="middle" type="flex" justify="center">
                        <div style={{ padding: "10px" }} >
                            <Button size="large" type="primary" style={{ width: '200px' }}>Ver plan de Marketing</Button>
                        </div>
                    </Row>
                    <Row align="middle" type="flex" justify="center">
                        <div style={{ padding: "10px" }}>
                            <Button block size="large" type="primary" style={{ width: '200px' }}>Ver estrategias</Button>
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
    }
}

export default withAuth(InicioEmpresario);
