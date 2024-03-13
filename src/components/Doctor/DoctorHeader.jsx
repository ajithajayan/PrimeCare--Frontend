import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { logout, reset } from "../../features/authSlice";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../assets/my logo.png";
import Cookies from "js-cookie";
import Notification from "../Notification/Notification";
import NotificationIcon from "../Notification/NotificationIcon";
import axios from "axios";
import { baseUrl } from "../../utils/constants/Constants";
import NotificationModal from "../Notification/NotificationModal";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import prime from "../../assets/prime.png";

const registerIcon = (
  <svg
    className="fill-current text-blue-300 h-5 w-5 mr-2 mt-0.5"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M19 13H21V16H24V18H21V21H19V18H16V16H19V13M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2M12 4A6 6 0 0 1 18 10H16A4 4 0 0 0 12 6A4 4 0 0 0 8 10H6A6 6 0 0 1 12 4M12 8A2 2 0 1 1 10 10A2 2 0 0 1 12 8Z" />
  </svg>
);

const loginIcon = (
  <svg
    className="fill-current text-green-300 h-5 w-5 mr-2 mt-0.5"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z" />
  </svg>
);

const logoutIcon = (
  <svg
    className="fill-current text-red-500 h-5 w-5 mr-2 mt-0.5"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM17 13H7v-2h10v2z" />
  </svg>
);

const accountIcon = (
  <svg
    className="fill-current h-5 w-5 mr-2 mt-0.5"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M12,2A5,5 0 0,1 17,7A5,5 0 0,1 12,12A5,5 0 0,1 7,7A5,5 0 0,1 12,2M12,14C15.31,14 20,15.79 20,18V20H4V18C4,15.79 8.69,14 12,14M12,4A3,3 0 0,1 15,7A3,3 0 0,1 12,10A3,3 0 0,1 9,7A3,3 0 0,1 12,4Z" />
  </svg>
);

const DocotrHeader = () => {
  const debouncedToast = debounce((message) => {
    toast.info(`New Notification: ${message}`);
  }, 1000);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [customID, setCustomID] = useState(null);
  const { name, isAuthenticated, user_id } = useSelector(
    (state) => state.authentication_user
  );

  const handleLogout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin: false,
      })
    );
    navigate("/auth/login");
  };

  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [data, setData] = useState(null);

  const [notification, setNotification] = useState([]);

  const fetchData = async (customId) => {
    try {
      const response = await axios.get(
        `${baseUrl}notification/doctor-side/doctor-notification/${customId}/`
      );
      setNotification(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user_id) {
      axios.get(baseUrl + `auth/custom-id/doctor/${user_id}`).then((res) => {
        fetchData(res.data.doctor_user.custom_id);
        setCustomID(res.data.doctor_user.custom_id);

        const wsURL = `ws://127.0.0.1:8000/ws/doctor-notification/${res.data.doctor_user.custom_id}/`;
        const socket = new WebSocket(wsURL);
        console.log(wsURL);

        socket.onopen = () => {
          console.log("WebSocket connection established");
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          setData(data);
        };

        socket.onclose = (event) => {
          console.log("WebSocket connection closed", event);
        };

        return () => {
          socket.close();
        };
      });
    }
  }, [user_id]);

  return (
    <>
      <nav className="flex flex-wrap justify-between items-center py-4 bg-white/80 backdrop-blur-md shadow-md w-full relative z-10 px-10">
        {/* Logo Container */}
        <div className="flex items-center h-10">
          {/* Logo */}
          <a className=" cursor-pointer">
            <h3 className="text-2xl font-medium text-blue-500">
              <img
                className=" h-13 w-20 object-cover"
                src={prime}
                alt="Store Logo"
              />
            </h3>
          </a>
        </div>

        {/* Links Section - Hidden on Small Screens */}
        <div
          className={`items-center hidden space-x-8 lg:flex ${
            isMobileMenuOpen ? "hidden" : ""
          }`}
        >
          <NavLink
            to="/doctor/dashboard"
            className="flex text-gray-800 hover:text-blue-500 cursor-pointer transition-colors duration-300"
          >
            Home
          </NavLink>

          <NavLink
            to="/doctor/profile"
            className="flex text-gray-800 hover:text-blue-500 cursor-pointer transition-colors duration-300"
          >
            My profile
          </NavLink>

          <NavLink
            to="/doctor/chat"
            className="flex text-gray-800 hover:text-blue-500 cursor-pointer transition-colors duration-300"
          >
            Messages
          </NavLink>

          <NavLink className="flex text-gray-800 hover:text-blue-500 cursor-pointer transition-colors duration-300">
            About Us
          </NavLink>
        </div>

        {/* Icon Menu Section */}
        <div className="flex items-center space-x-5 lg:space-x-8">
          {!isAuthenticated ? (
            <>
              {/* Register */}
              <NavLink
                to="auth/register"
                className="flex text-gray-600 hover:text-blue-500 cursor-pointer transition-colors duration-300"
              >
                {registerIcon}
                Register
              </NavLink>

              {/* Login */}
              <NavLink
                to="auth/login"
                className="flex text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-gray-600"
              >
                {loginIcon}
                Login
              </NavLink>
            </>
          ) : (
            <>
              {/* Logout */}
              <Link
                className="nav-links"
                onClick={() =>
                  setIsNotificationModalOpen(!isNotificationModalOpen)
                }
              >
                <NotificationIcon />
              </Link>
              <NavLink
                onClick={handleLogout}
                className="flex text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-red-500"
              >
                {logoutIcon}
                Logout
              </NavLink>

              {/* Account */}
              <NavLink className="flex text-gray-600 cursor-pointer transition-colors duration-300 font-semibold text-blue-600">
                {accountIcon}
                {name}
              </NavLink>
              <NotificationModal
                isOpen={isNotificationModalOpen}
                customID={customID}
                data={data}
              />
            </>
          )}
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="lg:hidden mt-4">
          <button
            className="text-gray-600 hover:text-blue-500 focus:outline-none focus:text-blue-500 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden w-full mt-4">
            <div className="flex flex-col space-y-4">
              <NavLink
                to="/doctor/dashboard"
                className="flex text-gray-800 hover:text-blue-500 cursor-pointer transition-colors duration-300"
              >
                Home
              </NavLink>

              <NavLink
                to="/doctor/profile"
                className="flex text-gray-800 hover:text-blue-500 cursor-pointer transition-colors duration-300"
              >
                My profile
              </NavLink>

              <NavLink
                to="/doctor/chat"
                className="flex text-gray-800 hover:text-blue-500 cursor-pointer transition-colors duration-300"
              >
                Messages
              </NavLink>

              <NavLink className="flex text-gray-800 hover:text-blue-500 cursor-pointer transition-colors duration-300">
                About Us
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default DocotrHeader;
