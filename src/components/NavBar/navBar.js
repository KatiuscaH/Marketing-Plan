import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, Avatar } from 'antd';
import AuthService from '../AuthService';
import withAuth from '../withAuth';
import { withRouter } from 'react-router';
import './navBar.css';

const Auth = new AuthService();

const colorList = ['#f56a00'];
let a ;
if (JSON.parse(localStorage.getItem("user"))) {
  a = JSON.parse(localStorage.getItem("user")).nombre;
};
console.log(a)


class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userList: a,
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

        <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle', cursor: "pointer" }} size="large"  >
          {this.state.userList}
        </Avatar>
        <Dropdown overlay={menu} trigger={['hover']}>
          <a style={{ marginLeft: 8 }} className=".ant-layout-header">
            Ajustes <Icon type="down" />
          </a>
        </Dropdown>

      </div>

    );
  }


}

export default withRouter(withAuth(NavBar));

