import React, { useState, useEffect } from 'react';
import Button from "../Button";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import * as jwtDecodeModule from "jwt-decode";

const CompanyAddDescriptiveQuizzes = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    question: '',
    correctAnswer: ''
  });
  const [courses, setCourses] = useState([]);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = getAccessTokenFromDecoding();
        if (!token) {
          console.error("No JWT token found. User not logged in.");
          return;
        }
        const decodedToken = jwtDecodeModule.jwtDecode(token);
        const companyName = decodedToken.company_name;
        const response = await axios.get(`http://localhost:5001/companies/${companyName}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response from /courses:", response);
        console.log("API Response Data (courses):", response.data);

        setCourses(response.data);
        console.log("Courses State after setCourses:", courses);

      } catch (error) {
        console.error("Error fetching courses:", error);
        setLoginError("Error fetching courses. Please try again.");
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
      alert("Please choose a course.");
      return;
    }

    const selectedCourse = courses.find(course => course.course_name === formData.courseName);
    if (!selectedCourse) {
      alert("Please select a valid Course.");
      return;
    }

    const descriptiveQuizData = {
      question: formData.question,
      correctAnswer: formData.correctAnswer,
      // segments: [], //  segments is not needed for essay question, removing it
    };

    console.log("Sending descriptive quiz data:", descriptiveQuizData);
    console.log("Current formData before submit:", formData);
    console.log("Selected Course ID:", selectedCourse._id); // Log the selected course ID

    try {
      const token = getAccessTokenFromDecoding();
      if (!token) {
        console.error("No JWT token found. User not logged in.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5001/courses/${selectedCourse._id}/essay_questions`, // Correct endpoint using selectedCourse._id
        descriptiveQuizData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Descriptive quiz created successfully:", response.data);
      alert("Descriptive quiz added successfully!");
      handleDiscard();
    } catch (error) {
      console.error("Error creating descriptive quiz:", error);
      setLoginError("Failed to add descriptive quiz question.");
      if (error.response && error.response.data && error.response.data.msg) {
        setLoginError(error.response.data.msg);
      }
    }
  };

  const handleDiscard = () => {
    setFormData({
      courseName: '',
      question: '',
      correctAnswer: ''
    });
    setLoginError("");
  };

  const getAccessTokenFromDecoding = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.warn("accessToken not found in localStorage");
      return null;
    }
    try {
      const decodedToken = jwtDecodeModule.jwtDecode(accessToken);
      console.log("Decoded Access Token:", decodedToken);
      return accessToken;
    } catch (error) {
      console.error("Error decoding accessToken:", error);
      return null;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-[Poppins]">
      <h2 className="text-2xl font-semibold mb-6">Add Exam Quizzes</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl mb-4">Add Descriptive Questions</h3>

        <form onSubmit={handleSubmit}>
          {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Course Name*
            </label>
            <select
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Course</option>
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
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Write your question"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correct Answer*
            </label>
            <textarea
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              placeholder="Write Correct answer"
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
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyAddDescriptiveQuizzes;