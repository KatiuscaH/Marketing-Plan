import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import './sideBar.css';
import logoudc2 from '../../../src/logoudc2.png';
import NavBar from '../NavBar/navBar';
import { Route, Switch, Link } from "react-router-dom";

import MenuDocente from '../contenidoDocente/MenuDocente';
import ContenidoDocente from '../routes/ContenidoDocente';
const { Header, Sider, Content, Footer } = Layout;

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
          width='250px'>

          <div className="logoo">
          <Link to="/logo"><img src={logoudc2} /></Link>
          </div>

          <Menu theme="dark" mode="inline" >
            <MenuDocente />
          </Menu>
        </Sider>

        <Layout>
          <Header className="header">
            <div>
              <NavBar />
              <Icon />
            </div>

          </Header>
          <Content
            className="content" style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            <Switch>
              <Route component={ContenidoDocente} />
            </Switch>
          </Content>
          <Footer>
            <p style={{textAlign:'center'}}>
            <span style={{textAlign:'center', color: '#000000'}}>- Katiusca Herrera : </span>Investigadora y Desarrolladora.   
            <span style={{textAlign:'center', color: '#000000'}}>- Plinio Puello :  </span>Investigador y Director del Proyecto.  
            <span style={{textAlign:'center', color: '#000000'}}>- Paola Mouthon :  </span>Investigadora y Experta en Marketing.
            </p>
          <h5 style={{textAlign:'center', color: '#000000'}}>Universidad de Cartagena ©2019 Todos los derechos reservados</h5>
      </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default SiderDocente;