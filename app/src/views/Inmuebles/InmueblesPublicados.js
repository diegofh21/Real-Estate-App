import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthUser from '../../components/AuthUser'

import { Collapse, Modal, Button, Col, Row } from 'react-bootstrap';

import { RiCloseCircleFill } from "react-icons/ri";
import { BsArrowRightCircleFill, BsFillHeartFill } from 'react-icons/bs';

import { getPersona, Favorito } from '../../api/request';

export const InmueblesPublicados = (props) => {

  var Inmuebles = props.item;
  var Cliente = props.cliente;

  const { user, getToken } = AuthUser();

  // States del modal
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  //States de datos
  const [agente, setAgente] = useState([])
  const [cliente, setCliente] = useState([])

  const DatosAgente = async () => {
    const res = await getPersona(Inmuebles.id_agente)
    setAgente(res[0])
  }

  const DatosCliente = async () => {
    const getCliente = await getPersona(user.id)
    setCliente(getCliente)
    // console.log(getCliente)
  }

  const makeFavoritos = async () => {
    const res = await Favorito(cliente[0].id_cliente, Inmuebles.id_propiedad)
    alert(res.message)
  }

  useEffect(() => {
    DatosAgente()
    DatosCliente()
  }, []);

  return (
    <>
      <div className="col">
        <div className="card w-50 m-auto">
          <Link className='text-decoration-none' onClick={(e) => setShow(true)}>
            <img src={Inmuebles.photo} className="card-img-top" alt="..." />
            <div className="card-body text-dark">
              <h5 className="card-title">{Inmuebles.titulo}</h5>
              <div className="row">
                <div className="col">
                  <p className="card-text text-start">
                    <span className="belmeny-text fw-bold fs-4">${Inmuebles.precio}</span> <br />
                    <span>Ubicacion: {Inmuebles.ubicacion}</span>
                  </p>
                </div>
                {
                  (Cliente) ?
                    <>
                      <div className="col">
                        <p className="text-end">
                          <button className='btn btn-danger' onClick={makeFavoritos}><BsFillHeartFill /></button>
                        </p>
                      </div>
                    </> :
                    <>
                    </>
                }

              </div>
            </div>
          </Link>
        </div>
      </div>

      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header className='bg-belmeny text-light'>

          <Modal.Title className='fst-italic'>Información del Inmueble</Modal.Title>
          <Modal.Title>
            <RiCloseCircleFill className='text-danger fs-1 modal-close bg-light rounded-circle' onClick={() => setShow(false)} />
          </Modal.Title>

        </Modal.Header>
        <div className="division w-100 my-4"></div>
        <Modal.Body>
          <div className="container-fluid">
            <div className="bg-belmeny rounded-pill m-auto w-50">
              <h3 className="text-center text-light">{Inmuebles.titulo}</h3>
            </div>

            <div className="container my-3">
              <div className="text-center">
                <img src={Inmuebles.photo} alt="Foto del Inmueble" className='w-50 rounded' />
              </div>

              <div className="row mt-3 m-auto">
                <h3 className="text-center belmeny-text my-2">Informacion de la propiedad</h3>
                <div className="col"></div>
                <div className="col-sm-5">
                  <h5>Estado: {
                    (Inmuebles.estado === 'Venta') ?
                      <>
                        <span className="text-success fw-bold">{Inmuebles.estado}</span>
                      </> :
                      <>
                        <span className="text-danger fw-bold">{Inmuebles.estado}</span>
                      </>
                  }</h5>
                  <h5>Descripcion: {Inmuebles.descripcion}</h5>
                  <h5>Ubicacion: {Inmuebles.ubicacion}</h5>
                  <h5>Precio: <span className='text-success fw-bold'>${Inmuebles.precio}</span></h5>
                </div>
                <div className="col-sm-5">
                  <h5>Baños: {Inmuebles.bathroom}</h5>
                  <h5>Habitaciones: {Inmuebles.habitaciones}</h5>
                  <h5>Estacionamientos: {Inmuebles.estacionamientos}</h5>
                  <h5>Agente que publico el inmueble: {agente.fullname}</h5>
                </div>
              </div>
              {
                (Cliente) ?
                  <>
                    <div className="col">
                      <p className="text-end">
                        <button className='btn btn-danger' onClick={makeFavoritos}><BsFillHeartFill /></button>
                      </p>
                    </div>
                  </> :
                  <>
                  </>
              }
            </div>
            <div className="division bg-belmeny mb-4"></div>
            {
              (user.tipo === 'cliente') ?
                <>
                  <h2 className="text-center">¿Estas interesado en este inmueble? Contacta al agente de este inmueble a traves del <i>{agente.phone}</i></h2>
                </> :
                <>
                  {/* <h2 className="text-center">¿Estas interesado en este inmueble? Contacta al agente de este inmueble a traves del <i>{agente.phone}</i></h2> */}

                </>
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
