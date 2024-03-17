import React from "react";

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 relative mt-20 max-w-4/5 h-4/5 overflow-hidden">
        {/* Added max-w-4/5 and h-4/5 for fixed dimensions */}
        <div className="max-h-full overflow-y-auto">
          {/* Added overflow-y-auto for vertical scrolling */}
          <img
            src={imageUrl}
            alt="Image"
            className="max-w-full max-h-full object-contain"
          />
          {/* Added object-contain to fit the image within fixed dimensions */}
        </div>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
        >
          {/* Close Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
