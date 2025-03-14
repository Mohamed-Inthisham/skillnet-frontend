import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import ModuleContentEdiPage from "../../components/ModuleContentEdit";
import { FaLock, FaCaretDown, FaSpinner } from "react-icons/fa";
import javaModule from "../../assets/JavaModule.webp"; // Placeholder, will be replaced with fetched image
import sysco from "../../assets/sysco.webp"; // Placeholder, will be replaced with fetched image
import axios from "axios";

const ModulePage = ({ lesson, index }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [matchedJDs, setMatchedJDs] = useState([]);
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { courseId } = useParams(); // Get courseId from route params
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseData = async () => {
            setLoading(true);
            setError(null);
            try {
                const courseResponse = await axios.get(`http://localhost:5001/courses/${courseId}`);
                setCourse(courseResponse.data);

                const contentsResponse = await axios.get(`http://localhost:5001/courses/${courseId}/contents`);
                setContents(contentsResponse.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.error("Error fetching course data:", err);
            }
        };

        fetchCourseData();
    }, [courseId]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsUploading(true);
            setUploadedFileName(file.name);

            setTimeout(() => {
                setIsUploading(false);
                setIsProcessing(true);

                setTimeout(() => {
                    setIsProcessing(false);
                    setMatchedJDs([
                        "Software Engineer at Sysco Labs",
                        "Data Scientist at Tech Corp",
                        "Machine Learning Engineer at AI Solutions",
                    ]);
                }, 5000);
            }, 3000);
        }
    };


    const handleClick = (event, lessonName) => {
        event.preventDefault();
        console.log("Lesson clicked:", lessonName); // Log lesson name instead of lesson object
        navigate('/ModuleContent', { state: { lessonName: lessonName } }); // Pass lesson name in state
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading course details...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen">Error fetching course details: {error.message}</div>;
    }

    if (!course) {
        return <div className="flex justify-center items-center min-h-screen">Course not found.</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-[Poppins]">
            <UserHeader />

            <main className="flex-1 py-10 px-20 bg-gray-100">

                <section className="mb-10 bg-white p-8 rounded-lg shadow-md flex items-center">
                    <img
                        src={`http://localhost:5001${course.course_image}` || javaModule} // Use fetched course image or placeholder
                        alt={course.course_name}
                        className="w-78 h-48 rounded-lg mr-8"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-20">{course.course_name || "Course Name Missing"}</h1>
                        <div className="mb-10 flex items-center">
                            <img
                                src={`http://localhost:5001${course.company_image}` || sysco} // Use fetched company image or placeholder
                                alt={course.company_name}
                                className="w-8 h-8 rounded-lg mr-4"
                            />
                            <h1 className="text-sm text-gray-800 mb-1">{course.company_name || "Company Name Missing"}</h1>
                        </div>
                    </div>
                    <div className="space-y-1 mb-25 ml-20 mt-10">
                        {/* You might need to fetch these counts from the backend if available */}
                        <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                            {contents.length} Lessons {/* Display actual lesson count */}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                            10 Quizzes {/* Placeholder - replace with actual data if available */}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                            1 Hr Exam {/* Placeholder - replace with actual data if available */}
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                            Professional Certificate {/* Placeholder - replace with actual data if available */}
                        </p>
                    </div>
                </section>

                <section className="mb-10 bg-white p-8 rounded-lg shadow-md items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Introduction</h2>
                        <p className="text-gray-600">
                            {course.introduction || "Course introduction is missing."} {/* Display fetched introduction */}
                        </p>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Lessons</h2>
                    <div className="">
                        {contents.map((content, index) => ( // Map over fetched contents
                            <div
                                onClick={(e) => handleClick(e, content.lesson_name)} // Pass lesson_name to handleClick
                                className="block mb-4 cursor-pointer"
                                key={content._id} // Use content _id as key
                            >
                                <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm w-auto h-22">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-blue-800 font-semibold">{index + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-800">{content.lesson_name}</h3> {/* Display lesson name */}
                                        </div>
                                    </div>
                                    <span
                                        className={`font-semibold text-sm px-3 py-1 rounded ${index === 0 ? "bg-green-600 text-white" : "text-blue-400"
                                            }`}
                                    >
                                        {index === 0 ? "Done" : "Incomplete"} {/* Placeholder - replace with actual status if available */}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Exam</h2>
                        <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    <span className="text-blue-800 font-semibold"></span>
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-800">Start here</h3>
                                </div>
                            </div>
                            <span><FaLock className="text-blue-500 mr-10" /></span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Claim Your Course Certificate</h2>
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
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Apply For Job</h2>
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

                                {/* Matched JDs Output */}
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
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ModulePage;