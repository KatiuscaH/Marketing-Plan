import React, { Component } from "react";
import { Layout, Menu, Icon } from 'antd';
import './sideBar.css';
import logoudc2 from '../../../src/logoudc2.png';
import NavBar from '../NavBar/navBar';
import { Route, Switch } from "react-router-dom";

import MenuDocente from '../contenidoDocente/MenuDocente';
import ContenidoDocente from '../routes/ContenidoDocente';
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
          width='250px'>

          <div className="logoo">
            <img src={logoudc2} />
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

        </Layout>
      </Layout>
    );
  }
}

export default SiderDocente;