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

const DoctorWeeklySlotBooking = ({ docid, setRefresh,setBulk, setNormal,setAdvanceBooking}) => {
  const [selectedFromDate, setSelectedFromDate] = useState(dayjs());
  const [selectedToDate, setSelectedToDate] = useState(dayjs());
  const [timeSlots, setTimeSlots] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);

  useEffect(() => {
    // Fetch existing time slots for the selected date range and update state
  }, []);

  const handleFromTimeChange = (newTime) => {
    setFromTime(newTime);
  };

  const handleToTimeChange = (newTime) => {
    setToTime(newTime);
  };

  const handleDateChange = (newDate, dateType) => {
    if (dateType === "from") {
      setSelectedFromDate(newDate);
    } else if (dateType === "to") {
      setSelectedToDate(newDate);
    }
  };

  const handleSaveSlots = () => {
    const currentDate = moment(); // Get the current date

    if (fromTime && toTime) {
      const fromTimeFormatted = moment(fromTime.$d);
      const toTimeFormatted = moment(toTime.$d);

      // Validate the date range
      const maxDateRange = 14; // Maximum allowed date range in days
      const dateRangeInDays = selectedToDate.diff(selectedFromDate, "days");

      if (dateRangeInDays > maxDateRange) {
        toast.warning(`Date range cannot exceed ${maxDateRange} days.`);
        return;
      }

      // Validate that selectedFromDate is not before the current date
      if (selectedFromDate.isBefore(currentDate, "day")) {
        toast.warning("Please select a date on or after the current date.");
        return;
      }

      // Validate the time range, you can customize this based on your requirements
      const allowedStartTime = moment("05:00:00", "HH:mm:ss");
      const allowedEndTime = moment("22:00:00", "HH:mm:ss");

      if (
        fromTimeFormatted.isBefore(allowedStartTime) ||
        toTimeFormatted.isAfter(allowedEndTime)
      ) {
        toast.warning("Slot allocation time should be between 5 am and 10 pm.");
        return;
      }

      const durationInMinutes = toTimeFormatted.diff(
        fromTimeFormatted,
        "minutes"
      );
      const minSlotDuration = 20;
      const maxSlotDuration = 40;

      if (
        durationInMinutes < minSlotDuration ||
        durationInMinutes > maxSlotDuration
      ) {
        toast.warning(
          `Slot duration should be between ${minSlotDuration} and ${maxSlotDuration} minutes.`
        );
        return;
      }

      // Axios request to save slots
      const newSlot = {
        from_time: fromTimeFormatted.format("HH:mm:ss"),
        to_time: toTimeFormatted.format("HH:mm:ss"),
      };
      const updatedSlots = [newSlot];

      axios
        .post(baseUrl + `appointment/doctors/${docid}/update_slots/bulk/`, {
          from_date: selectedFromDate.format("YYYY-MM-DD"),
          to_date: selectedToDate.format("YYYY-MM-DD"),
          slots: updatedSlots,
        })
        .then((response) => {
          // Call the function to fetch available slots if needed
          // fetchAvailableSlots();
          setRefresh(true);
          toast.success("Slots created successfully");
        })
        .catch((error) => {
          console.error("Error updating time slots:", error);
          toast.error(
            "Duplicate and Overlapping slots are not allowed. Please choose a different time range."
          );
        });
    } else {
      toast.warning("Please select from and to time");
    }
  };

  return (
    <div>
      <label
        htmlFor="settings-timezone"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Select your date range
      </label>
      <div className="flex">
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
          Create time slot
        </label>
        <div className="flex pb-4">
          <Timer label="From Time" onTimeChange={handleFromTimeChange} />
          <Timer label="To Time" onTimeChange={handleToTimeChange} />
        </div>
        <button
          onClick={handleSaveSlots}
          className=" text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Save Slots
        </button>

        <div className="block flex justify-between pt-8">
          <button
            onClick={() => {
              setBulk(false);
              setNormal(true);
            }}
            className="  text-white bg-gray-400 ml-10 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create Single
          </button>

          <button
            onClick={() => {
              setBulk(false);
              setNormal(false);
              setAdvanceBooking(true);
            }}
            className="  text-white bg-gray-400 ml-10 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Advanced slot creation
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorWeeklySlotBooking;
