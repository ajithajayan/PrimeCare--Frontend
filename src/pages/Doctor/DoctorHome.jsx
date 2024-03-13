import React from 'react'
import { useSelector } from 'react-redux'
import { Link ,useNavigate} from 'react-router-dom'
import AppointmentGuide from '../../components/userside/AppointmentGuide'
import Appointment from '../../components/userside/Appointment'
import FAQSection from '../../components/userside/Element/FAQSection'
import DoctorAppointment from '../../components/Doctor/DoctorAppointment'




function DoctorHome() {
  const navigate = useNavigate()
  const authentication_user = useSelector(state => state.authentication_user)
  return (
    <>
    <form>
      <header className="header">
        <a href="#" aria-label="Home" role="link">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7483103ee3369a58d59e9c393ca9deb84c9a1879a83da515aca99ae0c3bf6cf9?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7483103ee3369a58d59e9c393ca9deb84c9a1879a83da515aca99ae0c3bf6cf9?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7483103ee3369a58d59e9c393ca9deb84c9a1879a83da515aca99ae0c3bf6cf9?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7483103ee3369a58d59e9c393ca9deb84c9a1879a83da515aca99ae0c3bf6cf9?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7483103ee3369a58d59e9c393ca9deb84c9a1879a83da515aca99ae0c3bf6cf9?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7483103ee3369a58d59e9c393ca9deb84c9a1879a83da515aca99ae0c3bf6cf9?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7483103ee3369a58d59e9c393ca9deb84c9a1879a83da515aca99ae0c3bf6cf9?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7483103ee3369a58d59e9c393ca9deb84c9a1879a83da515aca99ae0c3bf6cf9?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"className="aspect-[2.33] object-contain object-center w-full"
            alt="Logo"
          />
        </a>
      </header>

      
    </form>

    {/* <AppointmentGuide/> */}
    <DoctorAppointment/>  
    <FAQSection/>

    </>
  )
}

export default DoctorHome