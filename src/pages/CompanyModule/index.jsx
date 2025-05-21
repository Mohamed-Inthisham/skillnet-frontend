// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import UserHeader from "../../layout/UserHeader";
// import Footer from "../../layout/Footer";
// import { FaLock, FaCaretDown, FaSpinner, FaEdit, FaTrash, FaUpload, FaSave } from "react-icons/fa";
// import javaModule from "../../assets/JavaModule.webp";
// import sysco from "../../assets/sysco.webp";
// import ModuleContentEditPage from "../../components/ModuleContentEdit";
// import CompanyEnglishFluencyTest from "../../components/CompanyEnglishFluencyTest"; // Import the Fluency Test component

// const CompanyModulePage = () => {
//   const [isUploading, setIsUploading] = useState(false);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [uploadedFileName, setUploadedFileName] = useState("");
//   const [matchedJDs, setMatchedJDs] = useState([]);
//   const [courseImage, setCourseImage] = useState(javaModule);
//   const [editingField, setEditingField] = useState(null);
//   const [courseTitle, setCourseTitle] = useState("Introduction to JAVA");
//   const [introductionText, setIntroductionText] = useState(
//     "Kevin Harris took at work, construction capability of k. Job do availored proper headquarters at Boston or Golden League sillips, for some part from wherever job is installed as remediated submicro telefonia will of aiding the KG commode onepaying; that code issue order is reprehended in real-gram well; case citizen offence on legal route position. Excepteur sint occasional duplicate inter per district, such in major call office disassum merit merits of out take-nim."
//   );
//   const [openLessonIndex, setOpenLessonIndex] = useState(null);
//   const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
//   const [isFluencyTestOpen, setIsFluencyTestOpen] = useState(false); // State to manage Fluency Test dropdown
//   const navigate = useNavigate();

//   const toggleDropdown = (index) => {
//     if (openLessonIndex === index) {
//       setOpenLessonIndex(null);
//     } else {
//       setOpenLessonIndex(index);
//     }
//   };

//   const toggleExamDropdown = () => {
//     setIsExamDropdownOpen(!isExamDropdownOpen);
//   };

//   const toggleFluencyTest = () => {
//     setIsFluencyTestOpen(!isFluencyTestOpen); // Toggle Fluency Test dropdown
//   };

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setIsUploading(true);
//       setUploadedFileName(file.name);

//       setTimeout(() => {
//         setIsUploading(false);
//         setIsProcessing(true);

