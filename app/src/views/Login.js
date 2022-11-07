import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";

import { Header } from '../components/Header';

// HTTP
import axios from "axios";
import AuthUser from '../components/AuthUser';
import { login } from "../api/request";

import { useAppContext } from "../lib/contextLib";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { AiFillCloseCircle } from "react-icons/ai";

// Logo
import realEstateLogo from '../assets/img/realEstate-logo.png';

export const Login = () => {

  const { http, setToken } = AuthUser();
  const [loading, setLoading] = useState(true);
  const [loadLogin, setLoadLogin] = useState(false);
  const [Usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState([]);

  const [show, setShow] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  const loader = () => {
    setLoadLogin(true);
  }

  // Manejador del submit del form
  const handleSubmit = (e) => {
    loader()
    e.preventDefault();
    http.post('/login', { username: Usuario, password: password }).then((res) => {
      res.data.user.username = Usuario
      setToken(res.data.user, res.data.access_token);
    }).catch((error) => {
      console.log(error)
      setLoadLogin(false);
      setShow(true)
    })
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
                {/* <div className="lds-spinner mt-5"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> */}
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


            <Container fluid className='bg-app home'>

              <Header></Header>

              <Alert show={show} variant="danger" className='mt-3 alert-login'>
                <Alert.Heading>
                  <Row>
                    <Col>
                      Oops, ¡Credenciales incorrectas!
                    </Col>
                    <Col className='text-end me-auto' xs={3}>
                      <AiFillCloseCircle className='fs-3 text-danger close-alert' onClick={() => setShow(false)} />
                    </Col>
                  </Row>
                </Alert.Heading>
                <hr />
                <p>
                  Verifica los datos ingresados e intente iniciar sesión de nuevo por favor.
                </p>
              </Alert>

              <Container className='login-form bg-light h-50'>
                <div>
                  <h2 className='text-center fw-semibold  fs-3 mt-3 mb-4'>
                    <img width={80} src={realEstateLogo} alt="Logo Belmeny Group" className='text-center mt-3 drop-shadow' />
                  </h2>
                  <h5 className='text-center fw-semibold mb-4'>Iniciar sesión</h5>
                  <form action="" className='mb-4 w-75 m-auto' onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="Usuario">Usuario</label>
                      <input type="text"
                        name="Usuario"
                        id="Usuario"
                        className="form-control"
                        value={Usuario}
                        onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password">Contraseña</label>
                      <input type="password"
                        name="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <button className='btn btn-hover rounded-pill bg-belmeny text-light w-100 mt-3' type='submit'>Iniciar sesión <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                  </form>
                </div>
              </Container>
            </Container>
          </>
      }
    </>
  )
}
