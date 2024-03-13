import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorAvailability = () => {
  const [selectedDate, setSelectedDate] = useState('2024-02-14'); // Example date
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  useEffect(() => {
    // Fetch available time slots when the selected date changes
    fetchAvailableTimeSlots(selectedDate);
  }, [selectedDate]);

  const fetchAvailableTimeSlots = async (date) => {
    try {
      // Make a request to your backend API
      const response = await axios.get(`/api/availability?date=${date}&doctorId=123`);
      
      // Update state with the fetched time slots
      setAvailableTimeSlots(response.data.availableTimeSlots);
    } catch (error) {
      console.error('Error fetching available time slots:', error);
    }
  };

  const handleTimeSlotSelect = (timeSlot) => {
    // Set the selected time slot when a user clicks on it
    setSelectedTimeSlot(timeSlot);
  };

  const handleBooking = () => {
    // Implement booking logic here
    // You can make a request to your backend to confirm the booking for the selected time slot
    if (selectedTimeSlot) {
      console.log('Booking confirmed for:', selectedTimeSlot);
      // Add your booking logic or API call here
    }
  };

  return (
    <div>
      <h2>Available Time Slots for {selectedDate}</h2>
      <ul>
        {availableTimeSlots.map((timeSlot) => (
          <li key={timeSlot.id}>
            {timeSlot.startTime} - {timeSlot.endTime}
            <button onClick={() => handleTimeSlotSelect(timeSlot)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedTimeSlot && (
        <div>
          <p>Selected Time Slot: {selectedTimeSlot.startTime} - {selectedTimeSlot.endTime}</p>
          <button onClick={handleBooking}>Book Now</button>
        </div>
      )}
    </div>
  );
};

export default DoctorAvailability;
