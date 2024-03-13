import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./ChatComponent.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../utils/constants/Constants";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import docavatar from "../../assets/images/doctor/docavatar.webp";
import user from "../../assets/images/doctor/user.png";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

const PatientChatComponent = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [bookings, setBookings] = useState([]);
  console.log("BOOKINGS:", bookings);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [client, setClient] = useState(null);
  console.log("CLIENT:", client);
  // const salonUser = useSelector(state => state.salon)
  // console.log('salonUser:', salonUser)
  // const salonId = salonUser.salonUser.id
  // console.log('salonID:', salonId)

  const [patient_id, setPatientID] = useState(null);
  const [doct, setdoct] = useState("");

  const fetchBookings = async (id) => {
    try {
      const response = await axios.get(
        `${baseUrl}appointment/api/patient-transactions/?patient_id=${id}`
      );
      setBookings(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    }
  };

  const fetchDoctorID = (id) => {
    axios
      .get(baseUrl + `auth/custom-id/patient/${id}`)
      .then((res) => {
        setdoct(res.data);
        console.log(res.data.patient_user.custom_id);
        fetchBookings(res.data.patient_user.custom_id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUserID = () => {
    const token = Cookies.get("access");
    const decoded = jwtDecode(token);
    setPatientID(decoded.user_id);
    fetchDoctorID(decoded.user_id);
  };

  useEffect(() => {
    fetchUserID();
  }, []);

  const connectToWebSocket = (appointmentId) => {
    if (!appointmentId) return;

    const newClient = new W3CWebSocket(
      `ws://127.0.0.1:8000/ws/chat/${appointmentId}/`
    );
    setClient(newClient);

    newClient.onopen = () => {
      console.log("WebSocket Client Connected");
    };

    newClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setChatMessages((prevMessages) => [...prevMessages, data]);
    };
    const fetchExistingMessages = async () => {
      try {
        const response = await fetch(
          `${baseUrl}chat/chat-messages/transaction/${appointmentId}/`
        );

        if (!response.ok) {
          console.error(
            "Error fetching existing messages. Status:",
            response.status
          );
          return;
        }

        const data = await response.json();

        const messagesTextArray = data.map((item) => ({
          message: item.message,
          sendername: item.sendername,
        }));

        setChatMessages(messagesTextArray);
        console.log("Chat messages:", messagesTextArray);
      } catch (error) {
        console.error("Error fetching existing messages:", error);
      }
    };

    fetchExistingMessages();

    return () => {
      newClient.close();
    };
  };

  const handleAppointmentClick = (booking) => {
    setSelectedAppointment(booking);
    setChatMessages([]);
    connectToWebSocket(booking.transaction_id);
  };

  const sendMessage = () => {
    if (!client || client.readyState !== client.OPEN) {
      console.error("WebSocket is not open");
      return;
    }

    const sendername = doct.first_name;
    console.log("SENDER NAME:", sendername);

    const messageData = { message, sendername };
    const messageString = JSON.stringify(messageData);

    console.log("Sending Message:", messageString);

    client.send(messageString);
    setMessage("");
  };

  return (
    <div>
      <main
        className="content w-full "
        style={{ marginTop: "25px", marginBottom: "0" }}
      >
        <div className="container p-0"></div>
        <div className="card">
          <div className="row g-0">
            {/* <div className="col-12 col-lg-5 col-xl-3 border-right">
                      <div className="px-4 ">
                          <div className="d-flfex align-itemfs-center">
                            <div className="flex-grow-1 d-flex align-items-center mt-2">
                              <input
                                type="text"
                                className="form-control my-3"
                                placeholder="Search..."
                                onChange=''
                                name='username'
        
                              />
                              <button className='ml-2' onClick=''style={{border:"none", borderRadius:"50%"}}><i className='fas fa-search'></i></button>
                            </div>
                          </div>
                      </div>
                    </div> */}

            <div className="chat-container">
              <div className="appointments-list">
                <h2>Upcoming Appointments</h2>
                <ul>
                  {bookings.map((booking) => (
                    <li
                      key={booking.transaction_id}
                      onClick={() => handleAppointmentClick(booking)}
                    >
                      <div className="doctor-list-item d-flex align-items-start">
                        <img
                          src={
                            booking.doctor_profile_picture
                              ? booking.doctor_profile_picture
                              : docavatar
                          }
                          alt="Doctor"
                          className="rounded-circle mr-1"
                        />
                        <div className="flex-grow-1 ml-3">
                          <div className="small">
                            <small
                              style={{ fontSize: "16px", fontWeight: "bold" }}
                            >
                              {booking.doctor_name}
                            </small>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat-window h-96">
                {selectedAppointment && (
                  <div className="flex flex-col flex-grow w-screen h-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="selected-doctor-info d-flex align-items-center">
                      <img
                        src={
                          selectedAppointment.doctor_profile_picture
                            ? selectedAppointment.doctor_profile_picture
                            : docavatar
                        }
                        alt={selectedAppointment.doctor_name}
                        className="rounded-circle mr-1"
                        width={40}
                        height={40}
                      />
                      <div className="flex-grow-1">
                        <strong>{selectedAppointment.doctor_name}</strong>
                      </div>
                    </div>

                    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className="message-container">
                          {msg.sendername === doct.first_name ? (
                            <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                              <div>
                                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                  <p className="text-sm">{msg.message}</p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none">
                                  {msg.timestamp}
                                </span>
                              </div>
                              <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                <img
                                  className="object-cover w-full h-full"
                                  src={user}
                                  alt="User Avatar"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="flex w-full mt-2 space-x-3 max-w-xs">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
                                <img
                                  className="object-cover w-full h-full"
                                  src={
                                    selectedAppointment.doctor_profile_picture
                                      ? selectedAppointment.doctor_profile_picture
                                      : docavatar
                                  }
                                  alt="User Avatar"
                                />
                              </div>
                              <div>
                                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                  <p className="text-sm">{msg.message}</p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none">
                                {msg.timestamp}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-300 p-4">
                      <div className="flex items-center">
                        <input
                          className="flex-grow h-10 rounded px-3 text-sm"
                          type="text"
                          placeholder="Type your message…"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                        <button className="ml-2" onClick={sendMessage}>
                          <PaperAirplaneIcon className="h-6 w-6 text-blue-500 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientChatComponent;
