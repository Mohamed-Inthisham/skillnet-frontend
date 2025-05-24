// import { FaCloudUploadAlt, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
// import { useState } from "react";
// import { useDropzone } from "react-dropzone"; 

// const CompanyRecruitment = () => {
//   const [activeTab, setActiveTab] = useState("job_descriptions");
//   const [jobDescriptions, setJobDescriptions] = useState([
//     { id: 1, title: "Software Engineering - Intern.pdf", date: "Oct 2, 2024" },
//     { id: 2, title: "Trainee QA.pdf", date: "Nov 20, 2024" },
//     { id: 3, title: "Trainee Project Manager.pdf", date: "Nov 29, 2024" },
//     { id: 4, title: "Associate QA Engineer.pdf", date: "Nov 29, 2024" },
//     { id: 5, title: "Trainee Site Reliable Engineer.pdf", date: "Nov 29, 2024" },
//     { id: 6, title: "Devops Engineer.pdf", date: "Nov 29, 2024" },
//         ]);
//     const [CV, setCV] = useState([
//         { id: 1, title: "Kanishka Senevirathna-CV.pdf", date: "Oct 2, 2024" },
//         { id: 2, title: "Lasal Perera-SE.pdf", date: "Nov 20, 2024" },
//         { id: 3, title: "Nimesh Kodithuwakkku.pdf", date: "Nov 29, 2024" },
//         { id: 4, title: "Kalindu Chathuranga Gamage.pdf", date: "Nov 29, 2024" },
//         { id: 5, title: "L.Jayasinghe-QA.pdf", date: "Nov 29, 2024" },
//         { id: 6, title: "Tharusha De Silva-BA.pdf", date: "Nov 29, 2024" },
//         ]);

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedFile, setSelectedFile] = useState(null);

//     const handleDelete = (id) => {
//         setJobDescriptions(jobDescriptions.filter((job) => job.id !== id));
//         setCV(CV.filter((cv) => cv.id !== id));
//     };

//     const handleFileChange = (event) => {
//         setSelectedFile(event.target.files[0]);
//     };

//     const { getRootProps, getInputProps } = useDropzone({
//         onDrop: handleFileChange,
//         accept: ".pdf",
//       });

//   return (
//     <div>
//         <h2 className="text-xl font-bold text-gray-800 mb-1">Recruitment</h2>
//             <div className="flex justify-center border-b-[1px] border-gray-300 mb-4">
//                 <button
//                 className={`px-6 py-2 font-semibold ${activeTab === "job_descriptions" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
//                 onClick={() => setActiveTab("job_descriptions")}>
//                     Job Descriptions
//                 </button>
//                 <button
//                 className={`px-6 py-2 font-semibold ${activeTab === "curriculum_vitae" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
//                 onClick={() => setActiveTab("curriculum_vitae")}>
//                     Curriculum Vitae
//                 </button>
//             </div>
//             <div className={`p-6 ${isModalOpen ? "blur-sm" : ""} relative z-0`}> 
//                 {activeTab === "job_descriptions" && (
//                     <div className="mt-4">
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>
//                                 Add JDs <FaPlus className="ml-2" onClick={() => setIsModalOpen(true)}/>
//                     </button>

//                         <div className="overflow-x-auto shadow-md rounded-lg">
//                             <table className="w-full text-left border-collapse">
//                                 <thead>
//                                     <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
//                                         <th className="p-3 border-r border-gray-300">JD Title</th>
//                                         <th className="p-3 border-r border-gray-300">Date</th>
//                                         <th className="p-3 text-center">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {jobDescriptions.map((job, index) => (
//                                     <tr
//                                         key={job.id}
//                                         className={`border-b ${
//                                         index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                                         } hover:bg-gray-200 transition`}>
//                                         <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300"> {job.title}</td>
//                                         <td className="p-3 border-r border-gray-300">{job.date}</td>
//                                         <td className="p-3 flex justify-center">
//                                         <button
//                                             className="text-red-500 hover:text-red-700 transition"
//                                             onClick={() => handleDelete(job.id)}>
//                                             <FaTrash size={16}/>
//                                         </button>
//                                         </td>
//                                     </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}
//             </div>
//                 {activeTab === "curriculum_vitae" && (
//                     <div className="mt-4">
//                         <div className="overflow-x-auto shadow-md rounded-lg">
//                             <table className="w-full text-left border-collapse">
//                                 <thead>
//                                     <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
//                                         <th className="p-3 border-r border-gray-300">CV Title</th>
//                                         <th className="p-3 border-r border-gray-300">Date</th>
//                                         <th className="p-3 text-center">Action</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {CV.map((cv, index) => (
//                                     <tr
//                                         key={cv.id}
//                                         className={`border-b ${
//                                         index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                                         } hover:bg-gray-200 transition`}>
//                                         <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300"> {cv.title}</td>
//                                         <td className="p-3 border-r border-gray-300">{cv.date}</td>
//                                         <td className="p-3 flex justify-center">
//                                             <button
//                                                 className="text-red-500 hover:text-red-700 transition"
//                                                 onClick={() => handleDelete(cv.id)}>
//                                                 <FaTrash size={16}/>
//                                             </button>
//                                         </td>
//                                     </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 )}
//                 {isModalOpen && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//                         <div className="bg-white p-6 rounded-lg shadow-lg w-100">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h3 className="text-lg font-semibold">Add Job Description</h3>
//                                 <button className="text-blue-500" onClick={() => setIsModalOpen(false)}><FaTimes size={16}/></button>
//                             </div>
//                             <div className="border-2 border-dashed border-gray-400 p-6 text-center">
//                                 <input
//                                     type="file"
//                                     accept=".pdf"
//                                     onChange={handleFileChange}
//                                     className="hidden"
//                                     id="fileUpload"
//                                 />
//                                 {!selectedFile && (
//                                     <label htmlFor="fileUpload" className="cursor-pointer text-blue-500">
//                                         <FaCloudUploadAlt size={40} className="mx-auto mb-2" />
//                                         <span>Click to upload</span>
//                                     </label>
//                                 )}
//                                 {selectedFile && (
//                                     <p className="mt-2 text-gray-700">
//                                         <strong>{selectedFile.name}</strong>
//                                     </p>
//                                 )}
//                             </div>
//                             <div className="flex justify-end mt-4">
//                                 <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Save</button>
//                             </div>
//                         </div>
                        
//                     </div>
//                 )}    
//     </div>    
//   );
// };

// export default CompanyRecruitment;





