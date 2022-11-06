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
import { DashboardSupervisor } from './views/Supervisor/DashboardSupervisor';
import { ConsultaPedido } from './views/Pedidos/ConsultaPedido';
import { ConsultaFactura } from './views/Facturas/ConsultaFactura';
import { ConsultaCliente } from './views/Clientes/ConsultaCliente';
import { PedidoPDF } from './views/PDF/PedidoPDF';
import { PageNotFound } from './views/404/PageNotFound';
import { Info } from './views/Info';
import { EditUser } from './views/EditUser';
import { Formulario } from './views/Formulario';



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
              <Route path="/info" element={<Info />}></Route>

               {/* Página para editar Datos del usuario y Agente*/}
               <Route path="/edituser" element={<EditUser />}></Route>

              {/* Página para publicar Inmueble */}
              <Route path="/formulario" element={<Formulario />}></Route>

              {/* En caso de no encontrar ningúna ruta de las especificadas*/}
              <Route path="/*" element={
                <PageNotFound></PageNotFound>
              }></Route>
            </> :
            <>
              {/* Página de inicio */}
              <Route path="/" element={<LandingPage />} />

              {/* Página de panel de supervisor */}
              <Route path="/panel-administrativo" element={<DashboardSupervisor />}></Route>

              {/* Página de panel de vendedor */}
              <Route path="/dashboard" element={<Dashboard />}></Route>
              {/* Rutas de módulos del panel de vendedor */}
              <Route path="/consulta-pedidos" element={<ConsultaPedido />}></Route>
              <Route path="/consulta-facturas" element={<ConsultaFactura />}></Route>
              <Route path="/consulta-clientes" element={<ConsultaCliente />}></Route>



              {/* PDF */}
              <Route path="/generar-pdf" element={<PedidoPDF />}></Route>

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
