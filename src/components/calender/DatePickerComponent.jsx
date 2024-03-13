// DatePickerComponent.jsx
import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DatePickerComponent({ label, onDateChange, dateType }) {
  const handleDateChange = (newDate) => {
    onDateChange(newDate, dateType);
    console.log("gulabaaaaaaaaaa date taker",newDate)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label={label} onChange={handleDateChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePickerComponent;
