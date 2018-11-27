import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, Avatar } from 'antd';
import AuthService from '../AuthService';
import withAuth from '../withAuth';
import { withRouter } from 'react-router';
import './navBar.css';
import axios from 'axios';
import { LISTAR_EMPRESARIO } from '../../config';

const Auth = new AuthService();


const userList = ['Luc'];
const colorList = ['#f56a00'];
const a = JSON.stringify(localStorage.getItem('nombre'));

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {

      userList: userList[0],
      color: colorList[0],
    };
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
      <div className="ajustes">

        <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large" >
          {this.state.userList}
        </Avatar>

        <Dropdown overlay={menu} trigger={['click']}>
          <Button style={{ marginLeft: 8 }}>
            Ajustes <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }


}

export default withRouter(withAuth(NavBar));


