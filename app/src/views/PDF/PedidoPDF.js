import React, { useState, useEffect } from 'react'
import jsPDF from 'jspdf'

import AuthUser from '../../components/AuthUser';
import { getProductosPDF, RequestPage, GetClienteRIF } from '../../api/request';

import belmenyLogo from '../../assets/img/logo-png.png';

export const PedidoPDF = (props) => {

  // console.log(props.Pedido.Documentos)

  var Usuario = props.user
  var Pedido = props.Pedido

  var CodigoCliente, Documento, Fecha

  // console.log(props)

  CodigoCliente = Pedido.CodCliente
    Documento = Pedido.Documentos
    Fecha = Pedido.Fecha

  if(props.PedidoBuscado)
  {
    console.log(Pedido)
    CodigoCliente = Pedido.Codcliente
    Documento = Pedido.Documento
    Fecha = Pedido.fechayhora.split(" ")[0]
  }

  var today = new Date()
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const generatePDF = async () => {
    var doc = new jsPDF();

    const Cliente = await GetClienteRIF(Usuario.CodVendedor, CodigoCliente)
    // console.log(Cliente)

    //Cabecera
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(18)
    doc.text("Ferreteria Belmeny, CA", 10, 20);
    doc.setFontSize(10)
    doc.text("R.I.F.: J-000000000 / N.I.T.: -", 10, 25);
    doc.text("LA LIMPIA MARACAIBO, EDO - ZULIA. TLF: 0261-7593849. FAX: -", 10, 30);
    doc.addImage(belmenyLogo, "PNG", 166, 15, 20, 20);

    //PARTE DE PEDIDO
    doc.setFontSize(18)
    doc.setTextColor("#051a92")
    doc.text("Pedido de Ventas", 200, 40, null, null, "right");
    doc.setTextColor("#cb3837")
    doc.text(""+Documento, 175, 47, null, null, "center");
    doc.setTextColor("#000")

    doc.setLineWidth(0.5);

    doc.setFontSize(10)

    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(150, 50, 50, 30, 3, 3, "FD");

    doc.line(150, 55, 200, 55);
    doc.line(150, 65, 200, 65);
    doc.line(175, 50, 175, 80);
    doc.line(150, 70, 200, 70);

    doc.text("Emisión", 163, 54, null, null, "center");
    doc.text(""+Fecha, 162, 61, null, null, "center");

    doc.text("Vence", 187, 54, null, null, "center");
    doc.text(""+date, 187, 61, null, null, "center");

    doc.text("Orden", 163, 69, null, null, "center");
    doc.text("#00000", 162, 76, null, null, "center");

    doc.text("Página", 187, 69, null, null, "center");
    doc.text("1", 187, 76, null, null, "center");

    doc.setFontSize(14)
    doc.text(Usuario.CodVendedor + " - " + Usuario.Nombre, 175, 90, null, null, "center");
    //FIN PARTE DE PEDIDO

    //INFORMACION CLIENTE
    doc.setFontSize(12)

    // Black square with rounded corners
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(10, 40, 130, 60, 3, 3, "FD");

    doc.line(10, 60, 140, 60);
    doc.line(10, 80, 140, 80);
    doc.line(10, 90, 140, 90);

    doc.setFontSize(10)
    doc.text("Cliente", 12, 45);
    doc.text("Cliente: R.I.F.:" + CodigoCliente + " \n" + Cliente.data[0].Nombre, 12, 45, {
      maxWidth: 120
    });

    doc.text("Domicilio fiscal", 12, 65)
    doc.text("Domicilio fiscal: " + Cliente.data[0].DireccionFiscal, 12, 65, {
      maxWidth: 130
    })

    doc.text("Teléfono", 12, 85)
    doc.text("Teléfono: " + Cliente.data[0].Telefono1, 12, 85)

    doc.text("Correo", 12, 95)
    doc.text("Correo: " + Cliente.data[0].Correo, 12, 95)
    //FIN INFORMACION CLIENTE

    //CONTENIDO
    doc.setFontSize(12)
    doc.setFontSize(9)
    doc.setLineWidth(1);
    doc.line(10, 105, 200, 105);
    doc.text("Código", 15, 110)
    doc.text("Cantidad", 35, 110)
    doc.text("Articulo", 57, 110)
    doc.text("Precio Unitario", 139, 110)
    doc.text("Total Neto", 172, 110)
    doc.line(10, 112, 200, 112);

    const productos = await getProductosPDF(Documento);
    // console.log(productos.data.length)

    let textSpacing = 120

    // Primera pagina
    for (let i = 0; i < productos.data.length; i++) {
      doc.text(productos.data[i].Codigo, 10, textSpacing)
      doc.text("" + productos.data[i].Cantidad, 42, textSpacing)
      doc.text(productos.data[i].Nombre, 57, textSpacing, {
        maxWidth: 70
      })
      doc.text("$" + productos.data[i].PrecioUnit.toFixed(2), 145, textSpacing)
      doc.text("$" + productos.data[i].Subtotal.toFixed(2), 175, textSpacing)
      textSpacing += 20

      switch (i) {
        case 7:
          textSpacing = 25
          doc.addPage()
          doc.setPage(2)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 20:
          textSpacing = 25
          doc.addPage()
          doc.setPage(3)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 33:
          textSpacing = 25
          doc.addPage()
          doc.setPage(4)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 47:
          textSpacing = 25
          doc.addPage()
          doc.setPage(5)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 60:
          textSpacing = 25
          doc.addPage()
          doc.setPage(6)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 73:
          textSpacing = 25
          doc.addPage()
          doc.setPage(7)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 86:
          textSpacing = 25
          doc.addPage()
          doc.setPage(8)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 99:
          textSpacing = 25
          doc.addPage()
          doc.setPage(9)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 112:
          textSpacing = 25
          doc.addPage()
          doc.setPage(10)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 125:
          textSpacing = 25
          doc.addPage()
          doc.setPage(11)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 138:
          textSpacing = 25
          doc.addPage()
          doc.setPage(12)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 151:
          textSpacing = 25
          doc.addPage()
          doc.setPage(13)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 164:
          textSpacing = 25
          doc.addPage()
          doc.setPage(14)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 177:
          textSpacing = 25
          doc.addPage()
          doc.setPage(15)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 190:
          textSpacing = 25
          doc.addPage()
          doc.setPage(16)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 203:
          textSpacing = 25
          doc.addPage()
          doc.setPage(17)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 216:
          textSpacing = 25
          doc.addPage()
          doc.setPage(18)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 229:
          textSpacing = 25
          doc.addPage()
          doc.setPage(19)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 242:
          textSpacing = 25
          doc.addPage()
          doc.setPage(20)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 255:
          textSpacing = 25
          doc.addPage()
          doc.setPage(21)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 268:
          textSpacing = 25
          doc.addPage()
          doc.setPage(22)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 281:
          textSpacing = 25
          doc.addPage()
          doc.setPage(23)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 294:
          textSpacing = 25
          doc.addPage()
          doc.setPage(24)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 307:
          textSpacing = 25
          doc.addPage()
          doc.setPage(25)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 320:
          textSpacing = 25
          doc.addPage()
          doc.setPage(26)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 333:
          textSpacing = 25
          doc.addPage()
          doc.setPage(27)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 346:
          textSpacing = 25
          doc.addPage()
          doc.setPage(28)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 359:
          textSpacing = 25
          doc.addPage()
          doc.setPage(29)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 372:
          textSpacing = 25
          doc.addPage()
          doc.setPage(30)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 385:
          textSpacing = 25
          doc.addPage()
          doc.setPage(31)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 398:
          textSpacing = 25
          doc.addPage()
          doc.setPage(32)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 411:
          textSpacing = 25
          doc.addPage()
          doc.setPage(33)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 424:
          textSpacing = 25
          doc.addPage()
          doc.setPage(34)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 437:
          textSpacing = 25
          doc.addPage()
          doc.setPage(35)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 450:
          textSpacing = 25
          doc.addPage()
          doc.setPage(36)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 463:
          textSpacing = 25
          doc.addPage()
          doc.setPage(37)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 476:
          textSpacing = 25
          doc.addPage()
          doc.setPage(38)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 489:
          textSpacing = 25
          doc.addPage()
          doc.setPage(39)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        case 502:
          textSpacing = 25
          doc.addPage()
          doc.setPage(40)
          doc.line(10, 10, 200, 10);
          doc.text("Código", 15, 15)
          doc.text("Cantidad", 35, 15)
          doc.text("Articulo", 57, 15)
          doc.text("Precio Unitario", 135, 15)
          doc.text("Total Neto", 170, 15)
          doc.line(10, 17, 200, 17);
          break;

        default:
          break;
      }
    }
    //FIN CONTENIDO

    //PIE DE PÁGINA
    doc.setLineWidth(0.5)
    doc.setFontSize(14)
    doc.rect(10, 260, 190, 20);
    doc.text("Descuento: $"+Pedido.Descuento, 15, 270)
    doc.text("Total neto: $"+Pedido.Monto, 140, 270)
    //FIN PIE DE PÁGINA

    var fileName = 'Pedido ' + Documento + '.pdf'
    doc.save(fileName)
  }
  return (
    <div>
      <button onClick={generatePDF} className='btn btn-primary btn-sm mb-2'>Generar Reporte</button>
    </div>
  )
}
