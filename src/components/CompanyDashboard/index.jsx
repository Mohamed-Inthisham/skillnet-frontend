// import React from "react";
// import java from "../../assets/java.webp";
// import cpp from "../../assets/c++.webp";
// import react from "../../assets/react.svg";
// import python from "../../assets/python.jpg";
// import CompanyHeader from "../../layout/CompanyHeader";

// const CompanyDashboard = () => {
//   return (
//     <>
    
//     <div className="p-4">
//       {/* Top Stats Section */}
//       <div className="grid grid-cols-3 gap-4 mb-6">
//         <div className="bg-gray-100 p-4 rounded-lg text-center border-2 border-blue-200">
//           <h2 className="text-gray-600">No. of Courses</h2>
//           <p className="text-xl font-bold">5 Courses</p>
//         </div>
//         <div className="bg-gray-100 p-4 rounded-lg text-center border-2 border-blue-200">
//           <h2 className="text-gray-600">Total Students</h2>
//           <p className="text-xl font-bold">42 Students</p>
//         </div>
//         <div className="bg-gray-100 p-4 rounded-lg text-center border-2 border-blue-200">
//           <h2 className="text-gray-600">No. of JDs</h2>
//           <p className="text-xl font-bold">12 JDs</p>
//         </div>
//       </div>

//       {/* Popular Courses */}
//       <h2 className="text-lg font-bold mb-2">Popular Courses</h2>
//       <div className="grid grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-blue-200">
//           <img src={java} alt="Java" className="w-55 mx-auto mb-2" />
//           <h3 className="text-left font-semibold">JAVA</h3>
//           <h3 className="text-left text-gray-500">Introduction to JAVA</h3>
//           <p className="text-left text-sm text-gray-500">8 lessons - 5 hours</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-200">
//           <img src={cpp} alt="C++" className="w-45 mx-auto mb-2" />
//           <h3 className="text-left font-semibold">C++</h3>
//           <h3 className="text-left text-gray-500">Introduction to C++</h3>
//           <p className="text-left text-sm text-gray-500">11 lessons - 7 hours</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-200">
//           <img src={react} alt="React" className="w-35 mx-auto mt-4 mb-10" />
//           <h3 className="text-left font-semibold">React</h3>
//           <h3 className="text-left text-gray-500">React Intermediate</h3>
//           <p className="text-left text-sm text-gray-500">6 lessons - 4 hours</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-200">
//           <img src={python} alt="React" className="w-45 mx-auto  mb-2" />
//           <h3 className="text-left font-semibold">python</h3>
//           <h3 className="text-left text-gray-500">Python Intermediate</h3>
//           <p className="text-left text-sm text-gray-500">6 lessons - 4 hours</p>
//         </div>
//       </div>

//       {/* Course Tracking Table */}
//       <h2 className="text-lg font-bold mb-2">Course Tracking</h2>
//       <table className="w-full bg-white shadow rounded-lg">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="p-2 text-left">Course</th>
//             <th className="p-2 text-left">Completed</th>
//             <th className="p-2 text-left">Duration</th>
//             <th className="p-2 text-left">Applicants</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="border-t">
//             <td className="p-2">Introduction to Java</td>
//             <td className="p-2">12/18</td>
//             <td className="p-2">47h 22m</td>
//             <td className="p-2">7</td>
//           </tr>
//           <tr className="border-t">
//             <td className="p-2">Introduction to C++</td>
//             <td className="p-2">9/13</td>
//             <td className="p-2">65h 54m</td>
//             <td className="p-2">7</td>
//           </tr>
//           <tr className="border-t">
//             <td className="p-2">React Intermediate</td>
//             <td className="p-2">7/11</td>
//             <td className="p-2">30h 12m</td>
//             <td className="p-2">4</td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// };

// export default CompanyDashboard;

// import React, { useState, useEffect } from "react";
// // Import a placeholder image if you have one, or handle missing images
// // import placeholderImage from "../../assets/placeholder.png";
// import CompanyHeader from "../../layout/CompanyHeader"; // Assuming you have this

// const API_BASE_URL = "http://localhost:5001"; // Your backend URL

// const CompanyDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [companyName, setCompanyName] = useState(""); // To store company name

//   useEffect(() => {
//     // Retrieve company name from localStorage (or your auth context)
//     // This is a common pattern. Adjust if your auth system stores it differently.
//     const storedCompanyName = "hightech"//localStorage.getItem("companyName"); // IMPORTANT
//     // Or, if you store the whole user object or token with company name:
//     // const userData = JSON.parse(localStorage.getItem("userData"));
//     // const storedCompanyName = userData?.companyName;

//     if (storedCompanyName) {
//       setCompanyName(storedCompanyName);
//     } else {
//       setError("Company name not found. Please log in again.");
//       setLoading(false);
//       // Optionally redirect to login
//       return;
//     }

//     const fetchCompanyCourses = async () => {
//       if (!storedCompanyName) return; // Don't fetch if no company name

//       setLoading(true);
//       setError(null);
//       try {
//         // The backend endpoint for get_company_courses_logic
//         // Make sure this matches your Flask route
//         const response = await fetch(
//           `${API_BASE_URL}/companies/${encodeURIComponent(storedCompanyName)}/courses`
//         );

//         if (!response.ok) {
//           const errData = await response.json();
//           throw new Error(errData.msg || `HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setCourses(data || []); // Ensure courses is always an array
//       } catch (err) {
//         console.error("Failed to fetch company courses:", err);
//         setError(err.message || "Failed to load courses.");
//         setCourses([]); // Clear courses on error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanyCourses();
//   }, []); // Empty dependency array means this runs once on component mount

