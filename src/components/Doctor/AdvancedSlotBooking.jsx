import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Timer from "../Timer/Timer";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/constants/Constants";
import { TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import DatePickerComponent from "../calender/DatePickerComponent";
import Select from "react-select";
import Cookies from "js-cookie";
import { UserAPIwithAcess } from "../API/AdminAPI";

const AdvancedSlotBooking = ({ docid, setRefresh,setBulk, setNormal,setAdvanceBooking }) => {
  const accessToken = Cookies.get("access");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [timeSlots, setTimeSlots] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [fromBreakTime, setFromBreakTime] = useState(null);
  const [toBreakTime, setToBreakTime] = useState(null);

  const handleFromTimeChange = (newTime) => {
    setFromTime(newTime);
  };

  const handleToTimeChange = (newTime) => {
    setToTime(newTime);
  };

  const handleFromBreakTimeChange = (newTime) => {
    setFromBreakTime(newTime);
  };

  const handleToBreakTimeChange = (newTime) => {
    setToBreakTime(newTime);
  };

  const handleDateChange = (newDate, dateType) => {
    if (dateType === "from") {
      setSelectedFromDate(newDate);
    } else if (dateType === "to") {
      setSelectedToDate(newDate);
    }
  };

  const [selectedDays, setSelectedDays] = useState([]);

  // Array of all days of the week
  const daysOfWeek = [
    { label: "Monday", value: "Monday" },
    { label: "Tuesday", value: "Tuesday" },
    { label: "Wednesday", value: "Wednesday" },
    { label: "Thursday", value: "Thursday" },
    { label: "Friday", value: "Friday" },
    { label: "Saturday", value: "Saturday" },
    { label: "Sunday", value: "Sunday" },
  ];

  const [selectedDuration, setSelectedDuration] = useState("25"); // Default value: 25 minutes
  // Array of available time durations
  const timeDurations = ["25", "30", "35", "40", "45"];

  // Function to handle changes in the selected duration
  const handleDurationChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDuration(selectedValue);
  };

  // Function to handle changes in the selected days
  const handleDaysChange = (selectedOptions) => {
    setSelectedDays(selectedOptions);
  };

  // Initial state with a default buffer time
  const [selectedBufferTime, setSelectedBufferTime] = useState("5"); // Default value: 5 minutes

  // Array of available buffer time options
  const bufferTimes = ["5", "10", "15"];

  // Function to handle changes in the selected buffer time
  const handleBufferTimeChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedBufferTime(selectedValue);
  };

  const handleSaveSlots = async () => {
    try {
      await UserAPIwithAcess.post(
        `appointment/doctors/${docid}/update_slots/advanced/`,
        {
          fromDate: selectedFromDate.format("YYYY-MM-DD"),
          toDate: selectedToDate.format("YYYY-MM-DD"),
          fromTimeInMinutes: moment(fromTime.$d).format("HH:mm:ss"),
          toTimeInMinutes: moment(toTime.$d).format("HH:mm:ss"),
          bufferTimeInMinutes: parseInt(selectedBufferTime, 10),
          fromBreakTimeInMinutes: moment(fromBreakTime.$d).format("HH:mm:ss"),
          toBreakTimeInMinutes: moment(toBreakTime.$d).format("HH:mm:ss"),
          workingdaysOfWeek: selectedDays.map((day) => day.label),
          slot_duration: selectedDuration,
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
        Select your date range
      </label>
      <div className="flex pb-3">
        <DatePickerComponent
          label="From Date"
          onDateChange={handleDateChange}
          dateType="from"
          minDate={dayjs().toDate()}
        />
        <DatePickerComponent
          label="To Date"
          onDateChange={handleDateChange}
          dateType="to"
          minDate={dayjs().toDate()}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="settings-timezone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Working hours
        </label>
        <div className="flex pb-4">
          <Timer label="From Time" onTimeChange={handleFromTimeChange} />
          <Timer label="To Time" onTimeChange={handleToTimeChange} />
        </div>

        <div className="pt-5">
          <label
            htmlFor="settings-timezone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Break Time
          </label>
          <div className="flex pb-4">
            <Timer label="From Time" onTimeChange={handleFromBreakTimeChange} />
            <Timer label="To Time" onTimeChange={handleToBreakTimeChange} />
          </div>
        </div>

        <div>
          <label htmlFor="workingDays">Select Working Days:</label>
          <Select
            id="workingDays"
            isMulti
            options={daysOfWeek}
            value={selectedDays}
            onChange={handleDaysChange}
          />
        </div>
        <div className="flex justify-between pb-10">
          <div className="pt-8">
            <label
              className="text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="timeDuration"
            >
              Consultaion Time Duration:
            </label>
            <select
              id="timeDuration"
              value={selectedDuration}
              onChange={handleDurationChange}
            >
              {timeDurations.map((duration) => (
                <option key={duration} value={duration}>
                  {duration} minutes
                </option>
              ))}
            </select>
          </div>

          <div className="pt-8">
            <label
              className="text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="bufferTime"
            >
              Select Buffer Time:
            </label>
            <select
              id="bufferTime"
              value={selectedBufferTime}
              onChange={handleBufferTimeChange}
            >
              {bufferTimes.map((bufferTime) => (
                <option key={bufferTime} value={bufferTime}>
                  {bufferTime} minutes
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSaveSlots}
          className="px-10 text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Save Slots
        </button>

        <div className="block flex justify-between pt-8">
          <button
            onClick={() => {
              setBulk(false);
              setNormal(true);
              setAdvanceBooking(false);
            }}
            className="  text-white bg-gray-400 ml-10 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create Single
          </button>

          <button
            onClick={() => {
              setBulk(true);
              setNormal(false);
              setAdvanceBooking(false);
            }}
            className="  text-white bg-gray-400 ml-10 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Bulk slot creation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSlotBooking;
