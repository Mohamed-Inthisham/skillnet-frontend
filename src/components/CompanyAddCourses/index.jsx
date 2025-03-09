import React, { useState } from "react";
import CompanyHeader from "../../layout/CompanyHeader";

const CompanyAddCourses = () => {
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseIntroduction: "",
    courseLevel: "",
    lessons: []
  });

  const [currentLesson, setCurrentLesson] = useState({
    name: "",
    videoUrl: ""
  });

  const [expandedLesson, setExpandedLesson] = useState("Java Syntax");

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...courseData,
      [name]: value
    });
  };

  const handleLessonChange = (e) => {
    const { name, value } = e.target;
    setCurrentLesson({
      ...currentLesson,
      [name]: value
    });
  };

  const handleAddLesson = () => {
    setCourseData({
      ...courseData,
      lessons: [...courseData.lessons, { ...currentLesson }]
    });
    setCurrentLesson({ name: "", videoUrl: "" });
  };

  const handleSaveLesson = () => {
    // Logic to save the current lesson
    console.log("Saving lesson:", currentLesson);
  };

  const handlePublish = () => {
    // Logic to publish the course
    console.log("Publishing course:", courseData);
  };

  const handleDiscard = () => {
    // Logic to discard changes
    console.log("Discarding changes");
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Add Courses</h1>

        {/* Description Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          
          <div className="mb-4">
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700 mb-1">
              Course Name*
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              placeholder="type your course name"
              className="w-full p-2 border rounded-md"
              value={courseData.courseName}
              onChange={handleCourseChange}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="courseIntroduction" className="block text-sm font-medium text-gray-700 mb-1">
              Course Introduction*
            </label>
            <div className="border rounded-md mb-1">
              <div className="flex items-center border-b p-2">
                <button className="mr-2 font-bold">B</button>
                <button className="mr-2 italic">I</button>
                <button className="mr-2 underline">U</button>
                <button className="mr-2">🔗</button>
                <button className="mr-2">😊</button>
              </div>
              <textarea
                id="courseIntroduction"
                name="courseIntroduction"
                placeholder="tell us about your course"
                className="w-full p-2 border-none focus:outline-none h-24"
                value={courseData.courseIntroduction}
                onChange={handleCourseChange}
              ></textarea>
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="courseLevel" className="block text-sm font-medium text-gray-700 mb-1">
              Course Level*
            </label>
            <div className="relative">
              <select
                id="courseLevel"
                name="courseLevel"
                className="w-full p-2 border rounded-md appearance-none"
                value={courseData.courseLevel}
                onChange={handleCourseChange}
              >
                <option value="" disabled selected>choose your course level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="w-3/4">
              <label className="block text-lg font-medium mb-2">Course Image</label>
            </div>
            <div className="w-1/4">
              <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50 flex flex-col items-center justify-center text-center">
                <div className="text-blue-500 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-blue-500 font-medium cursor-pointer">Click to upload</p>
                <p className="text-sm text-gray-500">or drag & drop</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lesson & Video Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Lesson & Video</h2>
            <button
              onClick={handleAddLesson}
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded"
            >
              Add Lesson
            </button>
          </div>

          {/* Lesson Accordion */}
          <div className="border rounded-md mb-4">
            <div 
              className="flex justify-between items-center p-3 cursor-pointer border-b"
              onClick={() => setExpandedLesson(expandedLesson === "Java Syntax" ? "" : "Java Syntax")}
            >
              <span>Java Syntax</span>
              <svg 
                className={`w-5 h-5 transition-transform ${expandedLesson === "Java Syntax" ? "transform rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            {expandedLesson === "Java Syntax" && (
              <div className="p-4">
                <div className="mb-4">
                  <label htmlFor="lessonName" className="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Name*
                  </label>
                  <input
                    type="text"
                    id="lessonName"
                    name="name"
                    placeholder="type your lesson name"
                    className="w-full p-2 border rounded-md"
                    value={currentLesson.name}
                    onChange={handleLessonChange}
                  />
                </div>
                
                <div className="flex mb-4">
                  <div className="w-3/4 pr-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lesson Video*
                    </label>
                  </div>
                  <div className="w-1/4">
                    <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50 flex flex-col items-center justify-center text-center">
                      <div className="text-blue-500 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-blue-500 font-medium cursor-pointer">Click to upload</p>
                      <p className="text-sm text-gray-500">or drag & drop</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    onClick={handleSaveLesson}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-medium py-2 px-6 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleDiscard}
            className="bg-white border border-red-500 text-red-500 hover:bg-red-50 font-medium py-2 px-6 rounded-md"
          >
            Discard
          </button>
          <button
            onClick={handlePublish}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md"
          >
            Public
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanyAddCourses;