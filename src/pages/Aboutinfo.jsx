import React, {useEffect, useState } from "react";
import { addToCart, getInfoData } from "../services/allApi";
import { Link, useParams } from "react-router-dom";
import "./aboutinfo.css";
import SERVER_URL from "../services/serverUrl";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from 'react-hot-toast'

function Aboutinfo() {

  const { id } = useParams();
  const [aboutData, setAboutData] = useState([]);
  const [loading,setLoading] = useState(true)
 
  const infoData = async () => {
    try {
      const result = await getInfoData(id);
      if (result.status === 200) {
        setAboutData(result.data);
      }
    } catch (err) {
      console.log(err);
    } finally{
      setLoading(false)
    }
  };
  console.log(aboutData);

  

  const handleToCart = async (aboutData) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}`
      }
      aboutData.quantity = 1;
try{
  const result = await addToCart(aboutData,reqHeader)
console.log(result);
if (result.status === 200) {
  toast.success(`Added to your Cart !❤️😁`)

}else{
  toast.error("Maximum quantity exceeded !😒")

}
} catch(err){
  console.log(err);
}     
}  
  }


  
  

  useEffect(() => {
    window.scrollTo(0, 0);
    
    setTimeout(()=>{
      infoData()
    },500)
  }, []);

  return (
    <div className="info-page">
<Link to={'/'}>
    <button className='btn btn-dark text-secondary fs-6 m-3'> <i className="fa-solid fa-house fa-sm"></i></button>
  </Link>
      <div className="container">
        
        <div  className="row">
          <div  className="col-lg-6 col-md-6 col-sm-12">
            <div className="mt-5 text-light">
              <h3 className="fw-bold">{aboutData?.title} </h3>
            </div>
            <div className=" text-light">
              <h4 className="text-success">$ {aboutData?.price}</h4>
            </div>
            <h6 className="text-danger">  {aboutData?.category}</h6>

            
            <div className="mt-3 text-light">
              <h4>  {aboutData?.artist}</h4>

            </div>

            <div className="mt-4">
<div className="mt-3 mb text-light p-5">
<h5 className="text-danger">Tracks</h5>
  <ul>
  {aboutData?.tracklist && typeof aboutData?.tracklist === 'string' ? (
    // Split the tracklist string by newline characters and map over each track
    aboutData?.tracklist.split('\n').map((track, index) => (
      <li key={index}>{track}</li>
    ))
  ) : (
    // If aboutData?.tracklist is not available or not a string, render a placeholder message
    <li>No tracklist available</li>
  )}
</ul>


</div>
</div>
<div className="text-light mt-3 mb-3" v>
              <h6>
                <i class="fa-solid fa-quote-left"></i> {aboutData?.description} {" "}
                <i class="fa-solid fa-quote-right"></i>
              </h6>
            </div>
 
          </div>

          {loading?(
  <div className="text-center p-5">
               <Spinner animation="border" variant="danger" />

  </div>
):(

          <div  className="col-lg-6 col-md-6 col-sm-12 p-5">
<div className="text-center d-flex align-items-center albumcover">
  <img  className="img-fluid p-5" src={`${SERVER_URL}/adminUploads/${aboutData?.images}`} alt="" />
<Link to={"/addcart"}>
    <button  className="btn text-light position-absolute top-0 end-0 m-3"><i className="fa-solid fa-lg fa-cart-shopping"></i></button>
  
</Link></div>


<div className="text-white text-center mt-3">
  <p>Format : Vinyl <i class="fa-solid fa-compact-disc"></i></p>
<p className="text-danger">LIMITED TO 2 PER CUSTOMER.</p>

           </div>
           <div className="text-center">
      <button onClick={()=>handleToCart(aboutData)} className="btn btn-danger">Add to cart</button>

    </div>
          </div> )}
          
        </div>
      </div>
      <Toaster />

    </div>
  );
}

export default Aboutinfo;
