import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    "email" : "",
  });

  const {email} = formData

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
  })
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
  <div>
    <form className="form">
    <h2 style={{ fontWeight: 500, fontSize: '1.5rem', margin: '20px 0', textAlign: 'center' }}>
          Reset Password
  </h2>
      <div className="flex-column">
        <label>Email </label>
      </div>
      <div className="inputForm">
        <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
          <g id="Layer_3" data-name="Layer 3">
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
          </g>
        </svg>
        <input type="text" className="input" name='email' placeholder="Enter your Email" onChange={handleChange} value={email} required />
      </div>
      <button className="button-submit" onClick={handleSubmit}>Reset</button>
      <p className="p">Don't have an account? <Link className="span" to="/auth/register">Sign Up</Link></p>
    </form>
  </div>
  )
}

export default ResetPasswordPage