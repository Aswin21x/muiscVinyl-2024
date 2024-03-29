import React, { useContext, useEffect, useState } from 'react'
import homeimg from '../assets/imgFolder/homeimg.jpg'
import './home.css'
import Latest from '../components/Latest';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { tokenAuthContext } from '../Context/TokenAuth';

function Home() {

  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)

  const [logoutStatus, setLogOutStatus] = useState(false)
  const [logInStatus, setLogInStatus] = useState(true)
  


  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setLogInStatus(false);
      setLogOutStatus(true);
    }
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = ()=>{
    sessionStorage.clear()
    setLogOutStatus(false)
    setTimeout(() => {
      toast('Successfully logged out 🙁 !',
      {
        icon: '😵‍💫',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }
     );
      setLogInStatus(true);
      setIsAuthorized(false)

  
    }, 1000);


  }
  

  return (
    <>

<div id='banner'>
<div>
  <div>
      <div> 
      
        <img id='himag'className='img-fluid'  src={homeimg} alt="img not available" style={{width:'100%', opacity: 0.2}}  />
<Link to={'./'}>       <div className='text-overlaytop'> <h2 style={{fontFamily:"sans-seriff"}}> RETRO RHYTHMS </h2></div></Link>
{logInStatus&&<div className='text-overlayright '> <Link to={'/login'} style={{textDecoration:"none",color:"white"}}> <button className='btn btn-dark'>Login <i class="fa-solid fa-compact-disc"></i></button></Link> </div>
}
{logoutStatus&& <div className='text-overlayright'><button onClick={handleLogout}   className='btn btn-dark'><i class="fa-solid fa-right-from-bracket"></i> Logout <i class="fa-solid fa-compact-disc"></i></button></div>}
        <div className='text-overlay'>
        <h1 style={{fontFamily: "serif"}}  className='hover-effect' >

        START YOUR VINYL JOURNEY </h1>




       </div>

       <div className='text-overlay2 '>
              <p style={{ fontFamily: "Comic Sans MS" }}>Welcome to the Exquisite World of Imported Vinyl...</p>
            </div>

       </div>
       <marquee>
<div className='container-fluid mt-5 d-flex justify-content-between'>
       <div className='text-center p-3 text-light' ><h5 style={{  opacity: '0.8'}} ><i class="fa-solid fa-record-vinyl"></i> Latest Vinyl Collections</h5>   
 </div>
 <div className='text-center p-3 d-flex text-light' ><h5 style={{  opacity: '0.8'}} > <i class="fa-solid fa-shield-halved"></i> Safe & secure checkout</h5>   
 </div>
 <div className='text-center p-3 d-flex text-light' ><h5 style={{  opacity: '0.8'}} ><i class="fa-solid fa-earth-asia"></i> International shipping</h5>   
 </div>

 
 
      </div>
      </marquee>
      
      </div>
      </div>
</div>

<Latest></Latest>
    </>
  )
}

export default Home