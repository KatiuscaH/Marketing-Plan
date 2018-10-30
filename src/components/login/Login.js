import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './Login.css';
import logoudc from '../../../src/logoudc.png';
import AuthService from '../AuthService';

const FormItem = Form.Item;

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
        //console.log('Received values of form: ', {values});
        this.Auth.login(values.email, values.password)//Pendiente aqui
          .then(res => {
            this.props.history.replace('/');
            //localStorage.setItem('rol', 1);
          })
          .catch(err => {
            console.log("Error aqui ", err)
            alert(err);
          })
      }
    });
  }

  componentWillMount() {
    if (this.Auth.loggedIn()) {
      this.props.history.replace('/');
    }
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">

        <div className="logo">
          <img alt="logo" src={logoudc} />
        </div>

        <FormItem>
          {getFieldDecorator('email', {
            rules: [{type: 'email', required: true, message: 'Por favor ingrese el correo' }],
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
    );
  }
}

export default Form.create()(Login);
