import * as React from "react";

function OnlineAppointment() {
  return (
    <div className="flex flex-col items-center ">
      <header className="items-center self-stretch flex w-full flex-col justify-center px-16 max-md:max-w-full max-md:px-5">
        <span className="flex flex-col items-center max-md:max-w-full">
          <h1 className="text-slate-800 text-center text-2xl font-medium leading-8 max-md:max-w-full">
            Discover the Online Appointment!
          </h1>
          <p className="text-neutral-500 text-center text-base leading-6 self-stretch mt-4 max-md:max-w-full">
            A step-by-step guide to build an on-demand appointment for patients
          </p>
        </span>
      </header>
      <main className="content-start flex-wrap self-stretch w-full mt-16 pb-6 px-4 max-md:max-w-full max-md:mt-10">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
          <section className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
            <div className="self-stretch shadow-lg bg-white flex grow items-stretch justify-between gap-5 w-full pl-16 py-10 rounded-md max-md:max-w-full max-md:flex-wrap max-md:mt-8 max-md:pl-5">
              <div className="flex grow  flex-col items-stretch max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0486fa87e43a87575e4195946cdecac90488ffdf6b01e20d4973c82886f3499?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                  alt="Find a Doctor"
                  className="aspect-square object-contain object-center w-[120px] overflow-hidden self-center max-w-full"
                />
                <div className="text-blue-500 text-center text-xl font-medium leading-6 uppercase self-center whitespace-nowrap mt-6">
                  Find a Doctor
                </div>
                <div className="text-slate-800 text-center text-base leading-6 mt-2 max-md:max-w-full">
                  With more than 1000+ doctors and on mission to provide best
                  <br />
                  care Health Care Service
                </div>
              </div>
             
            </div>
          </section>
          <section className="flex flex-col items-stretch w-[65%] ml-5 max-md:w-full max-md:ml-0">
            <div className="self-stretch shadow-lg bg-white flex grow items-stretch justify-between gap-5 w-full pl-16 py-10 rounded-md max-md:max-w-full max-md:flex-wrap max-md:mt-8 max-md:pl-5">
              <div className="flex grow basis-[0%] flex-col items-stretch max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed4328c32b89f17330e6ed49763dd44921d6245a1af40d39f2525691ac706c04?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                  alt="View Doctor"
                  className="aspect-square object-contain object-center w-[120px] overflow-hidden self-center max-w-full"
                />
                <div className="text-blue-500 text-center text-xl font-medium leading-6 uppercase self-center whitespace-nowrap mt-6">
                  View Doctor
                </div>
                <div className="text-slate-800 text-center text-base leading-6 mt-2 max-md:max-w-full">
                  Share your health concern here and we shall assign you a top
                  <br />
                  doctor across the North East
                </div>
              </div>
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2203c4f4-6f7e-4b1d-8684-859282f519ae?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2203c4f4-6f7e-4b1d-8684-859282f519ae?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2203c4f4-6f7e-4b1d-8684-859282f519ae?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2203c4f4-6f7e-4b1d-8684-859282f519ae?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2203c4f4-6f7e-4b1d-8684-859282f519ae?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2203c4f4-6f7e-4b1d-8684-859282f519ae?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2203c4f4-6f7e-4b1d-8684-859282f519ae?apiKey=e5b36b972ccb4739bd317b67a96e9d90&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2203c4f4-6f7e-4b1d-8684-859282f519ae?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                alt="Arrow"
                className="aspect-[0.31] object-contain object-center w-[22px] items-start overflow-hidden self-center shrink-0 max-w-full my-auto"
              />
            </div>
          </section>
          <section className="flex flex-col items-stretch w-auto py-11  ml-5  max-md:ml-0">
            <div className=" shadow-lg bg-white flex flex-col items-stretch w-full px-20 py-10 rounded-md max-md:max-w-full max-md:mt-8 max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/2c83e4c59d116a9320bf45e5555ff1c3f1082bdf838d7c9e133a91e9da4e96ac?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                alt="Book a visit"
                className="aspect-square object-contain object-center w-[120px] overflow-hidden self-center max-w-full"
              />
              <div className="text-blue-500 text-center text-xl font-medium leading-6 uppercase self-center whitespace-nowrap mt-6">
                Book a visi
              </div>
              <div className="text-slate-800 text-center text-base leading-6 whitespace-nowrap mt-2 max-md:ml-2 max-md:mr-2">
                Book your time slot with doctor from your comfort zone
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="flex justify-center items-center bg-blue-600 w-24 h-8 m-10 pl-11 pr-10 py-5 rounded-lg max-md:px-5">
        <a
          href="#"
          className="text-white text-center text-base font-medium leading-6"
        >
          Find Doctor
        </a>
      </footer>
    </div>
  );
}

export default OnlineAppointment;
