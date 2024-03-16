import React, { useEffect, useState } from "react";
import DoctorCard from "../Cards/DoctorCard";
import axios from "axios";
import { baseUrl } from "../../utils/constants/Constants";
import Cookies from "js-cookie";
import docpic from "../../assets/images/doctor/docpic.jpg";
import { UserAPIwithAcess } from "../API/AdminAPI";

const DoctorContainer = ({ selectedFilters }) => {
  const accessToken = Cookies.get("access");
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [doctorData, setDoctorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filterType, value) => {
    if (filterType === "gender") {
      setGenderFilter(value);
    } else if (filterType === "specialization") {
      setSpecializationFilter(value);
    }
  };

  const fetchUsers = () => {
    setLoading(true);
    setError(null);

    // Convert filter values to query parameters
    const genderFilterParam =
      selectedFilters.gender.length > 0
        ? `&gender=${selectedFilters.gender.join(",")}`
        : "";
    const specializationFilterParam =
      selectedFilters.specialization.length > 0
        ? `&specialization=${selectedFilters.specialization.join(",")}`
        : "";

    // Construct the API URL with search query and filters
    const apiUrl = `${baseUrl}appointment/doctors/listing/?search=${searchQuery}${genderFilterParam}${specializationFilterParam}`;

    // Get the access token from Cookies or wherever it is stored
    const accessToken = Cookies.get("access"); // Make sure to import Cookies

    // Include the access token in the headers
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    // Make the axios call with headers
    UserAPIwithAcess
      .get(apiUrl, {
        headers: headers,
      })
      .then((req) => {
        setDoctorData(req.data.results);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching data");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [searchQuery, selectedFilters]);

  return (
    <div>
      <div className="rounded-lg  ">
        <div className="flex">
          <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-slate-200 p-5">
            <svg
              viewBox="0 0 20 20"
              aria-hidden="true"
              className="pointer-events-none absolute w-5 fill-gray-500 transition"
            >
              <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full max-w-[420px] bg-white pl-2 text-base font-semibold outline-0"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for doctors..."
          />
          <input
            type="button"
            defaultValue="Search"
            className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
          />
        </div>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {doctorData.length === 0 && !loading && (
        <p className="font-medium pt-20 text-red-500 ml-6">No results found for the selected filters.</p>
      )}
      <ul className="pt-5">
        {doctorData.map((data, key) => (
          <li key={key}>
            <DoctorCard
              name={`${data.first_name} ${data.last_name}`}
              schedule={data.doctor_user.consultation_time}
              speciality={data.doctor_user.specializations}
              img={data.profile_picture ? data.profile_picture : docpic}
              rating={data.doctor_user.rating}
              id={data.doctor_user.custom_id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorContainer;
