import React, { useState } from "react";
import axios from "axios";
import { UserAPIwithAcess } from "../../API/AdminAPI";

const VerificationDownload = ({ userId }) => {
  const [isDown, setisDown] = useState(false);
  const [isfetch, setisfetch] = useState(true);

  const [verificationData, setVerificationData] = useState(null);

  const fetchVerificationData = async () => {
    try {
      const response = await UserAPIwithAcess.get(
        `auth/verification/doctor/${userId}`
      ); // Adjust the API endpoint accordingly
      setVerificationData(response.data);
      setisDown(true)
      setisfetch(false)
    } catch (error) {
      console.error("Error fetching verification data:", error);
    }
  };

  const handleDownloadAll = async () => {
    if (!verificationData) return;
  
    const downloadLinks = [
      {
        url: verificationData.aadhar_file,
        filename: "aadhar_card.pdf",
      },
      {
        url: verificationData.degree_certificate,
        filename: "degree_certificate.pdf",
      },
      {
        url: verificationData.experience_certificate,
        filename: "experience_certificate.pdf",
      },
    ];
  
    try {
      // Sequentially download each file
      for (const { url, filename } of downloadLinks) {
        const response = await axios.get(url, {
          responseType: "blob",
        });
  
        const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  
  return (
    <div>
      {/* <h2 className="p-3">Verification Documents</h2> */}
      {isfetch && (
        <button
          type="button"
          onClick={fetchVerificationData}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
          Fetch Documents
        </button>
      )}

      {isDown && (
        <button
          type="button"
          onClick={handleDownloadAll}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            ></path>
          </svg>
          Download
        </button>
      )}
    </div>
  );
};

export default VerificationDownload;
