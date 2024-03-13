import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { set_Authentication } from "../../Redux/authentication/authenticationSlice";
import { baseUrl } from "../../utils/constants/Constants";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { set_user_basic_details } from "../../Redux/userBasicDetails/userBasicDetailsSlice";

function UserLogin() {
  const { state } = useLocation();
  const [message, setmessage] = useState(null);
  const [formError, setFormError] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if(state){
  //     setmessage(state)
  //   }

  //   navigate('', {});

  // }, [navigate])

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    console.log("yep reach here\n");
    setFormError([]);
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    console.log(Object.fromEntries(formData));
    console.log(formData);
    try {
      const res = await axios.post(baseUrl + "auth/login", formData);
      if (res.status === 200) {
        // localStorage.setItem('access', res.data.access)
        // localStorage.setItem('refresh', res.data.refresh)
        Cookies.set("access", res.data.access);
        Cookies.set("refresh", res.data.refresh);
        console.log("the access token ",res.data.access);
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
            is_doctor: res.data.is_doctor,
            user_id: jwtDecode(res.data.access).user_id,
          })
          
        );
        console.log(res.data.is_doctor, "this is the status");
        console.log(res.data.is_doctor);
        if (res.data.is_doctor) {
          navigate("/doctor/dashboard");
          return res;
        } else {
          navigate("/");
          return res;
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.detail);
      // if (error.response.status===401)
      // {

      //   setFormError(error.response.data)
      // }
      // else
      // {
      //   console.log(error);

      // }
    }
  };
  // const Google_login = async (user_detail) => {
  //   const formData = new FormData();
  //   formData.append("email", user_detail.email);
  //   formData.append("password", "12345678874");
  //   console.log("formData");
  //   console.log(Object.fromEntries(formData));

  //   try {
  //     const res = await axios.post(baseUrl + "auth/login", formData);
  //     console.log(res);
  //     if (res.status === 200) {
  //       Cookies.set("access", res.data.access);
  //       Cookies.set("refresh", res.data.refresh);
  //       dispatch(
  //         set_Authentication({
  //           name: jwtDecode(res.data.access).first_name,
  //           isAuthenticated: true,
  //           isAdmin: res.data.isAdmin,
  //           is_doctor: res.data.is_doctor,
  //         })
  //       );
  //       console.log(res.data.is_doctor, "this is the status");
  //       if (res.data.is_doctor) {
  //         navigate("/doctor/dashboard");
  //         return res;
  //       } else {
  //         navigate("/");
  //         return res;
  //       }
  //     }

  //     if (res.response.status === 401) {
  //       navigate("/auth/signup");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };




  const GoogleTestlogin = async(user_detail) =>{
    const formData = {
      client_id: user_detail,
    } 
    await axios.post(baseUrl + 'auth/google', formData).then((res)=>{
      console.log(res)
      Cookies.set("access", res.data.access);
      Cookies.set("refresh", res.data.refresh);
      dispatch(
        set_Authentication({
          name: jwtDecode(res.data.access).first_name,
          isAuthenticated: true,
          isAdmin: res.data.isAdmin,
          is_doctor: res.data.is_doctor,
        })
      );
      toast.success("You have successfully login")
      if(!res.data.accountExist){
      setTimeout(() => { toast.sucess('Welcome To NaviGo') }, 3000);
      }
      navigate('/')
      return res
      
    }).catch((err)=>{
      console.log(err);
      if (err.response.status === 401) {
        navigate("/auth/login");
      }else if(err.response.status === 403){
        toast.error(err.response.data.detail)
        console.log(err.response.data.detail)
        navigate("/auth/login");
      }

    })
  }

  return (
    <div className="login-container">
      <div className="container">
        <div className="heading">Patient Login</div>
        <form className="form" method="POST" onSubmit={handleLoginSubmit}>
          <input
            required=""
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required=""
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <span className="forgot-password">
            <a href="#">Forgot Password ?</a>
          </span>
          <input
            className="login-button"
            type="submit"
            defaultValue="Sign In"
          />
          <p className="p">
            Don't have an account?{" "}
            <Link className="span" to="/auth/register">
              Sign Up
            </Link>
          </p>
        </form>
        <div className="social-account-container">
          <span className="title">Or Sign in with</span>
          <div className="social-accounts">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                GoogleTestlogin(credentialResponse.credential)
                
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
        <span className="agreement">
          <a href="#">Learn user licence agreement</a>
        </span>
      </div>
      <div className="w-full h-40 flex items-center justify-center cursor-pointer">
        <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
          <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full" />
          <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className="w-5 h-5 text-green-400"
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              stroke="currentColor"
              fill="none"
              className="w-5 h-5 text-green-400"
            >
              <path
                d="M14 5l7 7m0 0l-7 7m7-7H3"
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <Link to="/auth/doctor/login">
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
              Login as A Doctor
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
