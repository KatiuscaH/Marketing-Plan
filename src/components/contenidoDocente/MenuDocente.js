import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MenuDocente extends Component {

    rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    render() {

        function handleClick(e) {
            console.log('click', e);
        }

        return (<Menu
            onClick={handleClick}
            mode="inline"//inline - vertical
            /* openKeys={this.state.openKeys}
             onOpenChange={this.onOpenChange}*/
            theme="dark"
        >
            <SubMenu key="sub1" title={<span><Icon type="user" theme="outlined" /><span>Gestionar Usuarios</span></span>}>
                <Menu.Item key="1"><Link to="/gestion-estudiantes">Estudiantes</Link></Menu.Item>
                <Menu.Item key="2"><Link to="/gestion-empresarios">Empresarios</Link></Menu.Item>
            </SubMenu>

            <SubMenu key="sub2" title={<span><Icon type="line-chart" theme="outlined" /> <span>Visualizar Progreso</span></span>}>
                <Menu.Item key="3"><Link to="/progreso-estudiantes">Progreso Estudiantes</Link></Menu.Item>
                <Menu.Item key="4"><Link to="/progreso-empresarios">Progreso Empresarios</Link></Menu.Item>

            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="message" theme="outlined" /><span>Retroalimentación </span></span>}>
                <Menu.Item key="5"><Link to="/retroalimentacion">Enviar Retroalimentación</Link></Menu.Item>
            </SubMenu>
        </Menu>
        )
    }

}

export default MenuDocente;

