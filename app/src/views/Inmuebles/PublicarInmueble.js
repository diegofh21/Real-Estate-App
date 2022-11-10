import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate, Link } from "react-router-dom";

import Layout from '../../components/Layout';
import AuthUser from '../../components/AuthUser';

// HTTP
import { getPersona, postInmueble } from '../../api/request';

import userIcon from '../../assets/img/userIconGreenResized.jpg';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import { AiFillCloseCircle } from "react-icons/ai";

// Logo
import realEstateLogo from '../../assets/img/realEstate-logo.png';

export const PublicarInmueble = () => {

  const navigate = useNavigate();

  const { http, setToken, user, token, logout } = AuthUser();

  const [loading, setLoading] = useState(true);

  //States de datos
  const [persona, setPersona] = useState({});
  const [titulo, setTitulo] = useState('');
  const [tipoInversion, setTipoInversion] = useState('');
  const [precio, setPrecio] = useState('');
  const [tipoInmueble, setTipoInmueble] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [habitaciones, setHabitaciones] = useState('');
  const [estacionamiento, setEstacionamiento] = useState('');
  const [foto, setFoto] = useState('');

  const loadDatos = async () => {
    const res = await getPersona(user.id);
    setPersona(res[0])
  }

  useEffect(() => {
    onLoad()
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getAgente = await getPersona(user.id);
    const id_agente = getAgente[0].id_agente

    const fData = new FormData();
    fData.append('image', foto);

    http.post('/postImg', fData).then(async (res) => {

      const updateInmueble = await postInmueble(titulo, ubicacion, descripcion, precio, tipoInmueble, bathrooms, habitaciones, estacionamiento, tipoInversion, id_agente)
      if(updateInmueble.status === 200) {
        alert(updateInmueble.message)
        navigate('/dashboard')
      }

    }).catch((error) => {
      console.log(error)
    })
  }

  const handleSelect = (e) => {
    e.preventDefault();
    switch (e.target.value) {
      case 'Venta':
        setTipoInversion('Venta')
        break;

      case 'Alquiler':
        setTipoInversion('Alquiler')
        break;

      default:
        setTipoInversion('NA')
        break;
    }
  }

  const handleFileChange = (file) => {
    setFoto(file[0])
  }

  const handleTypeSelect = (e) => {
    e.preventDefault();

    switch (e.target.value) {
      case 'Casa':
        setTipoInmueble('Casa')
        break;
      case 'Apartamento':
        setTipoInmueble('Apartamento')
        break;
      case 'Habitacion':
        setTipoInmueble('Habitacion')
        break;
      case 'Terrenos':
        setTipoInmueble('Terrenos')
        break;
      case 'Locales':
        setTipoInmueble('Locales')
        break;
      case 'Otro':
        setTipoInmueble('Otro')
        break;

      default:
        setTipoInversion('NA')
        break;
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

                {/* Div para movil */}
                <div className="text-center d-sm-none">

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
                                  value={titulo}
                                  onChange={(e) => setTitulo(e.target.value)}
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
                                  className="form-control"
                                  value={precio}
                                  onChange={(e) => setPrecio(e.target.value)} />
                              </div>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="tipo">Tipo de Inmueble</label>
                              <select name="tipo" className='form-select' onChange={handleTypeSelect}>
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
                                className="form-control"
                                value={ubicacion}
                                onChange={(e) => setUbicacion(e.target.value)} />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="descripcion">Descripción</label>
                              <input type="text"
                                name="descripcion"
                                id="descripcion"
                                className="form-control"
                                value={descripcion}
                                onChange={(e) => setDescripcion(e.target.value)} />
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label htmlFor="bathroom">Cant. Baños</label>
                                <input type="number"
                                  name="bathroom"
                                  id="bathroom" min="1"
                                  className="form-control"
                                  value={bathrooms}
                                  onChange={(e) => setBathrooms(e.target.value)} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label htmlFor="habitaciones">Cant. Habitaciones</label>
                                <input type="number"
                                  name="habitaciones"
                                  id="habitaciones" min="1"
                                  className="form-control"
                                  value={habitaciones}
                                  onChange={(e) => setHabitaciones(e.target.value)} />
                              </div>
                            </div>
                            <div className="col">
                              <div className="mb-3">
                                <label htmlFor="estacionamientos">Cant. Estacionamientos</label>
                                <input type="number"
                                  name="estacionamientos"
                                  id="estacionamientos" min="1"
                                  className="form-control"
                                  value={estacionamiento}
                                  onChange={(e) => setEstacionamiento(e.target.value)} />
                              </div>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="image">Foto del Inmueble</label>
                              <input type="file"
                                name="image"
                                id="image"
                                className="form-control"
                                onChange={e => handleFileChange(e.target.files)} />
                            </div>
                          </div>
                          <button className='btn rounded-pill bg-belmeny btn-hover text-light w-100 mt-3' type='submit'>Publicar <FontAwesomeIcon icon={faArrowAltCircleRight} /></button>
                        </form>
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