//         setTimeout(() => {
//           setIsProcessing(false);
//           setMatchedJDs([
//             "Software Engineer at Sysco Labs",
//             "Data Scientist at Tech Corp",
//             "Machine Learning Engineer at AI Solutions",
//           ]);
//         }, 5000);
//       }, 3000);
//     }
//   };

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setCourseImage(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleEdit = (field) => {
//     setEditingField(field);
//   };

//   const handleSave = () => {
//     setEditingField(null);
//     console.log("Changes saved!");
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen flex flex-col font-[Poppins]">
//       <UserHeader />

//       <main className="flex-1 py-10 px-20 bg-gray-100">
//         {/* Course Header Section */}
//         <section className="mb-10 bg-white p-8 rounded-lg shadow-md flex items-center relative">
//           <div className="absolute top-4 right-4 flex space-x-2">
//             {editingField === "Course Header" ? (
//               <button
//                 className="text-green-500 hover:text-green-700"
//                 onClick={handleSave}
//               >
//                 <FaSave size={18} />
//               </button>
//             ) : (
//               <button
//                 className="text-blue-500 hover:text-blue-700"
//                 onClick={() => handleEdit("Course Header")}
//               >
//                 <FaEdit size={18} />
//               </button>
//             )}
//             <button
//               className="text-red-500 hover:text-red-700"
//               onClick={() => handleDelete("Course Header")}
//             >
//               <FaTrash size={18} />
//             </button>
//           </div>

//           {/* Course Image with Upload Option */}
//           <div className="relative">
//             <img
//               src={courseImage}
//               alt="Introduction"
//               className="w-78 h-48 rounded-lg mr-8"
//             />
//             <label
//               htmlFor="course-image-upload"
//               className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer"
//             >
//               <FaUpload className="text-blue-500" />
//             </label>
//             <input
//               id="course-image-upload"
//               type="file"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImageUpload}
//             />
//           </div>

//           {/* Course Details */}
//           <div>
//             <h1
//               className="text-2xl font-bold text-gray-800 mb-20"
//               contentEditable={editingField === "Course Header"}
//               suppressContentEditableWarning={true}
//               onBlur={(e) => setCourseTitle(e.target.innerText)}
//             >
//               {courseTitle}
//             </h1>
//             <div className="mb-10 flex items-center">
//               <img src={sysco} alt="Introduction" className="w-8 h-8 rounded-lg mr-4" />
//               <h1 className="text-sm text-gray-800 mb-1">Sysco Labs</h1>
//             </div>
//           </div>

//           {/* Course Stats */}
//           <div className="space-y-1 mb-25 ml-20 mt-10">
//             <p className="text-sm text-gray-600 flex items-center">
//               <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
//               10 Lessons
//             </p>
//             <p className="text-sm text-gray-600 flex items-center">
//               <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
//               10 Quizzes
//             </p>
//             <p className="text-sm text-gray-600 flex items-center">
//               <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
//               1 Hr Exam
//             </p>
//             <p className="text-sm text-gray-600 flex items-center">
//               <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
//               Professional Certificate
//             </p>
//           </div>
//         </section>

//         {/* Introduction Section */}
//         <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
//           <div className="absolute top-4 right-4 flex space-x-2">
//             {editingField === "Introduction" ? (
//               <button
//                 className="text-green-500 hover:text-green-700"
//                 onClick={handleSave}
//               >
//                 <FaSave size={18} />
//               </button>
//             ) : (
//               <button
//                 className="text-blue-500 hover:text-blue-700"
//                 onClick={() => handleEdit("Introduction")}
//               >
//                 <FaEdit size={18} />
//               </button>
//             )}
//             <button
//               className="text-red-500 hover:text-red-700"
//               onClick={() => handleDelete("Introduction")}
//             >
//               <FaTrash size={18} />
//             </button>
//           </div>

//           <h2 className="text-xl font-bold text-gray-800 mb-4">Introduction</h2>
//           <p
//             className="text-gray-600"
//             contentEditable={editingField === "Introduction"}
//             suppressContentEditableWarning={true}
//             onBlur={(e) => setIntroductionText(e.target.innerText)}
//           >
//             {introductionText}
//           </p>
//         </section>

//         {/* Lessons Section */}
//         <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Lessons</h2>
//           <div>
//             {[
//               "Java Syntax",
//               "Java Output / Print",
//               "Java Comments",
//               "Java Variables",
//               "Java Data Types",
//               "Java Type Casting",
//               "Java Operators",
//               "Java Strings",
//               "Java If ... Else",
//               "June Switch",
//             ].map((lesson, index) => (
//               <div key={index}>
//                 <div
//                   className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer"
//                   onClick={() => toggleDropdown(index)}
//                 >
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
//                       <span className="text-blue-800 font-semibold">{index + 1}</span>
//                     </div>
//                     <div>
//                       <h3 className="text-sm text-gray-800">{lesson}</h3>
//                     </div>
//                   </div>
//                   <FaCaretDown className="text-blue-500" />
//                 </div>

//                 {openLessonIndex === index && <ModuleContentEditPage />}
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Exam Section */}
//         <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Exam</h2>
//           <div
//             className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer"
//             onClick={toggleExamDropdown}
//           >
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
//                 <span className="text-blue-800 font-semibold"></span>
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-800">Update Exams</h3>
//               </div>
//             </div>
//             <FaCaretDown className="text-blue-500 mr-10" />
//           </div>

//           {/* Exam Dropdown Options */}
//           {isExamDropdownOpen && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
//               <div
//                 className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
//                 onClick={toggleFluencyTest} // Toggle Fluency Test dropdown
//               >
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
//                     <span className="text-blue-800 font-semibold">1</span>
//                   </div>
//                   <div>
//                     <h3 className="text-sm text-gray-800">Fluency Test</h3>
//                   </div>
//                 </div>
//                 <FaCaretDown className="text-blue-500" />
//               </div>

//               {/* Fluency Test Component */}
//               {isFluencyTestOpen && (
//                 <div className="mt-4">
//                   <CompanyEnglishFluencyTest /> {/* Load the Fluency Test component */}
//                 </div>
//               )}

//               <div
//                 className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
//                 onClick={() => navigate("/exams")} // Redirect to Exams page
//               >
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
//                     <span className="text-blue-800 font-semibold">2</span>
//                   </div>
//                   <div>
//                     <h3 className="text-sm text-gray-800">Exams</h3>
//                   </div>
//                 </div>
//                 <FaCaretDown className="text-blue-500" />
//               </div>
//             </div>
//           )}
//         </section>

//         {/* Certificate Section */}
//         <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Claim Your Course Certificate</h2>
//           <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm">
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
//                 <span className="text-blue-800 font-semibold"></span>
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-800">Certificate</h3>
//               </div>
//             </div>
//             <span><FaCaretDown className="text-blue-500 mr-10" /></span>
//           </div>
//         </section>

//         {/* Apply For Job Section */}
//         <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Apply For Job</h2>
//           <div
//             className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer"
//             onClick={() => toggleDropdown(-1)}
//           >
//             <div className="flex items-center">
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
//                 {/* {openLessonIndex === -1 ? (
//                   <FaCaretDown className="text-blue-800 text-xl" />
//                 ) : (
//                   <FaCaretDown className="text-blue-800 text-xl" />
//                 )} */}
//               </div>
//               <div>
//                 <h3 className="text-sm text-gray-800">CV</h3>
//               </div>
//             </div>
//             {openLessonIndex === -1 ? (
//               <FaCaretDown className="text-blue-500 mr-10" />
//             ) : (
//               <FaCaretDown className="text-blue-500 mr-10" />
//             )}
//           </div>

//           {openLessonIndex === -1 && (
//             <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
//               <input
//                 type="file"
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileUpload}
//               />
//               <p className="text-sm text-gray-500 mt-2">Supported formats: PDF, DOC, DOCX</p>

