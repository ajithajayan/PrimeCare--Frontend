// Timer.jsx

import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const Timer = ({ label, onTimeChange }) => {
  const handleTimeChange = (newTime) => {
    onTimeChange(newTime);
    console.log("gulabaaaaaaaaaa time taker",newTime)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['TimePicker']}>
        <TimePicker label={label}  onChange={handleTimeChange} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Timer;
