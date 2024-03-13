import {jwtDecode} from "jwt-decode";
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseUrl } from "./constants/Constants";

const updateUserToken = async () => {

  const refreshToken = Cookies.get("refresh");

  try {
    const res = await axios.post(baseUrl+'auth/token/refresh', {
      'refresh': refreshToken
    });

    if(res.status === 200){
      Cookies.set('access', res.data.access);
      Cookies.set('refresh', res.data.refresh);
      
      let decoded = jwtDecode(res.data.access);
      return {'name': decoded.first_name, isAuthenticated: true,user_id:decoded.user_id};

    } else {
      return {'name': null, isAuthenticated: false,user_id:null};
    }

  } catch (error) {
    return {'name': null, isAuthenticated: false,user_id:null};
  }

}

const isAuthUser = async () => {

  const accessToken = Cookies.get("access");
  console.log(accessToken, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
  if(!accessToken) {
    return {'name': null, isAuthenticated: false};
  }

  const currentTime = Date.now() / 1000;  
  let decoded = jwtDecode(accessToken);

  if (decoded.exp > currentTime) {
    return {'name':decoded.first_name,isAuthenticated:true,user_id:null};
  
  } else {

    const updateSuccess = await updateUserToken();
    return updateSuccess;

  }

};

export default isAuthUser;