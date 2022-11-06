import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

import { BsArrowRight, BsArrowLeft, BsSearch } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";

import Dropdown from 'react-bootstrap/Dropdown';

import inmueble1 from '../assets/img/inmueble1.jpg';
// import inmue1ble from '../assets/img/inmueble1.jpg'
import codigoQR from '../assets/img/codigoQR.png';


export const Inmuebles = () => {

  const [loading, setLoading] = useState(true);

  // States para datos
  const [location, setLocation] = useState('');
  const [inmueble, setInmueble] = useState('NA');
  const [bath, setBath] = useState('');
  const [hab, setHab] = useState('');
  const [estacionamiento, setEstacionamiento] = useState('');

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
            <div className="header-wrapper h-10">
              <Header></Header>
            </div>
            <div className="bg-app-white">
              <main className='my-5'>
                <div className='container-fluid '>
                  <div className="row text-center">
                    <div className="col">
                      <h2 className='text-dark fw-bold'>Encuentra tu Hogar Soñado</h2>
                      <h5 className='text-dark fw-light'>Mira las mejores ofertas que nuestra cartera de agentes tienen para ti</h5>
                    </div>
                  </div>

                  <div className="row text-center mt-5">
                    <div className="col">
                      <div className="card w-75 m-auto">
                        <Link className='text-decoration-none'>
                          <img src={inmueble1} className="card-img-top" alt="..." />
                          <div className="card-body text-dark">
                            <h5 className="card-title">Large 4-room apartment with a beautiful terrace</h5>
                            <p className="card-text text-start">
                              <span className="belmeny-text fw-bold">$320 000</span> <br />
                              <span>Maracaibo, VE</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card w-75 m-auto">
                        <Link className='text-decoration-none'>
                          <img src={inmueble1} className="card-img-top" alt="..." />
                          <div className="card-body text-dark">
                            <h5 className="card-title">Large 4-room apartment with a beautiful terrace</h5>
                            <p className="card-text text-start">
                              <span className="belmeny-text fw-bold">$320 000</span> <br />
                              <span>Maracaibo, VE</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card w-75 m-auto">
                        <Link className='text-decoration-none'>
                          <img src={inmueble1} className="card-img-top" alt="..." />
                          <div className="card-body text-dark">
                            <h5 className="card-title">Large 4-room apartment with a beautiful terrace</h5>
                            <p className="card-text text-start">
                              <span className="belmeny-text fw-bold">$320 000</span> <br />
                              <span>Maracaibo, VE</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card w-75 m-auto">
                        <Link className='text-decoration-none'>
                          <img src={inmueble1} className="card-img-top" alt="..." />
                          <div className="card-body text-dark">
                            <h5 className="card-title">Large 4-room apartment with a beautiful terrace</h5>
                            <p className="card-text text-start">
                              <span className="belmeny-text fw-bold">$320 000</span> <br />
                              <span>Maracaibo, VE</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="row text-center mt-5">
                  <div className="col">
                      <div className="card w-75 m-auto">
                        <Link className='text-decoration-none'>
                          <img src={inmueble1} className="card-img-top" alt="..." />
                          <div className="card-body text-dark">
                            <h5 className="card-title">Large 4-room apartment with a beautiful terrace</h5>
                            <p className="card-text text-start">
                              <span className="belmeny-text fw-bold">$320 000</span> <br />
                              <span>Maracaibo, VE</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card w-75 m-auto">
                        <Link className='text-decoration-none'>
                          <img src={inmueble1} className="card-img-top" alt="..." />
                          <div className="card-body text-dark">
                            <h5 className="card-title">Large 4-room apartment with a beautiful terrace</h5>
                            <p className="card-text text-start">
                              <span className="belmeny-text fw-bold">$320 000</span> <br />
                              <span>Maracaibo, VE</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card w-75 m-auto">
                        <Link className='text-decoration-none'>
                          <img src={inmueble1} className="card-img-top" alt="..." />
                          <div className="card-body text-dark">
                            <h5 className="card-title">Large 4-room apartment with a beautiful terrace</h5>
                            <p className="card-text text-start">
                              <span className="belmeny-text fw-bold">$320 000</span> <br />
                              <span>Maracaibo, VE</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="col">
                      <div className="card w-75 m-auto">
                        <Link className='text-decoration-none'>
                          <img src={inmueble1} className="card-img-top" alt="..." />
                          <div className="card-body text-dark">
                            <h5 className="card-title">Large 4-room apartment with a beautiful terrace</h5>
                            <p className="card-text text-start">
                              <span className="belmeny-text fw-bold">$320 000</span> <br />
                              <span>Maracaibo, VE</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
              <Footer></Footer>

            </div>
          </>
      }

    </>
  )
}
