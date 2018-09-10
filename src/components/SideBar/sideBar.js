import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import './sideBar.css';
import NavBar from '../NavBar/navBar';
import MenuEstudiante from '../MenuEstudiante/Menu';


const { Header, Sider, Content } = Layout;

class SiderDemo extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (

      <Layout>

        <Sider
          className="sider"
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
         >
          <div className="logo"></div>

          <Menu theme="dark" mode="inline" >
            <MenuEstudiante />
          </Menu>

        </Sider>

        <Layout>

          <Header className="header">

            <div>

              <NavBar />
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                style={{ color: '#fff' }}
              />

            </div>

          </Header>

          <Content
            className="content" style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            

          </Content>

        </Layout>
        
      </Layout>
    );
  }
}

export default SiderDemo;