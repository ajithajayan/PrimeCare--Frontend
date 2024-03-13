import React, { useState, useEffect, useRef } from "react";
import BIRDS from "vanta/dist/vanta.waves.min";
import * as THREE from "three";
import "../../assets/Styles/auth.scss";
import { Route, Routes } from "react-router-dom";
import Register from "../userSide/UserRegiser";
import UserLogin from "../userSide/UserLogin";
import ResetPasswordPage from "../userSide/ResetPassword";
import PrivateRoute from "../../components/Private/PrivateRoute";
import DoctorRegister from "../Doctor/DoctorRegiser";
import VerifyOtp from "../userSide/VerifyOtp";
import DoctorLogin from "../Doctor/DoctorLogin";

const Authenticator = () => {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        BIRDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x10384f,
          waveSpeed: 1.3,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div className="auth" ref={vantaRef}>
      <p style={{ color: "#fff", paddingTop: "20px" }}>
        <Routes>
          <Route path="/register" element={ <PrivateRoute><Register /></PrivateRoute>} />
          <Route path="/login" element={<PrivateRoute><UserLogin /></PrivateRoute>} />
          <Route path="doctor/login" element={<PrivateRoute><DoctorLogin /></PrivateRoute>} />
          <Route path="/doctor/register" element={<PrivateRoute><DoctorRegister /></PrivateRoute>} />
          <Route path="/otp" element={<PrivateRoute><VerifyOtp /></PrivateRoute>} />
        </Routes>
      </p>
    </div>
  );
};

export default Authenticator;
