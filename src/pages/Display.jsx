import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './display.css'
import { getDisplayData } from '../services/allApi'
import { useEffect } from 'react'
import SERVER_URL from '../services/serverUrl'
import { Spinner } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import searchimg from '../assets/imgFolder/magnifying-glass-solid.svg'

function Display() {

const [allImages,setAllImages] = useState([])
const [loading,setLoading] = useState(true)
const [username,setUsername]= useState("")
const [searchkey,setSearchKey]= useState("")
console.log(searchkey);
const displayData = async ()=>{
  try{
    const result = await getDisplayData(searchkey)
    if(result.status===200){
      setAllImages(result.data)
    const user =  sessionStorage.getItem("username")
      setUsername(user)

      const hasVisited = sessionStorage.getItem("visited");
      if (!hasVisited) {
        if (user) {
          toast(`Welcome ✨ ${user} ❤️`,
  {
    // icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
        } 
        sessionStorage.setItem("visited", "truue");
      }
      
    }else{
setUsername("")
    }

  }catch(err){
console.log(err);
  } finally {
    setLoading(false);
    
  }
}
console.log(allImages);
console.log(searchkey);


useEffect(()=>{

  window.scrollTo(0, 0);
  setTimeout(()=>{

    displayData()
  },200)
  // if(username){
  //   toast.success(`welcome${username}`)
  // }
},[searchkey])



  return (
    <>
    <div className='display'>
    <div className="d-flex justify-content-between">
  <Link to={'/'}>
    <button className='btn btn-dark text-secondary fs-6 m-4'><i className="fa-solid fa-house fa-sm"></i></button>
  </Link>
  <input onChange={e=>setSearchKey(e.target.value)} type="text"  placeholder='Search by albums ' className='search text-center text-light' />
</div>



    <h1  className='text-center text-danger ' style={{fontFamily:"sans-seriff"}}>CATALOGUE</h1>

      <div className="container text-secondary">


        <div className="row custom-row ">
          <h3 className='mt-5 fw-bold' ata-aos="fade-down" data-aos-duration="1000"> LATEST RELEASE</h3>


      { loading? (
        <div className='d-flex justify-content-center text-center p-5'>
           <Spinner animation="border" variant="danger" />
           

        </div>
      ): allImages.length===0? (
        <div className='text-center'> No albums found 😴</div>
      ):(
      
      allImages.length>0 && allImages.map((display,index)=>(
              
      <div id="div1" key={index} data-aos="fade-down" data-aos-duration="500"className="col-lg-3 p-5  col-md-4 col-sm-4 col-xs-4  "
      >
      <Link to={`/about/${display?.albumid}`} style={{textDecoration:'none'}}>
        <img  src={`${SERVER_URL}/adminUploads/${display?.images}`} alt="Image 1" className="img-fluid image-container mt-2 rounded" />
      </Link>
      <h6 className='text-center fw-bold  mt-3'>{display?.artist}</h6>
      <h6 className='text-center text-danger mt-3'>{display?.title} <i class="fa-solid fa-circle-play"></i></h6>


    </div>)
      ))}

  
        </div>
      </div>
      <Toaster />

    </div>

  </>
  )
}

export default Display