// import { FaCloudUploadAlt, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
// import { useState, useEffect, useCallback } from "react"; // Added useEffect and useCallback
// import { useDropzone } from "react-dropzone";
// import axios from 'axios'; // For making API requests

// // --- Configuration ---
// const API_BASE_URL = "http://localhost:5001"; // Adjust if your backend URL is different

// // Placeholder for getting the auth token - replace with your actual token retrieval logic
// const getAuthToken = () => {
//   return localStorage.getItem("accessToken"); // Example: fetching from localStorage
// };

// // Helper function for date formatting
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   } catch (error) {
//     console.error("Error formatting date:", error);
//     return "Invalid Date";
//   }
// };


// const CompanyRecruitment = () => {
//   const [activeTab, setActiveTab] = useState("job_descriptions");
//   const [jobDescriptions, setJobDescriptions] = useState([]); // Initialize as empty, will fetch from API
//   const [isLoadingJDs, setIsLoadingJDs] = useState(false); // Loading state for JDs
//   const [errorJDs, setErrorJDs] = useState(null); // Error state for JDs

//   const [CV, setCV] = useState([ // CVs remain as mock data for now
//     { id: 1, title: "Kanishka Senevirathna-CV.pdf", date: "Oct 2, 2024" },
//     { id: 2, title: "Lasal Perera-SE.pdf", date: "Nov 20, 2024" },
//     // ... other mock CVs
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false); // Uploading state

//   // --- Fetch Job Descriptions ---
//   const fetchJobDescriptions = useCallback(async () => {
//     setIsLoadingJDs(true);
//     setErrorJDs(null);
//     const token = getAuthToken();
//     if (!token) {
//       setErrorJDs("Authentication token not found.");
//       setIsLoadingJDs(false);
//       // Potentially redirect to login or show a more prominent error
//       return;
//     }

//     try {
//       // Assuming you want to fetch JDs for the currently logged-in company
//       // The '/jds/my' route uses the JWT to identify the company
//       const response = await axios.get(`${API_BASE_URL}/jds/my`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // The backend jd_id is likely _id, title is original_filename, date is uploaded_date
//       const formattedJDs = response.data.map(jd => ({
//         id: jd._id, // Use backend ID
//         title: jd.original_filename,
//         date: formatDate(jd.uploaded_date),
//         filePath: jd.jd_pdf_path // Store for potential viewing/download
//       }));
//       setJobDescriptions(formattedJDs);
//     } catch (error) {
//       console.error("Error fetching job descriptions:", error);
//       setErrorJDs(error.response?.data?.msg || "Failed to fetch job descriptions.");
//     } finally {
//       setIsLoadingJDs(false);
//     }
//   }, []); // Empty dependency array, but consider adding if token logic changes

//   useEffect(() => {
//     if (activeTab === "job_descriptions") {
//       fetchJobDescriptions();
//     }
//   }, [activeTab, fetchJobDescriptions]);


//   // --- Delete Job Description ---
//   const handleDeleteJD = async (jdId) => {
//     if (!window.confirm("Are you sure you want to delete this job description?")) {
//         return;
//     }
//     const token = getAuthToken();
//     if (!token) {
//       alert("Authentication error. Please log in again.");
//       return;
//     }
//     try {
//       await axios.delete(`${API_BASE_URL}/jds/${jdId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // Remove from local state upon successful deletion
//       setJobDescriptions(jobDescriptions.filter((job) => job.id !== jdId));
//       alert("Job description deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting job description:", error);
//       alert(error.response?.data?.msg || "Failed to delete job description.");
//     }
//   };

//   // --- Handle File Upload for New JD ---
//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles && acceptedFiles.length > 0) {
//       setSelectedFile(acceptedFiles[0]);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf'],
//     },
//     multiple: false,
//   });

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedFile(null); // Reset selected file when modal closes
//   };

//   const handleSaveJD = async () => {
//     if (!selectedFile) {
//       alert("Please select a PDF file to upload.");
//       return;
//     }
//     const token = getAuthToken();
//     if (!token) {
//       alert("Authentication error. Please log in again.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("jd_pdf", selectedFile); // Key must match backend ('jd_pdf')

//     setIsUploading(true);
//     try {
//       const response = await axios.post(`${API_BASE_URL}/jds`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data", // Axios usually sets this for FormData
//         },
//       });
//       alert(response.data.msg || "Job description uploaded successfully!");
//       fetchJobDescriptions(); // Refresh the list
//       handleModalClose();
//     } catch (error) {
//       console.error("Error uploading job description:", error);
//       alert(error.response?.data?.msg || "Failed to upload job description.");
//     } finally {
//       setIsUploading(false);
//     }
//   };


//   // --- CV Delete (remains local as per original) ---
//   const handleDeleteCV = (id) => {
//     setCV(CV.filter((cv) => cv.id !== id));
//   };


//   return (
//     <div>
//       <h2 className="text-xl font-bold text-gray-800 mb-1">Recruitment</h2>
//       <div className="flex justify-center border-b-[1px] border-gray-300 mb-4">
//         <button
//           className={`px-6 py-2 font-semibold ${activeTab === "job_descriptions" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
//           onClick={() => setActiveTab("job_descriptions")}
//         >
//           Job Descriptions
//         </button>
//         <button
//           className={`px-6 py-2 font-semibold ${activeTab === "curriculum_vitae" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
//           onClick={() => setActiveTab("curriculum_vitae")}
//         >
//           Curriculum Vitae
//         </button>
//       </div>

//       {/* Main content area with blur effect when modal is open */}
//       <div className={`p-6 ${isModalOpen ? "blur-sm" : ""}`}>
//         {activeTab === "job_descriptions" && (
//           <div className="mt-4">
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center hover:bg-blue-600"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Add JDs <FaPlus className="ml-2" />
//             </button>

//             {isLoadingJDs && <p>Loading job descriptions...</p>}
//             {errorJDs && <p className="text-red-500">{errorJDs}</p>}

//             {!isLoadingJDs && !errorJDs && jobDescriptions.length === 0 && (
//                 <p>No job descriptions found. Click "Add JDs" to upload one.</p>
//             )}

