import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import cuv from "../../assets/curved14.jpg";

import { Link, useNavigate } from "react-router-dom";
import { set_Authentication } from "../../Redux/authentication/authenticationSlice";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../utils/constants/Constants";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function AdminSignin() {
  const [formError, setFormError] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setFormError([]);
    const formData = new FormData();
    formData.append("email", event.target.email.value);
    formData.append("password", event.target.password.value);
    console.log(formData);
    try {
      const res = await axios.post(baseUrl + "auth/login", formData);
      if (res.status === 200) {
        console.log(res.data);
        Cookies.set("access", res.data.access);
        Cookies.set("refresh", res.data.refresh);
        dispatch(
          set_Authentication({
            name: jwtDecode(res.data.access).first_name,
            isAuthenticated: true,
            isAdmin: res.data.isAdmin,
          })
        );
        navigate("/admincontrol");
        return res;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.detail)
    }
  };

  return (
    <>
      {/* Navbar */}
      
      <main className="mt-0 transition-all duration-200 ease-soft-in-out">
        <section className="min-h-screen mb-32">
          <div
            className="relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-center bg-cover min-h-50-screen rounded-xl"
            style={{
              backgroundImage: `url(${cuv})`,
            }}
          >
            <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-gray-900 to-slate-800 opacity-60" />
            <div className="container z-10">
              <div className="flex flex-wrap justify-center -mx-3">
                <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
                  <h1 className="mt-12 mb-2 text-white">Welcome!</h1>
                  <p className="text-white">
                    Enter your email and password to sign in
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="flex flex-wrap -mx-3 -mt-48 md:-mt-56 lg:-mt-48">
              <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
                <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                  <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                    <h5>Sign In</h5>
                  </div>
                  <div className="flex flex-wrap px-3 -mx-3 sm:px-6 xl:px-12">
                    <div className="w-3/12 max-w-full px-1 ml-auto flex-0">
                      <a
                        className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
                        href="javascript:;"
                      >
                        <svg
                          width="24px"
                          height="32px"
                          viewBox="0 0 64 64"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink32"
                        >
                          <g
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              transform="translate(3.000000, 3.000000)"
                              fillRule="nonzero"
                            >
                              <circle
                                fill="#3C5A9A"
                                cx="29.5091719"
                                cy="29.4927506"
                                r="29.4882047"
                              />
                              <path
                                d="M39.0974944,9.05587273 L32.5651312,9.05587273 C28.6886088,9.05587273 24.3768224,10.6862851 24.3768224,16.3054653 C24.395747,18.2634019 24.3768224,20.1385313 24.3768224,22.2488655 L19.8922122,22.2488655 L19.8922122,29.3852113 L24.5156022,29.3852113 L24.5156022,49.9295284 L33.0113092,49.9295284 L33.0113092,29.2496356 L38.6187742,29.2496356 L39.1261316,22.2288395 L32.8649196,22.2288395 C32.8649196,22.2288395 32.8789377,19.1056932 32.8649196,18.1987181 C32.8649196,15.9781412 35.1755132,16.1053059 35.3144932,16.1053059 C36.4140178,16.1053059 38.5518876,16.1085101 39.1006986,16.1053059 L39.1006986,9.05587273 L39.0974944,9.05587273 L39.0974944,9.05587273 Z"
                                fill="#FFFFFF"
                              />
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                    <div className="w-3/12 max-w-full px-1 flex-0">
                      <a
                        className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
                        href="javascript:;"
                      >
                        <svg
                          width="24px"
                          height="32px"
                          viewBox="0 0 64 64"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              transform="translate(7.000000, 0.564551)"
                              fill="#000000"
                              fillRule="nonzero"
                            >
                              <path d="M40.9233048,32.8428307 C41.0078713,42.0741676 48.9124247,45.146088 49,45.1851909 C48.9331634,45.4017274 47.7369821,49.5628653 44.835501,53.8610269 C42.3271952,57.5771105 39.7241148,61.2793611 35.6233362,61.356042 C31.5939073,61.431307 30.2982233,58.9340578 25.6914424,58.9340578 C21.0860585,58.9340578 19.6464932,61.27947 15.8321878,61.4314159 C11.8738936,61.5833617 8.85958554,57.4131833 6.33064852,53.7107148 C1.16284874,46.1373849 -2.78641926,32.3103122 2.51645059,22.9768066 C5.15080028,18.3417501 9.85858819,15.4066355 14.9684701,15.3313705 C18.8554146,15.2562145 22.5241194,17.9820905 24.9003639,17.9820905 C27.275104,17.9820905 31.733383,14.7039812 36.4203248,15.1854154 C38.3824403,15.2681959 43.8902255,15.9888223 47.4267616,21.2362369 C47.1417927,21.4153043 40.8549638,25.1251794 40.9233048,32.8428307 M33.3504628,10.1750144 C35.4519466,7.59650964 36.8663676,4.00699306 36.4804992,0.435448578 C33.4513624,0.558856931 29.7884601,2.48154382 27.6157341,5.05863265 C25.6685547,7.34076135 23.9632549,10.9934525 24.4233742,14.4943068 C27.7996959,14.7590956 31.2488715,12.7551531 33.3504628,10.1750144" />
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                    <div className="w-3/12 max-w-full px-1 mr-auto flex-0">
                      <a
                        className="inline-block w-full px-6 py-3 mb-4 font-bold text-center text-gray-200 uppercase align-middle transition-all bg-transparent border border-gray-200 border-solid rounded-lg shadow-none cursor-pointer hover:scale-102 leading-pro text-xs ease-soft-in tracking-tight-soft bg-150 bg-x-25 hover:bg-transparent hover:opacity-75"
                        href="javascript:;"
                      >
                        <svg
                          width="24px"
                          height="32px"
                          viewBox="0 0 64 64"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            stroke="none"
                            strokeWidth={1}
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              transform="translate(3.000000, 2.000000)"
                              fillRule="nonzero"
                            >
                              <path
                                d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"
                                fill="#4285F4"
                              />
                              <path
                                d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"
                                fill="#34A853"
                              />
                              <path
                                d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"
                                fill="#FBBC05"
                              />
                              <path
                                d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"
                                fill="#EB4335"
                              />
                            </g>
                          </g>
                        </svg>
                      </a>
                    </div>
                    <div className="relative w-full max-w-full px-3 mt-2 text-center shrink-0">
                      <p className="z-20 inline px-4 mb-2 font-semibold leading-normal bg-white text-sm text-slate-400">
                        or
                      </p>
                    </div>
                  </div>
                  <div className="flex-auto p-6">
                    <form
                      method="POST"
                      onSubmit={handleLoginSubmit}
                      role="form text-left "
                    >
                      <div className="mb-4">
                        <input
                          type="email"
                          name="email" // Add name attribute
                          className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                          placeholder="Email"
                          aria-label="Email"
                          aria-describedby="email-addon"
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          name="password" // Add name attribute
                          className="text-sm focus:shadow-soft-primary-outline leading-5.6 ease-soft block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-fuchsia-300 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                          placeholder="Password"
                          aria-label="Password"
                          aria-describedby="password-addon"
                        />
                      </div>
                      <div className="min-h-6 pl-6.92 mb-0.5 block">
                        <input
                          id="terms"
                          className="w-4.92 h-4.92 ease-soft -ml-6.92 rounded-1.4 checked:bg-gradient-to-tl checked:from-gray-900 checked:to-slate-800 after:text-xxs after:font-awesome after:duration-250 after:ease-soft-in-out duration-250 relative float-left mt-1 cursor-pointer appearance-none border border-solid border-slate-200 bg-white bg-contain bg-center bg-no-repeat align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all after:content-['\f00c'] checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100"
                          type="checkbox"
                          defaultValue=""
                          defaultChecked=""
                        />
                        <label
                          className="mb-2 ml-1 font-normal cursor-pointer select-none text-sm text-slate-700"
                          htmlFor="terms"
                        >
                          {" "}
                          <a
                            href="javascript:;"
                            className="font-bold text-slate-700"
                          >
                            Remember me
                          </a>{" "}
                        </label>
                      </div>
                      <div className="text-center">
                        <button
                          type="submit"
                          className="inline-block w-full px-6 py-3 mt-6 mb-2 font-bold text-center text-white uppercase align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:scale-102 hover:shadow-soft-xs leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 bg-gradient-to-tl from-gray-900 to-slate-800 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* -------- START FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- */}

        {/* -------- END FOOTER 3 w/ COMPANY DESCRIPTION WITH LINKS & SOCIAL ICONS & COPYRIGHT ------- */}
      </main>
    </>
  );
}

export default AdminSignin;
