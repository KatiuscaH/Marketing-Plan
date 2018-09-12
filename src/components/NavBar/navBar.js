
import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message, Avatar } from 'antd';
import './navBar.css';

const UserList = [ 'Lucy', 'Tom', 'Edward'];
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: UserList[0],
      color: colorList[0],
    };
  }


render(){
     function handleMenuClick(e) {
        message.info('Click on menu item.');
        console.log('click', e);
      }
      
      const menu = (
        <Menu onClick={handleMenuClick}>
          <Menu.Item key="1"><Icon type="poweroff" />Cerrar sesión</Menu.Item>
          
        </Menu>
      );

    return(
    <div className="ajustes">

      <Avatar style={{ backgroundColor: this.state.color, verticalAlign: 'middle' }} size="large" >
          {this.state.user}
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

/*
<a className="ant-dropdown-link" style={{ marginLeft: 8 }}>
      Ajustes <Icon type="down" />
    </a>

*/

export default NavBar;