//             {!isLoadingJDs && !errorJDs && jobDescriptions.length > 0 && (
//               <div className="overflow-x-auto shadow-md rounded-lg">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
//                       <th className="p-3 border-r border-gray-300">JD Title</th>
//                       <th className="p-3 border-r border-gray-300">Uploaded Date</th>
//                       <th className="p-3 text-center">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {jobDescriptions.map((job, index) => (
//                       <tr
//                         key={job.id}
//                         className={`border-b ${
//                           index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                         } hover:bg-gray-200 transition`}
//                       >
//                         <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300">
//                           {/* You can make this a link to view/download the PDF if needed */}
//                           {/* Example: <a href={`${API_BASE_URL}${job.filePath}`} target="_blank" rel="noopener noreferrer">{job.title}</a> */}
//                           {job.title}
//                         </td>
//                         <td className="p-3 border-r border-gray-300">{job.date}</td>
//                         <td className="p-3 flex justify-center">
//                           <button
//                             className="text-red-500 hover:text-red-700 transition"
//                             onClick={() => handleDeleteJD(job.id)}
//                           >
//                             <FaTrash size={16} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "curriculum_vitae" && (
//           <div className="mt-4">
//             {/* CV Table remains with mock data as per original */}
//             <div className="overflow-x-auto shadow-md rounded-lg">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
//                     <th className="p-3 border-r border-gray-300">CV Title</th>
//                     <th className="p-3 border-r border-gray-300">Date</th>
//                     <th className="p-3 text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {CV.map((cv, index) => (
//                     <tr
//                       key={cv.id}
//                       className={`border-b ${
//                         index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                       } hover:bg-gray-200 transition`}
//                     >
//                       <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300">
//                         {cv.title}
//                       </td>
//                       <td className="p-3 border-r border-gray-300">{cv.date}</td>
//                       <td className="p-3 flex justify-center">
//                         <button
//                           className="text-red-500 hover:text-red-700 transition"
//                           onClick={() => handleDeleteCV(cv.id)} // Using original CV delete
//                         >
//                           <FaTrash size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modal for adding JD - remains separate for clarity */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"> {/* Added max-w-md */}
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Add Job Description</h3>
//               <button
//                 className="text-gray-500 hover:text-gray-700"
//                 onClick={handleModalClose}
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div
//               {...getRootProps()}
//               className={`border-2 border-dashed  p-6 text-center cursor-pointer
//                 ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 hover:border-gray-500"}`}
//             >
//               <input {...getInputProps()} id="fileUpload" />
//               <FaCloudUploadAlt
//                 size={40}
//                 className={`mx-auto mb-2 ${isDragActive ? "text-blue-600" : "text-gray-500"}`}
//               />
//               {isDragActive ? (
//                 <p className="text-blue-600">Drop the PDF here ...</p>
//               ) : selectedFile ? (
//                 <p className="mt-2 text-gray-700">
//                   Selected: <strong>{selectedFile.name}</strong>
//                 </p>
//               ) : (
//                 <p className="text-gray-500">
//                   Drag 'n' drop a PDF file here, or click to select
//                 </p>
//               )}
//             </div>
//             <div className="flex justify-end mt-6"> {/* Increased margin-top */}
//               <button
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
//                 onClick={handleModalClose}
//                 disabled={isUploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
//                 onClick={handleSaveJD}
//                 disabled={!selectedFile || isUploading}
//               >
//                 {isUploading ? "Uploading..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyRecruitment;






// import { FaCloudUploadAlt, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
// import { useState, useEffect, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from 'axios';

// // --- Configuration ---
// const API_BASE_URL = "http://localhost:5001";

// // Placeholder for getting the auth token
// const getAuthToken = () => {
//   return localStorage.getItem("accessToken");
// };

// // Placeholder for getting company email from token
// const getCompanyEmailFromToken = () => {
//   const token = getAuthToken();
//   if (!token) return null;
//   try {
//     const payloadBase64 = token.split('.')[1];
//     const decodedPayload = JSON.parse(atob(payloadBase64));
//     return decodedPayload.sub; // 'sub' (subject) usually holds the identity (email)
//   } catch (e) {
//     console.error("Failed to decode token or get email:", e);
//     return null;
//   }
// };


