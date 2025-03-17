import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'lucide-react';

const MatchedJobList = ({ selectedJobs, setSelectedJobs, onSubmit, apiResponseData }) => {
  const jobsToDisplay = apiResponseData && apiResponseData.JDs ? apiResponseData.JDs : [];

  if (jobsToDisplay.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Matching Job Descriptions</h2>
        <p className="text-gray-700">No matching job descriptions found.</p>
      </div>
    );
  }

  const toggleJob = (jobId) => {
    setSelectedJobs(
      selectedJobs.includes(jobId)
        ? selectedJobs.filter((id) => id !== jobId)
        : [...selectedJobs, jobId]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">Matching Job Descriptions</h2>
      <div className="space-y-4">
        {jobsToDisplay.map((job, index) => {
          const jobId = `api-job-${index}`; // Generate a unique ID
          let jobTitle = 'Job Title Not Available';

          // Extract job title from file path
          if (typeof job === 'string') {
            const parts = job.split('/');
            const filenameWithExtension = parts[parts.length - 1];
            const filename = filenameWithExtension.replace('.json', '');
            jobTitle = filename;
          }

          return (
            <div
              key={jobId}
              className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center justify-between"> {/* Flex container for title and checkbox */}
                <div className="flex-1"> {/* Take up remaining space */}
                  <h3 className="text-lg font-medium text-gray-900">
                    {jobTitle}
                  </h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer"> {/* Checkbox label */}
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedJobs.includes(jobId)}
                    onChange={() => toggleJob(jobId)}
                  />
                  <div
                    className={`w-6 h-6 border-2 rounded ${
                      selectedJobs.includes(jobId)
                        ? 'bg-blue-500 border-blue-600'
                        : 'border-gray-300'
                    } flex items-center justify-center`}
                  >
                    {selectedJobs.includes(jobId) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end"> {/* Apply Jobs button container */}
        <button
          onClick={onSubmit}
          disabled={selectedJobs.length === 0}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            selectedJobs.length > 0
              ? 'bg-blue-500 hover:bg-blue-600'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Apply to Selected Jobs
        </button>
      </div>
    </div>
  );
};

MatchedJobList.propTypes = {
  apiResponseData: PropTypes.object,
  selectedJobs: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedJobs: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MatchedJobList;