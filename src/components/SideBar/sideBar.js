import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import './sideBar.css';
import logoudc2 from '../../../src/logoudc2.png';
import NavBar from '../NavBar/navBar';
import MenuEstudiante from '../MenuEstudiante/Menu';
import ContenidoEstudiante from '../routes/ContenidoEstudiante';
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
        ><div className="scroll">
          <div className="logoo">
            <img src={logoudc2} />
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

        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;