import React from "react";
import { Link } from "react-router-dom";

const DoctorCard = ({ img, name, speciality, rating,id }) => {
  // Calculate the number of filled stars and the remaining fractional part
  const filledStars = Math.floor(rating);
  const remainder = rating - filledStars;

  // Create an array to map through for rendering stars
  const starsArray = Array.from({ length: 5 }, (_, index) => {
    // Determine whether to render a full, half, or empty star based on the index and remainder
    if (index < filledStars) {
      return (
        <svg
          key={index}
          className="w-4 h-4 text-yellow-300 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    } else if (index === filledStars && remainder > 0) {
      return (
        <svg
          key={index}
          className="w-4 h-4 text-yellow-300 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    } else {
      return (
        <svg
          key={index}
          className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      );
    }
  });

  return (
    <Link
      to=""
      className="flex flex-col items-center p-1 mb-2 bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <img
        className="object-cover w-full rounded-full h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={img}
        alt=""
      />

      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Dr. {name.charAt(0).toUpperCase() + name.slice(1)}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {speciality}
          <div className="flex items-center">
          {/* Render the dynamically generated stars */}
          {starsArray}
        </div>
        </p>
        
        <div className="flex flex-col md:flex-row mb-2">
          <Link to={`/doctor-profile/${id}`}><button className="btn ml-0 mt-2 md:ml-2 md:mt-0">View Profile</button></Link>
          <Link to={`/doctor-profile/${id}`}><button className="btn ml-0 mt-2 md:ml-2 md:mt-0">Book Appointment</button></Link>
        </div>
        
      </div>
    </Link>
  );
};

export default DoctorCard;
