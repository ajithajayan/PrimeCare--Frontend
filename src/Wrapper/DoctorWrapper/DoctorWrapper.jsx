import React, { useEffect } from "react";

import { Outlet, useRoutes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { set_Authentication } from "../../Redux/authentication/authenticationSlice";
import { set_user_basic_details } from "../../Redux/userBasicDetails/userBasicDetailsSlice";
import axios from "axios";

import DoctorHome from "../../pages/Doctor/DoctorHome";
import DoctorHeader from "../../components/Doctor/DoctorHeader";
import DoctorFooter from "../../components/Doctor/Doctorfooter";
import DoctorPrivateRoute from "../../components/Private/DoctorPrivateRoute";
import isAuthDoctor from "../../utils/isAuthDoctor";
import { baseUrl } from "../../utils/constants/Constants";
import Page404 from "../../components/404/Page404";
import DoctorProfile from "../../pages/Doctor/DoctorProfile";
import ImageUpload from "../../pages/Doctor/ImageUpload";
import DoctorChatComponent from "../../components/Messages/DoctMessage";
import DoctorVideoCallRoom from "../../pages/Doctor/DoctorVideoCallRoom";

function DoctorWrapper() {
  const dispatch = useDispatch();

  const authentication_user = useSelector((state) => state.authentication_user);

  const checkAuth = async () => {
    const isAuthenticated = await isAuthDoctor();
    dispatch(
      set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        is_doctor: isAuthenticated.is_doctor,
        user_id:isAuthenticated.user_id
      })
    );
  };



 

  useEffect(() => {
    if (!authentication_user.name) {
      checkAuth();
    }
  }, [authentication_user]);

  const routes = useRoutes([
    {
      element: (
        <>
        
            <DoctorHeader />
            <DoctorPrivateRoute>
              <Outlet />
            </DoctorPrivateRoute>
            <DoctorFooter />
      
        </>
      ),
      children: [
        { path: "/dashboard", element: <DoctorHome /> },
        { path: "/image", element: <ImageUpload /> },
        { path: "/profile", element: <DoctorProfile /> },
        { path: "/chat", element: <DoctorChatComponent /> },
        {path: "/room/:roomID", element: <DoctorVideoCallRoom/>},
      ],
    },
    {
      element: <Page404 />,
      path: "*",
    },
  ]);

  return routes;
}

export default DoctorWrapper;
