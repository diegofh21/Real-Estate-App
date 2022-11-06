
import React, { useState, useEffect } from 'react'
import AuthUser from '../../components/AuthUser';
import { ProductosFactura } from './ProductosFactura';
import { FacturaPDF } from '../PDF/FacturaPDF';
import { getProductosFactura, RequestPage, getClienteRIF } from '../../api/request';

import { Collapse, Modal, Button, Col, Row } from 'react-bootstrap';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { RiCloseCircleFill } from "react-icons/ri";

export const DetalleFactura = (props) => {

  var Facturas = props.item
  var FacturaBuscado = props.found
  var FacturaBuscadoFecha = props.foundFecha
  var FacturaBuscadoCliente = props.foundCliente

  // States de datos
  const [cliente, setCliente] = useState('');

  // State del usuario
  const { user } = AuthUser();

  // States del modal
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  // State del loading
  const [loading, setLoading] = useState(true);

  // State de datos
  const [productos, setProductos] = useState([]);
  const [page, setPage] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [firstPage, setFirstPage] = useState('');
  const [lastPage, setLastPage] = useState('');

  function handleShow() {
    setFullscreen(true);
    setShow(true);
    loadProductos();
  }

  useEffect(() => {
  }, []);

  var arrProducto = []
  var data = {}

  const loadProductos = async () => {
    if (FacturaBuscado) {
      // SI SE ENCUENTRA UN REGISTRO SE HACE LA CONSULTA SOLO POR ESE DOC
      console.log("found es true", FacturaBuscado)
      const res = await getProductosFactura(Facturas.Documento);
      setLoading(true)

      for (let i = 0; i < res.data.length; i++) {
        data = {
          Documento: res.data[i].Documento,
          Codigo: res.data[i].Codigo,
          Producto: res.data[i].Nombre,
          PrecioUnit: res.data[i].PrecioUnitario.toFixed(2),
          Cantidad: res.data[i].Cantidad,
          Subtotal: res.data[i].Subtotal.toFixed(2),
          TasaIVA: res.data[i].TasaIVA,
          SubImpuesto: res.data[i].SubImpuesto
        }
        arrProducto.push(data)
      }

      setPage(res.meta.current_page)
      setTotalPages(res.meta.last_page)
      setNextPage(res.links.next)
      setPrevPage(res.links.prev)
      setFirstPage(res.links.first)
      setLastPage(res.links.last)
      setProductos(arrProducto)
      setLoading(false)
    }
    else if (FacturaBuscadoFecha) {
      // SI SE ENCUENTRA UN REGISTRO SE HACE LA CONSULTA SOLO POR ESE DOC
      console.log("foundbyfecha es true", FacturaBuscadoFecha)
      const res = await getProductosFactura(Facturas.Documento);
      setLoading(true)

      for (let i = 0; i < res.data.length; i++) {
        data = {
          Documento: res.data[i].Documento,
          Codigo: res.data[i].Codigo,
          Producto: res.data[i].Nombre,
          PrecioUnit: res.data[i].PrecioUnitario.toFixed(2),
          Cantidad: res.data[i].Cantidad,
          Subtotal: res.data[i].Subtotal.toFixed(2),
          TasaIVA: res.data[i].TasaIVA,
          SubImpuesto: res.data[i].SubImpuesto
        }
        arrProducto.push(data)
      }

      setPage(res.meta.current_page)
      setTotalPages(res.meta.last_page)
      setNextPage(res.links.next)
      setPrevPage(res.links.prev)
      setFirstPage(res.links.first)
      setLastPage(res.links.last)
      setProductos(arrProducto)
      setLoading(false)
    }
    else if (FacturaBuscadoCliente) {
      // SI SE ENCUENTRA UN REGISTRO SE HACE LA CONSULTA SOLO POR ESE DOC
      console.log("foundbycliente es true", FacturaBuscadoCliente)
      const res = await getProductosFactura(Facturas.Documento);
      setLoading(true)

      for (let i = 0; i < res.data.length; i++) {
        data = {
          Documento: res.data[i].Documento,
          Codigo: res.data[i].Codigo,
          Producto: res.data[i].Nombre,
          PrecioUnit: res.data[i].PrecioUnitario.toFixed(2),
          Cantidad: res.data[i].Cantidad,
          Subtotal: res.data[i].Subtotal.toFixed(2),
          TasaIVA: res.data[i].TasaIVA,
          SubImpuesto: res.data[i].SubImpuesto
        }
        arrProducto.push(data)
      }

      setPage(res.meta.current_page)
      setTotalPages(res.meta.last_page)
      setNextPage(res.links.next)
      setPrevPage(res.links.prev)
      setFirstPage(res.links.first)
      setLastPage(res.links.last)
      setProductos(arrProducto)
      setLoading(false)
    }
    else {
      // SI NO SE ENCUENTRA UN REGISTRO SE HACE LA CONSULTA SOLO POR TODOS LOS DOCS
      // console.log("found es false", FacturaBuscado)
      const res = await getProductosFactura(Facturas.Documento);
      setLoading(true)

      for (let i = 0; i < res.data.length; i++) {
        data = {
          Documento: res.data[i].Documento,
          Codigo: res.data[i].Codigo,
          Producto: res.data[i].Nombre,
          PrecioUnit: res.data[i].PrecioUnitario.toFixed(2),
          Cantidad: res.data[i].Cantidad,
          Subtotal: res.data[i].Subtotal.toFixed(2),
          TasaIVA: res.data[i].TasaIVA,
          SubImpuesto: res.data[i].SubImpuesto
        }
        arrProducto.push(data)
      }

      setPage(res.meta.current_page)
      setTotalPages(res.meta.last_page)
      setNextPage(res.links.next)
      setPrevPage(res.links.prev)
      setFirstPage(res.links.first)
      setLastPage(res.links.last)
      setProductos(arrProducto)
      setLoading(false)
    }

    const clientRes = await getClienteRIF(Facturas.codcliente)
    console.log(clientRes)
    setCliente(clientRes.data[0].Nombre)
  }

  const loadPage = async (e, pageData) => {
    // console.log(pageData)
    setLoading(true)

    const productoData = await RequestPage(pageData);

    var arrProducto = []
    var data = {}

    for (let i = 0; i < productoData.data.length; i++) {
      data = {
        Documento: productoData.data[i].Documento,
        Codigo: productoData.data[i].Codigo,
        Producto: productoData.data[i].Nombre,
        PrecioUnit: productoData.data[i].PrecioUnitario.toFixed(2),
        Cantidad: productoData.data[i].Cantidad,
        Subtotal: productoData.data[i].Subtotal.toFixed(2),
        TasaIVA: productoData.data[i].TasaIVA,
        SubImpuesto: productoData.data[i].SubImpuesto
      }
      arrProducto.push(data)
    }

    setPage(productoData.meta.current_page)
    setTotalPages(productoData.meta.last_page)
    setNextPage(productoData.links.next)
    setPrevPage(productoData.links.prev)
    setFirstPage(productoData.links.first)
    setLastPage(productoData.links.last)

    setProductos(arrProducto)
    setLoading(false)
  }

  return (
    <>
      <tr>
        {
          (FacturaBuscado) ?
            <>
              <td>
                {Facturas.Documento}
              </td>
              <td>
                {Facturas.codcliente}
              </td>
              <td className='d-md-block-table d-none-table '>
                ${Facturas.TotalFinal}
              </td>
              <td>
                {Facturas.FechaDocumento.split(" ")[0]}
              </td>
              <td>
                <div className="row">
                  <div className="col">
                    <p className="btn btn-success btn-sm mt-2 mb-2" onClick={() => handleShow()}>Ver detalles</p>
                  </div>
                  <div className="col">
                    <FacturaPDF user={user} Factura={Facturas} FacturaBuscada={true} />
                  </div>
                </div>
              </td>
            </> :
            (FacturaBuscadoFecha) ?
              <>
                <td>
                  {Facturas.Documento}
                </td>
                <td>
                  {Facturas.codcliente}
                </td>
                <td className='d-md-block-table d-none-table '>
                  ${Facturas.TotalFinal}
                </td>
                <td>
                  {Facturas.FechaDocumento.split(" ")[0]}
                </td>
                <td>
                  <div className="row">
                    <div className="col">
                      <p className="btn btn-success btn-sm mt-2 mb-2" onClick={() => handleShow()}>Ver detalles</p>
                    </div>
                    <div className="col">
                      <FacturaPDF user={user} Factura={Facturas} FacturaBuscada={true} />
                    </div>
                  </div>
                </td>
              </> :
              (FacturaBuscadoCliente) ?
                <>
                  <td>
                    {Facturas.Documento}
                  </td>
                  <td>
                    {Facturas.codcliente}
                  </td>
                  <td className='d-md-block-table d-none-table '>
                    ${Facturas.TotalFinal}
                  </td>
                  <td>
                    {Facturas.FechaDocumento.split(" ")[0]}
                  </td>
                  <td>
                    <div className="row">
                      <div className="col">
                    <p className="btn btn-success btn-sm mt-2 mb-2" onClick={() => handleShow()}>Ver detalles</p>

                      </div>
                      <div className="col"></div>
                    </div>
                  </td>
                </> :
                <>
                  <td>
                    {Facturas.Documento}
                  </td>
                  <td>
                    {Facturas.codcliente}
                  </td>
                  <td className='d-md-block-table d-none-table '>
                    ${Facturas.TotalFinal}
                  </td>
                  <td>
                    {Facturas.FechaDocumento}
                  </td>
                  <td className="text-center">
                    <p className="btn btn-success btn-sm mt-2 mb-2" onClick={() => handleShow()}>Ver detalles</p>
                    <FacturaPDF user={user} Factura={Facturas} />
                  </td>
                </>
        }

      </tr>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header className='bg-belmeny text-light'>
          {
            (FacturaBuscado) ?
              <>
                <Modal.Title className='fst-italic'>Información de la factura: {Facturas.Documento}</Modal.Title>
                <Modal.Title>
                  <RiCloseCircleFill className='text-danger fs-1 modal-close bg-light rounded-circle' onClick={() => setShow(false)} />
                </Modal.Title>
              </> :
              (FacturaBuscadoFecha) ?
                <>
                  <Modal.Title className='fst-italic'>Información de la factura: {Facturas.Documento}</Modal.Title>
                  <Modal.Title>
                    <RiCloseCircleFill className='text-danger fs-1 modal-close bg-light rounded-circle' onClick={() => setShow(false)} />
                  </Modal.Title>
                </> :
                (FacturaBuscadoCliente) ?
                  <>
                    <Modal.Title className='fst-italic'>Información de la factura: {Facturas.Documento}</Modal.Title>
                    <Modal.Title>
                      <RiCloseCircleFill className='text-danger fs-1 modal-close bg-light rounded-circle' onClick={() => setShow(false)} />
                    </Modal.Title>
                  </> :
                  <>
                    <Modal.Title className='fst-italic'>Información de la factura: {Facturas.Documento}</Modal.Title>
                    <Modal.Title>
                      <RiCloseCircleFill className='text-danger fs-1 modal-close bg-light rounded-circle' onClick={() => setShow(false)} />
                    </Modal.Title>
                  </>
          }
        </Modal.Header>
        <div className="division w-100 my-4"></div>
        <Modal.Body>
          <div className="container-fluid">

            {/* Div para escritorio */}
            <div className='d-none d-md-block'>

              <h3 className="bg-belmeny text-light rounded-pill text-center w-50 m-auto py-1 mb-3">Vendedor Encargado: {user.Nombre}</h3>

              <div className="row badge-vendedor rounded-pill">
                <div className="col">
                  <h3 className='text-start ms-3'>RIF: {Facturas.codcliente}</h3>
                </div>
                <div className="col">
                  <h3 className='text-end me-4'>{cliente}</h3>
                </div>
              </div>

              <div className="container mt-3">
                <div className="row">
                  <div className="col">
                    <h4><b>Base Imponible:</b> ${Facturas.BaseImponible}</h4>
                    <h4><b>Flete:</b> ${Facturas.Flete}</h4>
                    <h4><b>Tasa IVA:</b> ${Facturas.TasaIVA}</h4>
                    <h4><b>Monto Total:</b> ${Facturas.TotalFinal}</h4>
                  </div>
                  <div className="col">
                    {
                      (FacturaBuscado) ?
                        <>
                          <h4><b>Fecha de expedición:</b> {Facturas.FechaDocumento.split(" ")[0]}</h4>
                        </> :
                        (FacturaBuscadoFecha) ?
                          <>
                            <h4><b>Fecha de expedición:</b> {Facturas.FechaDocumento.split(" ")[0]}</h4>
                          </> :
                          (FacturaBuscadoCliente) ?
                            <>
                              <h4><b>Fecha de expedición:</b> {Facturas.FechaDocumento.split(" ")[0]}</h4>
                            </> :
                            <>
                              <h4><b>Fecha de expedición:</b> {Facturas.FechaDocumento.split(" ")[0]}</h4>
                            </>
                    }
                    {
                      (FacturaBuscado) ?
                        <>
                          <h4><b>Fecha de vencimiento:</b> {Facturas.FechaVencimiento.split(" ")[0]}</h4>
                        </> :
                        (FacturaBuscadoFecha) ?
                          <>
                            <h4><b>Fecha de vencimiento:</b> {Facturas.FechaVencimiento.split(" ")[0]}</h4>
                          </> :
                          (FacturaBuscadoCliente) ?
                            <>
                              <h4><b>Fecha de vencimiento:</b> {Facturas.FechaVencimiento.split(" ")[0]}</h4>
                            </> :
                            <>
                              <h4><b>Fecha de vencimiento:</b> {Facturas.FechaVencimiento.split(" ")[0]}</h4>
                            </>
                    }
                    <h4><b>Días de crédito:</b> {Facturas.DiasCredito}</h4>
                    <h4><b>¿Aplica descuento?</b> {(Facturas.Descuento === 1) ? 'Si' : 'No'}</h4>
                  </div>
                </div>
              </div>

              <h3 className='bg-belmeny m-auto w-50 rounded-pill py-2 text-center text-light mt-3'>Lista de productos</h3>
              {
                (loading) ?
                  <>
                    <div className="text-center">
                      <div className="m-auto spinner">
                        <div>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </> :
                  <>
                    <div className="border-belmeny my-3">
                      <table className='table table-responsive table-striped table-hover'>
                        <thead>
                          <tr>
                            <th>Código</th>
                            <th>Producto</th>
                            <th>Precio Unitario</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productos.map((item) => <ProductosFactura item={item} />)}
                        </tbody>
                      </table>
                    </div>
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
                  </>
              }
            </div>

            <div className='d-block d-sm-none'>
              <Row>
                <Col>
                  <p><b>Vendedor encargado:</b> {user.Nombre}</p>
                  <p><b>Fecha del pedido:</b> {Facturas.Fecha}</p>
                </Col>
                <Col>
                  <p><b>Tipo de pedido:</b> {Facturas.TipoPedido}</p>
                  <p><b>Forma de pago:</b> {Facturas.FormaPago}</p>
                </Col>
              </Row>
              <Row>
                <Col><p><b>Responsable:</b> {Facturas.Responsable}</p></Col>
                <Col><p><b>Comentarios:</b> {Facturas.Comentarios}</p></Col>
              </Row>
              <Row>
                <Col><p><b>Descargado:</b> {(Facturas.Descargado === 1) ? 'Si' : 'No'}</p></Col>
                <Col><p><b>¿Aplica descuento?</b> {(Facturas.Descuento === 1) ? 'Si' : 'No'}</p></Col>
              </Row>
              <p><b>Monto total del pedido:</b> {Facturas.Monto}$</p>
              <p>Lista de items:</p>
              {
                (loading) ?
                  <>
                    <div className="text-center">
                      <div className="m-auto spinner">
                        <div>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </> :
                  <>
                    <table className='table table-responsive table-striped table-hover'>
                      <thead>
                        <tr>
                          <th>Código</th>
                          <th>Producto</th>
                          <th>Precio Unitario</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className='text-center'>
                        {productos.map((item) => <ProductosFactura item={item} />)}
                      </tbody>
                    </table>
                    <button onClick={e => loadPage(e, firstPage)} className='btn btn-primary me-2'><AiOutlineDoubleLeft /></button>
                    {
                      (prevPage === null) ?
                        <button onClick={e => loadPage(e, prevPage)} className="btn btn-sm btn-primary" disabled>
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
                        <button onClick={e => loadPage(e, prevPage)} className="btn btn-sm btn-primary">
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
                        <button onClick={e => loadPage(e, nextPage)} className="btn btn-sm btn-primary" disabled>
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
                        <button onClick={e => loadPage(e, nextPage)} className="btn btn-sm btn-primary" >
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
                    <button onClick={e => loadPage(e, lastPage)} className="btn btn-primary ms-2"><AiOutlineDoubleRight /></button>
                  </>
              }
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
