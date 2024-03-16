import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Timer from "../Timer/Timer";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/constants/Constants";
import moment from "moment";
import DatePickerComponent from "../calender/DatePickerComponent";
import Select from "react-select";
import Cookies from "js-cookie";
import { UserAPIwithAcess } from "../API/AdminAPI";

const DoctorLeave = ({ docid, setRefresh }) => {
  const accessToken = Cookies.get("access");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  


  const handleDateChange = (newDate, dateType) => {
    if (dateType === "from") {
      setSelectedFromDate(newDate);
    } else if (dateType === "to") {
      setSelectedToDate(newDate);
    }
  };

  

  const handleApplyLeave = async () => {
    try {
      await UserAPIwithAcess.post(
        `${baseUrl}appointment/doctors/D5000/update_leave/`,
        {
          fromDate: selectedFromDate.format("YYYY-MM-DD"),
          toDate: selectedToDate.format("YYYY-MM-DD"),
          custom_id:docid
          
        },config
      );

      toast.success("Slots saved successfully");
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error saving slots", error);
    }
  };

  return (
    <div className="pt-8">
      <label
        htmlFor="settings-timezone"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select your date range for to Apply leave
      </label>
      <div className="flex pb-3">
        <DatePickerComponent
          label="Leave From Date"
          onDateChange={handleDateChange}
          dateType="from"
          minDate={dayjs().toDate()}
        />
        <DatePickerComponent
          label="Leave To Date"
          onDateChange={handleDateChange}
          dateType="to"
          minDate={dayjs().toDate()}
        />
      </div>

      <button
          onClick={handleApplyLeave}
          className="px-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Apply leave
        </button>
      
    </div>
  );
};

export default DoctorLeave;
