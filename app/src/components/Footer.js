import React from 'react'

import { FaFacebook, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import { IoMailUnread, IoPaperPlane } from "react-icons/io5";

import realEstateLogo from '../assets/img/realEstate-logo.png';

export const Footer = () => {
  return (
    <>
      <div className="footer bg-belmeny-footer">
        <div className="container text-light pt-3 pb-3">
          <div className="row text-center">
            <div className="col">
              Dirección:
              <p><a href="https://www.google.com/maps/place/Universidad+Privada+Dr.+Rafael+Belloso+Chacín/@10.6938131,-71.6365258,17z/data=!3m1!4b1!4m5!3m4!1s0x8e899ecd22a1b721:0xd2cfab5751fcd5cc!8m2!3d10.6938078!4d-71.6343318" target={'_blank'} className='text-decoration-none text-light border-0' rel="noreferrer">Universidad Dr. Rafael Belloso Chacín (URBE)</a></p>
              <br />
              Contacto:
              <p><IoPaperPlane /> 0424-6820193 / 0412-4721828 <br />
                <IoMailUnread /> dfuenmayordev@gmail.com <br /> <IoMailUnread /> massielocandomendez@gmail.com</p>
            </div>
            <div className="col">
              
            </div>
            <div className="col">
              <img width={80} src={realEstateLogo} alt="Real Estate Logo" className='text-center drop-shadow' />
              <br />
              {/* <div className="row mt-3">
                <div className="col">
                  <a href="https://www.facebook.com/belmeny.vert/" target={'_blank'} className='fb-btn'>
                    <span className='fs-1'><FaFacebook /></span>
                  </a>
                </div>
                <div className="col">
                  <a href="https://twitter.com/vert_productos?lang=es" target={'_blank'} className='tw-btn'>
                    <span className='fs-1'><FaTwitter /></span>
                  </a>
                </div>
                <div className="col">
                  <a href="https://www.instagram.com/vert.productos/?hl=es" target={'_blank'} className='ig-btn'>
                    <span className='fs-1'><FaInstagram /></span>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
          <hr />
          <small>Real Estate App © {new Date().getFullYear()}</small>
          {/* - Made with <span className="text-danger"><FaHeart/></span> by Diego & Massiel */}
        </div>
      </div>
    </>
  )
}