//   // Placeholder image URL (replace with your actual placeholder or remove if not needed)
//   const placeholderImageSrc = "https://via.placeholder.com/150?text=No+Image";

//   if (loading) {
//     return (
//       <>
//         <CompanyHeader />
//         <div className="p-4 text-center">Loading dashboard data...</div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         <CompanyHeader />
//         <div className="p-4 text-center text-red-500">Error: {error}</div>
//       </>
//     );
//   }

//   return (
//     <>
//       <CompanyHeader />
//       <div className="p-4">
//         {/* Top Stats Section - No. of Courses is now dynamic */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//           <div className="bg-gray-100 p-4 rounded-lg text-center border-2 border-blue-200">
//             <h2 className="text-gray-600">No. of Courses</h2>
//             <p className="text-xl font-bold">{courses.length} Courses</p>
//           </div>
//           <div className="bg-gray-100 p-4 rounded-lg text-center border-2 border-blue-200">
//             <h2 className="text-gray-600">Total Students (Static)</h2>
//             <p className="text-xl font-bold">42 Students</p> {/* Keep static or fetch separately */}
//           </div>
//           <div className="bg-gray-100 p-4 rounded-lg text-center border-2 border-blue-200">
//             <h2 className="text-gray-600">No. of JDs (Static)</h2>
//             <p className="text-xl font-bold">12 JDs</p> {/* Keep static or fetch separately */}
//           </div>
//         </div>

//         {/* Company's Courses */}
//         <h2 className="text-lg font-bold mb-4">Your Courses</h2>
//         {courses.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
//             {courses.map((course) => (
//               <div
//                 key={course._id}
//                 className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-200 flex flex-col"
//               >
//                 <img
//                   src={course.course_image ? `${API_BASE_URL}${course.course_image}` : placeholderImageSrc}
//                   alt={course.course_name}
//                   className="w-full h-40 object-cover rounded-md mx-auto mb-3"
//                   onError={(e) => { e.target.onerror = null; e.target.src=placeholderImageSrc; }} // Fallback for broken image links
//                 />
//                 <div className="flex-grow">
//                   <h3 className="text-left font-semibold text-lg">{course.course_name}</h3>
//                   <h4 className="text-left text-gray-600 text-sm mb-1 truncate" title={course.introduction}>
//                     {course.introduction}
//                   </h4>
//                 </div>
//                 <p className="text-left text-sm text-gray-500 mt-auto">
//                   {course.lesson_count !== undefined ? `${course.lesson_count} lessons` : 'Lessons: N/A'} - Level: {course.level}
//                 </p>
//                 {/* Add Edit/Delete buttons or links here if needed */}
//                 {/* e.g., <button onClick={() => handleEdit(course._id)}>Edit</button> */}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">You have not created any courses yet.</p>
//         )}

//         {/* Course Tracking Table (Remains static or implement dynamic data fetching separately) */}
//         <h2 className="text-lg font-bold mb-2">Course Tracking (Static Example)</h2>
//         <div className="overflow-x-auto">
//           <table className="w-full bg-white shadow rounded-lg">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2 text-left">Course</th>
//                 <th className="p-2 text-left">Completed</th>
//                 <th className="p-2 text-left">Duration</th>
//                 <th className="p-2 text-left">Applicants</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Static data - replace or make dynamic if needed */}
//               <tr className="border-t">
//                 <td className="p-2">Introduction to Java</td>
//                 <td className="p-2">12/18</td>
//                 <td className="p-2">47h 22m</td>
//                 <td className="p-2">7</td>
//               </tr>
//               {/* ... other static rows ... */}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CompanyDashboard;







//------------------
// import React, { useState, useEffect } from "react";
// import CompanyHeader from "../../layout/CompanyHeader"; // Assuming you have this

// const API_BASE_URL = "http://localhost:5001"; // Your backend URL

// const CompanyDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [companyName, setCompanyName] = useState(""); // To store company name

//   useEffect(() => {
//     const storedCompanyName = "hightech"; //ifs localStorage.getItem("companyName"); // IMPORTANT: Replace with actual localStorage retrieval
    
//     if (storedCompanyName) {
//       setCompanyName(storedCompanyName);
//     } else {
//       setError("Company name not found. Please log in again.");
//       setLoading(false);
//       return;
//     }

//     const fetchCompanyCourses = async () => {
//       if (!storedCompanyName) return;

//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/companies/${encodeURIComponent(storedCompanyName)}/courses`
//         );

//         if (!response.ok) {
//           const errData = await response.json().catch(() => ({ msg: "Failed to parse error response" }));
//           throw new Error(errData.msg || `HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setCourses(data || []);
//       } catch (err) {
//         console.error("Failed to fetch company courses:", err);
//         setError(err.message || "Failed to load courses.");
//         setCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanyCourses();
//   }, []);

//   //const placeholderImageSrc = "https://via.placeholder.com/400x250?text=No+Course+Image";
//   const placeholderImageSrc = "https://placehold.co/400x250?text=No+Course+Image";
//   if (loading) {
//     return (
//       <>
//         {/* <CompanyHeader /> */}
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//           <div className="p-6 text-center text-gray-700">
//             {/* You can use a spinner icon here */}
//             Loading Dashboard...
//           </div>
//         </div>
//       </>
//     );
//   }