// // Helper function for date formatting
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   try {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   } catch (error) {
//     console.error("Error formatting date:", error);
//     return "Invalid Date";
//   }
// };


// const CompanyRecruitment = () => {
//   const [activeTab, setActiveTab] = useState("job_descriptions");
//   const [jobDescriptions, setJobDescriptions] = useState([]);
//   const [isLoadingJDs, setIsLoadingJDs] = useState(false);
//   const [errorJDs, setErrorJDs] = useState(null);

//   const [CV, setCV] = useState([
//     { id: 1, title: "Kanishka Senevirathna-CV.pdf", date: "Oct 2, 2024" },
//     // ... other mock CVs
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   // --- Fetch Job Descriptions ---
//   const fetchJobDescriptions = useCallback(async () => {
//     setIsLoadingJDs(true);
//     setErrorJDs(null);
//     const token = getAuthToken(); // Token for authentication (if the company route is protected)
//     const companyEmail = getCompanyEmailFromToken(); // Get the company's email

//     if (!companyEmail) {
//       setErrorJDs("Could not identify company. Please log in again.");
//       setIsLoadingJDs(false);
//       return;
//     }

//     // The /jds/company/<identifier> route might be public or protected.
//     // If it's public, you might not need the token.
//     // If it's protected (e.g., only that company can view its JDs even via this route,
//     // or only logged-in users can view any company's JDs), then include the token.
//     // Your backend route definition for /jds/company/<identifier> doesn't have @jwt_required()
//     // so it's public. For this example, I'll assume it's public and no token is strictly needed for *this specific GET*.
//     // However, for consistency or if you change it to protected, keep the token logic.

//     const headers = {};
//     if (token) { // If you decide to protect this route or use token for other reasons
//         headers.Authorization = `Bearer ${token}`;
//     }

//     try {
//       console.log(`Fetching JDs for company: ${companyEmail}`);
//       const response = await axios.get(`${API_BASE_URL}/jds/company/${encodeURIComponent(companyEmail)}`, {
//         headers: headers, // Send headers if token is included
//       });
//       console.log('API Response Data for company JDs:', response.data);

//       if (response.data && Array.isArray(response.data)) {
//         const formattedJDs = response.data.map(jd => ({
//           id: jd._id,
//           title: jd.original_filename,
//           date: formatDate(jd.uploaded_date),
//           filePath: jd.jd_pdf_path
//         }));
//         setJobDescriptions(formattedJDs);
//       } else {
//         console.error('API response data is not an array:', response.data);
//         setErrorJDs("Received invalid data format from server.");
//         setJobDescriptions([]);
//       }
//     } catch (error) {
//       console.error("Error fetching job descriptions:", error);
//       if (error.response) {
//             setErrorJDs(error.response.data?.msg || `Error: ${error.response.status}`);
//       } else {
//             setErrorJDs("Failed to fetch job descriptions. Check network or server.");
//       }
//       setJobDescriptions([]);
//     } finally {
//       setIsLoadingJDs(false);
//     }
//   }, []); // Empty dependency: fetchJobDescriptions is stable if getAuthToken/getCompanyEmailFromToken are stable

//   useEffect(() => {
//     if (activeTab === "job_descriptions") {
//       fetchJobDescriptions();
//     }
//   }, [activeTab, fetchJobDescriptions]);


//   // --- Delete Job Description (remains the same, uses specific jdId) ---
//   const handleDeleteJD = async (jdId) => {
//     if (!window.confirm("Are you sure you want to delete this job description?")) {
//         return;
//     }
//     const token = getAuthToken();
//     if (!token) {
//       alert("Authentication error. Please log in again.");
//       return;
//     }
//     try {
//       await axios.delete(`${API_BASE_URL}/jds/${jdId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setJobDescriptions(jobDescriptions.filter((job) => job.id !== jdId));
//       alert("Job description deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting job description:", error);
//       alert(error.response?.data?.msg || "Failed to delete job description.");
//     }
//   };

//   // --- Handle File Upload for New JD (remains the same) ---
//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles && acceptedFiles.length > 0) {
//       setSelectedFile(acceptedFiles[0]);
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf'],
//     },
//     multiple: false,
//   });

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedFile(null);
//   };

//   const handleSaveJD = async () => {
//     if (!selectedFile) {
//       alert("Please select a PDF file to upload.");
//       return;
//     }
//     const token = getAuthToken();
//     if (!token) {
//       alert("Authentication error. Please log in again.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("jd_pdf", selectedFile);

//     setIsUploading(true);
//     try {
//       const response = await axios.post(`${API_BASE_URL}/jds`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert(response.data.msg || "Job description uploaded successfully!");
//       fetchJobDescriptions(); // Refresh the list
//       handleModalClose();
//     } catch (error) {
//       console.error("Error uploading job description:", error);
//       alert(error.response?.data?.msg || "Failed to upload job description.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDeleteCV = (id) => {
//     setCV(CV.filter((cv) => cv.id !== id));
//   };

//   // --- JSX (Main structure remains largely the same) ---
//   return (
//     <div>
//       <h2 className="text-xl font-bold text-gray-800 mb-1">Recruitment</h2>
//       <div className="flex justify-center border-b-[1px] border-gray-300 mb-4">
//         <button
//           className={`px-6 py-2 font-semibold ${activeTab === "job_descriptions" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
//           onClick={() => setActiveTab("job_descriptions")}
//         >
//           Job Descriptions
//         </button>
//         <button
//           className={`px-6 py-2 font-semibold ${activeTab === "curriculum_vitae" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
//           onClick={() => setActiveTab("curriculum_vitae")}
//         >
//           Curriculum Vitae
//         </button>
//       </div>

//       <div className={`p-6 ${isModalOpen ? "blur-sm" : ""}`}>
//         {activeTab === "job_descriptions" && (
//           <div className="mt-4">
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center hover:bg-blue-600"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Add JDs <FaPlus className="ml-2" />
//             </button>

//             {isLoadingJDs && <p>Loading job descriptions...</p>}
//             {errorJDs && <p className="text-red-500">{errorJDs}</p>}

//             {!isLoadingJDs && !errorJDs && jobDescriptions.length === 0 && (
//                 <p>No job descriptions found for this company. Click "Add JDs" to upload one.</p>
//             )}

//             {!isLoadingJDs && !errorJDs && jobDescriptions.length > 0 && (
//               <div className="overflow-x-auto shadow-md rounded-lg">
//                 <table className="w-full text-left border-collapse">
//                   <thead>
//                     <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
//                       <th className="p-3 border-r border-gray-300">JD Title</th>
//                       <th className="p-3 border-r border-gray-300">Uploaded Date</th>
//                       <th className="p-3 text-center">Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {jobDescriptions.map((job, index) => (
//                       <tr
//                         key={job.id}
//                         className={`border-b ${
//                           index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                         } hover:bg-gray-200 transition`}
//                       >
//                         <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300">
//                           {job.title}
//                         </td>
//                         <td className="p-3 border-r border-gray-300">{job.date}</td>
//                         <td className="p-3 flex justify-center">
//                           <button
//                             className="text-red-500 hover:text-red-700 transition"
//                             onClick={() => handleDeleteJD(job.id)}
//                           >
//                             <FaTrash size={16} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "curriculum_vitae" && (
//           // ... CV section remains the same ...
//           <div className="mt-4">
//             <div className="overflow-x-auto shadow-md rounded-lg">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
//                     <th className="p-3 border-r border-gray-300">CV Title</th>
//                     <th className="p-3 border-r border-gray-300">Date</th>
//                     <th className="p-3 text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {CV.map((cv, index) => (
//                     <tr
//                       key={cv.id}
//                       className={`border-b ${
//                         index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                       } hover:bg-gray-200 transition`}
//                     >
//                       <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300">
//                         {cv.title}
//                       </td>
//                       <td className="p-3 border-r border-gray-300">{cv.date}</td>
//                       <td className="p-3 flex justify-center">
//                         <button
//                           className="text-red-500 hover:text-red-700 transition"
//                           onClick={() => handleDeleteCV(cv.id)}
//                         >
//                           <FaTrash size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}
//       </div>

//       {isModalOpen && (
//         // ... Modal JSX remains the same ...
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Add Job Description</h3>
//               <button
//                 className="text-gray-500 hover:text-gray-700"
//                 onClick={handleModalClose}
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>
//             <div
//               {...getRootProps()}
//               className={`border-2 border-dashed  p-6 text-center cursor-pointer
//                 ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 hover:border-gray-500"}`}
//             >
//               <input {...getInputProps()} id="fileUpload" />
//               <FaCloudUploadAlt
//                 size={40}
//                 className={`mx-auto mb-2 ${isDragActive ? "text-blue-600" : "text-gray-500"}`}
//               />
//               {isDragActive ? (
//                 <p className="text-blue-600">Drop the PDF here ...</p>
//               ) : selectedFile ? (
//                 <p className="mt-2 text-gray-700">
//                   Selected: <strong>{selectedFile.name}</strong>
//                 </p>
//               ) : (
//                 <p className="text-gray-500">
//                   Drag 'n' drop a PDF file here, or click to select
//                 </p>
//               )}
//             </div>
//             <div className="flex justify-end mt-6">
//               <button
//                 className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
//                 onClick={handleModalClose}
//                 disabled={isUploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
//                 onClick={handleSaveJD}
//                 disabled={!selectedFile || isUploading}
//               >
//                 {isUploading ? "Uploading..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyRecruitment;






// import { FaCloudUploadAlt, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
// import { useState, useEffect, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import axios from 'axios';

// // --- Configuration ---
// // IMPORTANT: Replace with your actual backend API base URL
// const API_BASE_URL = "http://localhost:5001"; // Or your deployed backend URL

// // --- Authentication Helper ---
// // IMPORTANT: Replace this with your actual token retrieval logic
// // This function should get the JWT token from wherever you store it (e.g., localStorage, context)
// const getAuthToken = () => {
//   // Example: return localStorage.getItem("accessToken");
//   const token = localStorage.getItem("accessToken"); // Make sure 'accessToken' is the key you use
//   if (!token) {
//     console.warn("Auth token not found in localStorage. API calls might fail.");
//   }
//   return token;
// };

// // --- Date Formatting Helper ---
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   try {
//     const date = new Date(dateString);
//     // Format: e.g., "Oct 2, 2024"
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   } catch (error) {
//     console.error("Error formatting date:", dateString, error);
//     return "Invalid Date";
//   }
// };

// const CompanyRecruitment = () => {
//   const [activeTab, setActiveTab] = useState("job_descriptions");
//   const [jobDescriptions, setJobDescriptions] = useState([]);
//   const [isLoadingJDs, setIsLoadingJDs] = useState(false);
//   const [errorJDs, setErrorJDs] = useState(null);

//   // CVs remain as mock data as per the original structure
//   const [CV, setCV] = useState([
//     { id: 1, title: "Kanishka Senevirathna-CV.pdf", date: "Oct 2, 2024" },
//     { id: 2, title: "Lasal Perera-SE.pdf", date: "Nov 20, 2024" },
//     { id: 3, title: "Nimesh Kodithuwakkku.pdf", date: "Nov 29, 2024" },
//     { id: 4, title: "Kalindu Chathuranga Gamage.pdf", date: "Nov 29, 2024" },
//     { id: 5, title: "L.Jayasinghe-QA.pdf", date: "Nov 29, 2024" },
//     { id: 6, title: "Tharusha De Silva-BA.pdf", date: "Nov 29, 2024" },
//   ]);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   // --- Fetch Job Descriptions for the logged-in company ---
//   const fetchJobDescriptions = useCallback(async () => {
//     setIsLoadingJDs(true);
//     setErrorJDs(null);
//     const token = getAuthToken();

//     if (!token) {
//       setErrorJDs("Authentication required. Please log in.");
//       setIsLoadingJDs(false);
//       // Consider redirecting to login page or showing a more prominent message
//       return;
//     }

//     try {
//       // The backend route `/jds/my` uses the JWT to identify the company
//       const response = await axios.get(`${API_BASE_URL}/jds/my`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // Map backend fields (_id, original_filename, uploaded_date) to frontend state
//       const formattedJDs = response.data.map(jd => ({
//         id: jd._id, // MongoDB ObjectId
//         title: jd.original_filename,
//         date: formatDate(jd.uploaded_date),
//         filePath: jd.jd_pdf_path, // Relative path like /store/jd_pdfs/filename.pdf
//       }));
//       setJobDescriptions(formattedJDs);
//     } catch (error) {
//       console.error("Error fetching job descriptions:", error);
//       const errorMsg = error.response?.data?.msg || "Failed to fetch job descriptions. Please try again.";
//       setErrorJDs(errorMsg);
//     } finally {
//       setIsLoadingJDs(false);
//     }
//   }, []); // useCallback dependencies are empty as getAuthToken() is stable

//   useEffect(() => {
//     if (activeTab === "job_descriptions") {
//       fetchJobDescriptions();
//     }
//     // No cleanup needed for this effect
//   }, [activeTab, fetchJobDescriptions]);


//   // --- Delete Job Description ---
//   const handleDeleteJD = async (jdId) => {
//     if (!window.confirm("Are you sure you want to delete this job description? This action cannot be undone.")) {
//         return;
//     }
//     const token = getAuthToken();
//     if (!token) {
//       alert("Authentication error. Please log in again.");
//       return;
//     }

//     try {
//       await axios.delete(`${API_BASE_URL}/jds/${jdId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       // Remove from local state upon successful deletion
//       setJobDescriptions(prevJDs => prevJDs.filter((job) => job.id !== jdId));
//       alert("Job description deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting job description:", error);
//       alert(error.response?.data?.msg || "Failed to delete job description. Please try again.");
//     }
//   };

//   // --- File Drop Handler for react-dropzone ---
//   const onDrop = useCallback((acceptedFiles) => {
//     if (acceptedFiles && acceptedFiles.length > 0) {
//       const file = acceptedFiles[0];
//       if (file.type === "application/pdf") {
//         setSelectedFile(file);
//       } else {
//         alert("Invalid file type. Please upload a PDF.");
//         setSelectedFile(null);
//       }
//     }
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     accept: {
//       'application/pdf': ['.pdf'],
//     },
//     multiple: false, // Allow only single file upload
//   });

//   const handleModalOpen = () => setIsModalOpen(true);
//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedFile(null); // Reset file selection when modal closes
//     // No need to reset isUploading here as it's tied to the save operation
//   };

//   // --- Save New Job Description ---
//   const handleSaveJD = async () => {
//     if (!selectedFile) {
//       alert("Please select a PDF file to upload.");
//       return;
//     }
//     const token = getAuthToken();
//     if (!token) {
//       alert("Authentication error. Please log in again.");
//       return;
//     }

//     const formData = new FormData();
//     // Backend expects the file under the key 'jd_pdf'
//     formData.append("jd_pdf", selectedFile);

//     setIsUploading(true);
//     try {
//       const response = await axios.post(`${API_BASE_URL}/jds`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // 'Content-Type': 'multipart/form-data' is usually set automatically by axios for FormData
//         },
//       });
//       alert(response.data.msg || "Job description uploaded successfully!");
//       fetchJobDescriptions(); // Refresh the list to show the new JD
//       handleModalClose();     // Close modal on success
//     } catch (error) {
//       console.error("Error uploading job description:", error);
//       alert(error.response?.data?.msg || "Failed to upload job description. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // --- CV Delete (remains local as per original request) ---
//   const handleDeleteCV = (id) => {
//     // Add confirmation for CV deletion as well for consistency
//     if (window.confirm("Are you sure you want to delete this CV?")) {
//         setCV(prevCVs => prevCVs.filter((cv) => cv.id !== id));
//     }
//   };

//   // --- Render Logic ---
//   const renderJobDescriptionsTable = () => {
//     if (isLoadingJDs) return <p className="text-center text-gray-600 py-4">Loading job descriptions...</p>;
//     if (errorJDs) return <p className="text-center text-red-600 py-4">Error: {errorJDs}</p>;
//     if (jobDescriptions.length === 0) {
//       return <p className="text-center text-gray-600 py-4">No job descriptions found. Click "Add JDs" to upload one.</p>;
//     }

//     return (
//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="w-full text-left border-collapse">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
//               <th className="p-3 border-r border-gray-300">JD Title</th>
//               <th className="p-3 border-r border-gray-300">Uploaded Date</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobDescriptions.map((job, index) => (
//               <tr
//                 key={job.id}
//                 className={`border-b ${
//                   index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                 } hover:bg-gray-200 transition`}
//               >
//                 <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300">
//                   {/* Option to make it a download link:
//                   <a
//                     href={`${API_BASE_URL}${job.filePath}`} // Assumes backend serves file directly
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="hover:underline"
//                   >
//                     {job.title}
//                   </a>
//                   */}
//                    {job.title}
//                 </td>
//                 <td className="p-3 border-r border-gray-300">{job.date}</td>
//                 <td className="p-3 flex justify-center">
//                   <button
//                     className="text-red-500 hover:text-red-700 transition"
//                     onClick={() => handleDeleteJD(job.id)}
//                     aria-label={`Delete ${job.title}`}
//                   >
//                     <FaTrash size={16} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto p-4"> {/* Added a container for better spacing */}
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recruitment Management</h2> {/* Centered and styled title */}
      
//       {/* Tab Navigation */}
//       <div className="flex justify-center border-b-[1px] border-gray-300 mb-6">
//         <button
//           className={`px-6 py-3 font-semibold text-base ${activeTab === "job_descriptions" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
//           onClick={() => setActiveTab("job_descriptions")}
//         >
//           Job Descriptions
//         </button>
//         <button
//           className={`px-6 py-3 font-semibold text-base ${activeTab === "curriculum_vitae" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
//           onClick={() => setActiveTab("curriculum_vitae")}
//         >
//           Curriculum Vitae
//         </button>
//       </div>

//       {/* Content Area (conditionally blurred by modal) */}
//       <div className={`transition-all duration-300 ${isModalOpen ? "blur-sm filter" : ""}`}>
//         {activeTab === "job_descriptions" && (
//           <div className="mt-4">
//             <div className="mb-6 flex justify-end"> {/* Position button to the right */}
//                 <button
//                 className="bg-blue-500 text-white px-5 py-2.5 rounded-md flex items-center hover:bg-blue-600 transition duration-150 ease-in-out shadow-md"
//                 onClick={handleModalOpen}
//                 >
//                 Add JD <FaPlus className="ml-2" />
//                 </button>
//             </div>
//             {renderJobDescriptionsTable()}
//           </div>
//         )}

//         {activeTab === "curriculum_vitae" && (
//           <div className="mt-4">
//             {/* CV Table (mock data) */}
//             {CV.length === 0 ? (
//                 <p className="text-center text-gray-600 py-4">No CVs found.</p>
//             ) : (
//             <div className="overflow-x-auto shadow-md rounded-lg">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
//                     <th className="p-3 border-r border-gray-300">CV Title</th>
//                     <th className="p-3 border-r border-gray-300">Date</th>
//                     <th className="p-3 text-center">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {CV.map((cv, index) => (
//                     <tr
//                       key={cv.id}
//                       className={`border-b ${
//                         index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                       } hover:bg-gray-200 transition`}
//                     >
//                       <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300">
//                         {cv.title}
//                       </td>
//                       <td className="p-3 border-r border-gray-300">{cv.date}</td>
//                       <td className="p-3 flex justify-center">
//                         <button
//                           className="text-red-500 hover:text-red-700 transition"
//                           onClick={() => handleDeleteCV(cv.id)}
//                           aria-label={`Delete ${cv.title}`}
//                         >
//                           <FaTrash size={16} />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Modal for Adding Job Description */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4">
//           <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-300 ease-out">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-800">Add New Job Description</h3>
//               <button
//                 className="text-gray-500 hover:text-gray-700 transition"
//                 onClick={handleModalClose}
//                 aria-label="Close modal"
//               >
//                 <FaTimes size={20} />
//               </button>
//             </div>
            
//             <div
//               {...getRootProps()}
//               className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors
//                 ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 hover:border-gray-500 bg-gray-50"}`}
//             >
//               <input {...getInputProps()} id="fileUploadModal" /> {/* Ensure unique ID if needed elsewhere */}
//               <FaCloudUploadAlt
//                 size={48}
//                 className={`mx-auto mb-3 ${isDragActive ? "text-blue-600" : "text-gray-500"}`}
//               />
//               {isDragActive ? (
//                 <p className="text-blue-600 font-medium">Drop the PDF file here...</p>
//               ) : selectedFile ? (
//                 <div>
//                   <p className="mt-2 text-gray-800 font-semibold">
//                     Selected: <strong>{selectedFile.name}</strong>
//                   </p>
//                   <p className="text-sm text-gray-500">({(selectedFile.size / 1024).toFixed(2)} KB)</p>
//                 </div>
//               ) : (
//                 <p className="text-gray-600">
//                   Drag 'n' drop a PDF file here, or <span className="text-blue-500 font-medium">click to select</span>.
//                 </p>
//               )}
//             </div>
//             {selectedFile && (
//                 <button 
//                     onClick={() => setSelectedFile(null)} 
//                     className="text-sm text-red-500 hover:text-red-700 mt-2 underline"
//                 >
//                     Clear selection
//                 </button>
//             )}

//             <div className="flex justify-end mt-8 space-x-3">
//               <button
//                 className="px-5 py-2.5 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition"
//                 onClick={handleModalClose}
//                 disabled={isUploading}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-5 py-2.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
//                 onClick={handleSaveJD}
//                 disabled={!selectedFile || isUploading}
//               >
//                 {isUploading ? "Uploading..." : "Save & Upload"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyRecruitment;






import { FaCloudUploadAlt, FaPlus, FaTimes, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Added Chevron icons
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from 'axios';
import React from "react"; // Added React import for React.Fragment

// --- Configuration ---
const API_BASE_URL = "http://localhost:5001";

// --- Authentication Helper ---
const getAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.warn("Auth token not found in localStorage. API calls might fail.");
  }
  return token;
};

// --- Date Formatting Helper ---
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    // console.error("Error formatting date:", dateString, error); // Can be noisy if backend sends various date formats
    return "Invalid Date";
  }
};

