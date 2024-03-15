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
      <div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div class="absolute inset-0">
          <img
            src={DoctorConsultation}
            alt="Background Image"
            class="object-cover object-center w-full h-full"
          />
          <div class="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div class="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1 class="text-5xl font-bold leading-tight mb-4">
            Your Partner In Lifelong Health
          </h1>
          <p class="text-lg text-gray-300 mb-8">
            Together, towards better health, a brighter future
          </p>
          <Link
            to="/doctor-list"
            class="bg-yellow-400 text-gray-900 hover:bg-yellow-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* <AppointmentGuide/> */}
      <Appointment />
      <FAQSection />
    </>
  );
}

export default UserHome;
