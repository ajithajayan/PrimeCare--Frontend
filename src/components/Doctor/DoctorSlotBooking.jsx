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
import { UserAPIwithAcess } from "../API/AdminAPI";
import Cookies from "js-cookie";
import '../../assets/Styles/leave.scss'

const DoctorSlotBooking = ({ docid }) => {
  const accessToken = Cookies.get("access");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
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
  const [Leave, setLeave] = useState(false)

  useEffect(() => {
    // Fetch existing time slots for the selected date and update state
    fetchAvailableSlots();
  }, [selectedDate, docid, isRefresh]);

  // function to fetch the available slots

  const fetchAvailableSlots = () => {
    UserAPIwithAcess.get(
      `appointment/doctors/${docid}/slots?date=${selectedDate.format(
        "YYYY-MM-DD"
      )}`,
      config
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

      UserAPIwithAcess.post(
        `appointment/doctors/${docid}/update_slots/`,
        {
          date: selectedDate.format("YYYY-MM-DD"),
          slots: updatedSlots,
        },
        config
      )
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

    UserAPIwithAcess.delete(
      `appointment/doctors/${docid}/delete_slot/`,
      {
        data: {
          date: selectedDate.format("YYYY-MM-DD"),
          slot: slotToDelete,
        },
      },
      config
    )
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
        <div className="leave pt-10">
          <button className="cta" onClick={()=>setLeave(!Leave)}>
            
            <span className="span">Apply Leave</span>
            <span className="second">
              <svg
                width="50px"
                height="20px"
                viewBox="0 0 66 43"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g
                  id="arrow"
                  stroke="none"
                  strokeWidth={1}
                  fill="none"
                  fillRule="evenodd"
                >
                  <path
                    className="one"
                    d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                    fill="#FFFFFF"
                  />
                  <path
                    className="two"
                    d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                    fill="#FFFFFF"
                  />
                  <path
                    className="three"
                    d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                    fill="#FFFFFF"
                  />
                </g>
              </svg>
            </span>
          </button>
        </div>

        {Leave &&<DoctorLeave docid={docid} setRefresh={setRefresh} />}
        {isBulkBooking && (
          <DoctorWeeklySlotBooking
            docid={docid}
            setRefresh={setRefresh}
            setBulk={setBulk}
            setNormal={setNormal}
            setAdvanceBooking={setAdvanceBooking}
          />
        )}
        {isAdvancedBooking && (
          <AdvancedSlotBooking
            docid={docid}
            setRefresh={setRefresh}
            setBulk={setBulk}
            setNormal={setNormal}
            setAdvanceBooking={setAdvanceBooking}
          />
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