//               {isUploading && (
//                 <div className="mt-4 flex items-center justify-center">
//                   <FaSpinner className="animate-spin text-blue-500 mr-2" />
//                   <p className="text-sm text-gray-600">Uploading {uploadedFileName}...</p>
//                 </div>
//               )}

//               {!isUploading && uploadedFileName && !isProcessing && !matchedJDs.length && (
//                 <div className="mt-4 flex items-center justify-center">
//                   <p className="text-sm text-green-600">Uploaded {uploadedFileName} successfully!</p>
//                 </div>
//               )}

//               {isProcessing && (
//                 <div className="mt-4 flex flex-col items-center justify-center">
//                   <FaSpinner className="animate-spin text-blue-500 text-2xl mb-2" />
//                   <p className="text-lg text-gray-600">Processing Your CV and matching with JDs...</p>
//                 </div>
//               )}

//               {!isProcessing && matchedJDs.length > 0 && (
//                 <div className="mt-4">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-2">Matched Job Descriptions:</h3>
//                   <ul className="list-disc list-inside">
//                     {matchedJDs.map((jd, index) => (
//                       <li key={index} className="text-sm text-gray-600">{jd}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           )}
//         </section>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default CompanyModulePage;


//------------------------------------------------------------------------------------


// src/pages/CompanyModulePage.jsx

// src/pages/CompanyModulePage.jsx

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import { FaLock, FaCaretDown, FaSpinner, FaEdit, FaTrash, FaUpload, FaSave, FaTimes, FaPlus,  FaStar, FaRegStar } from "react-icons/fa";
import javaModule from "../../assets/JavaModule.webp";
import sysco from "../../assets/sysco.webp";
import ModuleContentEditForm from "../../components/ModuleContentEditForm"; // For editing lesson details
import AddNewLessonForm from "../../components/AddNewLessonForm"; // For adding new lessons entirely
import CompanyEnglishFluencyTest from "../../components/CompanyEnglishFluencyTest";
import McqForm from "../../components/McqForm"; // For adding/editing MCQs for a lesson
import axios from "axios";
import { toast } from "react-toastify";

// VideoPlayer component (remains the same)
const VideoPlayer = ({ videoLink }) => {
  const getEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    try {
      const videoUrl = new URL(url);
      if (videoUrl.hostname.includes('youtube.com') || videoUrl.hostname.includes('youtu.be')) {
        let videoId;
        if (videoUrl.hostname === 'youtu.be') {
          videoId = videoUrl.pathname.slice(1);
        } else {
          videoId = videoUrl.searchParams.get('v');
        }
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      }
      if (videoUrl.hostname === 'vimeo.com') {
        const pathParts = videoUrl.pathname.split('/');
        const videoId = pathParts[pathParts.length -1];
        if (videoId && /^\d+$/.test(videoId)) return `https://player.vimeo.com/video/${videoId}`;
      }
      if (/\.(mp4|webm|ogg)$/i.test(videoUrl.pathname)) return url;
    } catch (e) {
      if (url.startsWith('/') || (!url.startsWith('http') && /\.(mp4|webm|ogg)$/i.test(url))) return url;
      return null;
    }
    if (/\.(mp4|webm|ogg)$/i.test(url)) return url;
    return null;
  };
  const embedUrl = getEmbedUrl(videoLink);
  if (!videoLink) return <p className="text-sm text-gray-500 p-4 text-center">No video link.</p>;
  if (!embedUrl) return <p className="text-sm text-red-500 p-4 text-center">Invalid video link.</p>;
  if (/\.(mp4|webm|ogg)$/i.test(embedUrl)) return <div className="w-full mx-auto bg-black rounded"><video controls src={embedUrl} className="w-full h-auto max-h-[500px] rounded" style={{ aspectRatio: '16/9', objectFit: 'contain' }}>Video not supported.</video></div>;
  return <div className="aspect-w-16 aspect-h-9 w-full mx-auto bg-gray-200 rounded"><iframe className="w-full h-full rounded" src={embedUrl} title="Lesson Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe></div>;
};


