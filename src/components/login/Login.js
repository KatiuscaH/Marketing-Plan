import React, { Component } from 'react';
import { Form, Icon, Input, Button, message, Layout, Card } from 'antd';
import './Login.css';
import logoudc from '../../../src/logoudc.png';
import logoudc2 from '../../../src/logoudc2.png';
import marketing from '../../../src/marketing.svg';
import planDeMarketing from '../../../src/planDeMarketing.svg';
import objetivo from '../../../src/objetivo.svg';
import docente from '../../../src/docente.svg';
import estudiante from '../../../src/estudiante.svg';
import empresario from '../../../src/empresario.svg';
import softmarkudc from './softmark.png'
import AuthService from '../AuthService';

const FormItem = Form.Item;
const {
  Footer,
  Header
} = Layout;
const { Meta } = Card;
class Login extends Component {

  state = {
    iconLoading: false
  }

  constructor() {
    super();
    this.Auth = new AuthService();
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({iconLoading: true})
        this.Auth.login(values.email, values.password)
          .then(res => {
            this.setState({iconLoading: false})
            //this.props.history.replace('/');
            if (this.Auth.loggedIn()) {
              this.props.history.replace('/logo');
            }
          })
          .catch(err => {
            this.setState({iconLoading: false})
            message.error('Usuario y/o Contraseña inválidas');
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div >
   
        <section className="intro">
          <div className="inner">
     
            <div className="content">
              <h1 className="H1">¡BIENVENIDO A<span className="spaan"> SOFTMARK-UDC!</span></h1>
              <p className="subtitle">Software para la gestión de planes de Marketing</p>
              
              <Form onSubmit={(e) => {this.handleSubmit(e)}} className="login-form">
                <div className="logo">
          <img className="imgLogo" alt="logop" src={logoudc2} />
                </div>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ type: 'email', required: true, message: 'Por favor ingrese el correo' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Usuario" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Por favor ingrese la contraseña' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Contraseña" />
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button" icon="login" loading={this.state.iconLoading}>
                    Ingresar
                 </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </section>
        <section className="definicion">
          <h2 className="H2">¿QUÉ ES SoftMark-UDC?</h2>
          <p className="P">Es una plataforma desarrollada como proyecto de grado para crear de manera interactiva los planes de marketing en la asignatura Gerencia de Mercados de Administracion de empresas.</p>
          <div className="card">
            <div style={{ width: '400px' }} >
              <img className="imgDef" src={marketing} />
              <h3 className="H3">Marketing</h3>
              <p className="P">El Marketing, traducido al español como Mercadotecnia, “es una actividad, un conjunto de instituciones y procesos de creación, comunicación, entrega e intercambio de ofertas que tienen valor para consumidores, clientes, socios y sociedad en general” (American Marketing Association).</p>
            </div>
            <div style={{ width: '400px' }} >
              <img className="imgDef" src={planDeMarketing} />
              <h3 className="H3">Plan de Marketing</h3>
              <p className="P">
                El plan de marketing, definido como un documento escrito que contiene el análisis de la situación de la empresa, los objetivos, la implementación de estrategias para cumplir los objetivos y los resultados esperados. Este instrumento, es primordial para el éxito de los productos o servicios ofrecidos, puesto que con él se determina el mercado al que se pretende ingresar o mantenerse.</p>
            </div>
            <div style={{ width: '400px' }} >
            <img className="imgDef" src={objetivo} />
            <h3 className="H3">Objetivo</h3>
                <p className="P">Este tiene como propósito, identificar y satisfacer las necesidades humanas y sociales, es decir, diseñar de manera excelente el producto o servicio a ofrecer para que el cliente se sienta identificado con este y acceda a comprarlo sin sentir presión alguna.</p>
            </div>
          </div>
        </section>
        <section className="roles">
        <h2 className="H2">ROLES EN SoftMark-UDC</h2>
          <div className="card">
            <div style={{ width: '400px' }} >
              <img className="imgDef" src={docente} />
              <h3 className="H3">Administrador</h3>
              <p className="P">El administrador de este sitio es el responsable de llevar un control de las personas que harán uso de la plataforma. Debe asegurarse que la información sea la correcta y esté actualizada. En este caso, el Administrador será el docente encargado de la asignatura.</p>
            </div>
            <div style={{ width: '400px' }} >
              <img className="imgDef" src={estudiante} />
              <h3 className="H3">Estudiantes</h3>
              <p className="P">
              El estudiante es el responsable de crear los planes de marketing según lo especificado en la clase por el docente y llevar actualizado los requerimientos que este le pida.</p>
            </div>
            <div style={{ width: '400px' }} >
            <img className="imgDef" src={empresario} />
            <h3 className="H3">Empresario</h3>
                <p className="P">El empresario podrá ver el avance del plan de marketing realizado por el estudiante y supervisado por el docente, además de las estrategias creadas para este y actualizar el estado de cumplimiento de los objetivos creados para su empresa.</p>
            </div>
          </div>
        </section>

        <Footer className="footer">
          <h4>Equipo desarrollador</h4>
          <ul className="lista">
            <li>
              <span style={{ color: "#CB4900" }}>Katiusca Herrera:</span> Investigadora y Desarrolladora.
            </li>
            <li>
              <span style={{ color: "#CB4900" }}>Plinio Puello:</span> Investigador y Director del Proyecto
            </li>
            <li>
              <span style={{ color: "#CB4900" }}>Paola Mouthon:</span> Investigadora y Experta en Marketing.
            </li>
          </ul>
          <h5 style={{textAlign:'center'}}>Universidad de Cartagena ©2019 Todos los derechos reservados</h5>
          
      </Footer>

      </div>

    );
  }
}

export default Form.create()(Login);
