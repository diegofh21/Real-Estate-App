import React from 'react'
import { Inmuebles } from '../Inmuebles'

export const DetalleInmuebleFav = (props) => {

  var InmueblesFav = props.inmuebles

  return (
    <>
      <tr>
        <td>{InmueblesFav.id_propiedad}</td>
        <td>{InmueblesFav.titulo}</td>
        <td>{(InmueblesFav.estado === 'Venta') ? <><span className="text-success fw-bold">Venta</span></> : <><span className="text-danger fw-bold">Alquiler</span></>}</td>
        <td>{InmueblesFav.tipo}</td>
        <td className='fw-bold text-success'>${InmueblesFav.precio}</td>
        <td>{InmueblesFav.ubicacion}</td>
      </tr>
    </>
  )
}
