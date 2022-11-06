import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import AuthUser from '../components/AuthUser';

import belmenyLogo from '../assets/img/logoBG.png';
import userIcon from '../assets/img/user-icon-resize.png';

import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Splide, SplideSlide } from '@splidejs/react-splide';

import { getMetasPorVendedor, getProgresoVert, getProgresoIngco, getProgresoGlobal, getTopVendedoresZona, getInfoCobranza, getVentasAnualesEnCurso } from '../api/request';

import '@splidejs/react-splide/css';

export const Dashboard = () => {

  // State del usuario
  const { user, getToken } = AuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    // if (user.CodVendedor === 'master') {
      // alert('NO ERES EL USUARIO MAESTRO')
      // navigate('/register')
    // }
    // loadMetasYProgreso()
    setLoading(false);
  }, []);

  // State del loading
  const [loading, setLoading] = useState(true);

  // States de datos
  // const [metas, setMetas] = useState([]);
  // const [progresoVert, setProgresoVert] = useState('');
  // const [progresoIngco, setProgresoIngco] = useState('');
  // const [progreso, setProgreso] = useState('');

  // const [chartData, setChartData] = useState({});
  // const [topData, setTopData] = useState({});
  // const [pieDataActualMonth, setPieDataActualMonth] = useState({});
  // const [pieDataLastMonth, setPieDataLastMonth] = useState({});
  // const [ventasAnualActual, setVentasAnualActual] = useState({});
  // const [options, setOptions] = useState({})

  // const now = new Date();

  // const loadMetasYProgreso = async () => {
  //   const metasRes = await getMetasPorVendedor(user.CodVendedor);
  //   setMetas(metasRes.data[0])

    // Mes anterior
    // // const oneMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 1, 1).toLocaleDateString('default', { month: 'long' })
    // const firstDayPastMonth = JSON.stringify(new Date(now.getFullYear(), now.getMonth() - 1, 1)).slice(1, 11)
    // const lastDayPastMonth = JSON.stringify(new Date(now.getFullYear(), now.getMonth(), 0)).slice(1, 11)

    // Mes actual
    // const firstDay = JSON.stringify(new Date(now.getFullYear(), now.getMonth(), 1)).slice(1, 11);
    // const lastDay = JSON.stringify(new Date(now.getFullYear(), now.getMonth() + 1, 0)).slice(1, 11);

    // const progresoVertRes = await getProgresoVert(user.CodVendedor, firstDay, lastDay)
    // const progresoIngcoRes = await getProgresoIngco(user.CodVendedor, firstDay, lastDay)

    // EN CASO DE QUE ESTE SINCRONIZANDO, HAY QUE SETEAR LOS PROGRESOS EN 0
    // setProgresoIngco(0)
    // setProgresoVert(0)
    // var ProgresoGlobal = 0

    // SI YA ESTA SINCRONIZADO ENTONCES SE PUEDEN COLOCAR SUS DATOS REALES
    // setProgresoVert(progresoVertRes[0].TotalVendido.toFixed(2))
    // setProgresoIngco(progresoIngcoRes[0].TotalVendido.toFixed(2))
    // var ProgresoGlobal = parseFloat(progresoVertRes[0].TotalVendido.toFixed(2)) + parseFloat(progresoIngcoRes[0].TotalVendido.toFixed(2))
    // setProgreso(ProgresoGlobal.toFixed(2))

    // const ventasAnualActualRes = await getVentasAnualesEnCurso(user.CodVendedor)

    // setChartData({
    //   labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    //   datasets: [
    //     {
    //       fill: true,
    //       data: [
    //         ventasAnualActualRes.Enero[0].Enero,
    //         ventasAnualActualRes.Febrero[0].Febrero,
    //         ventasAnualActualRes.Marzo[0].Marzo,
    //         ventasAnualActualRes.Abril[0].Abril,
    //         ventasAnualActualRes.Mayo[0].Mayo,
    //         ventasAnualActualRes.Junio[0].Junio,
    //         ventasAnualActualRes.Julio[0].Julio,
    //         ventasAnualActualRes.Agosto[0].Agosto,
    //         ventasAnualActualRes.Septiembre[0].Septiembre,
    //         ventasAnualActualRes.Octubre[0].Octubre,
    //         0,
    //         0
    //       ],
    //       label: 'Ventas anuales',
    //       borderColor: 'rgb(53, 162, 235)',
    //       backgroundColor: 'rgba(53, 162, 235, 0.5)'

    //     }
    //   ]
    // })

    // setOptions({
    //   indexAxis: 'y',
    //   elements: {
    //     bar: {
    //       borderWidth: 2,
    //     },
    //   },
    //   responsive: true,
    //   plugins: {
    //     legend: {
    //       position: 'right',
    //     },
    //     title: {
    //       display: true,
    //       text: 'Top Vendedores del mes',
    //     },
    //   },
    // });

    // var arrColoresGraficoTop = []

    // switch (metasRes.data[0].zona) {
    //   case 'Occidente':
    //     arrColoresGraficoTop = [
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#f39c12",
    //       "#f39c12",
    //       "#f39c12",
    //       "#f39c12",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //     ]
    //     break;

    //   case 'Oriente':
    //     arrColoresGraficoTop = [
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#f39c12",
    //       "#f39c12",
    //       "#f39c12",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //     ]
    //     break;

    //   case 'Llanos':
    //     arrColoresGraficoTop = [
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#f39c12",
    //       "#f39c12",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //     ]
    //     break;

    //   case 'Centro - Occidente':
    //     arrColoresGraficoTop = [
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#f39c12",
    //       "#f39c12",
    //       "#e74c3c",
    //       "#e74c3c",
    //     ]
    //     break;

    //   case 'Centro':
    //     arrColoresGraficoTop = [
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#f39c12",
    //       "#f39c12",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //     ]
    //     break;

    //   case 'Andina':
    //     arrColoresGraficoTop = [
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#2ecc71",
    //       "#f39c12",
    //       "#f39c12",
    //       "#f39c12",
    //       "#f39c12",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //       "#e74c3c",
    //     ]
    //     break;

    //   case 'Amazonas':
    //     arrColoresGraficoTop = [
    //       "#2ecc71",
    //     ]
    //     break;

    //   default:
    //     break;
    // }

    // const topRes = await getTopVendedoresZona(metasRes.data[0].zona, firstDay, lastDay)

    // setTopData({
    //   labels: topRes.map((Vendedor) => Vendedor.Nombre),
    //   datasets: [
    //     {
    //       label: [`Vendedores`],
    //       data: topRes.map((Ventas) => Ventas.total_vendido),
    //       backgroundColor: arrColoresGraficoTop
    //     },
    //   ],
    // })

    // const cobranzasResLastMonth = await getInfoCobranza(user.CodVendedor, firstDayPastMonth, lastDayPastMonth)

    // setPieDataLastMonth({
    //   labels: ['Pagado', 'Abonado', 'Pendiente'],
    //   datasets: [
    //     {
    //       label: 'Información sobre pagos, abonos y pendientes',
    //       data: [cobranzasResLastMonth.Cancelado[0].Cancelado, cobranzasResLastMonth.Abonado[0].Abonado, cobranzasResLastMonth.Pendiente[0].Pendiente],
    //       borderColor: [
    //         '#2ecc71',
    //         '#f1c40f',
    //         '#e74c3c',
    //       ],
    //       backgroundColor: [
    //         '#2ecc71',
    //         '#f1c40f',
    //         '#e74c3c',
    //       ]
    //     }
    //   ]
    // })

    // const cobranzasResActualMonth = await getInfoCobranza(user.CodVendedor, firstDay, lastDay)

    // setPieDataActualMonth({
    //   labels: ['Pagado', 'Abonado', 'Pendiente'],
    //   datasets: [
    //     {
    //       label: 'Información sobre pagos, abonos y pendientes',
    //       data: [cobranzasResActualMonth.Cancelado[0].Cancelado, cobranzasResActualMonth.Abonado[0].Abonado, cobranzasResActualMonth.Pendiente[0].Pendiente],
    //       borderColor: [
    //         '#2ecc71',
    //         '#f1c40f',
    //         '#e74c3c',
    //       ],
    //       backgroundColor: [
    //         '#2ecc71',
    //         '#f1c40f',
    //         '#e74c3c',
    //       ]
    //     }
    //   ]
    // })

  //   setLoading(false)
  // }

  return (
    <>
      <Layout>
        <div className="container-fluid mt-5">
          {
            (loading) ?
              <>
                <div className="text-center">
                  <div className="m-auto spinner">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </div>
              </> :
              <>

                {/* Div para movil */}
                <div className="text-center d-sm-none">
                  {/* <img width={80} src={belmenyLogo} alt="Logo Belmeny Group" className='text-center mt-3 drop-shadow' /> */}
                </div>

                {/* Div para web */}
                <div className='d-none d-md-block'>
                  <div className="container-fluid rounded">
                    <div className="row">
                      <div className="col">
                        <div className="belmeny-text">
                          <h2 className='fs-1'><strong>Bienvenido</strong></h2>
                          <h3>Usuario</h3>
                          <h5><i>Codigo</i></h5>
                        </div>
                      </div>
                      <div className="col">
                        <img src={userIcon} alt="Icon" className='float-end me-5 drop-shadow' />
                      </div>
                    </div>

                    <div className="dashboard-title mt-2 mb-3">
                      <h4 className='bg-belmeny text-light px-5 rounded-pill'>Inicio</h4>
                    </div>
                    <div className="row">

                      

                      <div className="col-sm-9">
                        {/* <div className="m-auto" style={{ width: "102%" }}>
                          <Chart type='bar' data={topData} className='mb-4 ' options={options} />
                        </div> */}
                        <div className='mt-5 belmeny-text division' />
                        <div className="text-end">
                          <a href="https://www.facebook.com/belmeny.vert/" target={'_blank'} className='fb-btn belmeny-text me-3'>
                            <span className='fs-1'><FaFacebook /></span>
                          </a>
                          <a href="https://twitter.com/vert_productos?lang=es" target={'_blank'} className='tw-btn belmeny-text me-3'>
                            <span className='fs-1'><FaTwitter /></span>
                          </a>
                          <a href="https://www.instagram.com/vert.productos/?hl=es" target={'_blank'} className='ig-btn belmeny-text me-3'>
                            <span className='fs-1'><FaInstagram /></span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          }
        </div>
      </Layout>
    </>

  );
}
