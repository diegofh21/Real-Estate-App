import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthUser from '../components/AuthUser'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { InmueblesPublicados } from './Inmuebles/InmueblesPublicados'

import Dropdown from 'react-bootstrap/Dropdown';

import { getAllInmuebles, RequestPage, getPersona } from '../api/request';

export const Inmuebles = () => {

  // State del usuario
  const { user, getToken } = AuthUser();

  const [loading, setLoading] = useState(true);

  // States para datos
  const [location, setLocation] = useState('');
  const [inmueble, setInmueble] = useState('NA'); //busqueda
  const [bath, setBath] = useState('');
  const [hab, setHab] = useState('');
  const [estacionamiento, setEstacionamiento] = useState('');

  // States de paginas
  const [page, setPage] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [firstPage, setFirstPage] = useState('');
  const [lastPage, setLastPage] = useState('');

  const [inmuebles, setInmuebles] = useState([]) //impresion de inmuebles
  const [cliente, setCliente] = useState(false)

  useEffect(() => {
    onLoad()
    agentOrClient()
    loadInmuebles()
  }, []);

  const agentOrClient = async () => {
    const res = await getPersona(user.id)
    if(!res[0].id_agente) {
      setCliente(true)
    }
  }

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

  const loadInmuebles = async () => {
    const res = await getAllInmuebles()
    // console.log(res.data)

    var arrInmueble = []
    var data = {}

    for (let i = 0; i < res.data.length; i++) {
      data = {
        id_propiedad: res.data[i].id_propiedad,
        titulo: res.data[i].titulo,
        ubicacion: res.data[i].ubicacion,
        descripcion: res.data[i].descripcion,
        precio: res.data[i].precio,
        tipo: res.data[i].tipo,
        bathroom: res.data[i].bathroom,
        habitaciones: res.data[i].habitaciones,
        estacionamientos: res.data[i].estacionamientos,
        estado: res.data[i].estado,
        photo: res.data[i].photo,
        id_agente: res.data[i].id_agente
      }
      arrInmueble.push(data)
    }

    setPage(res.meta.current_page)
    setTotalPages(res.meta.last_page)
    setNextPage(res.links.next)
    setPrevPage(res.links.prev)
    setFirstPage(res.links.first)
    setLastPage(res.links.last)

    setInmuebles(arrInmueble)
    setLoading(false)
  }

  const loadPage = async (e, pageData) => {
    setLoading(true)

    const inmuebleData = await RequestPage(pageData);

    var arrInmueble = []
    var data = {}

    for (let i = 0; i < inmuebleData.data.length; i++) {
      data = {
        id_propiedad: inmuebleData.data[i].id_propiedad,
        titulo: inmuebleData.data[i].titulo,
        ubicacion: inmuebleData.data[i].ubicacion,
        descripcion: inmuebleData.data[i].descripcion,
        precio: inmuebleData.data[i].precio,
        tipo: inmuebleData.data[i].tipo,
        bathroom: inmuebleData.data[i].bathroom,
        habitaciones: inmuebleData.data[i].habitaciones,
        estacionamientos: inmuebleData.data[i].estacionamientos,
        estado: inmuebleData.data[i].estado,
        photo: inmuebleData.data[i].photo,
        id_agente: inmuebleData.data[i].id_agente
      }
      arrInmueble.push(data)
    }

    setPage(inmuebleData.meta.current_page)
    setTotalPages(inmuebleData.meta.last_page)
    setNextPage(inmuebleData.links.next)
    setPrevPage(inmuebleData.links.prev)
    setFirstPage(inmuebleData.links.first)
    setLastPage(inmuebleData.links.last)

    setInmuebles(arrInmueble)
    setLoading(false)
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
                    {inmuebles.map((item) => <InmueblesPublicados item={item} cliente={cliente}/>)}
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
