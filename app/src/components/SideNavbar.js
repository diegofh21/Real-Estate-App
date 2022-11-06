import React from 'react';
import { Link } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaTachometerAlt, FaList, FaHeart, FaFileInvoiceDollar, FaFileInvoice, FaUserAlt } from 'react-icons/fa';
import { BiLogOut } from "react-icons/bi";
import AuthUser from '../components/AuthUser';
import { useNavigate } from 'react-router-dom';

import belmenyLogo from '../assets/img/logo-png.png';
// import '../assets/scss/App.scss';

export const SideNavbar = ({ collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  // const logoutUser = () => {
  //   sessionStorage.clear();
  //   navigate('/login');
  // }
  const { token, logout } = AuthUser();
  const logoutUser = () => {
    if (token != undefined) {
      logout();
      navigate('/login');
    }
  }
  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      breakPoint="xs"
      onToggle={handleToggleSidebar}>
      <SidebarHeader style={{ textAlign: 'center' }}>
        <div
          style={{
            padding: '24px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            fontSize: 14,
            letterSpacing: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
          <Link to="/"><img width={80} src={belmenyLogo} alt="Belmeny Logo" className='text-center drop-shadow' /></Link>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}>
            <Link to="/dashboard">Inicio</Link>
          </MenuItem>
        </Menu>
        <Menu iconShape="circle">
          <SubMenu title='Módulos' icon={<FaList />}>
            <MenuItem
              icon={<FaUserAlt className='fs-5'/>}>
              <Link to="/consulta-clientes">
                Clientes
              </Link>
            </MenuItem>
            <MenuItem
              icon={<FaFileInvoiceDollar className='fs-5'/>}>
              <Link to="/consulta-facturas">
                Facturas
              </Link>
            </MenuItem>
            <MenuItem
              icon={<FaFileInvoice className='fs-5'/>}>
              <Link to="/consulta-pedidos">
                Pedidos
              </Link>
            </MenuItem>


            {/* <SubMenu title='Facturas'>
              <MenuItem>Consultar</MenuItem> */}
            {/* <MenuItem>Solicitar</MenuItem>
              <MenuItem>Otro</MenuItem> */}
            {/* </SubMenu>
            <SubMenu title='Pedidos'>
              <MenuItem><Link to="/consulta-pedidos">Consultar</Link></MenuItem> */}
            {/* <MenuItem>Solicitar</MenuItem>
              <MenuItem>Otro</MenuItem> */}
            {/* </SubMenu>
            <SubMenu title='Clientes'>
              <MenuItem>Consultar</MenuItem> */}
            {/* <MenuItem>Solicitar</MenuItem>
              <MenuItem>Otro</MenuItem> */}
            {/* </SubMenu> */}
          </SubMenu>
        </Menu>
        <Menu iconShape="circle">
          <MenuItem
            icon={<BiLogOut />}>
            <Link onClick={logoutUser} to="/">Cerrar sesión</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>

      <SidebarFooter style={{ textAlign: 'center' }}>
        <div
          className="sidebar-btn-wrapper"
          style={{
            padding: '20px 24px',
          }}
        >
          <small>Belmeny Group © {new Date().getFullYear()}</small>

        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};
