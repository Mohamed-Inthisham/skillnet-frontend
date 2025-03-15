import React from 'react';
import PropTypes from 'prop-types';
import { Check } from 'lucide-react';

const mockJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    matchPercentage: 95,
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'InnovateHub',
    location: 'New York, NY',
    matchPercentage: 88,
  },
  {
    id: '3',
    title: 'React Developer',
    company: 'StartupX',
    location: 'San Francisco, CA',
    matchPercentage: 85,
  },
];

function MatchedJobList({ selectedJobs, setSelectedJobs, onSubmit }) {
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
        {mockJobs.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4 hover:border-blue-500 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500 text-sm">{job.location}</p>
              </div>
              <div className="flex items-center space-x-4">
                {/* <span className="text-green-600 font-semibold">
                  {job.matchPercentage}% Match
                </span> */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedJobs.includes(job.id)}
                    onChange={() => toggleJob(job.id)}
                  />
                  <div
                    className={`w-6 h-6 border-2 rounded ${
                      selectedJobs.includes(job.id)
                        ? 'bg-blue-500 border-blue-600'
                        : 'border-gray-300'
                    } flex items-center justify-center`}
                  >
                    {selectedJobs.includes(job.id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
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
}

MatchedJobList.propTypes = {
  selectedJobs: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedJobs: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default MatchedJobList;