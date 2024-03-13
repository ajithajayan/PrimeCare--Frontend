import axios from "axios"
import Login from "../pages/userSide/UserLogin"

const BACKEND_DOMAIN = "http://localhost:8000"

const REGISTER_URL = `${BACKEND_DOMAIN}/api/v1/users/`
const LOGIN_URL = `${BACKEND_DOMAIN}/api/v1/auth/jwt/create/`
const ACTIVATE_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/activation/`
const RESET_PASSWORD_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password/`
const RESET_PASSWORD_CONFIRM_URL = `${BACKEND_DOMAIN}/api/v1/auth/users/reset_password_confirm/`



// Register user

const register = async (userData) => {
  const config = {
    headers: {
      "Content-type" : "application/json"
    }
  }

  const responce = await axios.post(REGISTER_URL, userData, config)

  return responce.data
}


// Login user

const login = async (userData) => {
  const config = {
    headers: {
      "Content-type" : "application/json"
    }
  }
  const responce = await axios.post(LOGIN_URL, userData, config)

  if(responce.data){
    localStorage.setItem("user", JSON.stringify(responce.data))
  }
  return responce.data
}


//Logout

const logout = () => {
  
  return localStorage.removeItem("user")
}


//Activate User

const activate = async (userData) => {
  const config = {
    headers: {
      "Content-type":"application/json"
    }
  }
  const responce = await axios.post(ACTIVATE_URL, userData, config)

  return responce.data
}


const authService = {register, login, logout, activate}

export default authService