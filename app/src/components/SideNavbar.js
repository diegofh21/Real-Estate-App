import React from 'react';
import { Link } from 'react-router-dom'
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaTachometerAlt, FaList, FaHeart, FaFileInvoiceDollar, FaFileInvoice, FaUserAlt, FaCity } from 'react-icons/fa';
import { BiLogOut } from "react-icons/bi";
import AuthUser from '../components/AuthUser';
import { useNavigate } from 'react-router-dom';

import realEstateLogo from '../assets/img/realEstate-logo.png';
// import '../assets/scss/App.scss';

export const SideNavbar = ({ collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const { token, logout, user } = AuthUser();
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
          <Link to="/"><img width={80} src={realEstateLogo} alt="Belmeny Logo" className='text-center drop-shadow' /></Link>
        </div>
      </SidebarHeader>

      <SidebarContent className='fw-bold'>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}>
            <Link to="/dashboard">Inicio</Link>
          </MenuItem>
          {
            (user.tipo === 'agente') ?
              <>
                <MenuItem
                  icon={<FaCity />}>
                  <Link to="/publicar-inmueble">Inmuebles</Link>
                </MenuItem>
              </> :
              <>
              </>
          }
          <MenuItem
            icon={<FaUserAlt className='' />}>
            <Link to="/perfil">
              Perfil de usuario
            </Link>
          </MenuItem>
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
          <small>Real Estate App © {new Date().getFullYear()}</small>

        </div>
      </SidebarFooter>
    </ProSidebar>
  );
};
