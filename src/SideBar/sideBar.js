import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import './sideBar.css';
import NavBar from '../NavBar/navBar';

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
          <div className="logo">

          </div>

          <Menu theme="dark" mode="inline" >
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>

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
            <div >

            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;