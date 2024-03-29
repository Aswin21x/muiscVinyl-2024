import React, { useContext, useEffect, useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast'
import { loginAPI, registerAPI } from '../services/allApi';
import { tokenAuthContext } from '../Context/TokenAuth';

function Register({insideRegister}) {

  const navigate = useNavigate()
useEffect(()=>{
  window.scrollTo(0, 0);

})
const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)

const [loginStatus,setLoginStatus]=useState(false)
const [regStatus,setRegStatus]=useState(false)
//
const [userValid, setUserValid]= useState(false)
const [emailValid,setEmailValid]=useState(false)
const [passValid,setPassValid]=useState(false)

const [userInputData, setUserInputData]=useState({
  username:"",email:"",password:""
  })
  console.log(userInputData);

  const handleInput = (e)=>{
    const {name,value}= e.target
    if(name==='username'){
      if(value.match(/^[a-zA-Z ]{5,15}$/)){
        setUserValid(false)
      }else{
        setUserValid(true)

      }
    }
    
if (name==='email'){
  if(value.match(/^[a-z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)){
    setEmailValid(false)
  }else{
    setEmailValid(true)
  }
}

if (name==='password'){
  if(value.match(/^[a-zA-Z-0-9]{5,15}$/)){
    setPassValid(false)
  }else{
    setPassValid(true)
  }
}
setUserInputData({...userInputData,[name]:value})

  }




//register
const handleRegister = async (e)=>{
  e.preventDefault()

const {username,email,password}=userInputData
if(!username || !email || !password){
 toast('Fill all the data!',
 {
   icon: '😵‍💫',
   style: {
     borderRadius: '10px',
     background: '#333',
     color: '#fff',
   },
 }
);
   
}else{

 try{
   const result = await registerAPI(userInputData)
   console.log(result);
   if (result.status===200){

     setUserInputData({username:"",email:"",password:""})
setRegStatus(true)
     //navigate to loggin
     setTimeout(()=>{
       navigate('/login')
       setRegStatus(false)

     },2000)


   }else{
     toast.error(result.response.data)
   }
 }catch(err){
   console.log(err);
 }
}
}
//login
const handleLogin = async (e)=>{
  e.preventDefault()

const {email,password}=userInputData
if(!email || !password){

 toast('Fill all the data!',
 {
   icon: '😵‍💫',
   style: {
     borderRadius: '10px',
     background: '#333',
     color: '#fff',
   },
 }
);
   
}else{

 try{
   const result = await loginAPI({email,password})
   console.log(result);
   if (result.status===200){
    //store token , username
    sessionStorage.setItem("username",result.data.existingUser.username)
    sessionStorage.setItem("token",result.data.token)

    setUserInputData({email:"",password:""})

    // toast.success("Logged Successfully..",{
    //   position:"top-center"
    // })
    setLoginStatus(true)
    setIsAuthorized(true)

     //navigate to landing pages
     setTimeout(()=>{
       navigate('/display')
     },2000)


   }else{
     toast.error(result.response.data)
   }
 }catch(err){
   console.log(err);
 }
}}



    return (
      <div data-aos="zoom-in" data-aos-duration="500"  style={{height: '100vh',backgroundColor:"black"}} className='d-flex justify-content-center align-items-center'>
        <div className='container-w-50 shadow'>
          <div className='text-center align-items-center'>
          {loginStatus ? ( <div><img src="https://i.postimg.cc/kgRzPBxy/Check-mark-animation.gif"style={{height:"110px" , width:"155px"}} alt="" />
          
          
          <p className='text-light'><span className="text-danger">Logged Successfully!</span> please wait...</p>
          </div>
          
          ): regStatus ? (
            <div>
              <p  className='text-light'><span className="text-danger">Registered Successfully!</span> Redirecting to login page...</p>
            </div>
          ) :
          
          
          (
              <div className='card-shadow bg-dark rounded shadow p-5'>
                <div className='text-end'><Link to={'/'}  > <button className='btn text-danger btn-border-info'>  <i class="fa-solid fa-xmark fa-lg"></i> </button></Link></div>
            
                <h4 className='m-2 text-center text-light mb-4'>Sign {insideRegister ? 'Up' : 'In'}</h4>
                <Form>
                  {insideRegister &&
                    <Form.Group className="mb-3" 
                    controlId="formBasicName">
                      <Form.Control value={userInputData.username} onChange={handleInput} name='username' type="text" placeholder="Enter your name" />
                      { userValid  &&
                    <div className='text-danger mt-3'>*Invalid Username</div>
                  }

                    </Form.Group>
                  }
                 

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control onChange={handleInput} name='email' type="email" placeholder="Enter your email" />
                  </Form.Group>
                  { emailValid  &&
                    <div className='text-danger mb-3'>*Invalid Email address</div>
                  }

                  <Form.Group className="mb-3" controlId="formBasicPsw">
                    <Form.Control onChange={handleInput} name='password' type="password" placeholder="Enter your password" />
                  </Form.Group>
                  { passValid  &&
                    <div className='text-danger mb-3'>*Invalid Password</div>
                  }

                </Form>
               

                {insideRegister ? 
                  <div className='text-center'>
                    <button onClick={handleRegister} className='btn btn-danger mb-2'> Register</button>
                    <p className='text-light'>Already have an Account? <Link to={'/login'} className='text-danger'> Login  </Link></p>
                  </div> :
                  <div className='text-center'>
                    <button onClick={handleLogin} className='btn btn-danger mb-2'>Login  </button>
                    <p className='text-light'>New User? <Link to={'/register'} className='text-danger'>Register</Link></p>
                  </div>
                  
                }
               {loginStatus&& <img src="https://i.postimg.cc/kgRzPBxy/Check-mark-animation.gif"style={{height:"110px" , width:"170px"}} alt="" />}
              </div>)}
          </div>
        </div>
        <Toaster />

      </div>
    )
  }
  

export default Register