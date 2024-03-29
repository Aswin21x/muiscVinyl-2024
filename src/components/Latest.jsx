import React from 'react'
import './latest.css'
import openimg1 from '../assets/imgFolder/img1.jpeg'
import openimg2 from '../assets/imgFolder/img9.jpeg'
import openimg3 from '../assets/imgFolder/img7.jpeg'
import openimg4 from '../assets/imgFolder/img6.jpeg'
import openimg5 from '../assets/imgFolder/img12.jpeg'
import openimg6 from '../assets/imgFolder/img11.jpeg'
import openimg7 from '../assets/imgFolder/img15.jpeg'
import openimg8 from '../assets/imgFolder/img8.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

function Latest() {

  const navigate = useNavigate()

const handleDisplay = ()=>{
  if(sessionStorage.getItem('token')){
    navigate("/display")
  }else{

 toast('Login First!',
 {
   icon: '😊',
   style: {
     borderRadius: '10px',
     background: '#333',
     color: '#fff',
   },
 }
);
setTimeout(() => {
  navigate("/login")
}, 1500);
  }
}


  return (
    <div className='latest'>
   <div  className="container">
      <div className="row effect p-5 text-light">

        <hr />
      <p style={{  opacity: '0.8'}} data-aos="fade-up" className='p-2'> 
"Explore our curated collection of vinyl genres, featuring timeless classics and contemporary hits across a diverse range including Pop, R&B, Hip-Hop, Classical, Rock, Country, EDM, and Metal. Immerse yourself in the rich tapestry of music history with our latest collections."</p>

<div className='text-center'>
    <button  onClick={handleDisplay} data-aos="fade-up" className='btn btn-danger  mb-4 w-50 viewwmore'>View More <i class="fa-solid fa-angle-right"></i></button>
  
</div>
<hr />
<div>
</div>
<div className='text-center'><p data-aos="fade-up">Genres in our collection !</p></div>
        <div  onClick={handleDisplay}   data-aos="fade-up"  className="col-lg-3 col-md-4 col-sm-6 p-5 wrapper">

          <img src={openimg8} alt="Image 1" className="img-fluid latest-img" /> 
          <p className='text-center m-3'>POP</p>
          <hr />

        </div>

          <div onClick={handleDisplay}  data-aos="fade-up"  className="col-lg-3 col-md-4 col-sm-6 p-5">
  
            <img  src={openimg2} alt="Image 2" className="img-fluid latest-img" /> 
            <p className='text-center m-3'>R&B</p>
  <hr />
          </div>
          <div  onClick={handleDisplay} data-aos="fade-up" className="col-lg-3 col-md-4 col-sm-6 p-5">
     <img src={openimg3}alt="Image 3" className="img-fluid latest-img" /> 
            <p className='text-center m-3'>HIP-HOP</p>
  <hr />
          </div>
          <div  onClick={handleDisplay}  data-aos="fade-up" className="col-lg-3  col-md-4 col-sm-6 p-5">
    <img src={openimg4} alt="Image 4" className="img-fluid latest-img" /> 
            <p className='text-center m-3'>CLASSICAL</p>
  <hr />
          </div>
          <div   onClick={handleDisplay} data-aos="fade-up" className="col-lg-3 col-md-4 col-sm-6 p-5">
            <img src={openimg5} alt="Image 5" className="img-fluid latest-img" />
            <p className='text-center m-3'>ROCK</p>
  
          </div>
          <div  onClick={handleDisplay} data-aos="fade-up" className="col-lg-3 col-md-4 col-sm-6 p-5">
            <img src={openimg6} alt="Image 6" className="img-fluid latest-img" />
            <p className='text-center m-3'>COUNTRY</p>
  
          </div>
          <div  onClick={handleDisplay} data-aos="fade-up" className="col-lg-3 col-md-4 col-sm-6 p-5">
            <img src={openimg7} alt="Image 7" className="img-fluid latest-img" />
            <p className='text-center m-3'>EDM</p>
  
          </div>
          <div  onClick={handleDisplay} data-aos="fade-up"  className="col-lg-3 col-md-4 col-sm-6 p-5">
            <img src={openimg1} alt="Image 8" className="img-fluid latest-img" />
            <p className='text-center m-3'>METAL</p>
  
          </div>
        </div>
      </div>

    <Toaster />
    </div>
  )
}

export default Latest