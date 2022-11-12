import React, { useState, useEffect } from 'react';

// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Context
import { AppContext } from "./lib/contextLib";

// Componentes
import AuthUser from './components/AuthUser';
import { Header } from './components/Header'

// Vistas
import { LandingPage } from './views/LandingPage'
import { Inmuebles } from './views/Inmuebles'
import { Login } from './views/Login'
import { Register } from './views/Register';
import { Dashboard } from './views/Dashboard';
import { PageNotFound } from './views/404/PageNotFound';
import { AboutUs } from './views/AboutUs';
import { EditUser } from './views/EditUser';
import { PublicarInmueble } from './views/Inmuebles/PublicarInmueble';
import { DetalleInmueble } from './views/Inmuebles/DetalleInmuebleFav';

// Estilos
import './index.css';
import './assets/scss/App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'rsuite/dist/rsuite.min.css'



function App() {

  // State del usuario
  const { getToken } = AuthUser();

  useEffect(() => {
  }, []);

  // Function to clear complete cache data
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
    });
    alert('Complete Cache Cleared')
  };

  return (
    <>
      <Routes>
        {
          (!getToken()) ?
            <>
              {/* Página de inicio */}
              <Route path="/" element={<LandingPage />} />

              {/* Página para ver todos los inmuebles publicados */}
              <Route path="/ver-inmuebles" element={<Inmuebles />} />

              {/* Página de inicio de sesión */}
              <Route path="/login" element={<Login />}></Route>

              {/* Página para registrar nuevos usuarios */}
              <Route path="/register" element={<Register />}></Route>

              {/* Página para visualizar Quienes somos */}
              <Route path="/about-us" element={<AboutUs />}></Route>

              {/* Página para editar Datos del usuario y Agente*/}
              <Route path="/edituser" element={<EditUser />}></Route>

              {/* En caso de no encontrar ningúna ruta de las especificadas*/}
              <Route path="/*" element={
                <PageNotFound></PageNotFound>
              }></Route>
            </> :
            <>
              {/* Página de inicio */}
              <Route path="/" element={<LandingPage />} />

              {/* Página para ver todos los inmuebles publicados */}
              <Route path="/ver-inmuebles" element={<Inmuebles />} />

              {/* Página para visualizar Quienes somos */}
              <Route path="/about-us" element={<AboutUs />}></Route>

              {/* Página de panel de vendedor */}
              <Route path="/dashboard" element={<Dashboard />}></Route>

              {/* Página para publicar Inmueble */}
              <Route path="/inmuebles" element={<Inmuebles />}></Route>

              {/* Página para publicar Inmueble */}
              <Route path="/publicar-inmueble" element={<PublicarInmueble />}></Route>

              {/* Página para editar Datos del usuario y Agente*/}
              <Route path="/perfil" element={<EditUser />}></Route>

              {/* En caso de no encontrar ningúna ruta de las especificadas*/}
              <Route path="/*" element={
                <PageNotFound></PageNotFound>
              }></Route>
            </>
        }
      </Routes>
    </>
  );
}

export default App;
