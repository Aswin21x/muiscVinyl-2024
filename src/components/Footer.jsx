import React from 'react'
import './footer.css'

function Footer() {
  return (
    
    <div className='d-flex align-items-center justify-content-center text-danger footer '>
          <div className=' container my-4 mt-5 '>
           <div className='row mt-5'>
            <div className='col-lg-4 '>
              <h5 className=' mt-4 fw-bold'> RETRO RHYTHEMS </h5>
          
              <p className='text-secondary'> " Rediscover the Joy of Music, One Record at a Time"</p>
            
            </div>
            <div className='col-lg-4'>
              <h5 className='mt-4 fw-bold fs-6 mb-3'>About US</h5>
              <p className='text-secondary'> "Your premier destination for vinyl enthusiasts, offering an extensive collection of records. With our commitment to fast delivery, you can enjoy your favorite tunes sooner. Explore our curated selection and experience the joy of vinyl today."</p>
              
            </div>
  
    
            <div className='col-lg-4 '>
              <h5 className='mt-4 fw-bold fs-6 mb-3 text-center'>MISSING YOUR FAVOURITE ALBUM?
</h5>
<h6 className=' fs-6 mb-3 text-center text-secondary'>We Love to get your opinion about what we should release!</h6>
              <input className='form-control mx-auto d-block w-50 text-center' placeholder='Request Here !' type="text" />
              <button className='mt-2 text-center mx-auto d-block btn btn-secondary'>Send</button>
              <p className='text-center my-2  text-secondary'>2024ReactProject ©Aswin.A </p>
              <div className='text-center text-secondary'>
                <i class="fa-brands fa-github me-2 "></i>
                <i class="fa-brands fa-linkedin me-2 "></i>
                <i class="fa-regular fa-envelope"></i>
              </div>
              
            </div>
            
    
    
    
           </div>
    
    
          </div>
        </div> 
  
  )
}

export default Footer