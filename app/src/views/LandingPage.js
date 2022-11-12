import React, { useEffect, useState } from 'react'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import AuthUser from '../components/AuthUser';

import { Collapse, Modal, Button, Col, Row } from 'react-bootstrap';

import { BsArrowRight, BsArrowLeft, BsSearch, BsArrowRightCircleFill } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import { RiCloseCircleFill } from "react-icons/ri";

import Dropdown from 'react-bootstrap/Dropdown';
import { Nav } from 'react-bootstrap';

import { buscarInmueble, getPersona } from '../api/request';

export const LandingPage = () => {

  const {user, http} = AuthUser();

  const [loading, setLoading] = useState(true);

  // States para datos
  const [ubicacion, setUbicacion] = useState('');
  const [tipo, setTipo] = useState('NA');
  const [bathroom, setBathroom] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [estacionamientos, setEstacionamientos] = useState('');
  const [estado, setEstado] = useState('Venta');

  const [inmueblesEncontrados, setInmueblesEncontrados] = useState([])
  const [agente, setAgente] = useState([])

  // States del modal
  const [fullscreen, setFullscreen] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(true);

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

  const handleSelect = (e) => {
    e.preventDefault();
    setTipo(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tipo === 'NA') {
      alert('SELECCIONE UN TIPO DE INMUEBLE')
    }
    else {
      // BUSCA EL INMUEBLE SEGUN LAS CARACTERISTICAS SELECCIONADAS
      setShowModal(true)
      const res = await buscarInmueble(ubicacion, bathroom, habitaciones, estacionamientos, tipo, estado)
      const resAgente = await getPersona(res[0].id_agente)
      setAgente(resAgente[0])
      setInmueblesEncontrados(res[0])
      // console.log(location, bath, hab, estacionamiento, inmueble)
    }
  }

  const showSearch = (e, data) => {
    e.preventDefault();
    if (data === 'Rent') {
      setShow(false)
      setEstado('Alquilar')
    }
    else {
      setShow(true)
      setEstado('Venta')
    }
  }

  return (
    <>
      {
        (loading) ?
          <>
            <div className='container-fluid bg-belmeny home'>
              <div className="text-center">
                <div className="m-auto spinner">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </> :
          <>
            <div className="bg-app">
              <Header></Header>
              <main className=''>
                <div className='container-fluid'>
                  <div className="row">
                    <div className="col ms-5 mt-4">
                      <h1 className='text-light fw-bold title-belmeny mt-5'>Encuentra tu <br /> Hogar Soñado</h1>
                    </div>
                  </div>
                </div>

                <form action="" onSubmit={handleSubmit}>
                  <div className="container-fluid">
                    <div className="row mt-5">
                      <Nav variant="tabs" className="ms-5 ps-5 tabs" defaultActiveKey="comprar">
                        <Nav.Item>
                          <Nav.Link className='me-2 fw-bold text-decoration-none' eventKey="comprar" onClick={(e) => showSearch(e, 'Buy')}>Comprar</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link className='fw-bold text-decoration-none' eventKey="vender" onClick={(e) => showSearch(e, 'Rent')}>Alquilar</Nav.Link>
                        </Nav.Item>
                      </Nav>
                      {
                        (show) ?
                          <>
                            <div className="col-sm-8 ms-5 search-container">
                              <div className="row mt-4">
                                <div className="col">
                                  <div className="row">
                                    <div className="col-sm-1 fs-4 me-2">
                                      <GrMapLocation />
                                    </div>
                                    <div className="col">
                                      <input type="text"
                                        name="location"
                                        className='form-control'
                                        placeholder='Ubicación'
                                        value={ubicacion}
                                        onChange={(e) => setUbicacion(e.target.value)} required />
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <select name="inmueble" id="" className='form-select fw-bold' onChange={handleSelect} required>
                                    <option value="NA">Tipo de Inmueble</option>
                                    <option value="Casa">Casa</option>
                                    <option value="Apartamento">Apartamento</option>
                                    <option value="Townhouse">Townhouse</option>
                                  </select>
                                </div>
                                <div className="col">
                                  <Dropdown className='w-100'>
                                    <Dropdown.Toggle variant="light" className='dropdown-custom fw-bold'>
                                      Caracteristicas
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='text-decoration-none w-100'>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Baños</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="bath"
                                            className='form-control'
                                            value={bathroom}
                                            onChange={(e) => setBathroom(e.target.value)}required  />
                                        </div>
                                      </div>
                                      <div className="dropdown-divider my-3"></div>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Habitaciones</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="habitaciones"
                                            className='form-control'
                                            value={habitaciones}
                                            onChange={(e) => setHabitaciones(e.target.value)} required />
                                        </div>
                                      </div>
                                      <div className="dropdown-divider my-3"></div>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Estacionamiento</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="estacionamiento"
                                            className='form-control'
                                            value={estacionamientos}
                                            onChange={(e) => setEstacionamientos(e.target.value)} required />
                                        </div>
                                      </div>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                                <div className="col">
                                  <button className="btn btn-success w-100 fw-bold"><BsSearch className='mb-1' type='submit' /> Encuentra tu hogar soñado</button>
                                </div>
                              </div>
                            </div>
                          </> :
                          <>
                            <div className="col-sm-8 ms-5 search-container">
                              <div className="row mt-4">
                                <div className="col">
                                  <div className="row">
                                    <div className="col-sm-1 fs-4 me-2">
                                      <GrMapLocation />
                                    </div>
                                    <div className="col">
                                      <input type="text"
                                        name="ubicacion"
                                        className='form-control'
                                        placeholder='Ubicación'
                                        value={ubicacion}
                                        onChange={(e) => setUbicacion(e.target.value)} required />
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <select name="inmueble" id="" className='form-select fw-bold' onChange={handleSelect} required>
                                    <option value="NA">Tipo de Inmueble</option>
                                    <option value="Casa">Casa</option>
                                    <option value="Apartamento">Apartamento</option>
                                    <option value="Townhouse">Townhouse</option>
                                  </select>
                                </div>
                                <div className="col">
                                  <Dropdown className='w-100'>
                                    <Dropdown.Toggle variant="light" className='dropdown-custom fw-bold'>
                                      Caracteristicas
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className='text-decoration-none w-100'>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Baños</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="bath"
                                            className='form-control'
                                            value={bathroom}
                                            onChange={(e) => setBathroom(e.target.value)} required />
                                        </div>
                                      </div>
                                      <div className="dropdown-divider my-3"></div>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Habitaciones</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="habitaciones"
                                            className='form-control'
                                            value={habitaciones}
                                            onChange={(e) => setHabitaciones(e.target.value)} required />
                                        </div>
                                      </div>
                                      <div className="dropdown-divider my-3"></div>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Estacionamiento</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="estacionamiento"
                                            className='form-control'
                                            value={estacionamientos}
                                            onChange={(e) => setEstacionamientos(e.target.value)} required />
                                        </div>
                                      </div>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                                <div className="col">
                                  <button className="btn btn-success w-100 fw-bold"><BsSearch className='mb-1' type='submit' /> Encuentra tu hogar soñado</button>
                                </div>
                              </div>
                            </div>
                          </>
                      }
                    </div>
                  </div>
                </form>
              </main>
            </div>
            <Footer></Footer>
          </>
      }

      <Modal show={showModal} fullscreen={fullscreen} onHide={() => setShowModal(false)}>
        <Modal.Header className='bg-belmeny text-light'>

          <Modal.Title className='fst-italic'>Resultados de Busqueda</Modal.Title>
          <Modal.Title>
            <RiCloseCircleFill className='text-danger fs-1 modal-close bg-light rounded-circle' onClick={() => setShowModal(false)} />
          </Modal.Title>

        </Modal.Header>
        <div className="division w-100 my-4"></div>
        <Modal.Body>
          <div className="container-fluid">
            <div className="bg-belmeny rounded-pill m-auto w-50">
                <h3 className="text-center text-light">Inmuebles encontrados a base de sus preferencias</h3>
            </div>

            <div className="container my-3">
              <div className="text-center">
                <img src={inmueblesEncontrados.photo} alt="Foto del Inmueble" className='w-50 rounded' />
              </div>

              <div className="row m-auto">
                <h3 className="text-center belmeny-text my-2">{inmueblesEncontrados.titulo}</h3>
                <div className="col"></div>
                <div className="col-sm-5">
                  <h5>Estado: {
                    (inmueblesEncontrados.estado === 'Venta') ?
                      <>
                        <span className="text-success fw-bold">{inmueblesEncontrados.estado}</span>
                      </> :
                      <>
                        <span className="text-danger fw-bold">{inmueblesEncontrados.estado}</span>
                      </>
                  }</h5>
                  <h5>Descripcion: {inmueblesEncontrados.descripcion}</h5>
                  <h5>Ubicacion: {inmueblesEncontrados.ubicacion}</h5>
                  <h5>Precio: <span className='text-success fw-bold'>${inmueblesEncontrados.precio}</span></h5>
                </div>
                <div className="col-sm-5">
                  <h5>Baños: {inmueblesEncontrados.bathroom}</h5>
                  <h5>Habitaciones: {inmueblesEncontrados.habitaciones}</h5>
                  <h5>Estacionamientos: {inmueblesEncontrados.estacionamientos}</h5>
                  <h5>Agente que publico el inmueble: {agente.fullname}</h5>
                </div>
                <div className="col"></div>
              </div>

            </div>
            <div className="division bg-belmeny mb-4"></div>
             {
              (user.tipo === 'cliente') ?
                <>
                  <h2 className="text-center">¿Estas interesado en este inmueble? Contacta al agente de este inmueble a traves del <i>{agente.phone}</i></h2>
                </> :
                <>
                   {/* <h2 className="text-center">¿Estas interesado en este inmueble? Contacta al agente de este inmueble a traves del <i>{agente.phone}</i></h2>  */}

                 </> 
             } 
          </div>
        </Modal.Body>
      </Modal>

    </>
  )
}
