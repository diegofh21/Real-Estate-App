import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// HTTP
import axios from "axios";
import AuthUser from '../components/AuthUser';

import { getUsuario, registrarPersona } from "../api/request";

import { useAppContext } from "../lib/contextLib";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { AiFillCloseCircle } from "react-icons/ai";

// Logo
import realEstateLogo from '../assets/img/realEstate-logo.png';

export const Formulario = () => {

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
  const [userType, setUserType] = useState('NA')

  // const [user, setUser] = useState([]);

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

  const handleSelect = (e) => {
    e.preventDefault();
    switch (e.target.value) {
      case 'Masculino':
        setGenero('Masculino')
        break;
      case 'Femenino':
        setGenero('Femenino')
        break;
      case 'Agente':
        setUserType('Agente')
        break;
      case 'Cliente':
        setUserType('Cliente')
        break;
      case 'NA':
        setGenero('NA')
        setUserType('NA')
        break;
      default:
        setGenero('NA')
        setUserType('NA')
        break;
    }
  }

  // Manejador del submit del form
  const handleSubmit = async (e) => {
    loader()
    e.preventDefault();

    if (genero && userType === 'NA') {
      alert('DEBE ESCOGER SU GENERO Y TIPO DE USUARIO')
    }
    else {
      if (userType === 'Agente') {
        http.post('/register', { username: Usuario, password: password, email: correo }).then((res) => {
          // Registra al usuario

          http.get(`/getUser?username=${Usuario}`).then((res) => {
            // Obtiene al usuario y su id
            
            http.post(`/registrarPersona?fullname=${nombre}&dni=${dni}&genero=${genero}&phone=${tlf}&address=${direccion}&id_user=${res.data[0].id}&tipo=${userType}`).then((res) => {
              // Registra a la persona en la tabla correspondiente y lo redirije al login
              navigate('/login')
            }).catch((error) => {
              console.log(error)
              setLoadLogin(false);
              setShow(true)
            })
          }).catch((error) => {
            console.log(error)
            setLoadLogin(false);
            setShow(true)
          })
        }).catch((error) => {
          console.log(error)
          setLoadLogin(false);
          setShow(true)
        })
      }
      else if (userType === 'Cliente') {
        http.post('/register', { username: Usuario, password: password, email: correo }).then((res) => {
          http.get(`/getUser?username=${Usuario}`).then((res) => {
            console.log("respuesta=", res.data[0].id)
            http.post(`/registrarPersona?fullname=${nombre}&dni=${dni}&genero=${genero}&phone=${tlf}&address=${direccion}&id_user=${res.data[0].id}&tipo=${userType}`).then((res) => {
              console.log(res)
            }).catch((error) => {
              console.log(error)
              setLoadLogin(false);
              setShow(true)
            })
          }).catch((error) => {
            console.log(error)
            setLoadLogin(false);
            setShow(true)
          })
        }).catch((error) => {
          console.log(error)
          setLoadLogin(false);
          setShow(true)
        })
      }

    }
  }

  useEffect(() => {
    onLoad()
  }, []);

  const onLoad = async () => {
    // Loader en false
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
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
                  <h4 className='text-center fw-semibold mb-4'>Ingrese los datos del Inmueble</h4>
                  <form action="" className='mb-4 w-75 m-auto' onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col">
                        <div className="form-group mb-3">
                          <label htmlFor="Titulo">Titulo</label>
                          <input type="text"
                            name="Titulo"
                            id="Titulo"
                            className="form-control"
                            />
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="estado">Tipo de Inversión </label>
                          <select name="estado" className='form-select' onChange={handleSelect}>
                            <option value="NA">-----</option>
                            <option value="Venta">Venta</option>
                            <option value="Alquiler">Alquiler</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="precio">Precio $</label>
                          <input type="number"
                            name="precio"
                            id="precio" min="1"
                            className="form-control"/>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="tipo">Tipo de Inmueble</label>
                        <select name="tipo" className='form-select'>
                            <option value="NA">-----</option>
                            <option value="Casa">Casa</option>
                            <option value="Apartamento">Apartamento</option>
                            <option value="Habitacion">Habitacion</option>
                            <option value="Terrenos">Terrenos y Parcelas</option>
                            <option value="Locales">Locales Comerciales</option>
                            <option value="Otro">Otro</option>
                         </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="ubicacion">Ubicación</label>
                        <input type="text"
                          name="ubicacion"
                          id="ubicacion"
                          className="form-control"/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="descripcion">Descripción</label>
                        <input type="text"
                          name="descripcion"
                          id="descripcion"
                          className="form-control"/>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="bathroom">Cant. Baños</label>
                          <input type="number"
                            name="bathroom"
                            id="bathroom" min="1"
                            className="form-control"/>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="habitaciones">Cant. Habitaciones</label>
                          <input type="number"
                            name="habitaciones"
                            id="habitaciones" min="1"
                            className="form-control"/>
                        </div>
                      </div>
                      <div className="col">
                        <div className="mb-3">
                          <label htmlFor="estacionamientos">Cant. Estacionamientos</label>
                          <input type="number"
                            name="estacionamientos"
                            id="estacionamientos" min="1"
                            className="form-control"/>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="photo">Foto del Inmueble</label>
                        <input type="file"
                          name="photo"
                          id="photo"
                          className="form-control"/>
                      </div>
                    </div>
                    <button className='btn rounded-pill bg-belmeny btn-hover text-light w-100 mt-3' type='submit'>Publicar <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                  </form>
                </div>
              </div>
            </div>

            {/* <Footer></Footer> */}
          </>
      }
    </>
  )
}
