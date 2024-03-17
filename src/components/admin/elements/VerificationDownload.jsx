import React, { useState } from "react";
import { UserAPIwithAcess, UserImageAccess } from "../../API/AdminAPI";
import JsFileDownloader from "js-file-downloader";

const VerificationDownload = ({ userId }) => {
  const [verificationData, setVerificationData] = useState(null);
  const [isDown, setisDown] = useState(false);
  const [isfetch, setisfetch] = useState(true);
  const [aadharFileUrl, setAadharFileUrl] = useState("");
  const [degreeCertificateUrl, setDegreeCertificateUrl] = useState("");
  const [experienceCertificateUrl, setExperienceCertificateUrl] = useState("");

  const fetchVerificationData = async () => {
    try {
      const response = await UserImageAccess.get(
        `auth/verification/doctor/${userId}`
      );
      setVerificationData(response.data);
      setAadharFileUrl(response.data.aadhar_file);
      setDegreeCertificateUrl(response.data.degree_certificate);
      setExperienceCertificateUrl(response.data.experience_certificate);
      setisDown(true);
      setisfetch(false);
    } catch (error) {
      console.error("Error fetching verification data:", error);
    }
  };

  const handleDownloadImage = async (url, filename) => {
    try {
      if (!url) {
        throw new Error("Image URL is not available.");
      }

      await new JsFileDownloader({ url: url, filename: filename });
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div>
      {isfetch && (
        <button
          type="button"
          onClick={fetchVerificationData}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Fetch Documents
        </button>
      )}

      {isDown && (
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => handleDownloadImage(aadharFileUrl, "aadhar_card.jpg")}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Show Aadhar Card
          </button>

          <button
            type="button"
            onClick={() => handleDownloadImage(degreeCertificateUrl, "degree_certificate.jpg")}
            className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Show Degree Certificate
          </button>

          <button
            type="button"
            onClick={() => handleDownloadImage(experienceCertificateUrl, "experience_certificate.jpg")}
            className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Show Experience Certificate
          </button>
          
        </div>
      )}
    </div>
  );
};

export default VerificationDownload;
