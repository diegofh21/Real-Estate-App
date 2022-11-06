
import React, { useState, useEffect } from 'react'
import { Collapse, Modal, Button, Col, Row } from 'react-bootstrap';

import AuthUser from '../../components/AuthUser';

import { getSaldoPendienteCliente } from '../../api/request';

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';

import { RiCloseCircleFill } from "react-icons/ri";

export const DetalleCliente = (props) => {

  // console.log(props)
  var Clientes = props.item

  // State del usuario
  const { user } = AuthUser();

  // States del modal
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  // State del loading
  const [loading, setLoading] = useState(true);

  // State de datos
  const [page, setPage] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [firstPage, setFirstPage] = useState('');
  const [lastPage, setLastPage] = useState('');

  const [chartData, setChartData] = useState({});



  const loadChart = () => {
    setChartData({
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          fill: true,
          data: [9, 7, 4, 8, 6, 5, 2, 3, 1, 9, 7, 10],
          label: 'Ventas anuales',
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)'

        }
      ]
    })
  }


  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }

  useEffect(() => {
    loadChart()
  }, []);

  return (
    <>
      <tr>
        <td style={{ width: "15%" }}>
          {Clientes.Codigo}
        </td>
        <td>
          {Clientes.Nombre}
        </td>
        <td className={Clientes.ColorText}>
          ${Clientes.SaldoPendiente}
        </td>
        <td className='p-2'>
          <p className="btn btn-success btn-sm " onClick={() => handleShow()}>Ver detalles</p>
        </td>
      </tr>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header className='bg-belmeny text-light'>
          <Modal.Title className='fst-italic'>Información del cliente: {Clientes.Nombre}</Modal.Title>
          <Modal.Title>
            <RiCloseCircleFill className='text-danger fs-1 modal-close bg-light rounded-circle' onClick={() => setShow(false)} />
          </Modal.Title>
        </Modal.Header>
        <div className="division w-100 my-4"></div>
        <Modal.Body>

          <div className="container-fluid">
            {/* Div para escritorio */}
            <div className='d-none d-md-block'>
              <div className="row">
                <div className="col">
                  <h2 className='text-center belmeny-text'>{Clientes.Nombre}</h2>
                  <div className="division w-25 m-auto my-3"></div>

                  <div className="text-center">
                    <h4 className='badge-vendedor rounded-pill text-light m-auto' style={{ width: "20%", position: "absolute", left: "15.5%", top: "14%" }}>VENDEDOR ENCARGADO</h4>
                    <h3 className='bg-belmeny rounded-pill text-light fw-light m-auto mt-5 pt-3' style={{ width: "60%" }}>{user.Nombre}</h3>
                  </div>

                  <ul className='mt-5'>
                    <li className='client-info'>
                      <h4><b>Telefono:</b> {Clientes.Telefono1}</h4>
                    </li>
                    <li className='client-info'>
                      <h4><b>Dirección Fiscal:</b> {Clientes.DireccionFiscal}</h4>
                    </li>
                    <li className='client-info'>
                      <h4><b>Limite:</b> ${Clientes.Limite}</h4>
                    </li>
                    <li className='client-info'>
                      <h4>
                        <b>Saldo Pendiente por Cobrar:</b> <span >${Clientes.SaldoPendiente}</span>
                      </h4>
                    </li>
                  </ul>

                </div>
                <div className="col">
                  <h3 className='text-end belmeny-text me-3 fst-italic'>{Clientes.Rif}</h3>
                  <Chart type='line' data={chartData} className='mt-4' />
                </div>

                <div className="division mt-5"></div>
                <h3 className="text-end belmeny-text fst-italic mt-2 pe-5">Belmeny Group C.A</h3>
              </div>
            </div>

            {/* Div para móvil */}
            <div className='d-block d-sm-none'>
              <Row>
                <Col className='w-25'>
                  <h5><b>Vendedor encargado:</b> {user.Nombre} - {Clientes.Vendedor}</h5>
                </Col>
                <Col>
                  <h5><b>Dirección Fiscal:</b> {Clientes.DireccionFiscal}</h5>
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col>
                  <h5><b>Telefono:</b> {Clientes.Telefono1}</h5>
                </Col>
                <Col>

                </Col>
              </Row>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
