import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle2 } from 'lucide-react';

function UploadSuccessMessage({ selectedJobCount, onReset }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
      <h2 className="mt-4 text-2xl font-semibold text-gray-900">
        Application Submitted Successfully!
      </h2>
      <p className="mt-2 text-gray-600">
        You have applied to {selectedJobCount} job{selectedJobCount > 1 ? 's' : ''}.
        They will review your application and get back to you soon.
      </p>
      <button
        onClick={onReset}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Go Back To Module Page
      </button>
    </div>
  );
}

UploadSuccessMessage.propTypes = {
  selectedJobCount: PropTypes.number.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default UploadSuccessMessage;