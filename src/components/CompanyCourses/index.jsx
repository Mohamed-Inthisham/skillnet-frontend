import React, { useState, useEffect } from "react";
import { FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const CompanyCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        console.log("Token retrieved for fetching courses:", token);

        if (!token) {
          console.error("No JWT token found. User not logged in.");
          alert("Authentication required. Please log in.");
          return;
        }

        try {
          const decodedToken = jwtDecode(token);
          const decodedCompanyName = decodedToken.company_name;
          setCompanyName(decodedCompanyName);
          console.log("Decoded Company Name from JWT:", decodedCompanyName);

          const response = await fetch(`http://localhost:5001/companies/${decodedCompanyName}/courses`, {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const coursesData = await response.json();
            console.log("Courses fetched successfully:", coursesData);
            setCourses(coursesData);
          } else {
            const errorData = await response.json();
            console.error("Error fetching courses:", errorData);
            alert(`Failed to load courses: ${errorData.msg || "Unknown error"}`);
          }
        } catch (decodeError) {
          console.error("Error decoding JWT:", decodeError);
          alert("Error decoding authentication token.");
        }

      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to connect to the server to fetch courses.");
      }
    };

    fetchCourses();
  }, []);

  const handleRowClick = (courseId) => {
    navigate(`/CompanyModule`); //navigate(`/CompanyModulePage/${courseId}`);
  };

  const handleButtonClick = (e, courseId, action) => {
    e.stopPropagation();
    if (action === 'view') {
      console.log('View clicked for:', courseId);
    } else if (action === 'delete') {
      console.log('Delete clicked for:', courseId);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Courses</h2>

      <div className="flex space-x-6 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          onClick={() => navigate('/CompanyAddCourses')}
        >
          Add Course <FaPlus className="ml-2" />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          onClick={() => navigate('/CompanyAddFluencyTests')}
        >
          Add Fluency Test <FaPlus className="ml-2" />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          onClick={() => navigate('/CompanyAddQuizzes')}
        >
          Add Quiz <FaPlus className="ml-2" />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          onClick={() => navigate('/CompanyAddCertifications')}
        >
          Add Certificate <FaPlus className="ml-2" />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          onClick={() => navigate('/CompanyAddDescriptiveQuizzes')}
        >
          Add Exam <FaPlus className="ml-2" />
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
              <th className="p-3 text-left">Course Name</th>
              <th className="p-3 text-center">Lessons</th>
              <th className="p-3 text-center">Level</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course._id}
                className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition cursor-pointer`}
                onClick={() => handleRowClick(course._id)}
              >
                <td className="p-3">{course.course_name}</td>
                <td className="p-3 text-center">{course.lesson_count}</td>
                <td className="p-3 text-center">{course.level}</td>
                <td className="p-3 flex justify-center space-x-3">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition"
                    onClick={(e) => handleButtonClick(e, course._id, 'view')}
                  >
                    <FaEye size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={(e) => handleButtonClick(e, course._id, 'delete')}
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyCourses;