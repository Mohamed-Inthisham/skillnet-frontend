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

  const handleImageUpload = (event) => {
    setCourseImage(event.target.files[0]);
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
          <Button text="Submit" className="bg-green-600 hover:bg-green-700" />
        </div>
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
              <h4 className="text-lg ">Java Syntax</h4>
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
          <Button text="Save" className="bg-green-600 hover:bg-green-700" />
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          text="Discard"
          variant="outline"
          className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
        />
        <Link to="/Home">
          <Button
            text="Back to Home"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
};

export default AddCourses;
