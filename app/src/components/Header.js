import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import { AuthUser } from './AuthUser';

import realEstateLogo from '../assets/img/realEstate-logo.png';

import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

export const Header = () => {
  const navigate = useNavigate();
  const { getToken } = AuthUser();

  const { token, logout } = AuthUser();
  const logoutUser = () => {
    if (token != undefined) {
      logout();
      navigate('/login');
    }
  }

  var authButton, dashboardButton;

  // if (!getToken()) {
  //   dashboardButton = <Link to="/" className='text-decoration-none btn btn-hover text-light border-0'>Inicio</Link>
  //   authButton = <Link to="/login" className='text-decoration-none btn btn-hover text-light border-0'>Iniciar sesión</Link>
  // } else {
  //   dashboardButton = <Link to="/dashboard" className='text-decoration-none btn btn-hover text-light border-0'>Ir al panel de trabajo</Link>
  //   authButton = <Link onClick={logoutUser} to="/" className='text-decoration-none btn btn-hover text-light border-0'>Cerrar sesión</Link>
  // }

  return (
    <>
      <Navbar className='bg-transparent'>
        <Container fluid>
          <Nav>
            <Navbar.Brand>
              <Link to='/' className='text-decoration-none'>
                <div className="row">
                  <div className="col-sm-3">
                    <img src={realEstateLogo} alt="Real Estate Logo" className='text-center drop-shadow align-center mb-5' />
                  </div>
                  <div className="col-sm-5 mt-3 ms-3 fw-bold text-light"><span>Real Estate App</span></div>
                </div>
              </Link>
            </Navbar.Brand>
          </Nav>
          <Nav className="ms-auto mb-5">
            <Nav.Link>
              <Link className='text-light fw-bold text-decoration-none btn btn-hover' to='/'>Inicio</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className='text-light fw-bold text-decoration-none btn btn-hover'to='/info'>¿Quienes somos?</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className='text-light fw-bold text-decoration-none btn btn-hover' to='/ver-inmuebles'>Ver inmuebles publicados</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className='text-light fw-bold text-decoration-none btn btn-hover' to='/login'>Iniciar sesión</Link>
            </Nav.Link>
            <Nav.Link>
              <Link className='text-light fw-bold text-decoration-none btn btn-hover' to='/register'>Registrarse</Link>
            </Nav.Link>
            {/* <Nav.Link>
              <Link className='text-light fw-bold text-decoration-none btn btn-hover' to='/formulario'>Publicar Inmueble</Link>
            </Nav.Link> */}
            {/* <Nav.Link>
              <Link className='text-light fw-bold text-decoration-none btn btn-hover'to='/edituser'>Editar Datos</Link>
            </Nav.Link> */}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
