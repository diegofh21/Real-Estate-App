import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import AuthUser from '../components/AuthUser';

import userIcon from '../assets/img/userIconGreenResized.jpg';

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import { getPersona } from '../api/request';

export const Dashboard = () => {

  // State del usuario
  const { user, getToken } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    onLoad();
    loadDatos()
  }, []);

  const onLoad = async () => {
    // Loader en false
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }

  // State del loading
  const [loading, setLoading] = useState(true);

  //States de datos
  const [persona, setPersona] = useState({});

  const loadDatos = async () => {
    const res = await getPersona(user.id);
    setPersona(res[0])
  }

  return (
    <>
      <Layout>
        <div className="container-fluid mt-5">
          {
            (loading) ?
              <>
                <div className="text-center">
                  <div className="m-auto spinner">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
              </> :
              <>

                {/* Div para movil */}
                <div className="text-center d-sm-none">
                  {/* <img width={80} src={belmenyLogo} alt="Logo Belmeny Group" className='text-center mt-3 drop-shadow' /> */}
                </div>

                {/* Div para web */}
                <div className='d-none d-md-block'>
                  <div className="container-fluid rounded">
                    <div className="row">
                      <div className="col">
                        <div className="">
                          <h2 className='fs-1'><strong>Bienvenido</strong></h2>
                          <h3>{persona.fullname}</h3>
                          <h5><i>V-{persona.dni}</i></h5>
                        </div>
                      </div>
                      <div className="col">
                        <img src={userIcon} alt="Icon" className='float-end me-5 drop-shadow' />
                      </div>
                    </div>

                    <div className="dashboard-title mt-2 mb-3">
                      <h4 className='bg-belmeny text-light px-5 rounded-pill'>Inicio</h4>
                    </div>
                    <div className="row">

                      <div className="col">
                        <div className="bg-belmeny w-75 rounded m-auto text-light text-center py-3">
                          <h5 className="">Inmuebles publicados</h5>
                          <h6>5</h6>
                        </div>
                      </div>
                      <div className="col">
                        <div className="bg-belmeny w-75 rounded m-auto text-light text-center py-3">
                          <h5 className="">Clientes interesados en inmuebles publicados</h5>
                          <h6>5</h6>
                        </div>
                      </div>


                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <div className='mt-5 belmeny-text division' />
                        <div className="text-end">
                          <a href="https://www.facebook.com/diegofh21/" target={'_blank'} className='fb-btn belmeny-text me-3'>
                            <span className='fs-1'><FaFacebook /></span>
                          </a>
                          <a href="https://twitter.com/vert_productos?lang=es" target={'_blank'} className='tw-btn belmeny-text me-3'>
                            <span className='fs-1'><FaTwitter /></span>
                          </a>
                          <a href="https://www.instagram.com/vert.productos/?hl=es" target={'_blank'} className='ig-btn belmeny-text me-3'>
                            <span className='fs-1'><FaInstagram /></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          }
        </div>
      </Layout>
    </>

  );
}
