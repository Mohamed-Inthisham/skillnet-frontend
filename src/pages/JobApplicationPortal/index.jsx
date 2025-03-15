// import React, { useState } from 'react';
// import { Upload, CheckCircle2 } from 'lucide-react';
// import JobList from '../../components/MatchedJobList';
// import SuccessMessage from '../../components/CvUploadSuccessMessage';
// import UserHeader from '../../layout/UserHeader';

// function JobApplicationPortal() {
//   const [cvFile, setCvFile] = useState(null);
//   const [showJobs, setShowJobs] = useState(false);
//   const [selectedJobs, setSelectedJobs] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);

//   const handleFileUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setCvFile(file);
//       setShowJobs(true);
//     }
//   };

//   const handleJobSubmit = () => {
//     if (selectedJobs.length > 0) {
//       setIsSuccess(true);
//       setShowJobs(false);
//     }
//   };

//   const handleReset = () => {
//     setCvFile(null);
//     setShowJobs(false);
//     setSelectedJobs([]);
//     setIsSuccess(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//         <UserHeader/>
//       <div className="max-w-4xl mx-auto py-12 px-4">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//           Job Application Portal
//         </h1>

//         {!showJobs && !isSuccess && (
//           <div className="bg-white p-8 rounded-lg shadow-md">
//             <div className="text-center">
//               <div className="mb-6">
//                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                 <h2 className="mt-4 text-xl font-semibold text-gray-900">
//                   Upload your CV
//                 </h2>
//                 <p className="mt-2 text-gray-600">
//                   Upload your CV to see matching job descriptions
//                 </p>
//               </div>
//               <label className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFileUpload}
//                 />
//                 Select File
//               </label>
//               {cvFile && (
//                 <p className="mt-4 text-sm text-gray-600">
//                   Selected file: {cvFile.name}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}

//         {showJobs && (
//           <JobList
//             selectedJobs={selectedJobs}
//             setSelectedJobs={setSelectedJobs}
//             onSubmit={handleJobSubmit}
//           />
//         )}

//         {isSuccess && (
//           <SuccessMessage
//             selectedJobCount={selectedJobs.length}
//             onReset={handleReset}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default JobApplicationPortal;

import React, { useState } from 'react';
import { Upload, CheckCircle2, Loader2 } from 'lucide-react';
import JobList from '../../components/MatchedJobList';
import SuccessMessage from '../../components/CvUploadSuccessMessage';
import UserHeader from '../../layout/UserHeader';

function App() {
  const [cvFile, setCvFile] = useState(null);
  const [showJobs, setShowJobs] = useState(false);
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setCvFile(file);
    }
  };

  const handleUpload = async () => {
    if (!cvFile) return;

    setIsLoading(true);
    // Simulate API call to process CV
    await new Promise(resolve => setTimeout(resolve, 4000));
    setIsLoading(false);
    setShowJobs(true);
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
                {cvFile && (
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-sm text-gray-600">
                      Selected file: {cvFile.name}
                    </p>
                    <button
                      onClick={handleUpload}
                      disabled={isLoading}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-green-400 disabled:cursor-not-allowed gap-2"
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