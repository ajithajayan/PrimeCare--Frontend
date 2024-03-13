import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../utils/constants/Constants";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    re_password: "",
    user_type: "client",
  });

  const {
    first_name,
    last_name,
    email,
    phone_number,
    password,
    re_password,
    user_type,
  } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.authentication_user
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name) {
      toast.error("Please enter a name");
    }
    if (first_name.indexOf(" ") !== -1 || last_name.indexOf(" ") !== -1) {
      toast.error("Enter a valid name");
    } else if (!email) {
      toast.error("Please enter an email address");
    }
    //  else if (first_name.replaceAll(/\s/g, "") > 3) {
    //   setFormError("Type more");
    // }
    else if (password.trim() === "") {
      toast.error("Please enter a password");
    } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
      toast.error("Invalid email address");
    } else if (password != re_password) {
      toast.error("password do not match");
    } else {
      const userData = {
        first_name,
        last_name,
        email,
        phone_number,
        password,
        user_type,
      };
      try {
        const response = await axios.post(baseUrl + "auth/register", userData);
        toast.success("An activation OTP has been sent to your email. Please check your email");
        console.log(userData.email);
        
        navigate("/auth/otp", {
          state: { email: userData.email },
        });
      } catch (error) {
        
        toast.error("Email already exists");
      }
      
      // dispatch(register(userData))
    }
  };

  const Google_reg = async (user_detail) => {
    const formData = new FormData();
    formData.append("email", user_detail.email);
    formData.append("first_name", user_detail.given_name);
    formData.append("last_name", user_detail.family_name);
    formData.append("user_type", "client");
    formData.append("password", "12345678874");
    try {
      const res = await axios.post(baseUrl + "auth/register", formData);
      console.log(res);
      if (res.status === 201) {
        console.log("Saved successfully man");
        navigate("/auth/login", {
          state: res.data.Message,
        });
        return res;
      }
    } catch (error) {
      console.log("DafdAA\n\n", error);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
      toast.success(
        "An activation email has been sent to your email.please check your email"
      );
    }
  });

  return (
    <div className="regis">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Patient Register</p>
        <p className="message text-red-500 font-bold"></p>
        <div className="flex">
          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              name="first_name"
              value={first_name}
              onChange={handleChange}
            />
            <span>Firstname</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="text"
              className="input"
              name="last_name"
              value={last_name}
              onChange={handleChange}
            />
            <span>Lastname</span>
          </label>
        </div>
        <label>
          <input
            required
            placeholder=""
            type="email"
            className="input"
            name="email"
            value={email}
            onChange={handleChange}
          />
          <span>Email</span>
        </label>
        <label>
          <input
            required
            placeholder=""
            type="tel"
            pattern="\d{10}"
            className="input"
            name="phone_number"
            value={phone_number}
            onChange={handleChange}
          />
          <span>Phone Number</span>
        </label>

        <label>
          <input
            required
            placeholder=""
            type="password"
            className="input"
            name="password"
            value={password}
            onChange={handleChange}
          />
          <span>Password</span>
        </label>
        <label>
          <input
            required
            placeholder=""
            type="password"
            className="input"
            name="re_password"
            value={re_password}
            onChange={handleChange}
          />
          <span>Confirm password</span>
        </label>
        <div className="flex-1 flex-row">
        
          <button type="submit" className="submit">
            Submit
          </button>
        </div>
        <p className="signin">
          Already have an account? <Link to="/auth/login">Sign in</Link>
        </p>
      </form>

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
          <Link to="/auth/doctor/register">
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">
              Register as A Doctor
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
