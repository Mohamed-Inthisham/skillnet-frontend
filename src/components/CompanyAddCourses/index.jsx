import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import InputField from "../InputField";

const AddCourses = () => {
  const [courseName, setCourseName] = useState("");
  const [courseIntro, setCourseIntro] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [lessons, setLessons] = useState([{ name: "", videoLink: "" }]);
  const [createdCourseId, setCreatedCourseId] = useState(null); // State to store the created course ID

  const handleImageUpload = (event) => {
    setCourseImage(event.target.files[0]);
  };

  const handleDescriptionSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData();
    formData.append("course_name", courseName);
    formData.append("introduction", courseIntro);
    formData.append("level", courseLevel);
    if (courseImage) {
      formData.append("course_image", courseImage);
    }

    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token retrieved from localStorage (Description Submit):", token); // Debug logging

      if (!token) {
        console.error("No JWT token found in localStorage. User not logged in or token not stored correctly.");
        alert("You must be logged in as a company to add courses.");
        return;
      }

      const response = await fetch("http://localhost:5001/courses", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Course created successfully:", responseData);
        alert("Course Description added successfully!");

        setCreatedCourseId(responseData.course_id); // **Store the course_id**

        // Optionally clear the description form fields after successful submission
        setCourseName("");
        setCourseIntro("");
        setCourseLevel("");
        setCourseImage(null);
      } else {
        const errorData = await response.json();
        console.error("Error creating course:", errorData);
        alert(`Error creating course: ${errorData.msg || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  const handleLessonsSave = async () => {
    if (!createdCourseId) {
      alert("Please submit the course description first before adding lessons.");
      return;
    }

    const lessonsData = lessons.map(lesson => ({
      lesson_name: lesson.name,
      link: lesson.videoLink
    }));

    try {
      const token = localStorage.getItem("accessToken");
      console.log("Token retrieved from localStorage (Lessons Save):", token); // Debug logging

      if (!token) {
        console.error("No JWT token found in localStorage for lessons save.");
        alert("Authentication error. Please log in again.");
        return;
      }

      const response = await fetch(`http://localhost:5001/courses/${createdCourseId}/contents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(lessonsData), // Send lessons array in JSON format
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Course contents added successfully:", responseData);
        alert("Course lessons added successfully!");
        // Optionally clear lesson fields or reset lessons state
        setLessons([{ name: "", videoLink: "" }]); // Reset to initial state with one empty lesson
      } else {
        const errorData = await response.json();
        console.error("Error adding course contents:", errorData);
        alert(`Error adding course lessons: ${errorData.msg || "Unknown error"}`);
      }

    } catch (error) {
      console.error("Fetch error during lesson save:", error);
      alert("Failed to save lessons. Please try again later.");
    }
  };


  const addLesson = () => {
    setLessons([...lessons, { name: "", videoLink: "" }]);
  };

  const deleteLesson = (index) => {
    const updatedLessons = lessons.filter((_, i) => i !== index);
    setLessons(updatedLessons);
  };

  const updateLesson = (index, key, value) => {
    const updatedLessons = [...lessons];
    updatedLessons[index][key] = value;
    setLessons(updatedLessons);
  };

  return (
    <div className="p-6  mx-auto  min-h-screen font-[Poppins]">
      <h2 className="text-2xl font-semibold mb-6">Add Courses</h2>

      {/* Description Card */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h3 className="text-xl font-medium mb-4">Description</h3>
        <form onSubmit={handleDescriptionSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 ">
              Course Name*
            </label>
            <InputField
              type="text"
              placeholder="Type your course name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Course Introduction*
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm"
              placeholder="Tell us about your course"
              value={courseIntro}
              onChange={(e) => setCourseIntro(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Course Level*
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
              value={courseLevel}
              onChange={(e) => setCourseLevel(e.target.value)}
            >
              <option value="">Choose your course level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Course Image
            </label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-lg p-2 shadow-sm"
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button text="Submit" type="submit" className="bg-green-600 hover:bg-green-700" />
          </div>
        </form>
      </div>

      {/* Lesson & Video Card */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-medium">Lesson & Video</h3>
          <Button
            text="Add Lesson"
            variant="primary"
            className="px-4 py-2 cursor-pointer"
            onClick={addLesson}
          />
        </div>
        {lessons.map((lesson, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm mb-4">
            <div className="flex justify-between items-center mb-2">
              {index > 0 && (
                <Button
                  text="Delete"
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white cursor-pointer"
                  onClick={() => deleteLesson(index)}
                />
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 ">
                Lesson Name*
              </label>
              <InputField
                type="text"
                placeholder="Type your lesson name"
                value={lesson.name}
                onChange={(e) => updateLesson(index, "name", e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700 ">
                Video Link*
              </label>
              <InputField
                type="text"
                placeholder="Paste your video link"
                value={lesson.videoLink}
                onChange={(e) =>
                  updateLesson(index, "videoLink", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <Button text="Save" className="bg-green-600 hover:bg-green-700" onClick={handleLessonsSave} /> {/* Add onClick handler */}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          text="Discard"
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
        />
        <Link to="/CompanyCourses">
          <Button
            text="Finish"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default AddCourses;