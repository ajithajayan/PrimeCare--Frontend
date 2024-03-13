import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import isAuthDoctor from '../../utils/isAuthDoctor';


function DoctorPrivateRoute({ children }) {
  
  const [isAuthenticated, setIsAuthenticated] = useState({
    'is_authenticated' : false,
    'is_admin' : false,
    'is_doctor' : false,
  });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authInfo = await isAuthDoctor();
      console.log("this is the log",authInfo);
      setIsAuthenticated({
        'is_authenticated' : authInfo.isAuthenticated,
        'is_admin' : authInfo.isAdmin,
        'is_doctor' : authInfo.is_doctor,
      });
      console.log(authInfo.is_doctor);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    // Handle loading state, you might show a loading spinner
    return <Loader/>;
  }

  if(!isAuthenticated.is_authenticated || !isAuthenticated.is_doctor)
  {
    return <Navigate to="/auth/login" />;
  }

  else if ((!isAuthenticated.is_doctor)) {
    // If not authenticated, redirect to login page with the return URL
    return <Navigate to="/auth/login" />;
  }

  // If authenticated, render the child components
  return children;
}


export default DoctorPrivateRoute;