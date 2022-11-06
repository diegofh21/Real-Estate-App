import React, { useState, useEffect } from 'react'
import { getProductos } from '../../api/request'

export const ProductosFactura = (props) => {
  // console.log(props)
  var Productos = props.item

  return (
    <tr >
      <td>
        {Productos.Codigo}
      </td>
      <td>
        {Productos.Producto}$
      </td>
      <td>
        {Productos.PrecioUnit}$
      </td>
      <td>
        {Productos.Cantidad}
      </td>
      <td>
        {Productos.Subtotal}$
      </td>
      {/* <td className='d-md-block-table d-none-table '>
        {(Productos.Descargado === 1) ? 'Si' : 'No'}
      </td> */}
    </tr>
  )
}
