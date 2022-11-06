import React, { useState, useEffect } from 'react'

import Layout from '../../components/Layout';
import AuthUser from '../../components/AuthUser';
import { Searchbar } from '../../components/Searchbar';
import { DetalleCliente } from './DetalleCliente';

import { getClientes, RequestPage, SearchClienteRIF, SearchClienteNombre, getSaldoPendienteCliente } from '../../api/request';

import { Dropdown, DropdownButton } from 'react-bootstrap'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

export const ConsultaCliente = (props) => {

  // State del usuario
  const { user } = AuthUser();

  // States para los datos
  const [Cliente, setCliente] = useState([]);

  const [page, setPage] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [firstPage, setFirstPage] = useState('');
  const [lastPage, setLastPage] = useState('');

  // State del loading
  const [loading, setLoading] = useState(true);

  // States de busqueda
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);
  const [found, setFound] = useState(false);
  const [clientFound, setClientFound] = useState([]);
  const [foundCliente, setFoundCliente] = useState([]);
  const [foundByCliente, setFoundByCliente] = useState(false);


  // States de filtros
  const [searchbarRif, setSearchbarRif] = useState('d-none')
  const [searchbarCli, setSearchbarCli] = useState('d-none')

  const loadClientes = async () => {
    setLoading(true)
    const res = await getClientes(user.CodVendedor);
    // const saldoRes = await getSaldoPendienteCliente(user.CodVendedor)

    var arrCliente = []
    var arrSaldoPendiente = []
    var data = {}

    for (let i = 0; i < res.data.length; i++) {
      // console.log(saldoRes)
      data = {
        Codigo: res.data[i].Codigo,
        Empresa: res.data[i].Empresa,
        Nombre: res.data[i].Nombre,
        Rif: res.data[i].Rif,
        Vendedor: res.data[i].Vendedor,
        DireccionFiscal: res.data[i].DireccionFiscal,
        Telefono1: res.data[i].Telefono1,
        Limite: res.data[i].Limite,
        Descuento: res.data[i].Descuento,
        Dias: res.data[i].Dias,
        Ventas: res.data[i].Ventas,
        Cobranzas: res.data[i].Cobranzas,
        Devolucion: res.data[i].Devolucion,
        Catalogo: res.data[i].Catalogo,
        SaldoPendiente: res.data[i].SaldoPendiente,
        ColorText: ''
      }

      if (res.data[i].SaldoPendiente > 0) {
        data.ColorText = 'text-danger fw-bold'
      }
      else {
        data.ColorText = 'text-success fw-bold'
      }

      arrCliente.push(data)
    }

    setPage(res.meta.current_page)
    setTotalPages(res.meta.last_page)
    setNextPage(res.links.next)
    setPrevPage(res.links.prev)
    setFirstPage(res.links.first)
    setLastPage(res.links.last)

    console.log(arrCliente)

    setCliente(arrCliente)
    setLoading(false)
  }

  const loadPage = async (e, pageData) => {
    setLoading(true)

    const clienteData = await RequestPage(pageData);
    const saldoRes = await getSaldoPendienteCliente(user.CodVendedor)

    console.log(clienteData)

    var arrCliente = []
    var data = {}

    for (let i = 0; i < clienteData.data.length; i++) {
      data = {
        Codigo: clienteData.data[i].Codigo,
        Empresa: clienteData.data[i].Empresa,
        Nombre: clienteData.data[i].Nombre,
        Rif: clienteData.data[i].Rif,
        Vendedor: clienteData.data[i].Vendedor,
        DireccionFiscal: clienteData.data[i].DireccionFiscal,
        Telefono1: clienteData.data[i].Telefono1,
        Limite: clienteData.data[i].Limite,
        Descuento: clienteData.data[i].Descuento,
        Dias: clienteData.data[i].Dias,
        Ventas: clienteData.data[i].Ventas,
        Cobranzas: clienteData.data[i].Cobranzas,
        Devolucion: clienteData.data[i].Devolucion,
        Catalogo: clienteData.data[i].Catalogo,
        SaldoPendiente: clienteData.data[i].SaldoPendiente,
        ColorText: ''
      }

      if (clienteData.data[i].SaldoPendiente > 0) {
        data.ColorText = 'text-danger fw-bold'
      }
      else {
        data.ColorText = 'text-success fw-bold'
      }

      arrCliente.push(data)
    }

    setPage(clienteData.meta.current_page)
    setTotalPages(clienteData.meta.last_page)
    setNextPage(clienteData.links.next)
    setPrevPage(clienteData.links.prev)
    setFirstPage(clienteData.links.first)
    setLastPage(clienteData.links.last)

    setCliente(arrCliente)
    setLoading(false)
  }

  const onSearch = async (busqueda) => {
    if (searchbarCli === 'd-block') {
      console.log("Busqueda por cliente")
      if (!busqueda) {
        setFound(false)
        setFoundByCliente(false)
        return loadClientes();
      }
      setLoading(true);
      setNotFound(false);
      setSearching(true);
      const result = await SearchClienteNombre(user.CodVendedor, busqueda);
      console.log("Busqueda:", result)
      if (!result) {
        setNotFound(true);
        setLoading(false);
        setFound(false)
        setFoundByCliente(false)
        return;
      } else {
        setFoundByCliente(true)
        setCliente(result)
        setPage(1);
        setTotalPages(1);
      }
      setLoading(false);
      setSearching(false);
    } else if (searchbarRif === 'd-block') {
      console.log("Busqueda por documento")
      if (!busqueda) {
        setFound(false)
        return loadClientes();
      }
      setLoading(true);
      setNotFound(false);
      setSearching(true);
      console.log(busqueda.toUpperCase())
      const result = await SearchClienteRIF(user.CodVendedor, busqueda.toUpperCase());
      console.log("Busqueda:", result)
      if (!result) {
        setNotFound(true);
        setLoading(false);
        setFound(false)
        return;
      } else {
        setFound(true)
        setCliente(result.data)
        setPage(0);
        setTotalPages(1);
      }
      setLoading(false);
      setSearching(false);
    }
  };

  const showFilter = (e, filtro) => {
    e.preventDefault();
    switch (filtro) {
      case 'Rif':
        setSearchbarRif('d-block')
        setSearchbarCli('d-none')
        break;
      case 'Cliente':
        setSearchbarRif('d-none')
        setSearchbarCli('d-block')
        break;

      case 'Limpiar':
        setSearchbarRif('d-none')
        setSearchbarCli('d-none')
        onSearch('')
        break;

      default:
        setSearchbarRif('d-none')
        setSearchbarCli('d-none')
        break;
    }
  }

  useEffect(() => {
    setLoading(false);
    loadClientes();
  }, []);

  return (
    <>
      <Layout>

        {/* Cabecera */}
        <div className="consultas-title mt-5">
          <h4 className='bg-belmeny text-light px-5 rounded-pill'>Consulta de Clientes</h4>
        </div>

        <h5 className="text-center mt-2 mb-4 belmeny-text"><i>Vendedor - {user.Nombre} - {user.CodVendedor}</i></h5>

        {/* Cuerpo de la página */}
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
              <div className="container-fluid d-md-block d-none  mb-3">
                <div className="row">
                  <div className="col">
                    <div className="mb-2">
                      <DropdownButton
                        key={'end'}
                        id={`dropdown-button-drop-${'end'}`}
                        drop={'end'}
                        variant="primary"
                        title={` Filtros `}
                      >
                        <Dropdown.Item eventKey="1" className='text-decoration-none' onClick={e => showFilter(e, 'Rif')}>Por RIF</Dropdown.Item>
                        <Dropdown.Item eventKey="2" className='text-decoration-none' onClick={e => showFilter(e, 'Cliente')}>Por cliente</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4" className='bg-danger text-light text-decoration-none' onClick={e => showFilter(e, 'Limpiar')}>Limpiar filtros</Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <div className={searchbarRif}>
                      <Searchbar onSearch={onSearch} />
                    </div>
                    <div className={searchbarCli}>
                      <Searchbar onSearch={onSearch} />
                    </div>
                  </div>
                </div>
                <div className="border-belmeny rounded-0 my-2">
                <table className='table table-bordered table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>RIF</th>
                      <th>Nombre</th>
                      <th>Saldo Pendiente</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Cliente.map((item) => <DetalleCliente item={item} />)}
                  </tbody>
                </table>
                </div>
                

                {
                  (!foundByCliente) ?
                    <>
                      <button onClick={e => loadPage(e, firstPage)} className='btn btn-sm btn-primary me-2'><AiOutlineDoubleLeft /></button>
                      {
                        (prevPage === null) ?
                          <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary" disabled>
                            <AiOutlineLeft />
                          </button> :
                          <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary">
                            <AiOutlineLeft />
                          </button>
                      }
                      <span className="ms-2">{page}</span> de <span className="me-2">{totalPages}</span>
                      {
                        (nextPage === null) ?
                          <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" disabled>
                            <AiOutlineRight />
                          </button> :
                          <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" >
                            <AiOutlineRight />
                          </button>
                      }
                      <button onClick={e => loadPage(e, lastPage)} className="btn btn-sm btn-primary ms-2"><AiOutlineDoubleRight /></button>
                    </> :
                    <>
                      <button onClick={e => loadPage(e, firstPage)} className='btn btn-sm btn-primary me-2' disabled><AiOutlineDoubleLeft /></button>
                      {
                        (prevPage === null) ?
                          <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary" disabled>
                            <AiOutlineLeft />
                          </button> :
                          <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary" disabled>
                            <AiOutlineLeft />
                          </button>
                      }
                      <span className="ms-2">{page}</span> de <span className="me-2">{totalPages}</span>
                      {
                        (nextPage === null) ?
                          <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" disabled>
                            <AiOutlineRight />
                          </button> :
                          <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" disabled>
                            <AiOutlineRight />
                          </button>
                      }
                      <button onClick={e => loadPage(e, lastPage)} className="btn btn-sm btn-primary ms-2" disabled><AiOutlineDoubleRight /></button>
                    </>
                }

              </div>

              <div className="container-fluid d-block d-sm-none">
                <table className='table table-bordered table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>RIF</th>
                      <th>Nombre</th>
                      <th>Teléfono</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Cliente.map((item) => <DetalleCliente item={item} />)}
                  </tbody>
                </table>

                <button onClick={e => loadPage(e, firstPage)} className='btn btn-sm btn-primary me-2'><AiOutlineDoubleLeft /></button>
                {
                  (prevPage === null) ?
                    <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary" disabled>
                      <AiOutlineLeft />
                    </button> :
                    <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary">
                      <AiOutlineLeft />
                    </button>
                }
                <span className="ms-2">{page}</span> de <span className="me-2">{totalPages}</span>
                {
                  (nextPage === null) ?
                    <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" disabled>
                      <AiOutlineRight />
                    </button> :
                    <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" >
                      <AiOutlineRight />
                    </button>
                }
                <button onClick={e => loadPage(e, lastPage)} className="btn btn-sm btn-primary ms-2"><AiOutlineDoubleRight /></button>
              </div>
            </>
        }
      </Layout>
    </>
  )
}
