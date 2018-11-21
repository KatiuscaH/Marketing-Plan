import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon} from 'antd';
import AuthService from '../AuthService';
import withAuth from '../withAuth';
import { withRouter } from 'react-router';
import './navBar.css';

const Auth = new AuthService();


class NavBarEmpresario extends Component {

  constructor(props) {
    super(props);
    
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
        <Dropdown overlay={menu} trigger={['click']}>
          <Button style={{ marginLeft: 8 }}>
            Ajustes <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
  }


}

export default withRouter(withAuth(NavBarEmpresario));


