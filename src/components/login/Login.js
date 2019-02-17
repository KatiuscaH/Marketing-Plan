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
import photo from '../../../src/photo.jpg'
import AuthService from '../AuthService';

const FormItem = Form.Item;
const {
  Footer,
  Header
} = Layout;
const { Meta } = Card;
class Login extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
    //this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.Auth.login(values.email, values.password)
          .then(res => {
            //this.props.history.replace('/');

            if (this.Auth.loggedIn()) {
              this.props.history.replace('/');
            }
          })
          .catch(err => {
            console.log("Error aqui ", err)
            message.error('Usuario y/o Contraseña inválidas');
          })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
         <Header style={{ position: 'fixed', zIndex: 1, width: '100%', color: '#0000', }}>
      <span style={{color: 'white', fontSize:'2em', paddingTop:'2px'}}>Plan de Marketing</span>
    </Header>
        <section class="intro">
          <div class="inner">
            <div class="content">
              <h1>¡BIENVENIDO A<span style={{ color: "#CB4900" }}> PLANES DE MARKETING!</span></h1>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <div className="logo">
                  <img alt="logo" src={logoudc2} />
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
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Ingresar
                 </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </section>
        <section className="definicion">
          <h2>¿QUÉ ES PLAN DE MARKETING?</h2>
          <p>Es una plataforma desarrollada como proyecto de grado para crear de manera interactiva los planes de marketing en la asignatura Gerencia de Mercados de Administracion de empresas.</p>
          <div className="card">
            <div style={{ width: '400px' }} >
              <img className="imgDef" src={marketing} />
              <h3>Marketing</h3>
              <p>El Marketing, traducido al español como Mercadotecnia, “es una actividad, un conjunto de instituciones y procesos de creación, comunicación, entrega e intercambio de ofertas que tienen valor para consumidores, clientes, socios y sociedad en general” (American Marketing Association).</p>
            </div>
            <div style={{ width: '400px' }} >
              <img className="imgDef" src={planDeMarketing} />
              <h3>Plan de Marketing</h3>
              <p>
                El plan de marketing, definido como un documento escrito que contiene el análisis de la situación de la empresa, los objetivos, la implementación de estrategias para cumplir los objetivos y los resultados esperados. Este instrumento, es primordial para el éxito de los productos o servicios ofrecidos, puesto que con él se determina el mercado al que se pretende ingresar o mantenerse.</p>
            </div>
            <div style={{ width: '400px' }} >
            <img className="imgDef" src={objetivo} />
            <h3>Objetivo</h3>
                <p>Este tiene como propósito, identificar y satisfacer las necesidades humanas y sociales, es decir, diseñar de manera excelente el producto o servicio a ofrecer para que el cliente se sienta identificado con este y acceda a comprarlo sin sentir presión alguna.</p>
            </div>
          </div>
        </section>
        <section className="roles">
        <h2>ROLES EN PLAN DE MARKETING</h2>
          <div className="card">
            <div style={{ width: '400px' }} >
              <img className="imgDef" src={docente} />
              <h3>Administrador</h3>
              <p>El administrador de este sitio es el responsable de llevar un control de las personas que harán uso de la plataforma. Debe asegurarse que la información sea la correcta y esté actualizada. En este caso, el Administrador será el docente encargado de la asignatura.</p>
            </div>
            <div style={{ width: '400px' }} >
              <img className="imgDef" src={estudiante} />
              <h3>Estudiantes</h3>
              <p>
              El estudiante es el responsable de crear los planes de marketing según lo especificado en la clase por el docente y llevar actualizado los requerimientos que este le pida.</p>
            </div>
            <div style={{ width: '400px' }} >
            <img className="imgDef" src={empresario} />
            <h3>Empresario</h3>
                <p>El empresario podrá ver el avance del plan de marketing realizado por el estudiante y supervisado por el docente, además de las estrategias creadas para este y actualizar el estado de cumplimiento de los objetivos creados para su empresa.</p>
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
