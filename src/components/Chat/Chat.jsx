import React from 'react'
import { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Chat() {
    const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [client, setClient] = useState(null);

  const salonUser = {
    salonUser: {
      id: 1,
      name: 'Your Salon Name',
      // other salonUser properties
    },
    // other properties if any
  };
  const salonId = salonUser.salonUser.id;

  useEffect(() => {

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${baseURL}/salon-side/booked-appointments/${salonId}/`);
        // Set the bookings data to your state
      } catch (error) {
        console.error('Error fetching bookings', error);
      }
    };

    fetchBookings();
  }, [salonId]);

  const connectToWebSocket = (appointmentId) => {
    if (!appointmentId) return;

    const newClient = new W3CWebSocket(`wss://primecare.cloud/ws/chat/${appointmentId}/`);
    setClient(newClient);

    newClient.onopen = () => {
      console.log('WebSocket Client Connected');
    };

    newClient.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setChatMessages((prevMessages) => [...prevMessages, data]);
    };

    // Fetch existing messages when the component mounts
    const fetchExistingMessages = async () => {
      try {
        const response = await axios.get(`${baseURL}/chat/${appointmentId}/`);
        // Set the fetched messages to your state
        setChatMessages(response.data);
      } catch (error) {
        console.error('Error fetching existing messages:', error);
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
    connectToWebSocket(booking.id);
  };

  const sendMessage = () => {
    if (message.trim() === '' || !client || !selectedAppointment || client.readyState !== client.OPEN) {
      console.log("WebSocket is not open");
      return;
    }

    const sendername = salonUser.salonUser.name;

    client.send(JSON.stringify({ message, sendername }));
    setMessage('');
  };

  return (
    <>
  {/* Component Start */}
  <div className="flex flex-col flex-grow w-screen h-screen max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
      <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
        <div>
          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">Lorem ipsum dolor sit amet.</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
        <div>
          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">Lorem ipsum dolor sit amet.</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs">
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
        <div>
          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
      </div>
      <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
        <div>
          <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
            <p className="text-sm">Lorem ipsum dolor sit.</p>
          </div>
          <span className="text-xs text-gray-500 leading-none">2 min ago</span>
        </div>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
      </div>
    </div>
    <div className="bg-gray-300 p-4">
      <input
        className="flex items-center h-10 w-full rounded px-3 text-sm"
        type="text"
        placeholder="Type your message…"
      />
    </div>
  </div>
  {/* Component End  */}
</>

  )
}

export default Chat