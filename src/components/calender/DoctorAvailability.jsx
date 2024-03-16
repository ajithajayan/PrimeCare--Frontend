import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { baseUrl } from "../../utils/constants/Constants";
import useRazorpay from "react-razorpay";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { UserAPIwithAcess } from "../API/AdminAPI";
import Cookies from "js-cookie";


const DoctorAvailability = ({ doctorId, fees,patient_id }) => {
  const accessToken = Cookies.get("access");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const [Razorpay] = useRazorpay();
  // const userId = useSelector((state) => state.authentication_user.user_id);
  const [patientID, setPatientID] = useState(null)
  const navigate= useNavigate()
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isCancelModalVisible, setCancel] = useState(false);
  

  useEffect(() => {
    fetchAvailableTimeSlots(selectedDate.format("YYYY-MM-DD"));
    UserAPIwithAcess.get(`auth/custom-id/patient/${patient_id}`,config).then((res)=>{
      setPatientID(res.data.patient_user.custom_id)
      console.log("the patient cusotom id got here ",res.data)

      
    }).catch((err)=>{
      console.log(err)
    })
    
  }, [selectedDate]);

  const fetchAvailableTimeSlots = async (date) => {
    try {
      setLoading(true);

      const response = await UserAPIwithAcess.get(
        `appointment/patient/check/doctor/${doctorId}/slots?date=${date}`
      ,config);

      setAvailableTimeSlots(response.data.available_slots || []);
    } catch (error) {
      console.error("Error fetching available time slots:", error);
    } finally {
      setLoading(false);
    }
  };

  const convertTo12HourFormat = (timeString) => {
    if (!timeString) {
      return "";
    }

    const [hours, minutes] = timeString.split(":");
    let period = "am";

    let hoursIn24HourFormat = parseInt(hours, 10);

    if (hoursIn24HourFormat >= 12) {
      period = "pm";
      if (hoursIn24HourFormat > 12) {
        hoursIn24HourFormat -= 12;
      }
    } else if (hoursIn24HourFormat === 0) {
      hoursIn24HourFormat = 12;
    }

    return `${hoursIn24HourFormat}:${minutes} ${period}`;
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    setSelectedTimeSlot(null);
    // console.log("the user id is here",userId);
  };

  // complete order
  const complete_order = (paymentID, orderID, signature) => {
    console.log("patient id got here befor  passing",patientID)
    UserAPIwithAcess
      .post(`appointment/complete-order/`, {
        payment_id: paymentID,
        order_id: orderID,
        signature: signature,
        amount:fees ,
        doctor_id:  doctorId ,
        patient_id: patientID,
        booked_date: selectedDate.format("YYYY-MM-DD"),
        booked_from_time: selectedTimeSlot.from,
        booked_to_time: selectedTimeSlot.to,
      },config)
      .then((response) => {
        console.log(response.data);
        if (response.status === 201) {
          navigate("/sucess-page")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePayment = () => {
    // Check slot availability before proceeding with payment
    UserAPIwithAcess
      .post(`appointment/check-availability/`, {
        doctor_id: doctorId,
        selected_from_time: selectedTimeSlot.from,
        selected_to_time: selectedTimeSlot.to,
        selected_day: selectedDate.format("YYYY-MM-DD"),
      },config)
      .then((availabilityCheckResponse) => {
        if (!availabilityCheckResponse.data.available) {
          toast.warning("This slot is already booked. Please choose another slot.");
          return;
        }

        // If the slot is available, proceed with creating the order
        return UserAPIwithAcess.post(`${baseUrl}appointment/create-order/`, {
          amount: fees,
          currency: "INR",
          // Add any other relevant data for creating the order
        },config);
      })
      .then((orderResponse) => {
        const order = orderResponse.data.data.id;

        // Configure Razorpay options
        const options = {
          key: "rzp_test_8YadWnMFagK0BT", // Enter the Key ID generated from the Dashboard
          name: "Acme Corp",
          description: "Test Transaction",
          image: "https://example.com/your_logo",
          order_id: order, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
          handler: function (response) {
            console.log(
              "api responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
              response
            );

            //complete order
            complete_order(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );
          },
          prefill: {
            name: "Piyush Garg",
            email: "youremail@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });
        rzp1.open();
      })
      .catch((error) => {
        console.error("Error during payment processing:", error);
        // Consider displaying a user-friendly error message
      });
  };


  const handleWalletPayment = () => {
    // Check slot availability before proceeding with payment
    UserAPIwithAcess
      .post(`appointment/check-availability/`, {
        doctor_id: doctorId,
        selected_from_time: selectedTimeSlot.from,
        selected_to_time: selectedTimeSlot.to,
        selected_day: selectedDate.format("YYYY-MM-DD"),
      },config)
      .then((availabilityCheckResponse) => {
        if (!availabilityCheckResponse.data.available) {
          toast.warning("This slot is already booked. Please choose another slot.");
          return;
        }
  
        UserAPIwithAcess
          .post(`appointment/wallet/payment/`, {
            payment_id: `wall-pay-${selectedDate.format("YYYY-MM-DD")}-${selectedTimeSlot.from}`,
            amount: fees,
            doctor_id: doctorId,
            patient_id: patientID,
            booked_date: selectedDate.format("YYYY-MM-DD"),
            booked_from_time: selectedTimeSlot.from,
            booked_to_time: selectedTimeSlot.to,
          },config)
          .then((response) => {
            console.log(response.data);
            if (response.status === 201) {
              navigate("/sucess-page"); // Fix the typo here
              toast.success("Payment successful!");
            }
          })
          .catch((error) => {
            console.log(error.response.data.error);
            toast.error(error.response.data.error);
          });
      })
      .catch((error) => {
        console.error("Error during payment processing:", error);
        // Consider displaying a user-friendly error message
      });
  };
  

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          value={selectedDate}
          onChange={handleDateChange}
          minDate={dayjs()}
        />
      </LocalizationProvider>

      <h2 className="font-bold p-2 mb-2 border-2 border-black">
        Available Time Slots for - {selectedDate.format("YYYY-MM-DD")}
      </h2>

      {loading && <p>Loading...</p>}

      {availableTimeSlots && availableTimeSlots.length === 0 ? (
        <p className="font-medium text-red-400 pt-2">
          No slots available for the selected date.
        </p>
      ) : (
        <ul>
          {availableTimeSlots.map((timeSlot, index) => (
            <li
              key={index}
              onClick={() => handleTimeSlotSelect(timeSlot)}
              style={{
                cursor: "pointer",
                fontWeight: selectedTimeSlot === timeSlot ? "bold" : "normal",
                border: "1px solid #ddd",
                padding: "8px",
                marginBottom: "4px",
              }}
            >
              {`${convertTo12HourFormat(
                timeSlot.from
              )} - ${convertTo12HourFormat(timeSlot.to)}`}
            </li>
          ))}
        </ul>
      )}

      {selectedTimeSlot && (
        <>
          <button
            onClick={()=>{setCancel(true)}}
            className="bg-slate-950 text-slate-400 border border-slate-400 border-b-4 font-medium overflow-hidden relative px-4 py-2 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
          >
            Book Appointment for {convertTo12HourFormat(selectedTimeSlot.from)}{" "}
            - {convertTo12HourFormat(selectedTimeSlot.to)}
          </button>

          {isCancelModalVisible && (
        <div className="fixed left-0 right-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full">
          <div className="w-full max-w-md px-4 md:h-auto">
            <div className="fixed left-0 right-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto top-4 md:inset-0 h-modal sm:h-full">
              <div className="w-full max-w-md px-4 md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                  <div className="flex justify-end p-2"></div>
                  <div className="p-6 pt-0 text-center">
                    <svg
                      className="w-16 h-16 mx-auto text-red-600 mb-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <h3 className="mt-5 mb-6 text-lg text-gray-500 dark:text-gray-400">
                      Please select your payment method
                    </h3>
                    
                    <button
                      className="text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800"
                      onClick={() => handleWalletPayment()}
                    >
                      Using Wallet
                    </button>
                    <button
                      className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      onClick={() => handlePayment()}
                    >
                      Razorpay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
          
        </>
      )}
    </div>
  );
};

export default DoctorAvailability;
