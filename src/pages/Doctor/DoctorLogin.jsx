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
import patientImage from "../../assets/images/doctor/patient.png.webp";
import DocImage from "../../assets/images/doctor/loginSvg.svg";


function DoctorLogin() {
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
        console.log(res.data);
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
            is_doctor: res.data.is_doctor,
          })
        );
        console.log(res.data.is_doctor, "this is the status");
        console.log(res.data.is_doctor);
        if (res.data.is_doctor) {
          navigate("/doctor/dashboard");
          return res;
        } else {
          navigate("/auth/doctor/login");
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

  const GoogleTestlogin = async (user_detail) => {
    const formData = {
      client_id: user_detail,
    };
    await axios
      .post(baseUrl + "auth/google/doctor", formData)
      .then((res) => {
        console.log(res);
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
        toast.success("You have successfully login");
        if (!res.data.accountExist) {
          setTimeout(() => {
            toast.sucess("Welcome To Elder care");
          }, 3000);
        }
        navigate("/doctor/dashboard");
        return res;
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          navigate("/auth/doctor/login");
        } else if (err.response.status === 403) {
          toast.error(err.response.data.detail);
          console.log(err.response.data.detail);
          navigate("/auth/doctor/login");
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen px-5 sm:px-0">
      <div className="flex bg-gray-200 bg-opacity-40 rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-gray-200 bg-opacity-0"
          style={{
            backgroundImage: `url(${DocImage})`, // Change the URL path to patient image
          }}
        ></div>

        <div className="w-full p-8 lg:w-1/2  ">
          <p className="text-3xl text-gray-600 font-bold  text-white  text-center">
            Doctor Login
          </p>
          <form className="form" method="POST" onSubmit={handleLoginSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="email"
                id="email"
                required
              />
            </div>
            <div className="mt-4 flex flex-col justify-between">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
              </div>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                type="password"
                id="password"
              />
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
              >
                Forget Password?
              </a>
            </div>
            <div className="mt-8">
              <button className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
                Login
              </button>
            </div>
          </form>

          <div className="flex px-5 justify-center w-auto py-3">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                GoogleTestlogin(credentialResponse.credential);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>

          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-white capitalize text-center w-full"
            >
              Don&apos;t have any account yet?
              <Link className="span" to="/auth/register">
                Sign Up
              </Link>
            </a>
          </div>
        </div>
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
          <Link to="/auth/login">
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
              Login as A Patient
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;
