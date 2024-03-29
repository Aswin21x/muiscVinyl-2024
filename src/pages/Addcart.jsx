import React, { useEffect, useState } from 'react'
import "./addcart.css"
import { decrementApi, deleteCartApi, getCartApi, incrementApi } from '../services/allApi'
import SERVER_URL from '../services/serverUrl';
import { Link, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function Addcart() {

  const navigate = useNavigate()

  const [cartData,setCartData]=useState([]);
  const [loading,setLoading] = useState("true")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const displayData = async () =>{
    const token = sessionStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}`
      }    
    try{
      const result = await getCartApi(reqHeader);
      // console.log(result);
      if (result.status===200) {
        setCartData(result.data)
        console.log(result.data);
        console.log(cartData);
      }
      

    }catch(err){
      console.log(err);
    }finally {
      setLoading(false);
      
    }
  }

  }


  //remove
  const handleDelete = async (id)=>{
    console.log(id);
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}`
      }
try{
  const result = await deleteCartApi(id,reqHeader)
  console.log(result);
  if (result.status===200) {
    toast.success("Item removed 🥲 ")
    displayData();

  }

}catch(err){
  console.log(err);
}
    }
  }


  //increment cart
  const handleIncrement = async (id)=>{
    const token = sessionStorage.getItem("token")
    if (token) {
      const reqHeader = {
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${token}`
      }
      const result = await incrementApi(id,reqHeader)
      if (result.status===200) {
        displayData()
        
      }else{
        toast.error("Quantity Exceeded")
      }
      console.log(result);
    }
  }

  //decrement
    const handleDecrement = async (id)=>{
      const token = sessionStorage.getItem("token")
      if (token) {
        const reqHeader = {
          "Content-Type":"application/json",
          "Authorization" : `Bearer ${token}`
        }
        const result = await decrementApi(id,reqHeader)
        if (result.status===200) {
          displayData()
        }
        console.log(result);
      }
    }
  

    //
    const handleConform = ()=>{
      handleClose()
      toast(
        "😍Your order has been successfully placed.\n\nA confirmation email will be sent to you shortly. Thank you for shopping with us!🥳. ",
        {
          duration: 4000,
        }
      );
      setCartData([])

      setTimeout(() => {
        navigate("/display")

      }, 4000);

    }

  useEffect(()=>{
   
    setTimeout(() => {
      displayData()
    }, 200);
  },[])
  
  return (
    
    <div className='cart text-light'>
    <Link to={'/'}>
      <button className='btn btn-dark text-secondary fs-6 m-4'><i className="fa-solid fa-house fa-sm"></i></button>
    </Link>
    <div className="container">
      <div className='text-center text-secondary p-5 fs-5'>RETRO RYTHEMS</div>
      <div className='row rounded' style={{ marginBottom: "60px" }}>
        <div className='col-lg-9 col-md-10 col-sm-12 mx-auto'> {/* Center the columns on medium and larger screens */}
          <div className="table-responsive"> 
            {loading ?   (
              <div className='d-flex justify-content-center text-center p-5'>
                <Spinner animation="border" variant="danger" />
              </div>
            ) : cartData.length === 0 ? (
              <div className="text-center text-secondary p-5">
                <p>No items available here ! </p>
              </div>
            )  : (
              <table className="table">
                <thead>
                  <tr>
                    <th className='text-secondary' style={{backgroundColor:"black"}}></th>
                    <th className='text-secondary' style={{backgroundColor:"black"}}>Album</th>
                    <th className='text-secondary' style={{backgroundColor:"black"}}>Price</th>
                    <th className='text-secondary' style={{backgroundColor:"black"}}>Quantity</th>
                    <th className='text-secondary' style={{backgroundColor:"black"}}>Total</th>
                    <th className='text-secondary' style={{backgroundColor:"black"}}></th>
                    <th className='text-secondary' style={{backgroundColor:"black"}}></th>

                  </tr>
                </thead>
                <tbody>
                  {cartData.length > 0 && cartData.map((cart, index) => (
                    <tr key={index}>
                      
                      <td className='text-secondary' style={{backgroundColor:"black"}}>
                        <img style={{width:"40px",height:"40px"}} src={`${SERVER_URL}/adminUploads/${cart?.images}`} alt="Product"/>
                      </td>
                      <td className='text-danger' style={{backgroundColor:"black"}}>{cart?.title}</td>
                      <td className='text-success' style={{backgroundColor:"black"}}>$ {cart?.price}</td>
                      
                      <td className='text-secondary' style={{backgroundColor:"black"}}>
                        <button onClick={()=>handleDecrement(cart._id)} className='btn text-warning'><i className="fa-solid fa-xs fa-minus"></i></button> 
                        {cart?.quantity} 
                        <button onClick={()=>handleIncrement(cart._id)} className='btn text-warning'><i className="fa-solid fa-plus fa-xs"></i></button>
                      </td>
                      <td className='text-success' style={{backgroundColor:"black"}}>$ {cart?.totalPrice}</td>
                      <td className='text-danger' style={{backgroundColor:"black"}}>
                        <button onClick={() => handleDelete(cart._id)} className='btn text-danger'><i className="fa-solid fa-trash"></i></button>
                      </td>
                      <td className='text-danger' style={{backgroundColor:"black"}}></td>

                    </tr>

                    
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-12 checkout '>
          <div className='text-center mb-2'>TOTAL: $ {cartData.reduce((total, cart) => total + cart.totalPrice, 0)} </div>
          <div className='text-center mb-3'><button onClick={handleShow} className='btn btn-danger'>Checkout {cartData?.price }</button></div>
        </div>
      </div>
    </div>
   
    {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control placeholder="1234 Main St" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Phone</Form.Label>
        <Form.Control placeholder="+91" />
      </Form.Group>
{/* 
      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Label>Address 2</Form.Label>
        <Form.Control placeholder="Apartment, studio, or floor" />
      </Form.Group> */}

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>Kerala</option>
            <option>Tamil Nadu</option>
            <option>Andhra Pradesh</option>
            <option>Karnataka</option>
            <option>Assam</option>
            <option>Madhya Pradesh</option>
            <option>Maharashtra</option>
            <option>Rajasthan</option>
            <option>Gujarat</option>

          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

    </Form>


        </Modal.Body>
        <Modal.Footer>
         
          <Button onClick={handleConform} variant="danger">Conform</Button>
        </Modal.Footer>
      </Modal>

    <Toaster />

  </div>





  )
}

export default Addcart