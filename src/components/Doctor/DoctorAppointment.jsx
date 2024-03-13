import React from "react";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

function DoctorAppointment() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 p-10">
      <header className="items-center self-stretch flex w-full flex-col justify-center px-16 max-md:max-w-full max-md:px-5">
        <span className="flex flex-col items-center max-md:max-w-full">
          <h1 className="text-black font-medium text-center text-2xl font-medium leading-8 max-md:max-w-full">
            Discover the Online Appointment!
          </h1>
          <p className="text-neutral-500 text-center text-base leading-6 self-stretch mt-4 max-md:max-w-full">
            A step-by-step guide to build an on-demand appointment for patients
          </p>
        </span>
      </header>

      <main className="flex flex-col xl:flex-row justify-evenly  gap-10">
        <Link to="/doctor/profile">
          <div class="duration-1000 flex flex-col justify-center items-center w-full transform hover:scale-x-110 hover:scale-y-110 lg:mt-6 text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl xl:w-96">
            <div class="p-6 text-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0486fa87e43a87575e4195946cdecac90488ffdf6b01e20d4973c82886f3499?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                alt="View Doctor"
                className="ml-20 w-48 h-48 mb-4 text-gray-900"
              />
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                <a className="text-blue-600 hover:text-black">Time Slots</a>
              </h5>
              <div className="text-slate-800 text-base leading-6 mt-2 max-md:max-w-full">
                Manage your schedule effortlessly.Easily adjust your availability for appointments
                <br />
                with our allocation system.
              </div>
            </div>
          </div>
        </Link>
        <Link to="/doctor/profile">
          <div class="duration-1000 flex flex-col justify-center items-center w-full transform hover:scale-x-110 hover:scale-y-110 lg:mt-6 text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl xl:w-96">
            <div class="p-6 text-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed4328c32b89f17330e6ed49763dd44921d6245a1af40d39f2525691ac706c04?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                alt="View Doctor"
                className="ml-20 w-48 h-48 mb-4 text-gray-900"
              />
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                <a className="text-blue-600 hover:text-black">Update Profile</a>
              </h5>
              <div className="text-slate-800 text-base leading-6 mt-2 max-md:max-w-full">
                Keep your information up-to-date.
                <br />
                Enhance your professional profile to provide accurate details to
                patients
              </div>
            </div>
          </div>
        </Link>

        <Link to="/doctor/profile">
          <div class="duration-1000 flex flex-col justify-center items-center w-full transform hover:scale-x-110 hover:scale-y-110 lg:mt-6 text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl xl:w-96">
            <div class="p-6 text-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c83e4c59d116a9320bf45e5555ff1c3f1082bdf838d7c9e133a91e9da4e96ac?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                alt="View Doctor"
                className="ml-20 w-48 h-48 mb-4 text-gray-900"
              />
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                <a className="text-blue-600 hover:text-black">
                  Patient Details
                </a>
              </h5>
              <div className="text-slate-800 text-base leading-6 mt-2 max-md:max-w-full">
                Access comprehensive patient information.
                <br />
                view patient details seamlessly for effective healthcare.
              </div>
            </div>
          </div>
        </Link>
      </main>

      

      {/* <div className="flex items-center justify-center">
        <Link>
        <button className=" bg-blue-400 text-wrap  w-40 h-14 text-xl font-semibold rounded-2xl transform hover:scale-x-110 hover:scale-y-110 hover:bg-gradient-to-r from-teal-500 to-purple-500 transition-all duration-500">
          Appointments
        </button>
        </Link>
      </div> */}
    </div>
  );
}

export default DoctorAppointment;
