import axios from "axios";

let baseURL = `http://127.0.0.1:8000/api`;

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

export async function getPersona(id_user) {
  try {
    const res = await axios.get(baseURL + `/getPersona?id_user=${id_user}`);
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