//   // if (error) {
//   //   return (
//   //     <>
//   //       <CompanyHeader />
//   //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//   //         <div className="p-6 text-center text-red-600 bg-red-100 rounded-lg shadow">
//   //           <h3 className="font-semibold text-lg mb-2">Oops! Something went wrong.</h3>
//   //           <p>{error}</p>
//   //           {/* Optionally, a button to retry or go to login */}
//   //         </div>
//   //       </div>
//   //     </>
//   //   );
//   // }

//   return (
//     <>
//       {/* <CompanyHeader /> */}
//       <div className="p-6 bg-gray-100 min-h-screen"> {/* Main page background and padding */}
        
//         {/* Top Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//             <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">No. of Courses</h2>
//             <p className="text-3xl font-bold text-blue-500 mt-2">{courses.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//             <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Students</h2>
//             <p className="text-3xl font-bold text-blue-500 mt-2">42 <span className="text-sm text-gray-500">(Static)</span></p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//             <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active JDs</h2>
//             <p className="text-3xl font-bold text-blue-500 mt-2">12 <span className="text-sm text-gray-500">(Static)</span></p>
//           </div>
//         </div>

//         {/* Company's Courses Section */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800">Your Courses</h2>
//             {/* Optional: Add "Create New Course" button here */}
//             {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150">
//               + Create Course
//             </button> */}
//           </div>

//           {courses.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {courses.map((course) => (
//                 <div
//                   key={course._id}
//                   className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300"
//                 >
//                   <img
//                     src={course.course_image ? `${API_BASE_URL}${course.course_image}` : placeholderImageSrc}
//                     alt={course.course_name}
//                     className="w-full h-48 object-cover" // Fixed height for image consistency
//                     onError={(e) => { e.target.onerror = null; e.target.src = placeholderImageSrc; }}
//                   />
//                   <div className="p-5 flex flex-col flex-grow">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate group-hover:text-blue-500 transition-colors" title={course.course_name}>
//                       {course.course_name}
//                     </h3>
//                     {/* If you have @tailwindcss/line-clamp plugin or Tailwind v3.3+ */}
//                     <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow" title={course.introduction}>
//                       {course.introduction || "No introduction provided."}
//                     </p>
//                     {/* Fallback if line-clamp is not available:
//                     <p className="text-sm text-gray-600 mb-4 h-16 overflow-hidden text-ellipsis" title={course.introduction}>
//                       {course.introduction || "No introduction provided."}
//                     </p>
//                     */}
//                     <div className="mt-auto pt-3 border-t border-gray-200">
//                       <div className="flex justify-between items-center text-xs text-gray-500">
//                         <span>
//                           {course.lesson_count !== undefined ? `${course.lesson_count} Lessons` : 'Lessons: N/A'}
//                         </span>
//                         <span className="font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
//                           Level: {course.level || "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                     {/* Optional: Action Buttons */}
//                     {/* <div className="mt-4 flex space-x-2">
//                       <button className="text-xs bg-indigo-500 hover:bg-indigo-600 text-white py-1.5 px-3 rounded-md w-full">View</button>
//                       <button className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 py-1.5 px-3 rounded-md w-full">Edit</button>
//                     </div> */}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12 bg-white rounded-xl shadow-lg">
//               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                 <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//               </svg>
//               <h3 className="mt-2 text-lg font-medium text-gray-900">No courses yet</h3>
//               <p className="mt-1 text-sm text-gray-500">Get started by creating a new course.</p>
//               {/* <div className="mt-6">
//                 <button
//                   type="button"
//                   className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                 >
//                   + Create New Course
//                 </button>
//               </div> */}
//             </div>
//           )}
//         </div>

//         {/* Course Tracking Table (Static Example) */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Tracking <span className="text-sm text-gray-500">(Static Example)</span></h2>
//           <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
//             <table className="w-full min-w-max">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {/* Static data - replace or make dynamic if needed */}
//                 {[
//                   { name: 'Introduction to Java', completed: '12/18', duration: '47h 22m', applicants: 7 },
//                   { name: 'Advanced Python Programming', completed: '15/20', duration: '60h 10m', applicants: 5 },
//                   { name: 'Web Development Bootcamp', completed: '8/25', duration: '120h 00m', applicants: 12 },
//                 ].map((item, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.completed}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.duration}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{item.applicants}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CompanyDashboard;


// import React, { useState, useEffect } from "react";
// import CompanyHeader from "../../layout/CompanyHeader";
// //import { jwtDecode } from 'jwt-decode'; // Not needed here if companyName is already stored

// const API_BASE_URL = "http://localhost:5001";

// const CompanyDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [companyName, setCompanyName] = useState("");

//   useEffect(() => {
//     // Retrieve company name from localStorage
//     const storedCompanyName = localStorage.getItem("companyName");

//     if (storedCompanyName) {
//       setCompanyName(storedCompanyName); // Set it to state for potential use in the component
//     } else {
//       setError("Company name not found. Please log in again.");
//       // Potentially redirect to login page:
//       // history.push('/login'); // if using React Router v5
//       // navigate('/login');    // if using React Router v6
//       setLoading(false);
//       return;
//     }

//     const fetchCompanyCourses = async () => {
//       // Ensure storedCompanyName is available (it should be due to the check above)
//       if (!storedCompanyName) {
//         setError("Cannot fetch courses without company name.");
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       setError(null);
//       try {
//         const accessToken = localStorage.getItem("accessToken"); // Get token for authenticated requests
//         if (!accessToken) {
//             throw new Error("No access token found. Please log in.");
//         }

