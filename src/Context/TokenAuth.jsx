import React, { createContext, useState } from 'react'
import { useEffect } from 'react'
export const tokenAuthContext = createContext()

function TokenAuth({children}) {
    const [isAuthorized,setIsAuthorized] = useState(false)
    useEffect(()=>{
if(sessionStorage.getItem("token")){
    setIsAuthorized(true)
}else{
    setIsAuthorized(false)
}
    },[isAuthorized])
  return (
    <>
  <tokenAuthContext.Provider value={{isAuthorized,setIsAuthorized}}  >{children}</tokenAuthContext.Provider>
    </>
  )
}

export default TokenAuth