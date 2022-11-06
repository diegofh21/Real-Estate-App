import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthUser } from '../../components/AuthUser';
import Layout from '../../components/Layout';
import { Searchbar } from '../../components/Searchbar';
import { DetallePedido } from './DetallePedido';

import { Dropdown, DropdownButton } from 'react-bootstrap'
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { DateRangePicker, Stack } from 'rsuite';

import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';

import { Pedidos, getMonto, RequestPage, SearchPedido, SearchPedidobyFechas, SearchPedidoCli } from '../../api/request';

export const ConsultaPedido = () => {

  // State del usuario
  const { user, getToken } = AuthUser();
  const navigate = useNavigate();

  // States para los datos
  const [Pedido, setPedido] = useState([]);
  const [Monto, setMonto] = useState('');

  // States de paginas
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
  const [foundByFecha, setFoundByFecha] = useState(false);
  const [foundByCliente, setFoundByCliente] = useState(false);
  const [pedidoFound, setPedidoFound] = useState([]);
  const [pedidoFoundCliente, setPedidoFoundCliente] = useState([]);
  const [pedidoFoundFecha, setPedidoFoundFecha] = useState([]);

  // States de filtros
  const [searchbarDoc, setSearchbarDoc] = useState('d-none')
  const [searchbarCli, setSearchbarCli] = useState('d-none')
  const [searchDate, setSearchDate] = useState('d-none')

  const predefinedRanges = [
    {
      label: 'Hoy',
      value: [new Date(), new Date()],
      placement: 'left'
    },
    {
      label: 'Ayer',
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
      placement: 'left'
    },
    {
      label: 'Esta semana',
      value: [startOfWeek(new Date()), endOfWeek(new Date())],
      placement: 'left'
    },
    {
      label: 'Últimos 7 días',
      value: [subDays(new Date(), 6), new Date()],
      placement: 'left'
    },
    {
      label: 'Últimos 30 días',
      value: [subDays(new Date(), 29), new Date()],
      placement: 'left'
    },
    {
      label: 'Mes actual',
      value: [startOfMonth(new Date()), new Date()],
      placement: 'left'
    },
    {
      label: 'Mes anterior',
      value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
      placement: 'left'
    },
    {
      label: 'Este año',
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
      placement: 'left'
    },
    {
      label: 'Último año',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
      placement: 'left'
    },
    {
      label: 'Desde el comienzo',
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
      placement: 'left'
    },
    {
      label: 'Última semana',
      closeOverlay: false,
      value: value => {
        const [start = new Date()] = value || [];
        return [
          addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
          addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
        ];
      },
      appearance: 'default'
    },
    {
      label: 'Próxima semana',
      closeOverlay: false,
      value: value => {
        const [start = new Date()] = value || [];
        return [
          addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
          addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)
        ];
      },
      appearance: 'default'
    }
  ];


  const loadPedidos = async () => {
    setLoading(true)
    const res = await Pedidos(user.CodVendedor);
    const resMonto = await getMonto(user.CodVendedor);
    setMonto(resMonto.toFixed(2))

    var arrPedido = []
    var data = {}

    for (let i = 0; i < res.data.length; i++) {
      data = {
        Documentos: res.data[i].Documento,
        CodCliente: res.data[i].Codcliente,
        Cliente: res.data[i].NombreCliente,
        Vendedor: res.data[i].Vendedor,
        TipoPedido: res.data[i].TipoPedido,
        FormaPago: res.data[i].FormaPago,
        Fecha: res.data[i].fechayhora.split(" ")[0],
        Responsable: res.data[i].Responsable,
        Comentarios: res.data[i].Comentarios,
        Descargado: res.data[i].Descargado,
        Monto: res.data[i].Monto.toFixed(2),
        Descuento: res.data[i].AplicaDescuento
      }
      arrPedido.push(data)
    }

    setPage(res.meta.current_page)
    setTotalPages(res.meta.last_page)
    setNextPage(res.links.next)
    setPrevPage(res.links.prev)
    setFirstPage(res.links.first)
    setLastPage(res.links.last)

    setPedido(arrPedido)
    setLoading(false)
  }

  const loadPage = async (e, pageData) => {

    // console.log(pageData)
    setLoading(true)

    const pedidoData = await RequestPage(pageData);

    var arrPedido = []
    var data = {}

    for (let i = 0; i < pedidoData.data.length; i++) {
      data = {
        Documentos: pedidoData.data[i].Documento,
        CodCliente: pedidoData.data[i].Codcliente,
        Cliente: pedidoData.data[i].NombreCliente,
        Vendedor: pedidoData.data[i].Vendedor,
        TipoPedido: pedidoData.data[i].TipoPedido,
        FormaPago: pedidoData.data[i].FormaPago,
        Fecha: pedidoData.data[i].fechayhora.split(" ")[0],
        Responsable: pedidoData.data[i].Responsable,
        Comentarios: pedidoData.data[i].Comentarios,
        Descargado: pedidoData.data[i].Descargado,
        Monto: pedidoData.data[i].Monto,
        Descuento: pedidoData.data[i].AplicaDescuento
      }
      arrPedido.push(data)
    }

    setPage(pedidoData.meta.current_page)
    setTotalPages(pedidoData.meta.last_page)
    setNextPage(pedidoData.links.next)
    setPrevPage(pedidoData.links.prev)
    setFirstPage(pedidoData.links.first)
    setLastPage(pedidoData.links.last)

    setPedido(arrPedido)
    setLoading(false)
  }

  const onSearch = async (busqueda) => {
    if (searchbarCli === 'd-block') {
      if (!busqueda) {
        setFound(false)
        setFoundByCliente(false)
        setFoundByFecha(false)
        return loadPedidos();
      }
      setLoading(true);
      setNotFound(false);
      setSearching(true);
      const result = await SearchPedidoCli(user.CodVendedor, busqueda);
      if (!result) {
        setNotFound(true);
        setLoading(false);
        setFound(false)
        setFoundByCliente(false)
        setFoundByFecha(false)
        return;
      } else {
        setFoundByCliente(true)
        setPedidoFoundCliente(result)
        setPage(1);
        setTotalPages(1);
      }
      setLoading(false);
      setSearching(false);
    } else if (searchbarDoc === 'd-block') {
      if (!busqueda) {
        setFound(false)
        return loadPedidos();
      }
      setLoading(true);
      setNotFound(false);
      setSearching(true);
      const result = await SearchPedido(busqueda.toUpperCase());
      if (!result) {
        setNotFound(true);
        setLoading(false);
        setFound(false)
        return;
      } else {
        setFound(true)
        setPedidoFound(result.data)
        setPage(1);
        setTotalPages(1);
      }
      setLoading(false);
      setSearching(false);
    }
    else if (searchDate != 'd-block') {
      setFoundByFecha(false)
    }
  };

  const changeDate = async (e) => {
    let date = JSON.stringify(e)
    let inicio = date.slice(2, 12) + " " + date.slice(14, 21)
    let fin = date.slice(29, 39) + " " + date.slice(41, 48)

    const res = await SearchPedidobyFechas(user.CodVendedor, inicio, fin)
    console.log(res);
    if (res.pedidos.length === 0) {
      setFound(false)
      setFoundByFecha(false)
    }
    else {
      setFound(false)
      setFoundByFecha(true)
      setPedidoFoundFecha(res.pedidos)
      setMonto(res.montoTotal.toFixed(2))
    }
  }

  const showFilter = async (e, filtro) => {
    e.preventDefault();
    switch (filtro) {
      case 'Doc':
        setSearchbarDoc('d-block')
        setSearchbarCli('d-none')
        setSearchDate('d-none')
        break;
      case 'Cliente':
        setSearchbarDoc('d-none')
        setSearchbarCli('d-block')
        setSearchDate('d-none')
        break;
      case 'Fecha':
        setSearchbarDoc('d-none')
        setSearchbarCli('d-none')
        setSearchDate('d-block')
        break;

      case 'Limpiar':
        onSearch('')
        setSearchbarDoc('d-none')
        setSearchbarCli('d-none')
        setSearchDate('d-none')
        setFoundByFecha(false)
        onSearch('')
        const resMonto = await getMonto(user.CodVendedor);
        setMonto(resMonto.toFixed(2))
        break;

      default:
        onSearch('')
        setSearchbarDoc('d-none')
        setSearchbarCli('d-none')
        setSearchDate('d-none')
        break;
    }
  }

  useEffect(() => {
    loadPedidos();
  }, []);

  return (
    <>
      <Layout>

        {/* Cabecera */}
        <div className="consultas-title mt-5">
          <h4 className='bg-belmeny text-light px-5 rounded-pill'>Consulta de Pedidos</h4>
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
                        <Dropdown.Item eventKey="1" className='text-decoration-none' onClick={e => showFilter(e, 'Doc')}>Por documento</Dropdown.Item>
                        <Dropdown.Item eventKey="2" className='text-decoration-none' onClick={e => showFilter(e, 'Cliente')}>Por cliente</Dropdown.Item>
                        <Dropdown.Item eventKey="3" className='text-decoration-none' onClick={e => showFilter(e, 'Fecha')}>Por fecha</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4" className='bg-danger text-light text-decoration-none' onClick={e => showFilter(e, 'Limpiar')}>Limpiar filtros</Dropdown.Item>
                      </DropdownButton>
                    </div>
                    <div className={searchbarDoc}>
                      <Searchbar onSearch={onSearch} />
                    </div>
                    <div className={searchbarCli}>
                      <Searchbar onSearch={onSearch} />
                    </div>
                    <Stack direction="row" spacing={10} alignItems="flex-start" className={searchDate}>
                      <DateRangePicker
                        appearance={"subtle"}
                        ranges={predefinedRanges}
                        placeholder="Buscar por fecha"
                        style={{ width: 300 }}
                        onChange={e => changeDate(e)}
                        className="border rounded-pill mb-2"
                      />
                    </Stack>
                  </div>
                </div>
                {
                  (found) ?
                    <>
                      {/* Encontrado unicamente por barra de busqueda */}
                      <div className="border-belmeny rounded-0 my-2">
                        <table className='table table-bordered table-striped table-hover'>
                          <thead>
                            <tr>
                              <th>Documento</th>
                              <th className='w-50'>Cliente</th>
                              <th>Monto</th>
                              <th>Fecha</th>
                              <th style={{width: "15%"}}>Opciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pedidoFound.map((item) => <DetallePedido item={item} found={found} />)}
                          </tbody>
                        </table>
                      </div>
                    </> :
                    (foundByFecha) ?
                      <>
                        {/* Encontrado por fechas */}
                        <div className="border-belmeny rounded-0 my-2">
                          <table className='table table-bordered table-striped table-hover'>
                            <thead>
                              <tr>
                                <th>Documento</th>
                                <th className='w-50'>Cliente</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th style={{width: "15%"}}>Opciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {pedidoFoundFecha.map((item) => <DetallePedido item={item} found={found} foundFecha={foundByFecha} />)}
                            </tbody>
                          </table>
                        </div>
                      </> :
                      (foundByCliente) ?
                        <>
                          {/* Encontrado por cliente */}
                          <div className="border-belmeny rounded-0 my-2">
                            <table className='table table-bordered table-striped table-hover'>
                              <thead>
                                <tr>
                                  <th>Documento</th>
                                  <th className='w-50'>Cliente</th>
                                  <th>Monto</th>
                                  <th>Fecha</th>
                                  <th style={{width: "15%"}}>Opciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {pedidoFoundCliente.map((item) => <DetallePedido item={item} found={found} foundFecha={foundByFecha} foundCliente={foundByCliente} />)}
                              </tbody>
                            </table>
                          </div>
                        </> :
                        <>
                          {/* Carga normal de todos los pedidos */}
                          <div className="border-belmeny rounded-0 my-2">
                            <table className='table table-bordered table-striped table-hover'>
                              <thead>
                                <tr>
                                  <th>Documento</th>
                                  <th className='w-50'>Cliente</th>
                                  <th>Monto</th>
                                  <th>Fecha</th>
                                  <th style={{width: "15%"}}>Opciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Pedido.map((item) => <DetallePedido item={item} found={found} />)}
                              </tbody>
                            </table>
                          </div>
                        </>
                }
                {
                  (foundByFecha) ?
                    <>
                      <button onClick={e => loadPage(e, firstPage)} className='btn btn-primary me-2' disabled><AiOutlineDoubleLeft /></button>
                      {
                        (prevPage === null) ?
                          <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary" disabled>
                            <AiOutlineLeft />
                          </button> :
                          <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary" disabled>
                            <AiOutlineLeft />
                          </button>
                      }
                      <span className="ms-2">{page}</span> de <span className="me-2">1</span>
                      {
                        (nextPage === null) ?
                          <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" disabled>
                            <AiOutlineRight />
                          </button> :
                          <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" disabled>
                            <AiOutlineRight />
                          </button>
                      }
                      <button onClick={e => loadPage(e, lastPage)} className="btn btn-primary ms-2" disabled><AiOutlineDoubleRight /></button>
                    </> :
                    <>
                      <button onClick={e => loadPage(e, firstPage)} className='btn btn-primary me-2'><AiOutlineDoubleLeft /></button>
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
                      <button onClick={e => loadPage(e, lastPage)} className="btn btn-primary ms-2"><AiOutlineDoubleRight /></button>
                    </>
                }
              </div>

              <div className="container-fluid d-block d-sm-none">
                <table className='table table-bordered table-striped table-hover'>
                  <thead>
                    <tr>
                      <th>Documento</th>
                      <th>Cliente</th>
                      <th>Fecha</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Pedido.map((item) => <DetallePedido item={item} />)}
                  </tbody>
                </table>

                {
                  (prevPage === null) ?
                    <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary" disabled>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 21 21"
                        width="28"
                        height="28">
                        <path
                          d="M11.5 14.5l-4-4 4-4"
                          fill="none"
                          stroke="#FFF"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                      </svg>
                    </button> :
                    <button onClick={e => loadPage(e, prevPage)} className="btn btn-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 21 21"
                        width="28"
                        height="28">
                        <path
                          d="M11.5 14.5l-4-4 4-4"
                          fill="none"
                          stroke="#FFF"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                      </svg>
                    </button>
                }
                <span className="ms-2">{page}</span> de <span className="me-2">{totalPages}</span>
                {
                  (nextPage === null) ?
                    <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" disabled>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 21 21"
                        width="28"
                        height="28">
                        <path
                          d="M9.5 14.5l4-4-4-4"
                          fill="none"
                          stroke="#FFF"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                      </svg>
                    </button> :
                    <button onClick={e => loadPage(e, nextPage)} className="btn btn-primary" >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 21 21"
                        width="28"
                        height="28">
                        <path
                          d="M9.5 14.5l4-4-4-4"
                          fill="none"
                          stroke="#FFF"
                          strokeLinecap="round"
                          strokeLinejoin="round" />
                      </svg>
                    </button>
                }
              </div>
            </>
        }
      </Layout>
    </>
  )
}
