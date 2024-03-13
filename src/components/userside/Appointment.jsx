import React from "react";
import { Link } from "react-router-dom";

function Appointment() {
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
        <Link to='/doctor-list'>
          <div class="duration-1000 flex flex-col justify-center items-center w-full transform hover:scale-x-110 hover:scale-y-110 lg:mt-6 text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl xl:w-96">
            <div class="p-6 text-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0486fa87e43a87575e4195946cdecac90488ffdf6b01e20d4973c82886f3499?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                alt="View Doctor"
                className="ml-20 w-48 h-48 mb-4 text-gray-900"
              />
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                <a className="text-blue-600 hover:text-black">Find a Doctor</a>
              </h5>
              <div className="text-slate-800 text-base leading-6 mt-2 max-md:max-w-full">
                With more than 1000+ doctors and on mission to provide best
                <br />
                care Health Care Service
              </div>
            </div>
          </div>
        </Link>
        <Link to='/doctor-list'>
          <div class="duration-1000 flex flex-col justify-center items-center w-full transform hover:scale-x-110 hover:scale-y-110 lg:mt-6 text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl xl:w-96">
            <div class="p-6 text-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed4328c32b89f17330e6ed49763dd44921d6245a1af40d39f2525691ac706c04?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                alt="View Doctor"
                className="ml-20 w-48 h-48 mb-4 text-gray-900"
              />
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                <a className="text-blue-600 hover:text-black">View Doctor</a>
              </h5>
              <div className="text-slate-800 text-base leading-6 mt-2 max-md:max-w-full">
                Share your health concern here and we shall assign you a top
                <br />
                doctor across the North East
              </div>
            </div>
          </div>
        </Link>
        <Link to='/doctor-list'>
          <div class="duration-1000 flex flex-col justify-center items-center w-full transform hover:scale-x-110 hover:scale-y-110 lg:mt-6 text-gray-700 bg-gray-200 shadow-md bg-clip-border rounded-xl xl:w-96">
            <div class="p-6 text-center">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c83e4c59d116a9320bf45e5555ff1c3f1082bdf838d7c9e133a91e9da4e96ac?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                alt="View Doctor"
                className="ml-20 w-48 h-48 mb-4 text-gray-900"
              />
              <h5 class="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                <a className="text-blue-600 hover:text-black">Book a visit</a>
              </h5>
              <div className="text-slate-800 text-base leading-6 mt-2 max-md:max-w-full">
                Book your time slot with doctor from your comfort zone
              </div>
            </div>
          </div>
        </Link>
      </main>
      <Link to='/doctor-list'>
      <div className="flex items-center justify-center">
        <button className=" bg-blue-400 text-wrap  w-40 h-14 text-xl font-semibold rounded-2xl transform hover:scale-x-110 hover:scale-y-110 hover:bg-gradient-to-r from-teal-500 to-purple-500 transition-all duration-500">
          Find Doctor
        </button>
      </div>
      </Link>
    </div>
  );
}

export default Appointment;
