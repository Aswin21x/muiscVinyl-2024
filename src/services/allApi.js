import { commonAPI } from "./comonAPI"
import SERVER_URL from "./serverUrl"


//adminDisData
export const getDisplayData = async(searchKey)=>{
  return await commonAPI("GET",`${SERVER_URL}/get-display-data?search=${searchKey}`,"","")
}
//adminInfoData
export const getInfoData = async(id)=>{
  return await commonAPI("GET",`${SERVER_URL}/get-info-data/${id}`,"","")
}



//add to cart
export const addToCart = async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${SERVER_URL}/add-to-cart`,reqBody,reqHeader)
}

//get Cart Data
export const getCartApi = async(reqHeader)=>{
return await commonAPI("GET",`${SERVER_URL}/get-cart-data`,"",reqHeader)
}
//delete cart data
export const deleteCartApi = async (id,reqHeader)=>{
  return await commonAPI("DELETE",`${SERVER_URL}/remove-cart/${id}`,{},reqHeader)
}
//incre
export const incrementApi = async (id,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/cart-increment/${id}`,"",reqHeader)
}

//decre
export const decrementApi = async (id,reqHeader)=>{
  return await commonAPI("GET",`${SERVER_URL}/cart-decrement/${id}`,"",reqHeader)
}

//---------//

//register api
export const registerAPI = async(user)=>{
  return await commonAPI("POST",`${SERVER_URL}/register`,user,"")
}

//login api
export const loginAPI = async(user)=>{
  return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}