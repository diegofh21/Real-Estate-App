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

export const AboutUs = () => {

  const [loading, setLoading] = useState(true);
  const [loadLogin, setLoadLogin] = useState(false);

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

              <div className='w-50 m-auto'>
                <div className='bg-light pb-2 rounded'>
                  <h2 className='text-center fw-semibold fs-3 mb-3'>
                    <img width={80} src={realEstateLogo} alt="Logo Belmeny Group" className='text-center mt-3 drop-shadow' />
                  </h2>
                  <h3 className='text-center fw-semibold mb-4'>??Qui??nes somos?</h3>
                  <h5 className='text-center fw-semibold mb-4'>L??deres del mercado de bienes ra??ces y servicios inmobiliarios</h5>

                  <div className='fw-semibold w-75 m-auto'>
                    <p className='text-center'>
                      Somos una marca de bienes ra??ces, reconocida a nivel nacional. Poseemos m??s de 10 a??os de experiencia en el mercado inmobiliario Venezolano, lo que nos ha convertido en una de las empresas m??s destacadas dentro del territorio nacional. Nuestra formaci??n ha sido calificada como la mejor, lo que nos permite  otorgar una atenci??n ??ptima a nuestros clientes y afiliados. Marcamos una huella en los servicios inmobiliarios.
                    </p>
                    <br></br>
                    <div className="row">
                      <div className="col">
                        <h3 className='text-center fw-semibold mb-4'>Misi??n</h3>
                      </div>
                      <div className="col">
                        <h3 className='text-center fw-semibold mb-4'>Visi??n</h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <p className='fw-semibold mb-3' align="justify">
                          Posicionar a Real Estate App entre las 10 primeras empresas de referencia en el Mercado inmobiliario. Tomando como base el desarrollo personal, tecnol??gico, comunicacional de cada uno de nuestros integrantes, en un espectro de armon??a, honestidad, trabajo en equipo, responsabilidad y principalmente en un excelente servicio a nuestro clientes.
                        </p>
                      </div>
                      <div className="col">
                        <p className='fw-semibold mb-3' align="justify">
                          Asesorar y mediar dentro de la relaci??n inmobiliaria a todos nuestros clientes, logrando la satisfacci??n de cada uno de ellos, apoy??ndonos en nuestro profesionalismo, seguridad y honestidad que nos caracteriza.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 
            
            <Footer></Footer>


          </>
      }
    </>
  )
}