//         const response = await fetch(
//           `${API_BASE_URL}/companies/${encodeURIComponent(storedCompanyName)}/courses`,
//           {
//             headers: {
//               // Your /companies/:company_name/courses endpoint might not require JWT
//               // if it's public per company. If it does, add Authorization:
//               // 'Authorization': `Bearer ${accessToken}`
//             }
//           }
//         );

//         if (!response.ok) {
//           const errData = await response.json().catch(() => ({ msg: "Failed to parse error response" }));
//           throw new Error(errData.msg || `HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setCourses(data || []);
//       } catch (err) {
//         console.error("Failed to fetch company courses:", err);
//         if (err.message.includes("token")) { // More specific error handling
//             // redirect to login or show specific message
//         }
//         setError(err.message || "Failed to load courses.");
//         setCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (storedCompanyName) { // Only fetch if companyName is available
//         fetchCompanyCourses();
//     }

//   }, []); // Empty dependency array ensures this runs once on mount

//   // ... rest of your component remains the same
//   //const placeholderImageSrc = "https://via.placeholder.com/400x250?text=No+Course+Image";
//   const placeholderImageSrc = "https://placehold.co/400x250?text=No+Course+Image";

//   if (loading) {
//     return (
//       <>
//         {/* <CompanyHeader companyName={companyName} /> Pass companyName if Header needs it */}
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//           <div className="p-6 text-center text-gray-700">
//             Loading dashboard data...
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (error) {
//     return (
//       <>
//         {/* <CompanyHeader companyName={companyName} /> */}
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//           <div className="p-6 text-center text-red-600 bg-red-100 rounded-lg shadow">
//             <h3 className="font-semibold text-lg mb-2">Oops! Something went wrong.</h3>
//             <p>{error}</p>
//             {/* Optionally, a button to retry or go to login */}
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       {/* <CompanyHeader companyName={companyName} /> Pass companyName if Header needs it */}
//       <div className="p-6 bg-gray-100 min-h-screen">
//         {/* Top Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//             <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">No. of Courses</h2>
//             <p className="text-3xl font-bold text-blue-500 mt-2">{courses.length}</p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//             <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Students</h2>
//             <p className="text-3xl font-bold text-blue-500 mt-2">42 <span className="text-sm text-gray-500">(Static)</span></p>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//             <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active JDs</h2>
//             <p className="text-3xl font-bold text-blue-500 mt-2">12 <span className="text-sm text-gray-500">(Static)</span></p>
//           </div>
//         </div>

//         {/* Company's Courses Section */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold text-gray-800">Your Courses - {companyName}</h2> {/* Display company name */}
//             {/* Optional: Add "Create New Course" button here */}
//           </div>

//           {courses.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//               {courses.map((course) => (
//                 <div
//                   key={course._id}
//                   className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300"
//                 >
//                   <img
//                     src={course.course_image ? `${API_BASE_URL}${course.course_image}` : placeholderImageSrc}
//                     alt={course.course_name}
//                     className="w-full h-48 object-cover"
//                     onError={(e) => { e.target.onerror = null; e.target.src = placeholderImageSrc; }}
//                   />
//                   <div className="p-5 flex flex-col flex-grow">
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate group-hover:text-blue-500 transition-colors" title={course.course_name}>
//                       {course.course_name}
//                     </h3>
//                     <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-grow" title={course.introduction}>
//                       {course.introduction || "No introduction provided."}
//                     </p>
//                     <div className="mt-auto pt-3 border-t border-gray-200">
//                       <div className="flex justify-between items-center text-xs text-gray-500">
//                         <span>
//                           {course.lesson_count !== undefined ? `${course.lesson_count} Lessons` : 'Lessons: N/A'}
//                         </span>
//                         <span className="font-medium bg-blue-100 text-blue-500 px-2 py-0.5 rounded-full">
//                           Level: {course.level || "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
//               <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//                 <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//               </svg>
//               <h3 className="mt-2 text-lg font-medium text-gray-900">No courses yet for {companyName}</h3>
//               <p className="mt-1 text-sm text-gray-500">Get started by creating a new course.</p>
//             </div>
//           )}
//         </div>

//         {/* Course Tracking Table (Static Example) */}
//         <div>
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Tracking <span className="text-sm text-gray-500">(Static Example)</span></h2>
//           <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
//             <table className="w-full min-w-max">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {[
//                   { name: 'Introduction to Java', completed: '12/18', duration: '47h 22m', applicants: 7 },
//                   { name: 'Advanced Python Programming', completed: '15/20', duration: '60h 10m', applicants: 5 },
//                   { name: 'Web Development Bootcamp', completed: '8/25', duration: '120h 00m', applicants: 12 },
//                 ].map((item, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.completed}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.duration}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 font-semibold">{item.applicants}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CompanyDashboard;








// import React, { useState, useEffect } from "react";
// // import CompanyHeader from "../../layout/CompanyHeader"; // Assuming you might have this or similar

// const API_BASE_URL = "http://localhost:5001";

// const CompanyDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [companyName, setCompanyName] = useState("");

//   useEffect(() => {
//     const storedCompanyName = localStorage.getItem("companyName");

//     if (storedCompanyName) {
//       setCompanyName(storedCompanyName);
//     } else {
//       setError("Company name not found. Please log in again as a company representative.");
//       setLoading(false);
//       return;
//     }

//     const fetchCompanyCourses = async () => {
//       if (!storedCompanyName) {
//         setError("Cannot fetch courses without company name.");
//         setLoading(false);
//         return;
//       }
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/companies/${encodeURIComponent(storedCompanyName)}/courses`
//         );
//         if (!response.ok) {
//           const errData = await response.json().catch(() => ({ msg: "Failed to parse error response" }));
//           throw new Error(errData.msg || `HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         // For testing horizontal scroll, ensure you have enough courses
//         // setCourses(data.concat(data).concat(data) || []); // Temporarily triple the courses
//         setCourses(data || []);
//       } catch (err) {
//         console.error("Failed to fetch company courses:", err);
//         setError(err.message || "Failed to load courses.");
//         setCourses([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (storedCompanyName) {
//       fetchCompanyCourses();
//     }
//   }, []);

//   //const placeholderImageSrc = "https://placehold.co/280x180?text=Course"; // Adjusted size for card
//   const placeholderImageSrc = "https://placehold.co/400x250?text=No+Course+Image";

//   if (loading) {
//     return (
//       // No CompanyHeader here, assuming it's part of the main layout if needed
//       <div className="flex-1 p-6 flex items-center justify-center"> {/* flex-1 if this is direct child of flex container */}
//         <div className="text-center text-gray-700">
//           Loading Dashboard...
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex-1 p-6 flex items-center justify-center">
//         <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg shadow">
//           <h3 className="font-semibold text-lg mb-2">Oops! Something went wrong.</h3>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     // This is the main container FOR THE DASHBOARD CONTENT.
//     // It will scroll vertically if its content is too tall for the main layout area.
//     <div className="p-6"> {/* Removed bg-gray-100 and min-h-screen if main layout handles it */}
      
//       {/* Top Stats Section - This section scrolls vertically with the dashboard's content */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//           <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">No. of Courses</h2>
//           <p className="text-3xl font-bold text-blue-600 mt-2">{courses.length}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//           <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Students</h2>
//           <p className="text-3xl font-bold text-blue-600 mt-2">42 <span className="text-sm text-gray-500">(Static)</span></p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//           <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active JDs</h2>
//           <p className="text-3xl font-bold text-blue-600 mt-2">12 <span className="text-sm text-gray-500">(Static)</span></p>
//         </div>
//       </div>

//       {/* Company's Courses Section - This entire block scrolls vertically with the dashboard's content */}
//       <div className="mb-8"> 
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800">Your Courses - {companyName}</h2>
//         </div>

//         {courses.length > 0 ? (
//           // CONTAINER THAT ENABLES HORIZONTAL SCROLLING FOR THE CARDS BELOW
//           <div className="overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full">
//             {/* This div holds the cards in a single, non-wrapping row */}
//             <div className="flex flex-nowrap gap-6 py-1"> {/* py-1 to help with shadow clipping */}
//               {courses.map((course) => (
//                 <div
//                   key={course._id}
//                   // Fixed width for each card is important
//                   className="min-w-[280px] w-[280px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300"
//                 >
//                   <img
//                     src={course.course_image ? `${API_BASE_URL}${course.course_image}` : `${placeholderImageSrc}&txt=${encodeURIComponent(course.course_name)}`}
//                     alt={course.course_name}
//                     className="w-full h-40 object-cover" // Adjusted height
//                   />
//                   <div className="p-4 flex flex-col flex-grow"> {/* Adjusted padding */}
//                     <h3 className="text-base font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors" title={course.course_name}> {/* Adjusted text size */}
//                       {course.course_name}
//                     </h3>
//                     <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow" title={course.introduction}> {/* Adjusted text size and line-clamp */}
//                       {course.introduction || "No introduction provided."}
//                     </p>
//                     <div className="mt-auto pt-2 border-t border-gray-200"> {/* Adjusted padding */}
//                       <div className="flex justify-between items-center text-xs text-gray-500">
//                         <span>
//                           {course.lesson_count !== undefined ? `${course.lesson_count} Lessons` : 'Lessons: N/A'}
//                         </span>
//                         <span className="font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
//                           Level: {course.level || "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-white rounded-xl shadow-lg">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//               <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">No courses yet for {companyName}</h3>
//             <p className="mt-1 text-sm text-gray-500">Get started by creating a new course.</p>
//           </div>
//         )}
//       </div>

//       {/* Course Tracking Table - This section scrolls vertically with the dashboard's content */}
//       <div>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Tracking <span className="text-sm text-gray-500">(Static Example)</span></h2>
//         <div className="overflow-x-auto bg-white rounded-xl shadow-lg"> 
//           <table className="w-full min-w-max">
//             {/* ... Table content ... */}
//             <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {[
//                   { name: 'Introduction to Java', completed: '12/18', duration: '47h 22m', applicants: 7 },
//                   { name: 'Advanced Python Programming', completed: '15/20', duration: '60h 10m', applicants: 5 },
//                   { name: 'Web Development Bootcamp', completed: '8/25', duration: '120h 00m', applicants: 12 },
//                 ].map((item, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.completed}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.duration}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{item.applicants}</td>
//                   </tr>
//                 ))}
//               </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyDashboard;




// import React, { useState, useEffect } from "react";
// // import CompanyHeader from "../../layout/CompanyHeader"; // Assuming you might have this or similar

// const API_BASE_URL = "http://localhost:5001";

// // Helper to get the JWT token from localStorage (similar to Students.js)
// const getAuthToken = () => localStorage.getItem("accessToken");

// const CompanyDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true); // For courses and initial page load
//   const [error, setError] = useState(null); // For general/course errors
//   const [companyName, setCompanyName] = useState("");

//   // New states for "Total Students"
//   const [totalUniqueStudents, setTotalUniqueStudents] = useState(0);
//   const [loadingStudents, setLoadingStudents] = useState(true); // Specifically for student count

//   useEffect(() => {
//     const storedCompanyName = localStorage.getItem("companyName");

//     if (storedCompanyName) {
//       setCompanyName(storedCompanyName); // This will trigger the second useEffect for students
//     } else {
//       setError("Company name not found. Please log in again as a company representative.");
//       setLoading(false); // Stop main loading
//       setLoadingStudents(false); // Stop student specific loading
//       return;
//     }

//     const fetchCompanyCourses = async () => {
//       // setLoading(true); // Main loading is already true initially
//       // setError(null); // Reset error before new fetch if needed, but usually handled by initial state
//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/companies/${encodeURIComponent(storedCompanyName)}/courses`
//         );
//         if (!response.ok) {
//           const errData = await response.json().catch(() => ({ msg: "Failed to parse course error response" }));
//           throw new Error(errData.msg || `HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         setCourses(data || []);
//       } catch (err) {
//         console.error("Failed to fetch company courses:", err);
//         setError(err.message || "Failed to load courses."); // Set main error
//         setCourses([]);
//       } finally {
//         setLoading(false); // Stop main loading (for courses)
//       }
//     };

//     if (storedCompanyName) { // Ensure company name was found before fetching courses
//         fetchCompanyCourses();
//     }
//     // No explicit return here, effect completes.
//   }, []); // Runs once on mount to get company name and courses

//   // New useEffect to fetch total unique students, depends on companyName
//   useEffect(() => {
//     const fetchUniqueStudentCount = async () => {
//       // This check is crucial: only proceed if companyName is actually set.
//       if (!companyName) {
//         setLoadingStudents(false); // No companyName, so nothing to load students for.
//         return;
//       }

//       setLoadingStudents(true); // Start loading for student count
//       const token = getAuthToken();

//       if (!token) {
//         console.warn("Authentication token not found. Cannot fetch student count.");
//         setTotalUniqueStudents("N/A"); // Indicate token issue or that data can't be fetched
//         setLoadingStudents(false);
//         return;
//       }

//       try {
//         const response = await fetch(
//           `${API_BASE_URL}/companies/${encodeURIComponent(companyName)}/enrolled-students`,
//           {
//             method: "GET",
//             headers: {
//               "Authorization": `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           const errorData = await response.json().catch(() => ({ msg: "Failed to parse student enrollment error" }));
//           throw new Error(errorData.msg || `HTTP error fetching student enrollments: ${response.status}`);
//         }

//         const enrollmentsData = await response.json();
//         if (Array.isArray(enrollmentsData)) {
//           // Calculate unique students based on email
//           const uniqueStudentEmails = new Set(enrollmentsData.map(enrollment => enrollment.student_email).filter(email => email)); // Filter out null/undefined emails
//           setTotalUniqueStudents(uniqueStudentEmails.size);
//         } else {
//           console.error("Unexpected format for enrollments data:", enrollmentsData);
//           setTotalUniqueStudents("Error"); // Data format issue
//         }
//       } catch (err) {
//         console.error("Failed to fetch or process unique student count:", err);
//         setTotalUniqueStudents("Error"); // Indicate fetch/processing error
//       } finally {
//         setLoadingStudents(false); // Stop student specific loading
//       }
//     };

//     // Only call fetch if companyName has a value.
//     if (companyName) {
//       fetchUniqueStudentCount();
//     } else {
//       // If companyName is still empty after the first effect might have run (e.g. not in localStorage)
//       // ensure loadingStudents is false.
//       setLoadingStudents(false);
//     }
//   }, [companyName]); // Runs when companyName is set or changes

//   const placeholderImageSrc = "https://placehold.co/400x250?text=No+Course+Image";

//   // Overall loading state for the dashboard (primarily for courses and initial company name check)
//   if (loading) {
//     return (
//       <div className="flex-1 p-6 flex items-center justify-center">
//         <div className="text-center text-gray-700">
//           Loading Dashboard...
//         </div>
//       </div>
//     );
//   }

//   // If a critical error occurred (e.g., company name not found, or major course fetch issue)
//   if (error) {
//     return (
//       <div className="flex-1 p-6 flex items-center justify-center">
//         <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg shadow">
//           <h3 className="font-semibold text-lg mb-2">Oops! Something went wrong.</h3>
//           <p>{error}</p>
//         </div>
//       </div>
//     );
//   }

//   // Prepare student count display string
//   let studentCountDisplay;
//   if (loadingStudents) {
//     studentCountDisplay = "...";
//   } else if (typeof totalUniqueStudents === 'number') {
//     studentCountDisplay = totalUniqueStudents;
//   } else { // Handles "N/A" or "Error" strings if set
//     studentCountDisplay = totalUniqueStudents;
//   }

//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//           <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">No. of Courses</h2>
//           {/* `loading` is false here, so courses array is populated or empty */}
//           <p className="text-3xl font-bold text-blue-600 mt-2">{courses.length}</p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//           <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Students</h2>
//           <p className="text-3xl font-bold text-blue-600 mt-2">
//             {studentCountDisplay}
//           </p>
//         </div>
//         <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
//           <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active JDs</h2>
//           <p className="text-3xl font-bold text-blue-600 mt-2">12 <span className="text-sm text-gray-500">(Static)</span></p>
//         </div>
//       </div>

//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-semibold text-gray-800">Your Courses - {companyName || "Company"}</h2>
//         </div>

//         {/* Conditional rendering for courses based on `courses` array, `loading` is already false here */}
//         {courses.length > 0 ? (
//           <div className="overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full">
//             <div className="flex flex-nowrap gap-6 py-1">
//               {courses.map((course) => (
//                 <div
//                   key={course._id}
//                   className="min-w-[280px] w-[280px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300"
//                 >
//                   <img
//                     src={course.course_image ? `${API_BASE_URL}${course.course_image}` : `${placeholderImageSrc}&txt=${encodeURIComponent(course.course_name)}`}
//                     alt={course.course_name}
//                     className="w-full h-40 object-cover"
//                   />
//                   <div className="p-4 flex flex-col flex-grow">
//                     <h3 className="text-base font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors" title={course.course_name}>
//                       {course.course_name}
//                     </h3>
//                     <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow" title={course.introduction}>
//                       {course.introduction || "No introduction provided."}
//                     </p>
//                     <div className="mt-auto pt-2 border-t border-gray-200">
//                       <div className="flex justify-between items-center text-xs text-gray-500">
//                         <span>
//                           {course.lesson_count !== undefined ? `${course.lesson_count} Lessons` : 'Lessons: N/A'}
//                         </span>
//                         <span className="font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
//                           Level: {course.level || "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-white rounded-xl shadow-lg">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
//               <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">No courses yet for {companyName || "your company"}</h3>
//             <p className="mt-1 text-sm text-gray-500">Get started by creating a new course.</p>
//           </div>
//         )}
//       </div>

//       <div>
//         <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Tracking <span className="text-sm text-gray-500">(Static Example)</span></h2>
//         <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
//           <table className="w-full min-w-max">
//             <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicants</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {[
//                   { name: 'Introduction to Java', completed: '12/18', duration: '47h 22m', applicants: 7 },
//                   { name: 'Advanced Python Programming', completed: '15/20', duration: '60h 10m', applicants: 5 },
//                   { name: 'Web Development Bootcamp', completed: '8/25', duration: '120h 00m', applicants: 12 },
//                 ].map((item, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.completed}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.duration}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-semibold">{item.applicants}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompanyDashboard;


import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:5001";

// Helper to get the JWT token from localStorage
const getAuthToken = () => localStorage.getItem("accessToken");

// Helper to format date strings
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

const CompanyDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState("");

  const [totalUniqueStudents, setTotalUniqueStudents] = useState(0);
  const [loadingStudents, setLoadingStudents] = useState(true);
  const [courseEnrollmentCounts, setCourseEnrollmentCounts] = useState({});

  const [jdCount, setJdCount] = useState(0);
  const [loadingJdCount, setLoadingJdCount] = useState(true);

  useEffect(() => {
    const storedCompanyName = localStorage.getItem("companyName");
    if (storedCompanyName) {
      setCompanyName(storedCompanyName);
    } else {
      setError("Company name not found. Please log in again as a company representative.");
      setLoading(false);
      setLoadingStudents(false);
      setLoadingJdCount(false);
      setJdCount(0);
      setCourseEnrollmentCounts({});
      return;
    }

    const fetchCompanyCourses = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/companies/${encodeURIComponent(storedCompanyName)}/courses`
        );
        if (!response.ok) {
          const errData = await response.json().catch(() => ({ msg: "Failed to parse course error response" }));
          throw new Error(errData.msg || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Ensure course IDs are strings for consistent key matching later
        const processedCourses = (data || []).map(course => ({
          ...course,
          _id: String(course._id) // Make sure _id is a string
        }));
        setCourses(processedCourses);
      } catch (err) {
        console.error("Failed to fetch company courses:", err);
        setError(err.message || "Failed to load courses.");
        setCourses([]);
      } finally {
        setLoading(false); // This loading is for initial page/course load
      }
    };

    if (storedCompanyName) {
      fetchCompanyCourses();
    }
  }, []);

  // useEffect to fetch enrollment data and calculate counts
  useEffect(() => {
    const fetchEnrollmentData = async () => {
      // Wait for companyName and courses to be loaded, and ensure no general error
      if (!companyName || error || courses.length === 0) {
        setLoadingStudents(false);
        if (!error) {
          setTotalUniqueStudents(0);
          setCourseEnrollmentCounts({});
        } else {
          setTotalUniqueStudents("N/A");
          setCourseEnrollmentCounts({});
        }
        return;
      }

      setLoadingStudents(true);
      const token = getAuthToken();
      if (!token) {
        console.warn("Authentication token not found. Cannot fetch student data.");
        setTotalUniqueStudents("N/A");
        setCourseEnrollmentCounts({});
        setLoadingStudents(false);
        return;
      }

      // Create a map from course_name to course_id from the loaded courses
      // This assumes course names are unique for the company.
      const courseNameToIdMap = {};
      courses.forEach(course => {
        if (course.course_name && course._id) {
          courseNameToIdMap[course.course_name] = course._id; // course._id is already a string here
        }
      });

      try {
        const response = await fetch(
          `${API_BASE_URL}/companies/${encodeURIComponent(companyName)}/enrolled-students`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ msg: "Failed to parse student enrollment error" }));
          throw new Error(errorData.msg || `HTTP error fetching student enrollments: ${response.status}`);
        }
        const enrollmentsData = await response.json();

        if (Array.isArray(enrollmentsData)) {
          const uniqueStudentEmails = new Set();
          const countsByCourseId = {}; // Store counts keyed by course._id

          enrollmentsData.forEach(enrollment => {
            if (enrollment.student_email) {
              uniqueStudentEmails.add(enrollment.student_email);
            }

            // Use enrollment.course_name to find the corresponding course_id
            if (enrollment.course_name) {
              const courseId = courseNameToIdMap[enrollment.course_name];
              if (courseId) { // If a matching course_id was found
                countsByCourseId[courseId] = (countsByCourseId[courseId] || 0) + 1;
              } else {
                // Optionally log if an enrollment's course_name doesn't match any known course.
                // This can happen if course names change or if there's a mismatch.
                console.warn(`Enrollment for course named "${enrollment.course_name}" could not be matched to a known course ID.`);
              }
            }
          });

          setTotalUniqueStudents(uniqueStudentEmails.size);
          setCourseEnrollmentCounts(countsByCourseId);
        } else {
          console.error("Unexpected format for enrollments data:", enrollmentsData);
          setTotalUniqueStudents("Error");
          setCourseEnrollmentCounts({});
        }
      } catch (err) {
        console.error("Failed to fetch or process student enrollment data:", err);
        setTotalUniqueStudents("Error");
        setCourseEnrollmentCounts({});
      } finally {
        setLoadingStudents(false);
      }
    };

    fetchEnrollmentData();
  }, [companyName, error, courses]); // IMPORTANT: Added `courses` to the dependency array

  useEffect(() => {
    const fetchJdData = async () => {
      // ... (JD fetch logic - no changes here)
      if (error) {
        setLoadingJdCount(false);
        setJdCount(0);
        return;
      }
      setLoadingJdCount(true);
      const token = getAuthToken();

      if (!token) {
        console.warn("Authentication token not found. Cannot fetch JD count.");
        setJdCount("N/A");
        setLoadingJdCount(false);
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/jds/my`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ msg: "Failed to parse JD fetch error" }));
          throw new Error(errorData.msg || `HTTP error fetching JDs: ${response.status}`);
        }

        const jdsData = await response.json();
        if (Array.isArray(jdsData)) {
          setJdCount(jdsData.length);
        } else {
          console.error("Unexpected format for JDs data:", jdsData);
          setJdCount("Error");
        }
      } catch (err)
       {
        console.error("Failed to fetch or process JD count:", err);
        setJdCount("Error");
      } finally {
        setLoadingJdCount(false);
      }
    };

    fetchJdData();
  }, [error]);

  // ... (placeholderImageSrc, loading/error JSX for main page) ...
  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center text-gray-700">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Oops! Something went wrong.</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  let studentCountDisplay;
  if (loadingStudents) {
    studentCountDisplay = "...";
  } else if (typeof totalUniqueStudents === 'number') {
    studentCountDisplay = totalUniqueStudents;
  } else {
    studentCountDisplay = totalUniqueStudents;
  }

  let jdCountDisplay;
  if (loadingJdCount) {
    jdCountDisplay = "...";
  } else if (typeof jdCount === 'number') {
    jdCountDisplay = jdCount;
  } else {
    jdCountDisplay = jdCount;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* ... (cards for No. of Courses, Total Students, Active JDs - no changes) ... */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">No. of Courses</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{courses.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Students</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {studentCountDisplay}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
          <h2 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active JDs</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {jdCountDisplay}
          </p>
        </div>
      </div>

      {/* Your Courses Carousel */}
      <div className="mb-8">
        {/* ... (carousel logic - no changes needed here for counts) ... */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Courses - {companyName || "Company"}</h2>
        </div>
        {courses.length > 0 ? (
          <div className="overflow-x-auto pb-4 -mb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full">
            <div className="flex flex-nowrap gap-6 py-1">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="min-w-[280px] w-[280px] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-1 transition-all duration-300"
                >
                  <img
                    src={course.course_image ? `${API_BASE_URL}${course.course_image}` : `${placeholderImageSrc}&txt=${encodeURIComponent(course.course_name)}`}
                    alt={course.course_name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-base font-semibold text-gray-900 mb-1 truncate group-hover:text-blue-600 transition-colors" title={course.course_name}>
                      {course.course_name}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2 flex-grow" title={course.introduction}>
                      {course.introduction || "No introduction provided."}
                    </p>
                    <div className="mt-auto pt-2 border-t border-gray-200">
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>
                          {course.lesson_count !== undefined ? `${course.lesson_count} Lessons` : 'Lessons: N/A'}
                        </span>
                        <span className="font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                          Level: {course.level || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
           !loading && <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No courses yet for {companyName || "your company"}</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating a new course.</p>
          </div>
        )}
      </div>

      {/* Course Overview Table */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Course Overview</h2>
        {loading ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
            <p className="text-gray-700">Loading course overview...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
            <table className="w-full min-w-max">
              <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Lessons</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created Date</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled Students</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((course) => (
                    <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 max-w-sm truncate" title={course.course_name}>
                        {course.course_name}
                      </td>
                      <td className={`px-4 py-4 whitespace-nowrap text-sm text-center ${course.lesson_count === 0 || course.lesson_count === undefined ? 'text-red-500 font-semibold' : 'text-gray-700'}`}>
                        {course.lesson_count !== undefined ? course.lesson_count : "N/A"}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        {course.level || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(course.uploaded_date)}
                      </td>
                       <td className="px-4 py-4 whitespace-nowrap text-sm text-center text-gray-700">
                        {loadingStudents ? '...' : (courseEnrollmentCounts[course._id] || 0)}
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </div>
        ) : (
          // ... (No courses available message) ...
          <div className="text-center py-12 bg-white rounded-xl shadow-lg">
             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No courses available for overview.</h3>
            <p className="mt-1 text-sm text-gray-500">Create a course to see its details here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDashboard;