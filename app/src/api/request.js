import axios from "axios";

let baseURL = `http://127.0.0.1:8000/api`;


//PEDIDOS
export async function Pedidos(Vendedor) {
  try {
    const res = await axios.get(baseURL + `/getPedidos?Vendedor[eq]=${Vendedor}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function SearchPedido(Documento) {
  try {
    const res = await axios.get(baseURL + `/getPedidos?Documento[eq]=${Documento}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function SearchPedidoCli(Vendedor, Cliente) {
  try {
    const res = await axios.get(baseURL + `/getPedidosPorCliente?Vendedor=${Vendedor}&NombreCliente=${Cliente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function SearchPedidobyFechas(Vendedor, fechaInicio, fechaFin) {
  try {
    const res = await axios.get(baseURL + `/getPedidosPorFecha?Vendedor=${Vendedor}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getMonto(Vendedor) {
  try {
    const res = await axios.get(baseURL + `/MontoTotalPedido?Vendedor=${Vendedor}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getProductos(Documento) {
  try {
    const res = await axios.get(baseURL + `/getProductosPedidos?Documento[eq]=${Documento}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getProductosPDF(Documento) {
  try {
    const res = await axios.get(baseURL + `/getProductosPedidosPDF?Documento[eq]=${Documento}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

// Request para pasar de página (FUNCIONA EN TODOS)
export async function RequestPage(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

//FACTURAS
export async function Facturas(Vendedor) {
  try {
    const res = await axios.get(baseURL + `/getFacturas?CodigoVendedor[eq]=${Vendedor}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getProductosFactura(Documento) {
  try {
    const res = await axios.get(baseURL + `/getProductosFactura?Documento[eq]=${Documento}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function SearchFactura(Documento) {
  try {
    const res = await axios.get(baseURL + `/getFacturas?Documento[eq]=${Documento}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function SearchFacturaCli(Vendedor, codcliente) {
  try {
    const res = await axios.get(baseURL + `/getFacturas?Vendedor[eq]=${Vendedor}&codcliente=${codcliente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function SearchFacturasbyFechas(Vendedor, fechaInicio, fechaFin) {
  try {
    const res = await axios.get(baseURL + `/getFacturasPorFecha?CodigoVendedor=${Vendedor}&fechaInicio=${fechaInicio}%00:00:00&fechaFin=${fechaFin}%00:00:00`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getProductosFacturaPDF(Documento) {
  try {
    const res = await axios.get(baseURL + `/getProductosFacturaPDF?Documento[eq]=${Documento}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

// Obtiene el monto global de todos las facturas hechas desde que se empezaron a registrar
export async function getMontoFacturas(Vendedor) {
  try {
    const res = await axios.get(baseURL + `/MontoTotalFacturas?CodigoVendedor=${Vendedor}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getMetasPorVendedor(Vendedor) {
  try {
    const res = await axios.get(baseURL + `/getMetaVendedor?vendedor[eq]=${Vendedor}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getProgresoVert(Vendedor, fechaInicio, fechaFin) {
  try {
    // getProgresoMensual?CodigoVendedor=V18&fechaInicio=2022-10-01&fechaFin=2022-10-30
    const res = await axios.get(baseURL + `/getProgresoVert?CodigoVendedor=${Vendedor}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getProgresoIngco(Vendedor, fechaInicio, fechaFin) {
  try {
    // getProgresoMensual?CodigoVendedor=V18&fechaInicio=2022-10-01&fechaFin=2022-10-30
    const res = await axios.get(baseURL + `/getProgresoIngco?CodigoVendedor=${Vendedor}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getProgresoGlobal(Vendedor, fechaInicio, fechaFin) {
  try {
    // getProgresoMensual?CodigoVendedor=V18&fechaInicio=2022-10-01&fechaFin=2022-10-30
    const res = await axios.get(baseURL + `/getProgresoGlobal?CodigoVendedor=${Vendedor}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getTopVendedoresZona(Zona, PeriodoInicio, PeriodoFin) {
  try {
    const res = await axios.get(baseURL + `/getTopVendedoresZona?zona=${Zona}&PeriodoInicio=${PeriodoInicio}&PeriodoFin=${PeriodoFin}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getInfoCobranza(Vendedor, fechaInicio, fechaFin) {
  try {
    const res = await axios.get(baseURL + `/getInfoCobranza?CodigoVendedor=${Vendedor}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getVentasAnualesEnCurso(Vendedor) {
  try {
    const res = await axios.get(baseURL + `/getVentasAnualesEnCurso?CodigoVendedor=${Vendedor}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

// http://127.0.0.1:8000/api/getVentasAnualesEnCurso?CodigoVendedor=V08

// Clientes
export async function getClientes(Vendedor) {
  try {
    const res = await axios.get(baseURL + `/getClientes?Vendedor[eq]=${Vendedor}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function GetClienteRIF(Vendedor, rifCliente) {
  try {
    const res = await axios.get(baseURL + `/getClientes?Vendedor[eq]=${Vendedor}&Codigo[eq]=${rifCliente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function SearchClienteRIF(Vendedor, rifCliente) {
  try {
    const res = await axios.get(baseURL + `/getClientes?Vendedor[eq]=${Vendedor}&Rif[eq]=${rifCliente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function SearchClienteNombre(Vendedor, Cliente) {
  try {
    const res = await axios.get(baseURL + `/getClientePorNombre?Vendedor[eq]=${Vendedor}&Nombre=${Cliente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getClienteRIF(rifCliente) {
  try {
    const res = await axios.get(baseURL + `/getClientes?Rif[eq]=${rifCliente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getSaldoPendienteCliente(Codigo) {
  try {
    const res = await axios.get(baseURL + `/getSaldoPendiente?Codigo=${Codigo}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

// Real Estate Requests
export async function getUsuario(username)
{
  try {
    const res = await axios.get(baseURL + `/getUser?username=${username}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function registrarPersona(fullname, dni, genero, phone, correo, address, id_user)
{
  try {
    const res = await axios.post(baseURL + `/registrarPersona?fullname=${fullname}&dni=${dni}&genero=${genero}&phone=${phone}&correo=${correo}&address=${address}&id_user=${id_user}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}