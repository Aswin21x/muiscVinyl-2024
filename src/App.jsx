import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Aboutinfo from './pages/Aboutinfo'
import Display from './pages/Display'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import "aos/dist/aos.css"
import aos from 'aos'
import { useContext, useEffect } from 'react'
import Register from './pages/Register'
import Addcart from './pages/Addcart'
import { tokenAuthContext } from './Context/TokenAuth'

function App() {

  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)




  useEffect(()=>{
    aos.init({easing:"linear"})
  },[])

  return (
    <>
    <Routes>
<Route path='/' element={<Home></Home>} ></Route>
<Route path='/login' element={<Register></Register>}></Route>
<Route path='/register' element={<Register insideRegister></Register>}></Route>

<Route path='/display' element={isAuthorized ?  <Display></Display> : <Home></Home> } ></Route>
<Route path='/about/:id' element={ isAuthorized ?  <Aboutinfo></Aboutinfo> : <Home></Home> }></Route>
<Route path='/addcart' element={ isAuthorized ? <Addcart/>  : <Home></Home> }></Route>
<Route path='/*' element={  <Navigate to={'/'}/>}/>

    </Routes>
   <Footer></Footer>
    </>
  )
}

export default App
