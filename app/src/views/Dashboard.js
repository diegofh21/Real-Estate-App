import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import AuthUser from '../components/AuthUser';
import { ConsultaInmueble } from './Inmuebles/ConsultaInmueble';
import { DetalleInmuebleFav } from './Inmuebles/DetalleInmuebleFav';

import userIcon from '../assets/img/userIconGreenResized.jpg';

import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

import { getPersona, getInmueblesPublicados, CuentaFavorito, FavoritoPropiedades, getInmueblesFavoritos } from '../api/request';


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
  const [conteoInmuebles, setConteoInmuebles] = useState('');
  const [conteoFavoritos, setConteoFavoritos] = useState('');
  const [propiedades, setPropiedades] = useState([]);
  const [inmueble, setInmueble] = useState([]);

  //Falso es agente, true es cliente
  const [agentOrClient, setAgentOrClient] = useState(false);

  const loadDatos = async () => {
    const res = await getPersona(user.id);
    if (res[0].id_cliente) {
      setAgentOrClient(true)
      setPersona(res[0])

      const count = await CuentaFavorito(res[0].id_cliente)
      const propiedadesFav = await FavoritoPropiedades(res[0].id_cliente)

      setConteoFavoritos(count[0].nro_inmuebles)

      var arrDetalleInmueblesFav = []
      var data = {}

      for (let i = 0; i < propiedadesFav.length; i++) {
        const detalleInmueblesFav = await getInmueblesFavoritos(propiedadesFav[i].id_propiedad)
        
        arrDetalleInmueblesFav.push(detalleInmueblesFav.inmueblesFav[i])
      }
      console.log(arrDetalleInmueblesFav)
      setPropiedades(arrDetalleInmueblesFav)
    }
    else {
      setPersona(res[0])
      const inmueblesPosteados = await getInmueblesPublicados(res[0].id_agente)

      if (inmueblesPosteados.countInmueble.length === 0) {
        setConteoInmuebles(0);
      }
      else {
        setConteoInmuebles(inmueblesPosteados.countInmueble[0].InmueblesPublicados);
      }
      setInmueble(inmueblesPosteados.inmuebles);
    }
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
                    {
                      (agentOrClient) ?
                        <>
                          {/* Cliente */}
                          <div className="row">
                            <div className="col">
                              <div className="bg-belmeny w-75 rounded m-auto text-light text-center py-3">
                                <h5 className="">Le has dado me interesa a **{conteoFavoritos}** inmueble(s)</h5>
                              </div>
                            </div>
                          </div>

                          <div className="row my-5 w-75 m-auto">
                            <div className="dashboard-title mt-2 mb-5">
                              <h4 className='bg-belmeny text-light px-5 rounded-pill'>Inmuebles favoritos</h4>
                            </div>
                            <div className="col">
                              <table className="table table-responsive table-success table-bordered text-center fs-6">
                                <thead>
                                  <th>#</th>
                                  <th>Titulo</th>
                                  <th>Inversion</th>
                                  <th>Tipo de Inmueble</th>
                                  <th>Precio</th>
                                  <th>Ubicacion</th>
                                </thead>
                                <tbody>
                                  {propiedades.map((item) => <DetalleInmuebleFav inmuebles={item} />)}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </> :
                        <>
                          {/* Agente */}
                          <div className="row">
                            <div className="col">
                              <div className="bg-belmeny w-75 rounded m-auto text-light text-center py-3">
                                <h5 className="">Inmuebles publicados</h5>
                                <h6>{conteoInmuebles}</h6>
                              </div>
                            </div>
                            <div className="col">
                              <div className="bg-belmeny w-75 rounded m-auto text-light text-center py-3">
                                <h5 className="">Clientes interesados en inmuebles publicados</h5>
                                <h6>5</h6>
                              </div>
                            </div>
                          </div>

                          <div className="row my-5 w-75 m-auto">
                            <div className="dashboard-title mt-2 mb-5">
                              <h4 className='bg-belmeny text-light px-5 rounded-pill'>Inmuebles publicados por el agente</h4>
                            </div>
                            <div className="col">
                              <table className="table table-responsive table-success table-bordered text-center">
                                <thead>
                                  <th>#</th>
                                  <th>Titulo</th>
                                  <th>Inversion</th>
                                  <th>Tipo de Inmueble</th>
                                  <th>Precio</th>
                                  <th>Ubicacion</th>
                                  <th>Acciones</th>
                                </thead>
                                <tbody>
                                  {inmueble.map((item) => <ConsultaInmueble inmuebles={item} persona={persona} />)}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                    }


                    <div className="row">
                      <div className="col-sm-12">
                        <div className='mt-5 belmeny-text division' />
                        <div className="text-end">
                          <a href="https://www.facebook.com/diegofh21/" target={'_blank'} className='fb-btn belmeny-text me-3'>
                            <span className='fs-1'><FaFacebook /></span>
                          </a>
                          <a href="https://twitter.com/ocandomassiel?lang=es" target={'_blank'} className='tw-btn belmeny-text me-3'>
                            <span className='fs-1'><FaTwitter /></span>
                          </a>
                          <a href="https://www.instagram.com/massielocando/?hl=es" target={'_blank'} className='ig-btn belmeny-text me-3'>
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
