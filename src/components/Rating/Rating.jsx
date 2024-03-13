// Rating.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '../../utils/constants/Constants';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const Rating = ({ doctorId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const accessToken = Cookies.get("access");
  const decoded = jwtDecode(accessToken);
  const userID = decoded.user_id;

  useEffect(() => {
    

    // Fetch the average rating when the component mounts
    axios.get(baseUrl+`auth/doctor/${doctorId}/average-rating/`)
      .then((response) => {setAverageRating(response.data.average_rating)
        setUserRating(response.data.user_rating)})
      .catch(error => console.error('Error fetching average rating:', error));

    // Fetch the user's rating (if available)
    axios.get(baseUrl+`auth/doctor/${doctorId}/user-rating/`)
      .then(response => setUserRating(response.data.user_rating))
      .catch(error => console.error('Error fetching user rating:', error));
  }, [doctorId]);

  const handleRatingClick = newRating => {
    // Update the user's rating on the server
    axios.post(baseUrl+`auth/doctor/${doctorId}/user-rating/`, { rating: newRating, custom_id: doctorId, userID: userID })
  .then(response => {
    setUserRating(response.data.user_rating);
    // Optionally, update the average rating as well
    toast.success('Rating updated successfully!');
    setAverageRating(response.data.average_rating);
  })
  .catch(error => console.error('Error updating user rating:', error));

  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star, index) => (
        <span
          key={index}
          className={star <= (hoverRating || userRating) ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'}
          onClick={() => handleRatingClick(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      ))}
      {/* <p>Average Rating: {averageRating}</p> */}
    </div>
  );
};

export default Rating;
