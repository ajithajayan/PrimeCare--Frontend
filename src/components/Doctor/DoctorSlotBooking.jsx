import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Timer from "../Timer/Timer";
import { toast } from "react-toastify";
import { baseUrl } from "../../utils/constants/Constants";
import { DateCalendar } from "@mui/x-date-pickers";
import { TrashIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import DoctorWeeklySlotBooking from "./DoctorWeeklySlotBooking";
import AdvancedSlotBooking from "./AdvancedSlotBooking";
import DoctorLeave from "./DoctorLeave";

const DoctorSlotBooking = ({ docid }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timeSlots, setTimeSlots] = useState([]);
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const currentTime = dayjs(new Date());
  const [isBulkBooking, setBulk] = useState(false);
  const [isNormalBooking, setNormal] = useState(true);
  const [isRefresh, setRefresh] = useState(false);
  const [isAdvancedBooking, setAdvanceBooking] = useState(false);

  useEffect(() => {
    // Fetch existing time slots for the selected date and update state
    fetchAvailableSlots();
  }, [selectedDate, docid, isRefresh]);

  // function to fetch the available slots

  const fetchAvailableSlots = () => {
    axios
      .get(
        baseUrl +
          `appointment/doctors/${docid}/slots?date=${selectedDate.format(
            "YYYY-MM-DD"
          )}`
      )
      .then((response) => {
        setTimeSlots(response.data.available_slots || []);
      })
      .catch((error) => {
        console.error("Error fetching existing time slots:", error);
      });
  };

  // this is used for to convert the time to 12 hour format

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

  // ************************** Handling the slotselection ****************************

  const handleTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  // *************************** Handling the form and two time component time management*****************

  const handleFromTimeChange = (newTime) => {
    setFromTime(newTime);
  };

  const handleToTimeChange = (newTime) => {
    setToTime(newTime);
  };

  //  ********************************* Doctor slot updation function ***************************************

  const handleSaveSlots = () => {
    if (fromTime && toTime) {
      // Convert the selected time range to moment objects
      const fromTimeFormatted = moment(fromTime.$d);
      const toTimeFormatted = moment(toTime.$d);

      // Set the allowed time range
      const allowedStartTime = moment("05:00:00", "HH:mm:ss");
      const allowedEndTime = moment("22:00:00", "HH:mm:ss");

      // Check if the selected time range is within the allowed range
      if (
        fromTimeFormatted.isBefore(allowedStartTime) ||
        toTimeFormatted.isAfter(allowedEndTime)
      ) {
        toast.warning("Slot allocation time should be between 5 am and 10 pm.");
        return;
      }

      // Calculate the duration in minutes
      const durationInMinutes = toTimeFormatted.diff(
        fromTimeFormatted,
        "minutes"
      );

      // Define min and max slot durations
      const minSlotDuration = 20;
      const maxSlotDuration = 40;

      // Check if the duration is within the allowed range
      if (
        durationInMinutes < minSlotDuration ||
        durationInMinutes > maxSlotDuration
      ) {
        toast.warning(
          `Slot duration should be between ${minSlotDuration} and ${maxSlotDuration} minutes.`
        );
        return;
      }

      // Get the current date and time
      const currentDate = moment();
      const currentDateTime = currentDate.format("YYYY-MM-DD HH:mm:ss");

      // Combine selected date and time
      const selectedDateTime = moment(
        `${selectedDate.format("YYYY-MM-DD")} ${fromTimeFormatted.format(
          "HH:mm:ss"
        )}`
      );

      // Check if the selected date is the current date and selected time is after 30 minutes from the current time
      if (
        selectedDateTime.isSame(currentDate, "day") &&
        selectedDateTime.isBefore(currentDate.add(30, "minutes"))
      ) {
        toast.warning(
          "Selected time should be at least 30 minutes from the current time."
        );
        return;
      }

      const newSlot = {
        from_time: fromTimeFormatted.format("HH:mm:ss"),
        to_time: toTimeFormatted.format("HH:mm:ss"),
      };
      const updatedSlots = [newSlot];

      axios
        .post(baseUrl + `appointment/doctors/${docid}/update_slots/`, {
          date: selectedDate.format("YYYY-MM-DD"),
          slots: updatedSlots,
        })
        .then((response) => {
          fetchAvailableSlots();
          toast.success("Slot created successfully");
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

  // ******************************** Docotr slot Deletion function *************************

  const handleDeleteSlot = (index) => {
    const slotToDelete = timeSlots[index];

    axios
      .delete(baseUrl + `appointment/doctors/${docid}/delete_slot/`, {
        data: {
          date: selectedDate.format("YYYY-MM-DD"),
          slot: slotToDelete,
        },
      })
      .then((response) => {
        fetchAvailableSlots(); // Refresh the slots after deletion
        toast.success("slot deleted sucessfully");
      })
      .catch((error) => {
        console.error("Error deleting time slot:", error);
      });
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
      <div className="mb-6">
        {isNormalBooking && (
          <>
            <label
              htmlFor="settings-timezone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Create time slot
            </label>
            <div className="flex pb-4">
              <Timer label="from time" onTimeChange={handleFromTimeChange} />
              <Timer label="to time" onTimeChange={handleToTimeChange} />
            </div>
            <button
              onClick={handleSaveSlots}
              className=" text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Save Slots
            </button>
            <div className="block flex justify-items-start pt-8">
              <button
                onClick={() => {
                  setBulk(true);
                  setNormal(false);
                }}
                className="  text-white bg-gray-400 ml-10 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create slot for a bulk date
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
          </>
        )}
        <DoctorLeave docid={docid} setRefresh={setRefresh}/>
        {isBulkBooking && (
          <DoctorWeeklySlotBooking docid={docid} setRefresh={setRefresh} setBulk={setBulk} setNormal={setNormal} setAdvanceBooking={setAdvanceBooking}   />
        )}
        {isAdvancedBooking && (
          <AdvancedSlotBooking docid={docid} setRefresh={setRefresh} setBulk={setBulk} setNormal={setNormal} setAdvanceBooking={setAdvanceBooking}/>
        )}
      </div>
      <h2 className="font-bold p-2 mb-2 border-2 border-black">
        Created Time Slots for - {selectedDate.format("YYYY-MM-DD")}
      </h2>
      {timeSlots.length > 0 ? (
        <div className="pb-6">
          <ul>
            {timeSlots.map((timeSlot, index) => (
              <li
                key={index}
                onClick={() => handleTimeSlotSelect(timeSlot)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedTimeSlot === timeSlot ? "bold" : "normal",
                  border: "1px solid #ddd",
                  padding: "8px",
                  marginBottom: "4px",
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between", // Align items horizontally
                }}
              >
                {`${convertTo12HourFormat(
                  timeSlot.from
                )} - ${convertTo12HourFormat(timeSlot.to)}`}
                {!timeSlot.is_booked && (
                  <TrashIcon
                    className="h-5 w-5 text-red-500 cursor-pointer "
                    onClick={() => handleDeleteSlot(index)}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="font-medium text-red-400 pt-2">
          No slots created for the selected date.
        </p>
      )}
    </div>
  );
};

export default DoctorSlotBooking;
