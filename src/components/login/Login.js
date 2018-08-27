import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './Login.css';
import logoudc from '../logoudc';

const FormItem = Form.Item;

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">

        <div className="logo">
          <img alt="logo" src={logoudc} />
        </div>

        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Por favor ingrese el usuario' }],
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
