
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


import AdminPrivateRoute from '../../components/Private/AdminPrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { set_Authentication } from '../../Redux/authentication/authenticationSlice';
import { set_user_basic_details } from '../../Redux/userBasicDetails/userBasicDetailsSlice';
import axios from 'axios';
import isAuthAdmin from '../../utils/isAuthAdmin';

import AdminSignin from '../../pages/admin/AdminSignin';
import { baseUrl } from '../../utils/constants/Constants';
import { Outlet, useRoutes } from 'react-router-dom'
import Page404 from '../../components/404/Page404';
import ThemeProvider from '../../components/admin/elements/theme';
import '../../assets/Styles/main.scss'
import Doctor from '../../pages/admin/Doctor';
import Patient from '../../pages/admin/Patient';
import DashboardLayout from '../../pages/admin/DashboardLayout';
import Dashboard from '../../pages/admin/Dashboard';
import AdminLogRoute from '../../components/Private/AdminLogRoute';
import VarificationDoc from '../../pages/admin/VarificationDoc';
import Order from '../../pages/admin/Order';

function AdminWrapper() {
  // const dispatch = useDispatch();
  // const authentication_user = useSelector(state => state.authentication_user);

  // const token = localStorage.getItem('access');

  // const checkAuthAndFetchUserData = async () => {
  //   try {
  //     const isAuthenticated = await isAuthAdmin();
  //     dispatch(
  //       set_Authentication({
  //         name: isAuthenticated.name,
  //         isAuthenticated: isAuthenticated.isAuthenticated,
  //         isAdmin: isAuthenticated.isAdmin,
  //       })
  //     );

  //     if (isAuthenticated.isAuthenticated) {
  //       const res = await axios.get(baseUrl + 'auth/user/details/', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       dispatch(
  //         set_user_basic_details({
  //           name: res.data.first_name,
  //           profile_pic: res.data.profile_pic,
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (!authentication_user.name) {
  //     console.log("this is working in  use effect");
  //     checkAuthAndFetchUserData();
  //   }
  // }, []);

  const routes = useRoutes([
    {
      path: "/login",
      element: <AdminLogRoute><AdminSignin /></AdminLogRoute>
    },
    {
      element: (
          <ThemeProvider>
              <DashboardLayout>
               <AdminPrivateRoute>
                    <Outlet/>
                </AdminPrivateRoute>
              </DashboardLayout>
            </ThemeProvider>
        
      ),
      children: [    
        {path: "/", element: <Dashboard />},
        {path: "/doctor", element: <Doctor/>},
        {path: "/patient", element: <Patient/>},
        {path: "/DocVerification", element: <VarificationDoc/>},
        {path: "/order", element: <Order/>},

        // // {path: "/profile", element: <Profile/>},
        // {path: "user/create", element: <AdminCreateUser />},  
        // {path: "/user/update/:id", element: <AdminUpdateUser />},
      ]
    },
    {
      path: "*",
      element: <Page404 />
    }
  ]);


  

  return routes;
    
}

export default AdminWrapper;
