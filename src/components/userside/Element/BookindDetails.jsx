import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../../utils/constants/Constants";
import docavatar from "../../../assets/images/doctor/docavatar.webp";
import { useEffect } from "react";
import { toast } from "react-toastify";

function BookindDetails({ transaction_id, setWallet }) {
  const [doct, setdoct] = useState("");
  const [trasaction, setTrasaction] = useState(null);
  const [status, setStatus] = useState(null);
  const [isCancelModalVisible, setCancel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(baseUrl + `appointment/detail/transaction/${transaction_id}`)
      .then((res) => {
        const transactionData = res.data;
        setTrasaction(transactionData);
        setStatus(transactionData.status);

        // // Update wallet balance
        // const updatedBalance = wallet.balance + transactionData.amount - 50;
        // setWallet({ ...wallet, balance: updatedBalance });

        axios
          .get(
            baseUrl + `appointment/detail/doctors/${transactionData.doctor_id}`
          )
          .then((res) => {
            setdoct(res.data);
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [status]);

  const handleCancel = () => {
    axios
      .post(
        baseUrl + `appointment/cancel/booking/`,
        {
          transaction_id: trasaction.transaction_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setStatus("REFUNDED");
        setWallet(50);
        setCancel(false);
        toast.success(
          "Booking cancelled successfully.Amound refunded to your wallet"
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpenCancel = () => {
    setCancel(true);
  };

  const handleCloseCancel = () => {
    setCancel(false);
  };

  const handleJoinMeeting = (id) => {
    // Construct the relative URL for room/transaction_id
    const relativeURL = `/room/${id}`;

    // Use navigate with the relative URL
    navigate(relativeURL);
  };

  return (
    <div>
      <div className="flex justify-between xl:block 2xl:flex align-center 2xl:space-x-4">
        <div className="flex space-x-4 xl:mb-4 2xl:mb-0">
          <div>
            <img
              className="w-6 h-6 rounded-full"
              src={
                doct.user
                  ? doct.user.profile_picture
                    ? doct.user.profile_picture
                    : docavatar
                  : docavatar
              }
              alt="Bonnie image"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-gray-900 leading-none truncate mb-0.5 dark:text-white">
              Dr{" "}
              {doct.user
                ? doct.user.first_name + " " + doct.user.last_name
                : ""}
            </p>
            <p className="mb-1 text-sm font-normal truncate text-primary-700 dark:text-primary-500">
              Booking Time: {trasaction ? trasaction.booked_from_time : ""} -{" "}
              {trasaction ? trasaction.booked_to_time : ""}
            </p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Date: {trasaction ? trasaction.booked_date : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-auto xl:w-full 2xl:w-auto space-x-4">
          {status === "COMPLETED" ? (
            <>
            <button
              onClick={() => handleOpenCancel()}
              className="bg-gray-400 hover:bg-blue-400 text-white font-bold hover:text-red-500 font-bold  py-2 px-4 border-b-4 border-blue-700 hover:border-red-300 rounded"
            >
              Cancel
            </button>

            <button
            onClick={() => handleJoinMeeting(transaction_id)}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold hover:text-red-500 font-bold  py-2 px-4 border-b-4 border-blue-700 hover:border-red-300 rounded"
          >
            Join Call
          </button>

            
            </>
            
          ) : status === "REFUNDED" ? (
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold hover:text-red-500 font-bold  py-2 px-4 border-b-4 border-blue-700 hover:border-red-300 rounded">
              Refunded
            </button>
          ) : null}

          
        </div>
      </div>
      {/* ******************************************************Booking Cancel Modal************************************************************* */}

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
                      Are you sure you want to Cancel this item?
                    </h3>
                    <p1 className=" text-red-500">
                      ₹50 will deduct from your refund amount
                    </p1>
                    <button
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-800"
                      onClick={() => handleCancel()}
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      onClick={() => handleCloseCancel()}
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookindDetails;
