import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import { Link, Switch, Route } from 'react-router-dom';
import { Button,Row, Col } from 'antd';


class inicioEmpresario extends Component {
    render() {
        return (
            <div style={{display:"flex", flexDirection:"column"}}>
            <Row align="middle" type="flex" justify="center">
              <div  >
                  <Button size="large">Ver plan de Marketing</Button>
              </div>
            </Row>
            <Row align="middle" type="flex" justify="center">
              <div >
                  <Button block size="large">Ver estrategias</Button>
              </div>
            </Row>
            <Row align="middle" type="flex" justify="center">
              <div >
                  <Button block size="large">Cerrar Sesión</Button>
              </div>
            </Row>
            
          </div>
        );
    }
}

export default inicioEmpresario;
