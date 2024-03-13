import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppointmentGuide from "../../components/userside/AppointmentGuide";
import Appointment from "../../components/userside/Appointment";
import FAQSection from "../../components/userside/Element/FAQSection";
import DoctorConsultation from "../../assets/images/doctor/Doctor-Consultation.jpg";

function UserHome() {
  const navigate = useNavigate();
  const authentication_user = useSelector((state) => state.authentication_user);
  return (
    <>
      <form>
        <header className="header h-1/4">
          <a aria-label="Home" role="link">
            <div className="relative">
              <img
                className="w-full h-svh"
                src={DoctorConsultation}
                alt="Logo"
              />
              <div className="absolute inset-0 bg-blue-100 opacity-40"></div>
            </div>
          </a>
        </header>
      </form>

      {/* <AppointmentGuide/> */}
      <Appointment />
      <FAQSection />
    </>
  );
}

export default UserHome;
