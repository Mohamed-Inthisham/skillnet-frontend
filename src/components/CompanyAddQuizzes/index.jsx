import React, { useState, useEffect } from 'react';
import InputField from "../InputField";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CompanyAddQuizzes = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseContent: '',
    question_text: '',
    options: ['', '', '', ''],
    correct_answer: ''
  });
  const [courses, setCourses] = useState([]);
  const [courseContents, setCourseContents] = useState([]);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No JWT token found. User not logged in.");
          return;
        }
        const decodedToken = jwtDecode(token);
        const companyName = decodedToken.company_name;
        const response = await axios.get(`http://localhost:5001/companies/${companyName}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCourseContents = async () => {
      if (!formData.courseName) {
        setCourseContents([]);
        return;
      }
      try {
        const selectedCourse = courses.find(course => course.course_name === formData.courseName);
        if (!selectedCourse) {
          setCourseContents([]);
          return;
        }
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(`http://localhost:5001/courses/${selectedCourse._id}/contents`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourseContents(response.data);
      } catch (error) {
        console.error("Error fetching course contents:", error);
        setCourseContents([]);
      }
    };

    fetchCourseContents();
  }, [formData.courseName, courses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...formData.options];
    updatedOptions[index] = value;
    setFormData(prevState => ({
      ...prevState,
      options: updatedOptions
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    const selectedContent = courseContents.find(content => content.lesson_name === formData.courseContent);
    if (!selectedContent) {
      alert("Please select a valid Course Content.");
      return;
    }

    // **Corrected MCQ Data Object Construction - Ensure correct_answer is A, B, C, or D:**
    const mcqData = {
      question_text: formData.question_text,
      options: formData.options,
      correct_answer: formData.correct_answer // **Expect formData.correct_answer to be "A", "B", "C", or "D"**
    };

    console.log("Sending MCQ data:", mcqData);
    console.log("Current formData before submit:", formData); // **Debug log - check formData before submit**


    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No JWT token found. User not logged in.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5001/contents/${selectedContent._id}/mcqs`,
        mcqData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("MCQ created successfully:", response.data);
      alert("Quiz question added successfully!");
      handleDiscard(); // Clear the form
    } catch (error) {
      console.error("Error creating MCQ:", error);
      setLoginError("Failed to add quiz question.");
      if (error.response && error.response.data && error.response.data.msg) {
        setLoginError(error.response.data.msg);
      }
    }
  };


  const handleDiscard = () => {
    setFormData({
      courseName: '',
      courseContent: '',
      question_text: '',
      options: ['', '', '', ''],
      correct_answer: ''
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-[Poppins]">
      <h2 className="text-2xl font-semibold mb-6">Add Quizzes</h2>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl mb-4">Questions</h3>

        <form onSubmit={handleSubmit}>
          {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name*
              </label>
              <select
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select One</option>
                {courses.map(course => (
                  <option key={course._id} value={course.course_name}>{course.course_name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Content*
              </label>
              <select
                name="courseContent"
                value={formData.courseContent}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select One</option>
                {courseContents.map(content => (
                  <option key={content._id} value={content.lesson_name}>{content.lesson_name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question*
            </label>
            <textarea
              name="question_text"
              value={formData.question_text}
              onChange={handleChange}
              placeholder="Write your question"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options / Answer*
            </label>
            <div className="grid grid-cols-2 gap-4">
              {formData.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  name={`option${String.fromCharCode(65 + index)}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${String.fromCharCode(65 + index)}`}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correct Answer* (A, B, C, or D)
            </label>
            <input
              type="text"
              name="correct_answer"
              value={formData.correct_answer}
              onChange={handleChange}
              placeholder="Write correct answer (A, B, C, or D)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default CompanyAddQuizzes;