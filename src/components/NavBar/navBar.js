
import React, { Component } from 'react';
import { Menu, Dropdown, Button, Icon, message } from 'antd';
import './navBar.css';


class NavBar extends Component {

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
      
        <Dropdown overlay={menu}>
          <Button style={{ marginLeft: 8 }}>
            Ajustes <Icon type="down" />
          </Button>
        </Dropdown>
      </div>
    );
}

    
}

export default NavBar;


