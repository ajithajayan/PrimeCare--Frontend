import React, { useState, useRef } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../utils/constants/Constants';
import { toast } from 'react-toastify';

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const emailFromRegistration = location?.state?.email || '';
  const [otp, setOtp] = useState({ input1: '', input2: '', input3: '', input4: '' });

  // Create an array of refs for each input field
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Check if the backspace key is pressed and move to the previous input field
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }

    // Update the state
    setOtp((prevOtp) => ({
      ...prevOtp,
      [name]: value,
    }));

    // Move to the next input field if the value is not empty and not the last input field
    if (value !== '' && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleVerification = async (event) => {
        event.preventDefault();
     console.log(Object.values(otp).join(''));
     console.log(emailFromRegistration);

    try {
      const response = await axios.post(baseUrl+'auth/verify-otp', {
        email: emailFromRegistration,
        otp: Object.values(otp).join(''), // Concatenate the OTP values
        // Add any other necessary data for verification
      });
  
      if (response.status === 200) {
        // If verification is successful, you can redirect or perform other actions

        console.log('User successfully verified');
        toast.success('User successfully verified. Please login using email and password');
        navigate("/auth/login")
      } else {
        // Handle other response statuses or show an error message
        toast.error('OTP verification failed',response.error);
        console.error('OTP verification failed');
      }
    } catch (error) {
        toast.error('Error during OTP verification', error); 
      console.error('Error during OTP verification', error);
    }
  };

  return (
    <>
      <div className='verify'>
        <form className="form" onSubmit={handleVerification}>
          <div className="title">OTP</div>
          <div className="title">Verification Code</div>
          <p className="message">We have sent a verification code to your Email </p>
          <p> </p>
          <div className="inputs">
            {Array.from({ length: 4 }, (_, index) => (
              <input
                key={index}
                type="text"
                name={`input${index + 1}`}
                maxLength="1"
                value={otp[`input${index + 1}`] || ''}
                onChange={(e) => handleInputChange(e, index)}
                ref={inputRefs[index]}
              />
            ))}
          </div>
          <button className='action' type="submit">Verify Me</button>
        </form>
      </div>
    </>
  );
}

export default VerifyOtp;
