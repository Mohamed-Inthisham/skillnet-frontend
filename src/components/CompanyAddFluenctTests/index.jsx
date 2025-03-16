import React, { useState, useEffect } from 'react';
import InputField from "../InputField"; // You might not need InputField, keeping it for consistency if you use it elsewhere
import Button from "../Button";
import { useNavigate } from "react-router-dom"; // useNavigate might be useful for redirection later
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as jwtDecodeModule from "jwt-decode"; // Namespace import for jwt-decode (keeping this as it seemed to fix import issues)


const CompanyAddFluencyTest = () => {
  const [formData, setFormData] = useState({
    courseName: '', // Use courseName to match Quizzes component dropdown
    oral_question: '', // Keep oral_question for fluency test question
  });
  const [courses, setCourses] = useState([]);
  const [loginError, setLoginError] = useState(""); // For error messages, like in Quizzes component
  const navigate = useNavigate(); // If you need navigation

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = getAccessTokenFromDecoding(); // Using your token decoding function
        if (!token) {
          console.error("No JWT token found. User not logged in.");
          return;
        }
        const decodedToken = jwtDecodeModule.jwtDecode(token); // Use jwtDecodeModule.jwtDecode here
        const companyName = decodedToken.company_name; // Extract company name from token
        const response = await axios.get(`http://localhost:5001/companies/${companyName}/courses`, { // Fetch courses using axios
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response from /courses:", response); // <----- ADD THIS LOG
        console.log("API Response Data (courses):", response.data); // <----- ADD THIS LOG

        setCourses(response.data);
        console.log("Courses State after setCourses:", courses); // <----- ADD THIS LOG


      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!formData.courseName) {
      alert("Please choose a course."); // Basic validation
      return;
    }

    const selectedCourse = courses.find(course => course.course_name === formData.courseName);
    if (!selectedCourse) {
      alert("Please select a valid Course."); // More specific validation if course not found
      return;
    }

    const fluencyTestData = { // Construct fluency test data object
      oral_question: formData.oral_question, // Get question from formData
      segments: [], // Include segments: [] as you had before, or remove if not needed
    };

    console.log("Sending fluency test data:", fluencyTestData); // Debug log
    console.log("Current formData before submit:", formData); // Debug log


    try {
      const token = getAccessTokenFromDecoding(); // Get token using your function
      if (!token) {
        console.error("No JWT token found. User not logged in.");
        return;
      }

      const response = await axios.post( // Use axios for POST request
        `http://localhost:5001/courses/${selectedCourse._id}/fluency_tests`, // API endpoint
        fluencyTestData, // Data to send
        { headers: { Authorization: `Bearer ${token}` } } // Headers including token
      );

      console.log("Fluency test created successfully:", response.data);
      alert("Fluency test added successfully!");
      handleDiscard(); // Clear form after success
    } catch (error) {
      console.error("Error creating fluency test:", error);
      setLoginError("Failed to add fluency test question."); // Set error message
      if (error.response && error.response.data && error.response.data.msg) {
        setLoginError(error.response.data.msg); // More specific error from backend if available
      }
    }
  };


  const handleDiscard = () => {
    setFormData({
      courseName: '',
      oral_question: '',
    });
  };

  const getAccessTokenFromDecoding = () => { // Your token decoding function - keep it
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.warn("accessToken not found in localStorage");
      return null;
    }
    try {
      // ** TRY THIS: Access jwtDecode as a property of the namespace object **
      const decodedToken = jwtDecodeModule.jwtDecode(accessToken); // <---- TRY THIS - jwtDecodeModule.jwtDecode
      console.log("Decoded Access Token:", decodedToken);
      return accessToken;
    } catch (error) {
      console.error("Error decoding accessToken:", error);
      return null;
    }
  };


  return (
    <div className="p-6 max-w-4xl mx-auto font-[Poppins]"> {/* Added font-Poppins class like in Quizzes */}
      <h2 className="text-2xl font-semibold mb-6">Add Fluency Tests</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl mb-4">Add Fluency Questions</h3>

        <form onSubmit={handleSubmit}>
          {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>} {/* Error message display */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name*
            </label>
            <select
              name="courseName" // Changed name to courseName to match formData
              value={formData.courseName} // Bind value to formData.courseName
              onChange={handleChange} // Use handleChange for select changes
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select One</option>
              {courses.map(course => (
                <option key={course._id} value={course.course_name}>{course.course_name}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question*
            </label>
            <textarea
              name="oral_question" // Changed name to oral_question to match formData and backend (if it expects this)
              value={formData.oral_question} // Bind value to formData.oral_question
              onChange={handleChange} // Use handleChange for textarea changes
              placeholder="Write your fluency question"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>


          <div className="flex justify-end space-x-4">
            <Button
              text="Discard"
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              onClick={handleDiscard}
            />
            <Button
              text="Save"
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={handleSubmit} // Keep handleSubmit for button click
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyAddFluencyTest;