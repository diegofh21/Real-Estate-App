import React from 'react'
import { IoReturnDownBack } from "react-icons/io5";
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <div className="vertical-center bg-lighten">
		<div className="container">
			<div id="notfound" className="text-center">
				<h1>😥</h1>
				<h2>Oops! Página no encontrada</h2>
				<p>Lo sentimos pero la página que estas buscando no existe o fue removida.</p>
				<Link to="/" className='text-decoration-none btn btn-lg btn-danger rounded-pill mt-3'><IoReturnDownBack /> Ir al inicio</Link>
			</div>
		</div>
	</div>
  )
}
