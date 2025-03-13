import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import { FaLock, FaCaretDown, FaSpinner, FaEdit, FaTrash, FaUpload, FaSave } from "react-icons/fa";
import javaModule from "../../assets/JavaModule.webp";
import sysco from "../../assets/sysco.webp";

const CompanyModulePage = () => {
  
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown
  const [isUploading, setIsUploading] = useState(false); // State to manage file upload loading
  const [isProcessing, setIsProcessing] = useState(false); // State to manage model processing
  const [uploadedFileName, setUploadedFileName] = useState(""); // State to store uploaded file name
  const [matchedJDs, setMatchedJDs] = useState([]); // State to store matched JDs
  const [courseImage, setCourseImage] = useState(javaModule); // State to manage course image
  const [editingField, setEditingField] = useState(null); // State to track which field is being edited
  const [courseTitle, setCourseTitle] = useState("Introduction to JAVA"); // State for course title
  const [introductionText, setIntroductionText] = useState(
    "Kevin Harris took at work, construction capability of k. Job do availored proper headquarters at Boston or Golden League sillips, for some part from wherever job is installed as remediated submicro telefonia will of aiding the KG commode onepaying; that code issue order is reprehended in real-gram well; case citizen offence on legal route position. Excepteur sint occasional duplicate inter per district, such in major call office disassum merit merits of out take-nim."
  ); // State for introduction text

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown state
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded file
    if (file) {
      setIsUploading(true); // Start file upload loading
      setUploadedFileName(file.name); // Store the file name

      // Simulate file upload process (e.g., API call)
      setTimeout(() => {
        setIsUploading(false); // Stop file upload loading after 3 seconds
        setIsProcessing(true); // Start model processing

        // Simulate model processing (e.g., API call)
        setTimeout(() => {
          setIsProcessing(false); // Stop model processing after 5 seconds
          setMatchedJDs([
            "Software Engineer at Sysco Labs",
            "Data Scientist at Tech Corp",
            "Machine Learning Engineer at AI Solutions",
          ]); // Set matched JDs
        }, 5000); // Simulate 5 seconds of model processing
      }, 3000); // Simulate 3 seconds of file upload
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the uploaded image file
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCourseImage(e.target.result); // Set the new image
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleEdit = (field) => {
    setEditingField(field); // Set the field being edited
  };

  const handleSave = () => {
    setEditingField(null); // Exit edit mode
    console.log("Changes saved!");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-[Poppins]">
      <UserHeader />

      <main className="flex-1 py-10 px-20 bg-gray-100">
        {/* Course Header Section */}
        <section className="mb-10 bg-white p-8 rounded-lg shadow-md flex items-center relative">
          {/* Edit and Save Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {editingField === "Course Header" ? (
              <button
                className="text-green-500 hover:text-green-700"
                onClick={handleSave}
              >
                <FaSave size={18} />
              </button>
            ) : (
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEdit("Course Header")}
              >
                <FaEdit size={18} />
              </button>
            )}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete("Course Header")}
            >
              <FaTrash size={18} />
            </button>
          </div>

          {/* Course Image with Upload Option */}
          <div className="relative">
            <img
              src={courseImage}
              alt="Introduction"
              className="w-78 h-48 rounded-lg mr-8"
            />
            <label
              htmlFor="course-image-upload"
              className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer"
            >
              <FaUpload className="text-blue-500" />
            </label>
            <input
              id="course-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          {/* Course Details */}
          <div>
            <h1
              className="text-2xl font-bold text-gray-800 mb-20"
              contentEditable={editingField === "Course Header"}
              suppressContentEditableWarning={true}
              onBlur={(e) => setCourseTitle(e.target.innerText)}
            >
              {courseTitle}
            </h1>
            <div className="mb-10 flex items-center">
              <img src={sysco} alt="Introduction" className="w-8 h-8 rounded-lg mr-4" />
              <h1 className="text-sm text-gray-800 mb-1">Sysco Labs</h1>
            </div>
          </div>

          {/* Course Stats */}
          <div className="space-y-1 mb-25 ml-20 mt-10">
            <p className="text-sm text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
              10 Lessons
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
              10 Quizzes
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
              1 Hr Exam
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
              Professional Certificate
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
          {/* Edit and Save Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {editingField === "Introduction" ? (
              <button
                className="text-green-500 hover:text-green-700"
                onClick={handleSave}
              >
                <FaSave size={18} />
              </button>
            ) : (
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEdit("Introduction")}
              >
                <FaEdit size={18} />
              </button>
            )}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete("Introduction")}
            >
              <FaTrash size={18} />
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4">Introduction</h2>
          <p
            className="text-gray-600"
            contentEditable={editingField === "Introduction"}
            suppressContentEditableWarning={true}
            onBlur={(e) => setIntroductionText(e.target.innerText)}
          >
            {introductionText}
          </p>
        </section>

        {/* Lessons Section */}
        <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Lessons</h2>
          <div>
            {[
              "Java Syntax",
              "Java Output / Print",
              "Java Comments",
              "Java Variables",
              "Java Data Types",
              "Java Type Casting",
              "Java Operators",
              "Java Strings",
              "Java If ... Else",
              "June Switch",
            ].map((lesson, index) => (
              <div key={index} className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-800 font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-800">{lesson}</h3>
                  </div>
                </div>
                <FaCaretDown className="text-blue-500 cursor-pointer" />
              </div>
            ))}
          </div>
        </section>

        {/* Exam Section */}
    <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Exam</h2>
      <div 
        className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => navigate('/CompanyAddDescriptiveQuizzes')}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <span className="text-blue-800 font-semibold"></span>
          </div>
          <div>
            <h3 className="text-sm text-gray-800">Add Exam</h3>
          </div>
        </div>
        <span><FaLock className="text-blue-500 mr-10" /></span>
      </div>
    </section>

        {/* Certificate Section */}
        <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Claim Your Course Certificate</h2>
          <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-blue-800 font-semibold"></span>
              </div>
              <div>
                <h3 className="text-sm text-gray-800">Certificate</h3>
              </div>
            </div>
            <span><FaLock className="text-blue-500 mr-10" /></span>
          </div>
        </section>

        {/* Apply For Job Section */}
        <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Apply For Job</h2>
          <div
            className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer"
            onClick={toggleDropdown}
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                {isDropdownOpen ? (
                  <FaCaretDown className="text-blue-800 text-xl" />
                ) : (
                  <FaLock className="text-blue-800 text-xl" />
                )}
              </div>
              <div>
                <h3 className="text-sm text-gray-800">CV</h3>
              </div>
            </div>
            {isDropdownOpen ? (
              <FaCaretDown className="text-blue-500 mr-10" />
            ) : (
              <FaLock className="text-blue-500 mr-10" />
            )}
          </div>

          {isDropdownOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <input
                type="file"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
              <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX</p>

              {isUploading && (
                <div className="mt-4 flex items-center justify-center">
                  <FaSpinner className="animate-spin text-blue-500 mr-2" />
                  <p className="text-sm text-gray-600">Uploading {uploadedFileName}...</p>
                </div>
              )}

              {!isUploading && uploadedFileName && !isProcessing && !matchedJDs.length && (
                <div className="mt-4 flex items-center justify-center">
                  <p className="text-sm text-green-600">Uploaded {uploadedFileName} successfully!</p>
                </div>
              )}

              {isProcessing && (
                <div className="mt-4 flex flex-col items-center justify-center">
                  <FaSpinner className="animate-spin text-blue-500 text-2xl mb-2" />
                  <p className="text-lg text-gray-600">Processing Your CV and matching with JDs...</p>
                </div>
              )}

              {!isProcessing && matchedJDs.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Matched Job Descriptions:</h3>
                  <ul className="list-disc list-inside">
                    {matchedJDs.map((jd, index) => (
                      <li key={index} className="text-sm text-gray-600">{jd}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CompanyModulePage;