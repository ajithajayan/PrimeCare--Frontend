import * as React from "react";

function UserFooter() {
  return (
    <footer className="bg-black items-center bg-neutral-900 flex flex-col justify-center px-16 py-11 max-md:px-5">
      <header className="flex w-full max-w-[1296px] flex-col mb-10 max-md:max-w-full">
        <div className="flex w-[113px] shrink-0 h-[60px] flex-col self-start" />
        <div className="w-[468px] max-w-full mt-8 self-start">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
              <span className=" text-gray-200 items-start flex grow flex-col pb-12 max-md:mt-9">
                <h2 className="text-white font-extrabold text-base font-medium leading-6 uppercase self-stretch">
                  Our Services
                </h2>
                <a
                  href="#"
                  className="text-neutral-400 text-base leading-6 mt-2.5"
                >
                  Physiotherapy
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base leading-6 mt-2.5"
                >
                  Caregiver
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base leading-6 whitespace-nowrap mt-2.5 self-start"
                >
                  Rehabilitation centre
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base leading-6 mt-2.5"
                >
                  Equipment
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base leading-6 mt-2.5"
                >
                  Dotor Counseling
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base leading-6 mt-2.5"
                >
                  Nursing
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base leading-6 my-2.5"
                >
                  Attendant
                </a>
              </span>
            </div>
            <div className="text-gray-200 flex flex-col items-stretch w-6/12 ml-5 max-md:ml-0">
              <span className="items-stretch flex flex-col pb-12 max-md:mt-9">
                <h2 className="text-white font-extrabold text-base font-medium leading-6 uppercase">
                  Company
                </h2>
                <a
                  href="#"
                  className="text-neutral-400 text-base leading-6 mt-2.5"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base leading-6 mt-2.5 mb-28 max-md:mb-10"
                >
                  Blog
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="bg-gray-700 self-stretch flex shrink-0 h-0.5 flex-col max-md:max-w-full" />
        <div className="text-gray-200 content-start flex-wrap self-stretch mt-16 pb-12 max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
              <span className="items-stretch content-start self-stretch flex-wrap flex pb-6 max-md:max-w-full">
                <a
                  href="#"
                  className="text-neutral-400 text-base mr-4 leading-6"
                >
                  Terms & Conditions
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base mr-4 leading-6"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base mr-4 leading-6"
                >
                  Refund Policy
                </a>
                <a
                  href="#"
                  className="text-neutral-400 text-base mr-4 leading-6 grow whitespace-nowrap"
                >
                  Patient Charter
                </a>
              </span>
            </div>
            <div className="relative flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0">
              <div className="absolute inset-y-0 right-0 items-stretch self-stretch flex pl-20 max-md:max-w-full max-md:flex-wrap max-md:pl-5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d128f75677b07fbb4955b9ab9d413aa26703cf015a6fe35378000e02a6610858?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                  className="aspect-square object-contain object-center w-12 overflow-hidden shrink-0 max-w-full"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/b78a1fc54dd253e5a63fd7f00054267dc3c8530345ecee798dcd14e23f7151b7?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                  className="aspect-square object-contain object-center w-12 overflow-hidden shrink-0 max-w-full"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0130f8614ece72ff63409fd9910ff062f3a73de4453566e18e33d5713612fd67?apiKey=e5b36b972ccb4739bd317b67a96e9d90&"
                  className="aspect-square object-contain object-center w-12 overflow-hidden shrink-0 max-w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-neutral-600 self-stretch flex shrink-0 h-0.5 flex-col max-md:max-w-full" />
        <div className="text-gray-600 text-sm leading-5 self-stretch mt-16 max-md:max-w-full max-md:mt-10">
          © 2023 onwards. All Rights Reserved.
        </div>
      </header>
    </footer>
  );
}


export default UserFooter;