const CompanyRecruitment = () => {
  const [activeTab, setActiveTab] = useState("job_descriptions");

  // Job Descriptions State
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [isLoadingJDs, setIsLoadingJDs] = useState(false);
  const [errorJDs, setErrorJDs] = useState(null);

  // CVs with Matched JDs State (replaces mock CV state)
  const [matchedCVs, setMatchedCVs] = useState([]);
  const [isLoadingCVs, setIsLoadingCVs] = useState(false);
  const [errorCVs, setErrorCVs] = useState(null);
  const [expandedCvId, setExpandedCvId] = useState(null); // To control which CV's JDs are shown

  // Modal State (for adding JDs)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // --- Fetch Job Descriptions (existing logic) ---
  const fetchJobDescriptions = useCallback(async () => {
    setIsLoadingJDs(true);
    setErrorJDs(null);
    const token = getAuthToken();
    if (!token) {
      setErrorJDs("Authentication required. Please log in.");
      setIsLoadingJDs(false);
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/jds/my`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formattedJDs = response.data.map(jd => ({
        id: jd._id,
        title: jd.original_filename,
        date: formatDate(jd.uploaded_date),
        filePath: jd.jd_pdf_path,
      }));
      setJobDescriptions(formattedJDs);
    } catch (error) {
      console.error("Error fetching job descriptions:", error);
      setErrorJDs(error.response?.data?.msg || "Failed to fetch job descriptions.");
    } finally {
      setIsLoadingJDs(false);
    }
  }, []);

  // --- Fetch CVs with Matched JDs ---
  const fetchMatchedCVsData = useCallback(async () => {
    setIsLoadingCVs(true);
    setErrorCVs(null);
    const token = getAuthToken();
    if (!token) {
      setErrorCVs("Authentication required to view CVs. Please log in.");
      setIsLoadingCVs(false);
      return;
    }
    try {
      // Using the /cvs endpoint as specified
      const response = await axios.get(`${API_BASE_URL}/cvs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Assuming backend for /cvs (calling get_company_cv_jd_matches_logic) returns:
      // [{ _id, cv_filename, cv_upload_date, matched_jds: [{id, title}] }]
      const formattedCVs = response.data.map(cvData => ({
        id: cvData._id, // This is the ID of the CV-JD match record from the DB
        cv_title: cvData.cv_filename,
        cv_date: formatDate(cvData.cv_upload_date), // Backend should provide a process/upload date
        matched_jds: (cvData.matched_jds || []).map(jd => ({
            id: jd.id, // As processed by backend (e.g., path to JD JSON)
            title: jd.title, // As processed by backend (e.g., filename of JD JSON)
        }))
      }));
      setMatchedCVs(formattedCVs);
    } catch (error) {
      console.error("Error fetching matched CVs:", error);
      setErrorCVs(error.response?.data?.msg || "Failed to fetch CVs.");
    } finally {
      setIsLoadingCVs(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === "job_descriptions") {
      fetchJobDescriptions();
    } else if (activeTab === "curriculum_vitae") {
      fetchMatchedCVsData(); // Fetch real CV data
    }
  }, [activeTab, fetchJobDescriptions, fetchMatchedCVsData]);


  // --- Delete Job Description (existing logic) ---
  const handleDeleteJD = async (jdId) => {
    if (!window.confirm("Are you sure you want to delete this job description?")) return;
    const token = getAuthToken();
    if (!token) { alert("Authentication error."); return; }
    try {
        await axios.delete(`${API_BASE_URL}/jds/${jdId}`, { headers: { Authorization: `Bearer ${token}` } });
        setJobDescriptions(prevJDs => prevJDs.filter((job) => job.id !== jdId));
        alert("Job description deleted successfully.");
    } catch (error) {
      console.error("Error deleting job description:", error);
      alert(error.response?.data?.msg || "Failed to delete job description.");
    }
  };

  // --- Delete Matched CV (and its associations) ---
  const handleDeleteMatchedCV = async (cvMatchId) => {
    if (!window.confirm("Are you sure you want to delete this CV record and its associations? This may also delete the CV file.")) {
        return;
    }
    const token = getAuthToken();
    if (!token) {
      alert("Authentication error. Please log in again.");
      return;
    }
    try {
      // Deleting via the /cvs/matched/:id endpoint as designed previously
      await axios.delete(`${API_BASE_URL}/cvs/matched/${cvMatchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatchedCVs(prevCVs => prevCVs.filter((cv) => cv.id !== cvMatchId));
      alert("CV record deleted successfully.");
    } catch (error) {
      console.error("Error deleting matched CV:", error);
      alert(error.response?.data?.msg || "Failed to delete CV record.");
    }
  };

  // --- JD Modal and Upload Logic (existing logic) ---
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === "application/pdf") { setSelectedFile(file); }
      else { alert("Invalid file type. Please upload a PDF."); setSelectedFile(null); }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'application/pdf': ['.pdf'] }, multiple: false });
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => { setIsModalOpen(false); setSelectedFile(null); };
  const handleSaveJD = async () => {
    if (!selectedFile) { alert("Please select a PDF file to upload."); return; }
    const token = getAuthToken(); if (!token) { alert("Authentication error."); return; }
    const formData = new FormData(); formData.append("jd_pdf", selectedFile);
    setIsUploading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/jds`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(response.data.msg || "Job description uploaded successfully!");
      fetchJobDescriptions(); handleModalClose();
    } catch (error) {
      console.error("Error uploading job description:", error);
      alert(error.response?.data?.msg || "Failed to upload job description.");
    } finally { setIsUploading(false); }
  };

  // --- Render Logic for JD Table (existing modern style) ---
  const renderJobDescriptionsTable = () => {
    if (isLoadingJDs) return <p className="text-center text-gray-600 py-4">Loading job descriptions...</p>;
    if (errorJDs) return <p className="text-center text-red-600 py-4">Error: {errorJDs}</p>;
    if (jobDescriptions.length === 0) {
      return <p className="text-center text-gray-600 py-4">No job descriptions found. Click "Add JDs" to upload one.</p>;
    }
    return (
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50"><tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">JD Title</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Uploaded Date</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
          </tr></thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {jobDescriptions.map((job, index) => (
            <tr key={job.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 transition-colors duration-150 ease-in-out`}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">{job.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{job.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                <button type="button" className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out" onClick={() => handleDeleteJD(job.id)} aria-label={`Delete ${job.title}`}>
                  <FaTrash size={16} />
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  };

  // --- Render Logic for CVs with Matched JDs Table ---
  const renderMatchedCVsTable = () => {
    if (isLoadingCVs) return <p className="text-center text-gray-600 py-4">Loading CVs...</p>;
    if (errorCVs) return <p className="text-center text-red-600 py-4">Error: {errorCVs}</p>;
    if (matchedCVs.length === 0) {
      return <p className="text-center text-gray-600 py-4">No CVs with matched JDs found.</p>;
    }
    const toggleExpandCV = (cvId) => setExpandedCvId(expandedCvId === cvId ? null : cvId);

    return (
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider w-12"> {/* Expand Icon Column */} </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">CV Filename</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Processed Date</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {matchedCVs.map((cv, index) => (
              <React.Fragment key={cv.id}>
                <tr className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'} hover:bg-slate-100 transition-colors duration-150 ease-in-out`}>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {cv.matched_jds && cv.matched_jds.length > 0 && (
                        <button onClick={() => toggleExpandCV(cv.id)} className="p-1 hover:bg-gray-200 rounded-full" aria-label={expandedCvId === cv.id ? "Collapse JDs" : "Expand JDs"}>
                        {expandedCvId === cv.id ? <FaChevronUp size={14}/> : <FaChevronDown size={14} />}
                        </button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {/* You could make this a link if backend serves the CV file:
                    <a href={`${API_BASE_URL}/path-to-cv/${cv.id}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {cv.cv_title}
                    </a>
                    */}
                    {cv.cv_title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{cv.cv_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-all duration-150 ease-in-out"
                      onClick={() => handleDeleteMatchedCV(cv.id)}
                      aria-label={`Delete CV ${cv.cv_title}`}
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
                {/* Expanded row for matched JDs */}
                {expandedCvId === cv.id && cv.matched_jds && cv.matched_jds.length > 0 && (
                  <tr className="bg-slate-100"> {/* Subtly different background for expanded JDs */}
                    <td colSpan="4" className="px-6 py-4">
                      <div className="pl-10 pr-4"> {/* Indent matched JDs */}
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Matched Job Descriptions:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {cv.matched_jds.map((jd, jdIndex) => (
                            <li key={jd.id || jdIndex} className="text-sm text-gray-600">
                              {jd.title}
                              {/* If you add match_score from backend:
                              {jd.match_score && <span className="ml-2 text-xs text-blue-500">(Score: {(jd.match_score * 100).toFixed(0)}%)</span>}
                              */}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
                 {expandedCvId === cv.id && (!cv.matched_jds || cv.matched_jds.length === 0) && (
                    <tr className="bg-slate-100">
                        <td colSpan="4" className="px-6 py-4 text-sm text-gray-500 text-center">
                            No matched JDs found for this CV.
                        </td>
                    </tr>
                 )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Recruitment Management</h2>
      
      <div className="flex justify-center border-b-[1px] border-gray-300 mb-6">
        <button
          className={`px-6 py-3 font-semibold text-base ${activeTab === "job_descriptions" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
          onClick={() => setActiveTab("job_descriptions")}
        >
          Job Descriptions
        </button>
        <button
          className={`px-6 py-3 font-semibold text-base ${activeTab === "curriculum_vitae" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600 hover:text-blue-500"}`}
          onClick={() => setActiveTab("curriculum_vitae")}
        >
          Curriculum Vitae
        </button>
      </div>

      <div className={`transition-all duration-300 ${isModalOpen ? "blur-sm filter" : ""}`}>
        {activeTab === "job_descriptions" && (
          <div className="mt-4">
            <div className="mb-6 flex justify-end">
                <button
                className="bg-blue-500 text-white px-5 py-2.5 rounded-md flex items-center hover:bg-blue-600 transition duration-150 ease-in-out shadow-md"
                onClick={handleModalOpen}
                >
                Add JD <FaPlus className="ml-2" />
                </button>
            </div>
            {renderJobDescriptionsTable()}
          </div>
        )}

        {activeTab === "curriculum_vitae" && (
          <div className="mt-4">
            {/* No "Add CV" button in this UI as per previous requirements */}
            {renderMatchedCVsTable()}
          </div>
        )}
      </div>

      {/* Modal for Adding Job Description (Unchanged) */}
      {isModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75 p-4">
         <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl w-full max-w-lg transform transition-all duration-300 ease-out">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-semibold text-gray-800">Add New Job Description</h3>
             <button className="text-gray-500 hover:text-gray-700 transition" onClick={handleModalClose} aria-label="Close modal">
               <FaTimes size={20} />
             </button>
           </div>
           <div
             {...getRootProps()}
             className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400 hover:border-gray-500 bg-gray-50"}`}
           >
             <input {...getInputProps()} id="fileUploadModal" />
             <FaCloudUploadAlt size={48} className={`mx-auto mb-3 ${isDragActive ? "text-blue-600" : "text-gray-500"}`} />
             {isDragActive ? (
               <p className="text-blue-600 font-medium">Drop the PDF file here...</p>
             ) : selectedFile ? (
               <div>
                 <p className="mt-2 text-gray-800 font-semibold">Selected: <strong>{selectedFile.name}</strong></p>
                 <p className="text-sm text-gray-500">({(selectedFile.size / 1024).toFixed(2)} KB)</p>
               </div>
             ) : (
               <p className="text-gray-600">Drag 'n' drop a PDF file here, or <span className="text-blue-500 font-medium">click to select</span>.</p>
             )}
           </div>
           {selectedFile && (<button onClick={() => setSelectedFile(null)} className="text-sm text-red-500 hover:text-red-700 mt-2 underline">Clear selection</button>)}
           <div className="flex justify-end mt-8 space-x-3">
             <button className="px-5 py-2.5 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 transition" onClick={handleModalClose} disabled={isUploading}>Cancel</button>
             <button className="px-5 py-2.5 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition disabled:bg-blue-300 disabled:cursor-not-allowed" onClick={handleSaveJD} disabled={!selectedFile || isUploading}>
               {isUploading ? "Uploading..." : "Save & Upload"}
             </button>
           </div>
         </div>
       </div>
      )}
    </div>
  );
};

export default CompanyRecruitment;