const CompanyModulePage = () => {
  const [course, setCourse] = useState(null);
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditingCourseDetails, setIsEditingCourseDetails] = useState(false);
  const [tempCourseData, setTempCourseData] = useState({});
  const [isSavingCourse, setIsSavingCourse] = useState(false);

  const [courseImagePreview, setCourseImagePreview] = useState(null);
  const [courseImageFile, setCourseImageFile] = useState(null);
  const imageInputRef = useRef(null);

  const [editingLessonContentId, setEditingLessonContentId] = useState(null); // ID of lesson content being edited (ModuleContentEditForm)
  const [showAddLessonForm, setShowAddLessonForm] = useState(false); // For the main "Add Lesson" form
  const [isSavingNewLesson, setIsSavingNewLesson] = useState(false);

  const [openLessonIndex, setOpenLessonIndex] = useState(null); // Which accordion is open
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
  const [isFluencyTestOpen, setIsFluencyTestOpen] = useState(false);

  const { courseId } = useParams();
  const navigate = useNavigate();

  // MCQ States
  const [contentMcqs, setContentMcqs] = useState(new Map()); // Map<contentId, { data: [], isLoading: boolean, error: null }>
  const [activeMcqFormForContentId, setActiveMcqFormForContentId] = useState(null); // contentId for which McqForm is displayed IN THE ACCORDION
  const [editingMcqData, setEditingMcqData] = useState(null); // Data for the MCQ being edited (passed to McqForm)
  const [isSavingMcq, setIsSavingMcq] = useState(false);

  const fetchCourseDataAndContents = async (showLoading = true) => {
    if(showLoading) setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("accessToken");
      const headers = { Authorization: `Bearer ${token}` };

      const coursePromise = axios.get(`http://localhost:5001/courses/${courseId}`, { headers });
      const contentsPromise = axios.get(`http://localhost:5001/courses/${courseId}/contents`, { headers });

      const [courseResponse, contentsResponse] = await Promise.all([coursePromise, contentsPromise]);

      setCourse(courseResponse.data);
      setCourseImagePreview(courseResponse.data.course_image ? `http://localhost:5001${courseResponse.data.course_image}` : javaModule);
      setContents(contentsResponse.data);
      
      // Reset states that depend on contents
      setContentMcqs(new Map());
      setActiveMcqFormForContentId(null);
      setEditingMcqData(null);
      setEditingLessonContentId(null); // Also reset lesson editing state


      if(showLoading) setLoading(false);
    } catch (err) {
      setError(err);
      if(showLoading) setLoading(false);
      toast.error(err.response?.data?.msg || "Failed to load course data.");
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDataAndContents();
    }
  }, [courseId]);

  const handleEditCourseDetails = () => {
    setIsEditingCourseDetails(true);
    // Close all other inline forms/views
    setShowAddLessonForm(false);
    setEditingLessonContentId(null);
    setOpenLessonIndex(null);
    setActiveMcqFormForContentId(null);
    setEditingMcqData(null);

    setTempCourseData({
      course_name: course.course_name,
      introduction: course.introduction,
      level: course.level || "",
      course_image_url: course.course_image,
    });
    setCourseImageFile(null);
    setCourseImagePreview(course.course_image ? `http://localhost:5001${course.course_image}` : javaModule);
    if(imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleCourseFieldChange = (field, value) => {
    setCourse(prevCourse => ({ ...prevCourse, [field]: value }));
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCourseImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => { setCourseImagePreview(reader.result); };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveCourseDetails = async () => {
    if (!course.course_name?.trim()) { toast.error("Course Name is required."); return; }
    if (!course.introduction?.trim()) { toast.error("Course Introduction is required."); return; }
    if (!course.level?.trim()) { toast.error("Course Level is required."); return; }

    setIsSavingCourse(true);
    const formData = new FormData();
    formData.append("course_name", course.course_name);
    formData.append("introduction", course.introduction);
    formData.append("level", course.level);
    if (courseImageFile) formData.append("course_image", courseImageFile);

    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(`http://localhost:5001/courses/${courseId}`, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      toast.success("Course updated successfully!");
      setIsEditingCourseDetails(false);
      await fetchCourseDataAndContents(false);
      setCourseImageFile(null);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to update course.");
    } finally {
      setIsSavingCourse(false);
    }
  };

  const handleCancelEditCourseDetails = () => {
    setCourse(prevCourse => ({
        ...prevCourse,
        course_name: tempCourseData.course_name,
        introduction: tempCourseData.introduction,
        level: tempCourseData.level,
    }));
    setCourseImagePreview(tempCourseData.course_image_url ? `http://localhost:5001${tempCourseData.course_image_url}` : javaModule);
    setCourseImageFile(null);
    setIsEditingCourseDetails(false);
  };

  const toggleDropdown = (index) => {
    if (isEditingCourseDetails) return;

    const contentId = contents[index]._id;
    const isCurrentlyOpen = openLessonIndex === index;

    if (isCurrentlyOpen) {
      setOpenLessonIndex(null);
      // If closing the accordion, also close any inline forms for THIS lesson
      if (editingLessonContentId === contentId) setEditingLessonContentId(null);
      if (activeMcqFormForContentId === contentId) setActiveMcqFormForContentId(null);
      setEditingMcqData(null); // Clear editing MCQ data regardless
    } else {
      setOpenLessonIndex(index);
      // If opening a new accordion, close forms from OTHER lessons
      if (editingLessonContentId && editingLessonContentId !== contentId) setEditingLessonContentId(null);
      if (activeMcqFormForContentId && activeMcqFormForContentId !== contentId) setActiveMcqFormForContentId(null);
      setEditingMcqData(null); // Clear editing MCQ data

      const mcqState = contentMcqs.get(contentId);
      if (!mcqState || mcqState.data === undefined) {
        fetchMcqsForContent(contentId);
      }
    }
  };


  const handleEditLessonDetails = (contentItem, index) => { // Renamed for clarity
    if (isEditingCourseDetails) return;
    setEditingLessonContentId(contentItem._id); // Show ModuleContentEditForm
    setActiveMcqFormForContentId(null);    // Hide McqForm
    setEditingMcqData(null);
    setShowAddLessonForm(false);            // Hide main "Add Lesson" form
    setOpenLessonIndex(index);              // Ensure accordion is open
  };

  const handleCancelEditLessonDetails = () => { // Renamed for clarity
    setEditingLessonContentId(null);
  };

  const handleSaveLessonDetails = async (contentId, updatedData) => { // Renamed for clarity
    if (isEditingCourseDetails) return;
    try {
      const token = localStorage.getItem("accessToken");
      await axios.put(`http://localhost:5001/contents/${contentId}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Lesson updated successfully!");
      await fetchCourseDataAndContents(false); // Refreshes and closes forms
      setEditingLessonContentId(null);
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to update lesson.");
    }
  };

  const handleDeleteContent = async (contentId) => {
    if (isEditingCourseDetails) return;
    if (window.confirm("Are you sure you want to delete this lesson? This will also delete any associated MCQs.")) {
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`http://localhost:5001/contents/${contentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Lesson deleted successfully!");
        // No need to manually close forms, fetchCourseDataAndContents will reset them
        await fetchCourseDataAndContents(false);
      } catch (error)
 {
        toast.error(error.response?.data?.msg || "Failed to delete lesson.");
      }
    }
  };

  const handleToggleAddLessonForm = () => { // This is for the main "Add Lesson" button, not within accordion
    if (isEditingCourseDetails) return;
    setShowAddLessonForm(!showAddLessonForm);
    // Close any open accordion and its inline forms
    setOpenLessonIndex(null);
    setEditingLessonContentId(null);
    setActiveMcqFormForContentId(null);
    setEditingMcqData(null);
  };

  const handleAddNewLesson = async (newLessonDataArray) => {
    if (isEditingCourseDetails) return;
    setIsSavingNewLesson(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        `http://localhost:5001/courses/${courseId}/contents`,
        newLessonDataArray,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 201 || response.status === 207) {
        if (response.data.failed_contents && response.data.failed_contents.length > 0) {
          toast.warn(`Some lessons created with errors. Created: ${response.data.created_content_ids?.length || 0}. Failed: ${response.data.failed_contents.length}.`);
        } else {
          toast.success("Lesson(s) added successfully!");
        }
        await fetchCourseDataAndContents(false); // Refreshes and closes forms
        setShowAddLessonForm(false);
      } else {
        toast.error(response.data.msg || "Failed to add lesson(s).");
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred while adding the lesson.");
    } finally {
      setIsSavingNewLesson(false);
    }
  };

  // --- MCQ Handlers ---
  const fetchMcqsForContent = async (contentId, showSpinner = true) => {
    setContentMcqs(prev => new Map(prev).set(contentId, { data: prev.get(contentId)?.data || [], isLoading: showSpinner, error: null }));
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`http://localhost:5001/contents/${contentId}/mcqs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContentMcqs(prev => new Map(prev).set(contentId, { data: response.data, isLoading: false, error: null }));
    } catch (err) {
      console.error(`Error fetching MCQs for content ${contentId}:`, err);
      setContentMcqs(prev => new Map(prev).set(contentId, { data: prev.get(contentId)?.data || [], isLoading: false, error: err }));
    }
  };

  const showMcqFormForAdd = (contentId) => {
    setEditingMcqData(null);                // Clear for new MCQ
    setActiveMcqFormForContentId(contentId); // Show McqForm IN ACCORDION
    setEditingLessonContentId(null);        // Hide lesson details edit form
  };

  const showMcqFormForEdit = (mcq, contentId) => {
    setEditingMcqData(mcq);                 // Populate for editing
    setActiveMcqFormForContentId(contentId); // Show McqForm IN ACCORDION
    setEditingLessonContentId(null);        // Hide lesson details edit form
  };

  const cancelMcqForm = () => {
    setActiveMcqFormForContentId(null);
    setEditingMcqData(null);
  };

  const handleSaveMcq = async (mcqPayload, mcqIdToUpdate, contentIdForNewMcq) => {
    setIsSavingMcq(true);
    const token = localStorage.getItem("accessToken");
    const headers = { Authorization: `Bearer ${token}` };
    const targetContentId = mcqIdToUpdate ? editingMcqData.content_id : contentIdForNewMcq;

    try {
      if (mcqIdToUpdate) {
        await axios.put(`http://localhost:5001/mcqs/${mcqIdToUpdate}`, mcqPayload, { headers });
        toast.success("MCQ updated successfully!");
      } else {
        await axios.post(`http://localhost:5001/contents/${targetContentId}/mcqs`, mcqPayload, { headers });
        toast.success("MCQ added successfully!");
      }
      fetchMcqsForContent(targetContentId, false);
      cancelMcqForm(); // Close the McqForm from accordion
    } catch (error) {
      toast.error(error.response?.data?.msg || "Failed to save MCQ.");
      console.error("Error saving MCQ:", error);
    } finally {
      setIsSavingMcq(false);
    }
  };

  const handleDeleteMcq = async (mcqId, contentId) => {
    if (window.confirm("Are you sure you want to delete this MCQ?")) {
      setIsSavingMcq(true);
      const token = localStorage.getItem("accessToken");
      try {
        await axios.delete(`http://localhost:5001/mcqs/${mcqId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("MCQ deleted successfully!");
        fetchMcqsForContent(contentId, false);
        if (editingMcqData && editingMcqData._id === mcqId) {
            cancelMcqForm(); // Close form if deleted MCQ was being edited
        }
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to delete MCQ.");
        console.error("Error deleting MCQ:", error);
      } finally {
        setIsSavingMcq(false);
      }
    }
  };


  const toggleExamDropdown = () => setIsExamDropdownOpen(!isExamDropdownOpen);
  const toggleFluencyTest = () => setIsFluencyTestOpen(!isFluencyTestOpen);
  const handleDeleteCourseSection = async (section) => {
      if (section === "course") {
          if (window.confirm("Are you sure you want to delete this entire course? This action cannot be undone.")) {
              try {
                  const token = localStorage.getItem("accessToken");
                  await axios.delete(`http://localhost:5001/courses/${courseId}`, { headers: { Authorization: `Bearer ${token}` } });
                  toast.success("Course deleted successfully.");
                  navigate("/company/dashboard");
              } catch (error) {
                  toast.error(error.response?.data?.msg || "Failed to delete course.");
              }
          }
      }
  };


  if (loading) return <div className="flex justify-center items-center min-h-screen"><FaSpinner className="animate-spin text-blue-500 text-4xl" /></div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">Error: {error.message}</div>;
  if (!course) return <div className="flex justify-center items-center min-h-screen">Course not found.</div>;

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-[Poppins]">
      <UserHeader />
      <main className="flex-1 py-10 px-4 sm:px-10 md:px-20 bg-gray-100">
        {/* Course Header & Details Section (same as before) */}
        <section className="mb-10 bg-white p-6 sm:p-8 rounded-lg shadow-xl relative">
          <div className="absolute top-4 right-4 flex space-x-2 z-10">
            {isEditingCourseDetails ? (
              <>
                <button onClick={handleSaveCourseDetails} disabled={isSavingCourse} title="Save Course" className="text-green-600 hover:text-green-700 p-1 disabled:opacity-50">
                  {isSavingCourse ? <FaSpinner className="animate-spin" size={20} /> : <FaSave size={20} />}
                </button>
                <button onClick={handleCancelEditCourseDetails} title="Cancel" className="text-gray-600 hover:text-gray-800 p-1">
                  <FaTimes size={20} />
                </button>
              </>
            ) : (
              <button onClick={handleEditCourseDetails} title="Edit Course Details" className="text-blue-600 hover:text-blue-800 p-1">
                <FaEdit size={20} />
              </button>
            )}
            <button onClick={() => handleDeleteCourseSection("course")} title="Delete Course" className="text-red-600 hover:text-red-700 p-1">
              <FaTrash size={20} />
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="relative aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <img src={courseImagePreview || javaModule} alt={course.course_name || "Course"} className="w-full h-full object-cover"/>
                {isEditingCourseDetails && (
                  <label htmlFor="course-image-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white text-sm opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <FaUpload className="mr-2" /> Change Image
                  </label>
                )}
              </div>
              {isEditingCourseDetails && <input id="course-image-upload" type="file" accept="image/*" className="hidden" ref={imageInputRef} onChange={handleImageFileChange}/>}
            </div>

            <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
              {isEditingCourseDetails ? (
                <input type="text" placeholder="Course Name*" className="text-2xl font-bold text-gray-800 border-b-2 border-gray-300 focus:border-blue-500 outline-none p-2 w-full" value={course.course_name || ""} onChange={(e) => handleCourseFieldChange("course_name", e.target.value)}/>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{course.course_name || "Course Name Missing"}</h1>
              )}
              <div className="flex items-center text-sm text-gray-600">
                <img src={course.company_image ? `http://localhost:5001${course.company_image}` : sysco} alt={course.company_name} className="w-6 h-6 rounded-full mr-2"/>
                <span>{course.company_name || "Company"}</span>
              </div>
              {isEditingCourseDetails ? (
                <div>
                  <label htmlFor="course-level-edit" className="block text-xs font-medium text-gray-500 mb-1">Course Level*</label>
                  <select id="course-level-edit" value={course.level || ""} onChange={(e) => handleCourseFieldChange("level", e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md shadow-sm">
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="All Levels">All Levels</option>
                  </select>
                </div>
              ) : (
                 course.level && <p className="text-sm text-gray-700 font-medium flex items-center">
                  {course.level === "Beginner" && <FaRegStar className="mr-1.5 text-yellow-500" />}
                  {course.level === "Intermediate" && <><FaStar className="mr-0.5 text-yellow-500" /><FaRegStar className="mr-1.5 text-yellow-500" /></>}
                  {course.level === "Advanced" && <><FaStar className="mr-0.5 text-yellow-500" /><FaStar className="mr-0.5 text-yellow-500" /><FaStar className="mr-1.5 text-yellow-500" /></>}
                  {!["Beginner", "Intermediate", "Advanced"].includes(course.level) && <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>}
                  {course.level} Level
                </p>
              )}
              <div className="pt-2 text-sm text-gray-600 space-y-1">
                  <p><span className="font-medium">{contents.length}</span> Lessons</p>
                  <p><span className="font-medium">{course.quiz_count || contents.length || 0}</span> Quizzes</p>
                  <p><span className="font-medium">{course.exam_duration || "N/A"}</span> Exam</p>
                  <p>Professional Certificate</p>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-3">Introduction*</h2>
            {isEditingCourseDetails ? (
                <textarea placeholder="Course Introduction*" className="w-full p-3 border border-gray-300 rounded-md min-h-[150px] focus:ring-blue-500 focus:border-blue-500 text-sm" value={course.introduction || ""} onChange={(e) => handleCourseFieldChange("introduction", e.target.value)} rows="5"/>
            ) : (
                <p className="text-gray-600 whitespace-pre-wrap text-sm">{course.introduction || "Course introduction is missing."}</p>
            )}
          </div>
        </section>

        {/* Lessons Section */}
        <section className="mb-10 bg-white p-6 sm:p-8 rounded-lg shadow-xl relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Lessons</h2>
            {!isEditingCourseDetails && ( // Main "Add Lesson" button
              <button
                onClick={handleToggleAddLessonForm}
                disabled={isSavingNewLesson}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 flex items-center disabled:opacity-70"
                title={showAddLessonForm ? "Cancel Adding Lesson" : "Add New Lesson"}
              >
                {showAddLessonForm ? <FaTimes className="mr-2" /> : (isSavingNewLesson ? <FaSpinner className="animate-spin mr-2"/> : <FaPlus className="mr-2" />)}
                {showAddLessonForm ? "Cancel" : "Add Lesson"}
              </button>
            )}
          </div>

          {showAddLessonForm && !isEditingCourseDetails && ( // Display AddNewLessonForm if active
            <AddNewLessonForm
                onSave={handleAddNewLesson}
                onCancel={handleToggleAddLessonForm}
                courseId={courseId}
            />
          )}

          {!showAddLessonForm && !isEditingCourseDetails && ( // Display list of lessons
            <div>
              {contents.length > 0 ? contents.map((content, index) => (
                <div key={content._id} className="mb-2">
                  {/* Lesson Accordion Header */}
                  <div className={`flex items-center justify-between p-4 bg-gray-50 shadow-sm 
                                 ${openLessonIndex === index && editingLessonContentId !== content._id && activeMcqFormForContentId !== content._id ? 'rounded-t-lg' : 'rounded-lg'}`}>
                    <div className="flex items-center flex-grow cursor-pointer" onClick={() => toggleDropdown(index)}>
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-blue-800 font-semibold">{index + 1}</span>
                      </div>
                      <div><h3 className="text-sm text-gray-800 font-medium">{content.lesson_name}</h3></div>
                    </div>
                    <div className="flex space-x-3 items-center ml-4">
                      {/* Show Edit Lesson button only if no inline form is active for THIS lesson */}
                      {editingLessonContentId !== content._id && activeMcqFormForContentId !== content._id && (
                        <button title="Edit Lesson Details" className="text-blue-600 hover:text-blue-800 p-1" onClick={(e) => { e.stopPropagation(); handleEditLessonDetails(content, index); }}>
                          <FaEdit size={16} />
                        </button>
                      )}
                       {/* Placeholder if an inline form is active, to maintain layout */}
                      {(editingLessonContentId === content._id || activeMcqFormForContentId === content._id) && <span className="p-1 w-[20px]"></span>}
                      <button title="Delete Lesson" className="text-red-500 hover:text-red-700 p-1" onClick={(e) => { e.stopPropagation(); handleDeleteContent(content._id); }}>
                        <FaTrash size={16} />
                      </button>
                      <FaCaretDown title={openLessonIndex === index ? "Collapse" : "Expand"} className={`text-blue-500 transition-transform duration-200 cursor-pointer p-1 ${openLessonIndex === index ? 'transform rotate-180' : ''}`} onClick={(e) => { e.stopPropagation(); toggleDropdown(index); }}/>
                    </div>
                  </div>

                  {/* Accordion Content: Shows Lesson Edit Form OR McqForm OR Video+MCQs */}
                  {openLessonIndex === index && (
                    <div className="p-4 bg-white rounded-b-lg shadow-inner border-t border-gray-200">
                      {editingLessonContentId === content._id ? ( // If editing lesson details
                        <ModuleContentEditForm
                          content={content}
                          onSave={handleSaveLessonDetails}
                          onCancel={handleCancelEditLessonDetails}
                        />
                      ) : activeMcqFormForContentId === content._id ? ( // If McqForm is active for this content
                        <McqForm
                          contentId={content._id}
                          initialData={editingMcqData}
                          onSave={handleSaveMcq}
                          onCancel={cancelMcqForm}
                          isSaving={isSavingMcq}
                        />
                      ) : ( // Default view: Video and MCQ list
                        <>
                          <VideoPlayer videoLink={content.link} />
                          <p className="text-xs text-gray-600 mt-3"><strong>Original Link:</strong> <a href={content.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{content.link}</a></p>

                          {/* MCQ Section for this lesson */}
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="text-md font-semibold text-gray-700">Lesson Quiz (MCQ)</h4>
                                <button
                                  onClick={() => showMcqFormForAdd(content._id)} // This button now shows McqForm inline
                                  className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-1 px-2.5 rounded-md shadow-sm flex items-center"
                                  title="Add MCQ to this lesson"
                                >
                                  <FaPlus className="mr-1" size={10} /> Add MCQ
                                </button>
                            </div>

                            {/* Display List of MCQs */}
                            {(() => {
                                const mcqState = contentMcqs.get(content._id);
                                if (!mcqState) {
                                  return <div className="flex justify-center items-center p-3"><FaSpinner className="animate-spin text-blue-500" /> <span className="ml-2 text-sm text-gray-500">Loading quiz...</span></div>;
                                }
                                if (mcqState.isLoading && (!mcqState.data || mcqState.data.length === 0)) {
                                  return <div className="flex justify-center items-center p-3"><FaSpinner className="animate-spin text-blue-500" /> <span className="ml-2 text-sm text-gray-500">Loading quiz...</span></div>;
                                }
                                if (mcqState.error) {
                                  return <p className="text-red-500 text-xs p-2 bg-red-50 rounded">Error: {mcqState.error.response?.data?.msg || mcqState.error.message}</p>;
                                }
                                if (mcqState.data && mcqState.data.length > 0) {
                                  return (
                                    <div className="space-y-3 mt-2">
                                      {mcqState.isLoading && <div className="text-xs text-blue-500 flex items-center mb-1"><FaSpinner className="animate-spin mr-1.5" /> Refreshing quiz...</div>}
                                      {mcqState.data.map((mcq, mcqIndex) => (
                                        <div key={mcq._id} className="p-3 border border-gray-200 rounded-md bg-gray-50 shadow-sm">
                                          <div className="flex justify-between items-start mb-1">
                                            <p className="text-sm font-medium text-gray-800 flex-grow break-words">
                                              {mcqIndex + 1}. {mcq.question_text}
                                            </p>
                                            <div className="flex-shrink-0 flex space-x-2 ml-2">
                                              <button onClick={() => showMcqFormForEdit(mcq, content._id)} title="Edit MCQ" className="text-blue-600 hover:text-blue-700 p-0.5">
                                                <FaEdit size={14} />
                                              </button>
                                              <button onClick={() => handleDeleteMcq(mcq._id, content._id)} title="Delete MCQ" className="text-red-500 hover:text-red-600 p-0.5">
                                                <FaTrash size={14} />
                                              </button>
                                            </div>
                                          </div>
                                          <ul className="list-none mt-1.5 space-y-1 pl-4">
                                            {mcq.options.map((option, optIndex) => (
                                              <li key={optIndex} className={`text-xs text-gray-600 ${String.fromCharCode(65 + optIndex) === mcq.correct_answer ? 'font-semibold text-green-700' : ''}`}>
                                                {String.fromCharCode(65 + optIndex)}. {option}
                                                {String.fromCharCode(65 + optIndex) === mcq.correct_answer && <span className="ml-1 text-green-600">(Correct)</span>}
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  );
                                }
                                if (mcqState.data && mcqState.data.length === 0) {
                                  return <p className="text-sm text-gray-500 italic mt-2">No MCQs added to this lesson yet.</p>;
                                }
                                return null;
                              })()}
                          </div> {/* End MCQ Section for this lesson */}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )) : <p className="text-gray-500 mt-4">No lessons yet. Click "Add Lesson" to start.</p>}
            </div>
          )}
          {isEditingCourseDetails && <p className="text-sm text-gray-500 italic text-center mt-4">Finish editing course details to manage lessons.</p>}
        </section>

        {/* Other sections (Exam, Certificate, etc. - same as before) */}
         <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
           <h2 className="text-xl font-bold text-gray-800 mb-4">Exam</h2>
           <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer" onClick={toggleExamDropdown}>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"></div>
              <div><h3 className="text-sm text-gray-800 font-medium">Manage Exams</h3></div>
            </div>
            <FaCaretDown className={`text-blue-500 mr-2 transition-transform duration-200 ${isExamDropdownOpen ? 'transform rotate-180' : ''}`} />
          </div>
          {isExamDropdownOpen && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100" onClick={toggleFluencyTest}>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"><span className="text-blue-800 font-semibold">1</span></div>
                  <div><h3 className="text-sm text-gray-800">Fluency Test</h3></div>
                </div>
                <FaCaretDown className={`text-blue-500 transition-transform duration-200 ${isFluencyTestOpen ? 'transform rotate-180' : ''}`} />
              </div>
              {isFluencyTestOpen && <div className="mt-4 p-4 border-t border-gray-200"><CompanyEnglishFluencyTest courseId={courseId} /></div>}
              <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 mt-2" onClick={() => navigate(`/exams/${courseId}`)}>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"><span className="text-blue-800 font-semibold">2</span></div>
                  <div><h3 className="text-sm text-gray-800">MCQ / Essay Exams</h3></div>
                </div>
                <FaCaretDown className="text-blue-500" />
              </div>
            </div>
          )}
        </section>
        <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Claim Your Course Certificate</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"></div>
              <div><h3 className="text-sm text-gray-800 font-medium">Certificate</h3><p className="text-xs text-gray-500">Details about certificate generation</p></div>
            </div>
            <FaCaretDown className="text-blue-500 mr-2" />
          </div>
        </section>
        <section className="mb-10 bg-white p-8 rounded-lg shadow-md relative">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Job Application Insights (For Students)</h2>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4"><FaUpload className="text-blue-800 text-xl" /></div>
              <div><h3 className="text-sm text-gray-800 font-medium">CV Upload & Matching (Student View Preview)</h3></div>
            </div>
            <FaCaretDown className="text-blue-500 mr-2" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CompanyModulePage;