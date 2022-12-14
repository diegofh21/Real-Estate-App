import axios from "axios";

let baseURL = `http://127.0.0.1:8000/api`;

// Request para pasar de página (FUNCIONA EN TODOS)
export async function RequestPage(url) {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

// Real Estate Requests
export async function getUsuario(username) {
  try {
    const res = await axios.get(baseURL + `/getUser?username=${username}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getPersona(id_user) {
  try {
    const res = await axios.get(baseURL + `/getPersona?id_user=${id_user}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function EditPersona(id_user, fullname, dni, address, phone, gender) {
  try {
    const res = await axios.put(baseURL + `/editPersona?id_user=${id_user}&fullname=${fullname}&dni=${dni}&address=${address}&phone=${phone}&genero=${gender}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getAllInmuebles() {
  try {
    const res = await axios.get(baseURL + `/getAllInmuebles`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getInmueblesPublicados(id_agente) {
  try {
    const res = await axios.get(baseURL + `/getInmueblesPublicados?id_agente=${id_agente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function getInmueblesFavoritos(id_propiedad) {
  try {
    const res = await axios.get(baseURL + `/getInmueblesPublicados?id_propiedad=${id_propiedad}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function postInmueble(titulo, ubicacion, descripcion, precio, tipo, bathroom, habitaciones, estacionamientos, estado, id_agente) {
  try {
    const res = await axios.post(baseURL + `/postInmueble?titulo=${titulo}&ubicacion=${ubicacion}&descripcion=${descripcion}&precio=${precio}&tipo=${tipo}&bathroom=${bathroom}&habitaciones=${habitaciones}&estacionamientos=${estacionamientos}&estado=${estado}&id_agente=${id_agente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function updateInmueble(id_propiedad, titulo, ubicacion, descripcion, precio, tipo, bathroom, habitaciones, estacionamientos, estado) {
  try {
    const res = await axios.put(baseURL + `/updateInmueble?id_propiedad=${id_propiedad}&titulo=${titulo}&ubicacion=${ubicacion}&descripcion=${descripcion}&precio=${precio}&tipo=${tipo}&bathroom=${bathroom}&habitaciones=${habitaciones}&estacionamientos=${estacionamientos}&estado=${estado}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function deleteInmueble(id_propiedad) {
  try {
    const res = await axios.delete(baseURL + `/deleteInmueble?id_propiedad=${id_propiedad}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function Favorito(id_cliente, id_propiedad) {
  try {
    const res = await axios.post(baseURL + `/makeFavoritos?id_cliente=${id_cliente}&id_propiedad=${id_propiedad}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function CuentaFavorito(id_cliente) {
  try {
    const res = await axios.get(baseURL + `/cuentaFavoritos?id_cliente=${id_cliente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function FavoritoPropiedades(id_cliente) {
  try {
    const res = await axios.get(baseURL + `/propiedadesFavoritos?id_cliente=${id_cliente}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

export async function buscarInmueble(ubicacion, bathrooms, habitaciones, estacionamientos, tipo, estado) {
  try {
    const res = await axios.get(baseURL + `/busquedaInmuebles?ubicacion=${ubicacion}&bathroom=${bathrooms}&habitaciones=${habitaciones}&estacionamientos=${estacionamientos}&tipo=${tipo}&estado=${estado}`);
    return res.data;
  } catch (error) {
    console.log(error)
  }
}

// export async function registrarPersona(fullname, dni, genero, phone, correo, address, id_user)
// {
//   try {
//     const res = await axios.post(baseURL + `/registrarPersona?fullname=${fullname}&dni=${dni}&genero=${genero}&phone=${phone}&correo=${correo}&address=${address}&id_user=${id_user}`);
//     return res.data;
//   } catch (error) {
//     console.log(error)
//   }
// }