import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, Avatar } from 'antd';
import AuthService from '../AuthService';
import withAuth from '../withAuth';
import { withRouter } from 'react-router';
import './navBar.css';

const Auth = new AuthService();

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      lastName: '',
      color: '#f56a00'
    };
  }

  componentDidMount() {
    const userNme = JSON.parse(localStorage.getItem("user")).nombre;
    const lastName = JSON.parse(localStorage.getItem("user")).apellido;
    this.setState({ name: userNme, lastName: lastName })
    console.log(localStorage.getItem("user"));

  }

  handleLogout() {
    Auth.logout()
    this.props.history.replace('/login');
  }

  render() {
    const menu = (
      <Menu onClick={this.handleLogout.bind(this)}>
        <Menu.Item key="1"><Icon type="poweroff" />Cerrar sesión</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <div className="nombreUsuario">
        <h3 className="h3Color">Bienvenido {this.state.name} {this.state.lastName}</h3>
        </div>
        <div className="ajustes">
        <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large">
          {this.state.name.charAt(0)}
        </Avatar>
          <Dropdown overlay={menu} trigger={['hover']}>
            <a style={{ marginLeft: 8 }} className=".ant-layout-header">
              Ajustes <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>

    );
  }


}

export default withRouter(withAuth(NavBar));

