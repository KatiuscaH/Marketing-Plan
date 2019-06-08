import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import './sideBar.css';
import logoudc2 from '../../../src/logoudc2.png';
import NavBar from '../NavBar/navBar';
import MenuEstudiante from '../MenuEstudiante/Menu';
import ContenidoEstudiante from '../routes/ContenidoEstudiante';
import { Route, Link } from "react-router-dom";
import LogoCentral from '../contenido/logocentral';

const { Header, Sider, Content, Footer } = Layout;

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
          width='270px'
        ><div className="scroll">
          <div >
            <Link to="/logo"><img className="logoo" src={logoudc2} /></Link>
          </div>
          
            <Menu theme="dark" mode="inline" >
              <MenuEstudiante />
            </Menu>
          </div>
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
            <Route component={ContenidoEstudiante}></Route>
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

export default SiderDemo;