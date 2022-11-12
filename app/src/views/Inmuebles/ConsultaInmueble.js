import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";
import AuthUser from '../../components/AuthUser';

import { Collapse, Modal, Button, Col, Row } from 'react-bootstrap';

import { RiCloseCircleFill } from "react-icons/ri";
import { BsArrowRightCircleFill } from 'react-icons/bs';

import { getPersona, updateInmueble, deleteInmueble } from '../../api/request';

export const ConsultaInmueble = (props) => {

  var Inmueble = props.inmuebles;

  // State del usuario
  const { user, http } = AuthUser();
  const navigate = useNavigate();

  // States del modal
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // State del loading
  const [loading, setLoading] = useState(true);

  //States de datos
  const [agente, setAgente] = useState([])

  //Para editar el inmueble
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

  const borrarInmueble = async () => {
    const eliminarInmueble = await deleteInmueble(Inmueble.id_propiedad)
    if (eliminarInmueble.status === 200) {
      alert(eliminarInmueble.message)
      window.location.reload();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const actualizarInmueble = await updateInmueble(Inmueble.id_propiedad, titulo, ubicacion, descripcion, precio, tipoInmueble, bathrooms, habitaciones, estacionamiento, tipoInversion)
    if (actualizarInmueble.status === 200) {
      alert(actualizarInmueble.message)
      window.location.reload();
    }
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

  function handleShow() {
    setFullscreen(true);
    setShow(true);
  }

  function handleShowEdit() {
    setFullscreen(true);
    setShowEdit(true);
  }

  function handleShowDelete() {
    setFullscreen(true);
    setShowDelete(true);
  }

  const DatosAgente = async () => {
    const res = await getPersona(Inmueble.id_agente)
    setAgente(res[0])
  }

  useEffect(() => {
    DatosAgente()
  }, []);

  return (
    <>
      <tr>
        <td>{Inmueble.id_propiedad}</td>
        <td>{Inmueble.titulo}</td>
        <td>{Inmueble.estado}</td>
        <td>{Inmueble.tipo}</td>
        <td><span className='text-success fw-bold'>${Inmueble.precio}</span></td>
        <td>{Inmueble.ubicacion}</td>
        <td>
          <button className="btn btn-primary" onClick={() => handleShow()}>Ver</button>
          <button className="btn btn-warning m-2" onClick={() => handleShowEdit()}>Editar</button>
          <button className="btn btn-danger" onClick={() => handleShowDelete()}>Eliminar</button>
        </td>
      </tr>

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
              <h3 className="text-center text-light">{Inmueble.titulo}</h3>
            </div>

            <div className="container my-3">
              <div className="text-center">
                <img src={Inmueble.photo} alt="Foto del Inmueble" className='w-50 rounded' />
              </div>

              <div className="row mt-3 m-auto">
                <h3 className="text-center belmeny-text my-2">Informacion de la propiedad</h3>
                <div className="col"></div>
                <div className="col-sm-5">
                  <h5>Estado: {
                    (Inmueble.estado === 'Venta') ?
                      <>
                        <span className="text-success fw-bold">{Inmueble.estado}</span>
                      </> :
                      <>
                        <span className="text-danger fw-bold">{Inmueble.estado}</span>
                      </>
                  }</h5>
                  <h5>Descripcion: {Inmueble.descripcion}</h5>
                  <h5>Ubicacion: {Inmueble.ubicacion}</h5>
                  <h5>Precio: <span className='text-success fw-bold'>${Inmueble.precio}</span></h5>
                </div>
                <div className="col-sm-5">
                  <h5>Baños: {Inmueble.bathroom}</h5>
                  <h5>Habitaciones: {Inmueble.habitaciones}</h5>
                  <h5>Estacionamientos: {Inmueble.estacionamientos}</h5>
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
                  {/* <h2 className="text-center">¿Estas interesado en este inmueble? Contacta al agente de este inmueble a traves del <i>{agente.phone}</i></h2> */}

                </>
            }
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} fullscreen={fullscreen} onHide={() => setShowEdit(false)}>
        <Modal.Header className='bg-belmeny text-light'>

          <Modal.Title className='fst-italic'>Editar Inmueble</Modal.Title>
          <Modal.Title>
            <RiCloseCircleFill className='text-danger fs-1 modal-close bg-light rounded-circle' onClick={() => setShowEdit(false)} />
          </Modal.Title>

        </Modal.Header>
        <div className="division w-100 my-4"></div>
        <Modal.Body>
          <div className="container-fluid">
            <div className="bg-belmeny rounded-pill m-auto w-50">
              <h3 className="text-center text-light">{Inmueble.titulo}</h3>
            </div>

            <div className="container my-3">
              <div className="text-center">
                <img src={Inmueble.photo} alt="Foto del Inmueble" className='w-50 rounded' />
              </div>

              <h3 className="my-3 text-center fw-normal">Editar datos de la propiedad {Inmueble.id_propiedad}</h3>
              <form action="" className='mb-4 w-75 m-auto' onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col">
                    <div className="form-group mb-3">
                      <label htmlFor="Titulo">Titulo</label>
                      <input type="text"
                        name="Titulo"
                        id="Titulo"
                        className="form-control"
                        placeholder={Inmueble.titulo}
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)} required
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
                        placeholder={Inmueble.precio}
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)} required
                      />
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
                      placeholder={Inmueble.ubicacion}
                      value={ubicacion}
                      onChange={(e) => setUbicacion(e.target.value)} required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="descripcion">Descripción</label>
                    <input type="text"
                      name="descripcion"
                      id="descripcion"
                      className="form-control"
                      placeholder={Inmueble.descripcion}
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)} required
                    />
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="bathroom">Cant. Baños</label>
                      <input type="number"
                        name="bathroom"
                        id="bathroom" min="1"
                        className="form-control"
                        placeholder={Inmueble.bathroom}
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)} required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="habitaciones">Cant. Habitaciones</label>
                      <input type="number"
                        name="habitaciones"
                        id="habitaciones" min="1"
                        className="form-control"
                        placeholder={Inmueble.habitaciones}
                        value={habitaciones}
                        onChange={(e) => setHabitaciones(e.target.value)} required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label htmlFor="estacionamientos">Cant. Estacionamientos</label>
                      <input type="number"
                        name="estacionamientos"
                        id="estacionamientos" min="1"
                        className="form-control"
                        placeholder={Inmueble.estacionamientos}
                        value={estacionamiento}
                        onChange={(e) => setEstacionamiento(e.target.value)} required
                      />
                    </div>
                  </div>
                </div>
                <button className='btn rounded-pill bg-belmeny btn-hover text-light w-100 mt-3' type='submit'>Editar Inmueble <BsArrowRightCircleFill /></button>
              </form>

            </div>
            <div className="division bg-belmeny mb-4"></div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showDelete} fullscreen={false} onHide={() => setShowDelete(false)}>
        <Modal.Header className='bg-belmeny text-light'>
          <Modal.Title className='fst-italic'>Eliminar Inmueble</Modal.Title>
          <Modal.Title>
            <RiCloseCircleFill className='text-danger fs-1 modal-close bg-light rounded-circle' onClick={() => setShowDelete(false)} />
          </Modal.Title>
        </Modal.Header>

        <div className="division w-100 my-4"></div>

        <Modal.Body>
          <h6>¿Estas seguro de la acción que quieres realizar? (Es irreversible)</h6>
          <div className="row mt-3 m-auto">
            <div className="col">
              <button className="btn btn-danger" onClick={borrarInmueble}>Si, borrar inmueble.</button>
            </div>
            <div className="col">
              <button className="btn btn-secondary" onClick={() => setShowDelete(false)}>No, he cambiado de opinión.</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
