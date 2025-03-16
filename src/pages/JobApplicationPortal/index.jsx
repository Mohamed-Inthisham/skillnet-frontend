import React, { useState } from 'react';
import { Upload, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import JobList from '../../components/MatchedJobList';
import SuccessMessage from '../../components/CvUploadSuccessMessage';
import UserHeader from '../../layout/UserHeader';

function App() {
  const [cvFile, setCvFile] = useState(null);
  const [showJobs, setShowJobs] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setCvFile(file);
      setError(null); // Clear any previous errors
    }
  };

  const handleUpload = async () => {
    if (!cvFile) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call to process CV with anomaly detection
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random anomaly detection (30% chance of anomaly)
          const isAnomaly = Math.random() < 0.3;
          if (isAnomaly) {
            reject(new Error("Anomaly detected in the CV. Please ensure your CV is in the correct format and contains valid information."));
          } else {
            resolve({ success: true });
          }
        }, 2000);
      });

      if (response.success) {
        setShowJobs(true);
      }
    } catch (err) {
      setError(err.message);
      setCvFile(null); // Clear the file input
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobSubmit = () => {
    if (selectedJobs.length > 0) {
      setIsSuccess(true);
      setShowJobs(false);
    }
  };

  const handleReset = () => {
    setCvFile(null);
    setShowJobs(false);
    setSelectedJobs([]);
    setIsSuccess(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader/>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Job Application Portal
        </h1>

        {!showJobs && !isSuccess && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-center">
              <div className="mb-6">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  Upload your CV
                </h2>
                <p className="mt-2 text-gray-600">
                  Upload your CV to see matching job descriptions
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                  />
                  Select File
                </label>
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-md mt-2">
                    <AlertCircle className="h-5 w-5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                {cvFile && !error && (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-gray-600">
                      Selected file: {cvFile.name}
                    </p>
                    <button
                      onClick={handleUpload}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 disabled:cursor-not-allowed gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing Your CV...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Upload CV
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {showJobs && (
          <JobList
            selectedJobs={selectedJobs}
            setSelectedJobs={setSelectedJobs}
            onSubmit={handleJobSubmit}
          />
        )}

        {isSuccess && (
          <SuccessMessage
            selectedJobCount={selectedJobs.length}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}

export default App;