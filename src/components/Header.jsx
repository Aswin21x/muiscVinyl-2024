import React from 'react'

import { Link } from 'react-router-dom';
import './header.css'



function Header() {
  return (
    <div id='header'>
    <div  className='container m-1'>
      <div className='row'>
        <div className='col-lg-8 '>
        <Link to={'./'} style={{textDecoration:'none'}} >  <h3 style={{ color: 'black' }} >RETRO RHYTHMS</h3></Link>
        </div>
        <div className='col-lg-4 col-sm-4'>
          {/* <button className='btn-link'>Login</button> */}
        </div>

      </div>

    </div>
   
  </div>
  )
}

export default Header