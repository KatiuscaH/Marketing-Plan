import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import './sideBar.css';
import NavBar from '../NavBar/navBar';
import MenuEstudiante from '../MenuEstudiante/Menu';
import Contenido from '../contenido/ContenidoEstudiante';
import { Route } from "react-router-dom";


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
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => { console.log(broken); }}
          onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
          width='270px'
        /* trigger={null}
         collapsible
         collapsed={this.state.collapsed}
         width = '250px'*/
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
              /* PARA PONER EL TRIGGER SIN EL RESPONSIVE
              className="trigger"
               type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
               onClick={this.toggle}
               style={{ color: '#fff' }}*/
              />

            </div>

          </Header>

          <Content
            className="content" style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>

            <Route component={Contenido}></Route>

          </Content>

        </Layout>

      </Layout>
    );
  }
}

export default SiderDemo;