import React, { useEffect, useState } from 'react'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

import { BsArrowRight, BsArrowLeft, BsSearch } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";

import Dropdown from 'react-bootstrap/Dropdown';
import { Nav } from 'react-bootstrap';

import { tip_titulo, tip_1, tip_2, tip_3, tip_4, tip_5, tip_6, tip_7, tip_8, tip_9, tip_10, tip_11, tip_12, tip_13, tip_final } from '../assets/img'
import codigoQR from '../assets/img/codigoQR.png';


export const LandingPage = () => {

  const [loading, setLoading] = useState(true);

  // States para datos
  const [location, setLocation] = useState('');
  const [inmueble, setInmueble] = useState('NA');
  const [bath, setBath] = useState('');
  const [hab, setHab] = useState('');
  const [estacionamiento, setEstacionamiento] = useState('');

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
    setInmueble(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inmueble === 'NA') {
      alert('SELECCIONE UN TIPO DE INMUEBLE')
    }
    else {
      // BUSCA EL INMUEBLE SEGUN LAS CARACTERISTICAS SELECCIONADAS
      console.log(location, bath, hab, estacionamiento, inmueble)
    }
  }

  const showSearch = (e, data) => {
    e.preventDefault();
    if(data === 'Rent')
    {
      setShow(false)
    }
    else
    {
      setShow(true)
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
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)} />
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <select name="inmueble" id="" className='form-select fw-bold' onChange={handleSelect}>
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
                                            value={bath}
                                            onChange={(e) => setBath(e.target.value)} />
                                        </div>
                                      </div>
                                      <div className="dropdown-divider my-3"></div>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Habitaciones</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="habitaciones"
                                            className='form-control'
                                            value={hab}
                                            onChange={(e) => setHab(e.target.value)} />
                                        </div>
                                      </div>
                                      <div className="dropdown-divider my-3"></div>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Estacionamiento</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="estacionamiento"
                                            className='form-control'
                                            value={estacionamiento}
                                            onChange={(e) => setEstacionamiento(e.target.value)} />
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
                                        name="location"
                                        className='form-control'
                                        placeholder='Ubicación'
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)} />
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <select name="inmueble" id="" className='form-select fw-bold' onChange={handleSelect}>
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
                                            value={bath}
                                            onChange={(e) => setBath(e.target.value)} />
                                        </div>
                                      </div>
                                      <div className="dropdown-divider my-3"></div>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Habitaciones</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="habitaciones"
                                            className='form-control'
                                            value={hab}
                                            onChange={(e) => setHab(e.target.value)} />
                                        </div>
                                      </div>
                                      <div className="dropdown-divider my-3"></div>
                                      <div className="row px-1">
                                        <div className="col-sm-6 me-2 mt-1 ms-1">Estacionamiento</div>
                                        <div className="col-sm-5">
                                          <input type="text"
                                            name="estacionamiento"
                                            className='form-control'
                                            value={estacionamiento}
                                            onChange={(e) => setEstacionamiento(e.target.value)} />
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

    </>
  )
}
