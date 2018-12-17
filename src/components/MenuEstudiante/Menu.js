import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';



const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MenuEstudiante extends Component {
    // submenu keys of first level
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
    
        state = {
            openKeys: ['sub1', 'sub2', 'sub3', 'sub4'],
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
    
    
    render() {

        function handleClick(e) {
            console.log('click', e);
        }

        return (
            <Menu
                onClick={handleClick}
                mode="inline"//inline - vertical
                 openKeys={this.state.openKeys}
                 onOpenChange={this.onOpenChange}
                theme="dark"
               
            >
                <SubMenu key="sub1" title={<span><Icon type="file" /><span>Resumen Ejecutivo</span></span>}>
                    <Menu.Item key="17"><Link to="/datos-iniciales">Datos iniciales</Link></Menu.Item>
                    <Menu.Item key="1"><Link to="/presentacion">Presentación de la empresa</Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/historia">Historia</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Análisis del entorno</span></span>}>
                    
                        <Menu.Item key="3"><Link to="/analisis-pes">Análisis PEST</Link></Menu.Item>
                        <Menu.Item key="4"><Link to="/analisis-porter">Análisis Fuerzas de Porter</Link></Menu.Item>
                    
                    
                        <Menu.Item key="5"><Link to="/cuatro-p">Cuatro P</Link></Menu.Item>
                        <Menu.Item key="6"><Link to="/analisis-clientes">Identificación de clientes actuales</Link></Menu.Item>
                        <Menu.Item key="7"><Link to="/competencia">Análisis de la Competencia</Link></Menu.Item>
                        <Menu.Item key="8"><Link to="/proveedores">Proveedores</Link></Menu.Item>
                        <Menu.Item key="9"><Link to="/matriz-bcg">Matriz BCG</Link></Menu.Item>
                        <Menu.Item key="10"><Link to="/matriz-dofa">Matríz DOFA</Link></Menu.Item>
                    
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="setting" /><span>Objetivos </span></span>}>
                    
                        <Menu.Item key="11"><Link to="/matriz-mefi-mefe">Matríz MEFI y MEFE</Link></Menu.Item>
                        <Menu.Item key="12"><Link to="/matriz-ansoff">Matríz Ansoff</Link></Menu.Item>
                        <Menu.Item key="13"><Link to="/objetivos-plazos">Objetivos a largo plazo</Link></Menu.Item>
                        <Menu.Item key="14"><Link to="/plan-medios">Plan de medios</Link></Menu.Item>
                        <Menu.Item key="15"><Link to="/plan-accion">Plan de acción</Link></Menu.Item>
                    
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="paper-clip" /><span>Archivos ANEXOS</span></span>}>
                    <Menu.Item key="16"><Link to="/subir-anexos">Subir ANEXOS</Link></Menu.Item>
                </SubMenu>



            </Menu>
        );
    }
}
export default MenuEstudiante;