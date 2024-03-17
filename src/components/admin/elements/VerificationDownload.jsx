import React, { useState } from "react";
import { UserImageAccess } from "../../API/AdminAPI";
import ImageModal from "./ImageModal";


const VerificationDownload = ({ userId }) => {
  const [verificationData, setVerificationData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isfetch, setisfetch] = useState(true);

  const fetchVerificationData = async () => {
    try {
      const response = await UserImageAccess.get(
        `auth/verification/doctor/${userId}`
      );
      setVerificationData(response.data);
      setisfetch(false);
    } catch (error) {
      console.error("Error fetching verification data:", error);
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
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

      {verificationData && (
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() =>
              openImageModal(verificationData.aadhar_file)
            }
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            View Aadhar Card
          </button>

          <button
            type="button"
            onClick={() =>
              openImageModal(verificationData.degree_certificate)
            }
            className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            View Degree Certificate
          </button>

          <button
            type="button"
            onClick={() =>
              openImageModal(verificationData.experience_certificate)
            }
            className="inline-flex items-center px-3 py-2 mt-3 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            View Experience Certificate
          </button>
        </div>
      )}

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={closeImageModal}
        />
      )}
    </div>
  );
};

export default VerificationDownload;
