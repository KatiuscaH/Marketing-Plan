import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MenuEstudiante extends Component {
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
    /*
        state = {
            openKeys: ['sub1'],
        };
    
        onOpenChange = (openKeys) => {
            const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
            if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
                this.setState({ openKeys });
            } else {
                this.setState({
                    openKeys: latestOpenKey ? [latestOpenKey] : [],
                });
            }
        }
    
    */
    render() {

        function handleClick(e) {
            console.log('click', e);
        }

        return (
            <Menu
                onClick={handleClick}
                mode="vertical"//inline - vertical
                /* openKeys={this.state.openKeys}
                 onOpenChange={this.onOpenChange}*/
                theme="dark"
            >
                <SubMenu key="sub1" title={<span><Icon type="file" /><span>Resumen Ejecutivo</span></span>}>
                    <Menu.Item key="1">Presentación de la empresa</Menu.Item>
                    <Menu.Item key="2">Historia</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Análisis del entorno</span></span>}>
                    <MenuItemGroup title="ANÁLISIS DEL ENTORNO EXTERNO">
                        <Menu.Item key="3">Análisis PES</Menu.Item>
                        <Menu.Item key="4">Análisis Fuerzas de Porter</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="ANÁLISIS DEL ENTORNO INTERNO">
                        <Menu.Item key="5">Cuatro P</Menu.Item>
                        <Menu.Item key="6">Matríz BCG</Menu.Item>
                        <Menu.Item key="7">Análisis de clientes</Menu.Item>
                        <Menu.Item key="8">Competencia</Menu.Item>
                        <Menu.Item key="9">Proveedores</Menu.Item>
                        <Menu.Item key="10">Matríz DOFA</Menu.Item>
                        <Menu.Item key="11">Matríz MEFI</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="setting" /><span>Objetivos estratégicos de marketing</span></span>}>
                    <Menu.Item key="12">Objetivos según plazos</Menu.Item>
                    <Menu.Item key="13">Plan de medios</Menu.Item>
                    <Menu.Item key="14">Plan de acción</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="paper-clip" /><span>Archivos ANEXOS</span></span>}>
                    <Menu.Item key="15">Subir ANEXOS</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}
export default MenuEstudiante;