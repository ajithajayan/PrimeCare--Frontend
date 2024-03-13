import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../../utils/constants/Constants";
import { toast } from "react-toastify";

const DocumentVerificationForm = ({ id }) => {
  const [aadharFile, setAadharFile] = useState(null);
  const [degreeCertificate, setDegreeCertificate] = useState(null);
  const [experienceCertificate, setExperienceCertificate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const allowedFileTypes = ["image/png", "image/jpeg", "application/pdf"];

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];

    if (file && allowedFileTypes.includes(file.type)) {
      setFile(file);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid file type. Please upload a PNG, JPG, or PDF file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!aadharFile || !degreeCertificate || !experienceCertificate) {
      setErrorMessage("Please upload all required documents.");
      return;
    }

    const formData = new FormData();
    formData.append("user", id);
    formData.append("aadhar_file", aadharFile);
    formData.append("degree_certificate", degreeCertificate);
    formData.append("experience_certificate", experienceCertificate);

    try {
      const response = await axios.patch(baseUrl + `auth/verification/doctor/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Success:", response.data);
      toast.success("Verification documents uploaded successfully!");
      // Add any additional logic for success
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error as needed
    }
  };

  useEffect(()=>{
    axios.get(baseUrl + `auth/verification/doctor/${id}/`).then((res)=>{
      setAadharFile(res.data.aadhar_file)
      degreeCertificate(res.data.degree_certificate)
      experienceCertificate(res.data.experience_certificate)


    })

  },[id])

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flow-root">
        <h3 className="text-xl font-semibold">Document Verification</h3>
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}
          {/* Aadhar File */}
          <li className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="aadharFile"
                >
                  Upload Aadhar
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="aadharFile"
                  defaultValue={aadharFile ? aadharFile : ""}
                  type="file"
                  onChange={(e) => handleFileChange(e, setAadharFile)}
                />
              </div>
              <div className="inline-flex items-center">
                <h1 className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center bg-white border border-gray-300 rounded-lg">
                  Adhar card
                </h1>
              </div>
            </div>
          </li>
          {/* Degree Certificate */}
          <li className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="degreeCertificate"
                >
                  Upload Degree Certificates
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="degreeCertificate"
                  defaultValue={degreeCertificate ? degreeCertificate : ""}
                  type="file"
                  onChange={(e) => handleFileChange(e, setDegreeCertificate)}
                />
              </div>
              <div className="inline-flex items-center">
                <h1 className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center bg-white border border-gray-300 rounded-lg">
                  Qualification
                </h1>
              </div>
            </div>
          </li>
          {/* Experience Certificate */}
          <li className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="experienceCertificate"
                >
                  Upload Experience Certificate
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  id="experienceCertificate"
                  defaultValue={experienceCertificate ? experienceCertificate : ""}
                  type="file"
                  onChange={(e) => handleFileChange(e, setExperienceCertificate)}
                />
              </div>
              <div className="inline-flex items-center">
                <h1 className="px-3 py-2 mb-3 mr-3 text-sm font-medium text-center bg-white border border-gray-300 rounded-lg">
                  Experience
                </h1>
              </div>
            </div>
          </li>
          <div>
            <button
              type="submit"
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save all
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentVerificationForm;
