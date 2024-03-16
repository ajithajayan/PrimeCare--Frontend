import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AppointmentGuide from "../../components/userside/AppointmentGuide";
import Appointment from "../../components/userside/Appointment";
import FAQSection from "../../components/userside/Element/FAQSection";
import DoctorConsultation from "../../assets/images/doctor/Doctor-Consultation.jpg";
import BannerSection2 from "../../components/Banner/User/BannerSection2";

function UserHome() {
  const navigate = useNavigate();
  const authentication_user = useSelector((state) => state.authentication_user);
  return (
    <>
      <BannerSection2 />

      <Appointment />
      <FAQSection />
    </>
  );
}

export default UserHome;
