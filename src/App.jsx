import { useEffect, useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import userStore from "./Redux/userStore";
import UserWrapper from './Wrapper/userWrapper/UserWrapper';
import { Bounce, ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ggogle_id } from './utils/constants/Constants';
import AdminWrapper from './Wrapper/AdminWrapper/AdminWrapper';
import DoctorWrapper from './Wrapper/DoctorWrapper/DoctorWrapper';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'








function App() {
  const [count, setCount] = useState(0)
  return (
    <>
    
    <Router>
    <ToastContainer
    position="top-center"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition: Bounce
    />
      <Provider store={userStore}>
        
      <GoogleOAuthProvider clientId={ggogle_id}>

      
      <Routes>
        <Route path="*" element={<UserWrapper />} /> 

        <Route path='/admincontrol/*' element={<AdminWrapper/>} />  
        <Route path='/doctor/*' element={<DoctorWrapper/>} />  
      </Routes>
      </GoogleOAuthProvider>
      </Provider>
    </Router>
    </>
  )
}

export default App