import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// HTTP
import axios from "axios";
import AuthUser from '../components/AuthUser';

import { getPersona, EditPersona } from "../api/request";

import { useAppContext } from "../lib/contextLib";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { AiFillCloseCircle } from "react-icons/ai";

// Logo
import realEstateLogo from '../assets/img/realEstate-logo.png';

export const EditUser = () => {

  const { http, setToken, user, token, logout } = AuthUser();
  const [loading, setLoading] = useState(true);
  const [loadLogin, setLoadLogin] = useState(false);

  const [Usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [dni, setDni] = useState('');
  const [tlf, setTlf] = useState('');
  const [direccion, setDireccion] = useState('');
  const [correo, setCorreo] = useState('');
  const [genero, setGenero] = useState('NA');

  const [persona, setPersona] = useState([]);

  const [show, setShow] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const loader = () => {
    setLoadLogin(true);
  }

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
      navigate('/login');
    }
  }

  const handleSelectGender = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    switch (e.target.value) {
      case 'Masculino':
        setGenero('Masculino')
        break;
      case 'Femenino':
        setGenero('Femenino')
        break;
      case 'NA':
        setGenero('NA')
        break;
      default:
        setGenero('NA')
        break;
    }
  }

  // Manejador del submit del form
  const handleSubmit = async (e) => {
    loader()
    e.preventDefault();

    if (genero === 'NA') {
      alert('DEBE ESCOGER UN GENERO')
    }
    else {
      const res = await EditPersona(user.id, nombre, dni, direccion, tlf, genero)
      if (res.status === 200) {
        alert(res.message)
        console.log(res)
        navigate('/dashboard')
      }
    }
    setLoadLogin(false);
  }

  useEffect(() => {
    onLoad()
    loadPerfil()
  }, []);

  const onLoad = async () => {
    // Loader en false
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }

  const loadPerfil = async () => {
    const res = await getPersona(user.id)
    setPersona(res[0])
  }

  return (
    <>
      {
        (loading) ?
          <>
            <Container fluid className='bg-app home'>
              <div className="text-center">
                <div className="m-auto spinner">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            </Container>
          </> :
          <>
            <div className={loadLogin ? 'login-load d-flex' : 'd-none'}>
              <div className="m-auto spinner">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-100" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>

            <div className='bg-app pb-5'>

              <Header></Header>

              <Alert show={show} variant="danger" className='mt-3 alert-login'>
                <Alert.Heading>
                  <Row>
                    <Col>
                      Oops, ¡Algo ha ocurrido!
                    </Col>
                    <Col className='text-end me-auto' xs={3}>
                      <AiFillCloseCircle className='fs-3 text-danger close-alert' onClick={() => setShow(false)} />
                    </Col>
                  </Row>
                </Alert.Heading>
                <hr />
                <p>
                  Verifica los datos ingresados e intente de nuevo por favor.
                </p>
              </Alert>

              <div className='w-50 m-auto'>
                <div className='bg-light pb-2 rounded'>
                  <h2 className='text-center fw-semibold fs-3 mb-3'>
                    <img width={80} src={realEstateLogo} alt="Logo Belmeny Group" className='text-center mt-3 drop-shadow' />
                  </h2>
                  <h5 className='text-center fw-semibold mb-4'>Ingrese los datos a Modificar</h5>
                  <form action="" className='mb-4 w-75 m-auto' onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-3">
                          <label htmlFor="username">Usuario</label>
                          <input type="text"
                            name="username"
                            id="username"
                            className="form-control"
                            value={Usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            placeholder={user.username}
                            disabled />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="fullname">Nombre y Apellido</label>
                        <input type="text"
                          name="fullname"
                          id="fullname"
                          className="form-control"
                          value={nombre}
                          onChange={(e) => { setNombre(e.target.value) }}
                          placeholder={persona.fullname} 
                          required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="dni">Cédula de Identidad</label>
                        <input type="text"
                          name="dni"
                          id="dni"
                          className="form-control"
                          value={dni}
                          onChange={(e) => { setDni(e.target.value) }}
                          placeholder={persona.dni} 
                          required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="direccion">Dirección</label>
                        <input type="text"
                          name="direccion"
                          id="direccion"
                          className="form-control"
                          value={direccion}
                          onChange={(e) => { setDireccion(e.target.value) }}
                          placeholder={persona.address} 
                          required/>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="tlf">Número de Télefono</label>
                          <input type="text"
                            name="tlf"
                            id="tlf"
                            className="form-control"
                            value={tlf}
                            onChange={(e) => { setTlf(e.target.value) }}
                            placeholder={persona.phone} 
                            required/>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="genero">Género</label>
                          <select name="genero" className='form-select' onChange={handleSelectGender} required>
                            <option value="NA">-----------</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="correo">Correo</label>
                        <input type="email"
                          name="correo"
                          id="correo"
                          className="form-control"
                          value={correo}
                          onChange={(e) => { setCorreo(e.target.value) }}
                          placeholder={user.email}
                          disabled />
                      </div>
                    </div>
                    <button className='btn rounded-pill bg-belmeny btn-hover text-light w-100 mt-3' type='submit'>Registrarse <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                  </form>
                </div>
              </div>
            </div>

            {/* { <Footer></Footer> } */}
          </>
      }
    </>
  )
}
