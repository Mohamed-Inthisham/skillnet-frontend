// src/components/UploadSuccessMessage.js (Optional text update)
import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2 } from 'lucide-react';

function UploadSuccessMessage({ selectedJobCount, onReset }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-6" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Application Submitted Successfully!
      </h2>
      <p className="text-gray-700 mb-4">
        You have applied to {selectedJobCount} job{selectedJobCount > 1 ? 's' : ''}.
        They will review your application and get back to you soon.
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go Back To Job Portal {/* Updated button text (optional) */}
      </button>
    </div>
  );
}

UploadSuccessMessage.propTypes = {
  selectedJobCount: PropTypes.number.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default UploadSuccessMessage;