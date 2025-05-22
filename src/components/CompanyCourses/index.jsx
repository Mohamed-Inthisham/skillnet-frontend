// import React, { useState, useEffect } from "react";
// import { FaEye, FaTrash, FaPlus } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import { jwtDecode } from "jwt-decode";

// const CompanyCourses = () => {
//   const navigate = useNavigate();
//   const [courses, setCourses] = useState([]);
//   const [companyName, setCompanyName] = useState("");

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         console.log("Token retrieved for fetching courses:", token);

//         if (!token) {
//           console.error("No JWT token found. User not logged in.");
//           alert("Authentication required. Please log in.");
//           return;
//         }

//         try {
//           const decodedToken = jwtDecode(token);
//           const decodedCompanyName = decodedToken.company_name;
//           setCompanyName(decodedCompanyName);
//           console.log("Decoded Company Name from JWT:", decodedCompanyName);

//           const response = await fetch(`http://localhost:5001/companies/${decodedCompanyName}/courses`, {
//             headers: {
//               "Authorization": `Bearer ${token}`,
//             },
//           });

//           if (response.ok) {
//             const coursesData = await response.json();
//             console.log("Courses fetched successfully:", coursesData);
//             setCourses(coursesData);
//           } else {
//             const errorData = await response.json();
//             console.error("Error fetching courses:", errorData);
//             alert(`Failed to load courses: ${errorData.msg || "Unknown error"}`);
//           }
//         } catch (decodeError) {
//           console.error("Error decoding JWT:", decodeError);
//           alert("Error decoding authentication token.");
//         }

//       } catch (error) {
//         console.error("Fetch error:", error);
//         alert("Failed to connect to the server to fetch courses.");
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleRowClick = (courseId) => {
//     navigate(`/Companymodule/${courseId}`); //navigate(`/CompanyModulePage/${courseId}`);   navigate(`/CompanyModule`);
//   };

//   const handleButtonClick = (e, courseId, action) => {
//     e.stopPropagation();
//     if (action === 'view') {
//       console.log('View clicked for:', courseId);
//     } else if (action === 'delete') {
//       console.log('Delete clicked for:', courseId);
//     }
//   };

//   return (
//     <div className="p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">Courses</h2>

//       <div className="flex space-x-6 mb-4">
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
//           onClick={() => navigate('/CompanyAddCourses')}
//         >
//           Add Course <FaPlus className="ml-2" />
//         </button>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
//           onClick={() => navigate('/CompanyAddFluencyTests')}
//         >
//           Add Fluency Test <FaPlus className="ml-2" />
//         </button>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
//           onClick={() => navigate('/CompanyAddQuizzes')}
//         >
//           Add Quiz <FaPlus className="ml-2" />
//         </button>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
//           onClick={() => navigate('/CompanyAddCertifications')}
//         >
//           Add Certificate <FaPlus className="ml-2" />
//         </button>
//         <button
//           className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
//           onClick={() => navigate('/CompanyAddDescriptiveQuizzes')}
//         >
//           Add Exam <FaPlus className="ml-2" />
//         </button>
//       </div>

//       <div className="overflow-x-auto shadow-md rounded-lg">
//         <table className="w-full border-collapse bg-white rounded-lg">
//           <thead>
//             <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
//               <th className="p-3 text-left">Course Name</th>
//               <th className="p-3 text-center">Lessons</th>
//               <th className="p-3 text-center">Level</th>
//               <th className="p-3 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {courses.map((course, index) => (
//               <tr
//                 key={course._id}
//                 className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition cursor-pointer`}
//                 onClick={() => handleRowClick(course._id)}
//               >
//                 <td className="p-3">{course.course_name}</td>
//                 <td className="p-3 text-center">{course.lesson_count}</td>
//                 <td className="p-3 text-center">{course.level}</td>
//                 <td className="p-3 flex justify-center space-x-3">
//                   <button
//                     className="text-blue-500 hover:text-blue-700 transition"
//                     onClick={(e) => handleButtonClick(e, course._id, 'view')}
//                   >
//                     <FaEye size={18} />
//                   </button>
//                   <button
//                     className="text-red-500 hover:text-red-700 transition"
//                     onClick={(e) => handleButtonClick(e, course._id, 'delete')}
//                   >
//                     <FaTrash size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CompanyCourses;

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  FaEye,
  FaTrash,
  FaPlus,
  FaBook,
  FaClipboardList,
  FaCertificate,
  FaChalkboardTeacher,
  FaSpinner,
  FaExclamationTriangle,
  // FaEllipsisV // Or use FaPlus for consistency in the dropdown trigger
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

// A small component for menu items - can stay inside or be moved to a utils file later if preferred
const AddMenuItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
    role="menuitem"
  >
    {icon && React.cloneElement(icon, { className: "mr-3 h-5 w-5 text-gray-500"})}
    {label}
  </button>
);

const CompanyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // For displaying errors inline

  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const addMenuRef = useRef(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Authentication required. Please log in.");
        setIsLoading(false);
        return;
      }

      let decodedCompanyName;
      try {
        const decodedToken = jwtDecode(token);
        decodedCompanyName = decodedToken.company_name;
        if (!decodedCompanyName) {
          setError("Company name not found in token.");
          setIsLoading(false);
          return;
        }
        setCompanyName(decodedCompanyName);
      } catch (decodeError) {
        console.error("Error decoding JWT:", decodeError);
        setError("Invalid authentication token. Please log in again.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE_URL}/companies/${encodeURIComponent(decodedCompanyName)}/courses`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const coursesData = await response.json();
        setCourses(coursesData);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Failed to load courses.");
      }
    } catch (err) {
      console.error("Fetch courses error:", err);
      setError("Failed to connect to the server or an unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []); // API_BASE_URL is constant within component lifecycle after initial definition

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target)) {
        setIsAddMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const addOptions = [
    { label: "Course", path: '/CompanyAddCourses', icon: <FaBook /> },
    { label: "Fluency Test", path: '/CompanyAddFluencyTests', icon: <FaClipboardList /> }, // Changed icon
    { label: "Quiz (MCQ)", path: '/CompanyAddQuizzes', icon: <FaChalkboardTeacher /> }, // Changed icon
    { label: "Exam (Descriptive)", path: '/CompanyAddDescriptiveQuizzes', icon: <FaClipboardList /> }, // Kept as clipboard for exam
    { label: "Certificate", path: '/CompanyAddCertifications', icon: <FaCertificate /> },
  ];

  const handleRowClick = (courseId) => {
    navigate(`/Companymodule/${courseId}`);
  };

  const handleDeleteCourse = async (e, courseId) => {
    e.stopPropagation(); // Prevent row click
    if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      // Basic loading state for delete, can be enhanced
      // For now, we rely on refetch to update UI
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
          method: 'DELETE',
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
        if (response.ok) {
          // Instead of alert, you could set a temporary success message state
          // For now, alert is kept as per original structure, but consider toast library
          alert("Course deleted successfully.");
          fetchCourses(); // Refetch courses to update the list
        } else {
          const errorData = await response.json();
          setError(`Failed to delete course: ${errorData.msg || "Unknown error"}`); // Show error inline
        }
      } catch (err) {
        console.error("Delete course error:", err);
        setError("An error occurred while deleting the course."); // Show error inline
      }
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mb-3" />
          <p className="text-lg">Loading courses...</p>
        </div>
      );
    }

    // Display general fetch error prominently
    if (error && courses.length === 0) { // Show main error if no courses loaded due to it
      return (
        <div className="flex flex-col items-center justify-center h-64 text-red-600 bg-red-50 p-6 rounded-lg shadow">
          <FaExclamationTriangle className="text-4xl mb-3" />
          <p className="text-lg font-semibold">Error loading courses</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={fetchCourses} 
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (courses.length === 0 && !isLoading) { // No error, just no courses
      return (
        <div className="text-center py-10 text-gray-500">
          <FaBook className="mx-auto text-4xl mb-3 text-gray-400" />
          <h3 className="text-xl font-semibold">No Courses Yet</h3>
          <p>Start by adding a new course to your company's catalog.</p>
        </div>
      );
    }

    // If there was an error but some courses were previously loaded, we might show a small error message above the table
    // For simplicity, the main error block above handles the case where loading fails entirely.

    return (
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Course Name</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Lessons</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Level</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr
                key={course._id}
                className="hover:bg-gray-50 transition cursor-pointer group"
                onClick={() => handleRowClick(course._id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{course.course_name}</div>
                  {companyName && <div className="text-xs text-gray-500">By {companyName}</div>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{course.lesson_count || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                    course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    course.level === 'Advanced' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800' // Default/All Levels
                  }`}>
                    {course.level}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      title="View Course"
                      className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded-full hover:bg-blue-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(course._id);
                      }}
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      title="Delete Course"
                      className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-full hover:bg-red-100"
                      onClick={(e) => handleDeleteCourse(e, course._id)}
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen">
      <header className="mb-6 flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Company Courses</h1>
            {companyName && <p className="text-sm text-gray-600 mt-1">Managing courses for {companyName}</p>}
        </div>
        <div className="relative inline-block text-left mt-4 sm:mt-0" ref={addMenuRef}>
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-blue-500 shadow-sm px-4 py-2 bg-blue text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 items-center"
              id="add-menu-button"
              aria-expanded={isAddMenuOpen}
              aria-haspopup="true"
              onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
            >
              Add New
              <FaPlus className="ml-2 -mr-1 h-4 w-4" />
            </button>
          </div>

          {isAddMenuOpen && (
            <div
              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="add-menu-button"
            >
              <div className="py-1" role="none">
                {addOptions.map((option) => (
                  <AddMenuItem
                    key={option.label}
                    icon={option.icon}
                    label={option.label}
                    onClick={() => {
                      navigate(option.path);
                      setIsAddMenuOpen(false);
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </header>
      
      {/* Display non-critical errors (e.g., delete error) above the table if needed */}
      {error && courses.length > 0 && (
         <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md shadow text-sm">
            <strong>Notice:</strong> {error}
         </div>
      )}

      {renderContent()}
    </div>
  );
};

export default CompanyCourses;