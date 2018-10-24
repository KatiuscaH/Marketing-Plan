import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import './sideBar.css';
import NavBar from '../NavBar/navBar';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import MenuDocente from '../contenidoDocente/MenuDocente';
import ContenidoDocente from '../contenidoDocente/ContenidoDocente';
import GestionEstudiantes from '../contenidoDocente/GestionEstudiantes';
import GestionEmpresarios from '../contenidoDocente/GestionEmpresarios';
import ProgresoEstudiante from '../contenidoDocente/ProgresoEstudiante';
import ProgresoEmpresario from '../contenidoDocente/ProgresoEmpresario';
import Retroalimentacion from '../contenidoDocente/Retroalimentacion';

const { Header, Sider, Content } = Layout;

class SiderDocente extends Component {
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
          width='250px'
        /* trigger={null}
         collapsible
         collapsed={this.state.collapsed}
         width = '250px'*/
        >
          <div className="logo"></div>

          <Menu theme="dark" mode="inline" >

            <MenuDocente />
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

            <Switch>
              
              <Route component={ContenidoDocente} />
            </Switch>

          </Content>

        </Layout>

      </Layout>
    );
  }
}

export default SiderDocente;