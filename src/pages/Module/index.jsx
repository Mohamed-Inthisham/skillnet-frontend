// Module.js (formerly ModulePage.js)
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import ModuleContentEdiPage from "../../components/ModuleContentEdit"; // Note: Check if this is used
import { FaLock } from "react-icons/fa";
import javaModule from "../../assets/JavaModule.webp";
import sysco from "../../assets/sysco.webp";
import axios from "axios";

const Module = () => {
    const [course, setCourse] = useState(null);
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { courseId } = useParams(); // Get courseId from route params - This is KEY
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseData = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("Module.js: Fetching course data for courseId:", courseId); // Debugging log - Verify courseId here
                const courseResponse = await axios.get(`http://localhost:5001/courses/${courseId}`);
                setCourse(courseResponse.data);

                const contentsResponse = await axios.get(`http://localhost:5001/courses/${courseId}/contents`);
                setContents(contentsResponse.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.error("Module.js: Error fetching course data:", err);
            }
        };

        if (courseId) { // Only fetch if courseId is available
            fetchCourseData();
        } else {
            console.warn("Module.js: courseId is undefined. Course data will not be fetched.");
            setLoading(false); // Stop loading if no courseId
            setError(new Error("Course ID is missing.")); // Set an error state
        }
    }, [courseId]); // Dependency array includes courseId


    const handleClick = (event, contentId) => {
        event.preventDefault();
        console.log("Module.js: Lesson clicked:", contentId);
        navigate(`/module-content/${contentId}`, { state: { contents, courseId } });
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
                {/* ... (rest of Module.js JSX - same as before) */}
                <section className="mb-10 bg-white p-8 rounded-lg shadow-md flex items-center">
                    <img
                        src={`http://localhost:5001${course.course_image}` || javaModule}
                        alt={course.course_name}
                        className="w-78 h-48 rounded-lg mr-8"
                    />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-20">{course.course_name || "Course Name Missing"}</h1>
                        <div className="mb-10 flex items-center">
                            <img
                                src={`http://localhost:5001${course.company_image}` || sysco}
                                alt={course.company_name}
                                className="w-8 h-8 rounded-lg mr-4"
                            />
                            <h1 className="text-sm text-gray-800 mb-1">{course.company_name || "Company Name Missing"}</h1>
                        </div>
                    </div>
                    <div className="space-y-1 mb-25 ml-20 mt-10">
                        <p className="text-sm text-gray-600 flex items-center">
                            <span className="w-2 h-2 bg-gray-600 rounded-full mr-2"></span>
                            {contents.length} Lessons
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

                <section className="mb-10 bg-white p-8 rounded-lg shadow-md items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Introduction</h2>
                        <p className="text-gray-600">
                            {course.introduction || "Course introduction is missing."}
                        </p>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Lessons</h2>
                    <div className="">
                        {contents.map((content, index) => (
                            <div
                                onClick={(e) => handleClick(e, content._id)}
                                className="block mb-4 cursor-pointer"
                                key={content._id}
                            >
                                <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm w-auto h-22">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-blue-800 font-semibold">{index + 1}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-sm text-gray-800">{content.lesson_name}</h3>
                                        </div>
                                    </div>
                                    <span
                                        className={`font-semibold text-sm px-3 py-1 rounded ${index === 0 ? "bg-green-600 text-white" : "text-blue-400"
                                            }`}
                                    >
                                        {index === 0 ? "Done" : "Incomplete"}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Exam</h2>
                        <div
                            onClick={() => navigate('/ExamRules')} // Add onClick to navigate to /ExamRules
                            className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer" // Added cursor-pointer for better UX
                        >
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
                            onClick={() => navigate('/JobApplicationPortal')} // Add onClick to navigate to /JobApplicationPortal
                            className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer" // Added cursor-pointer for better UX
                        >
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                    <FaLock className="text-blue-800 text-xl" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-800">CV</h3>
                                </div>
                            </div>
                            <span><FaLock className="text-blue-500 mr-10" /></span>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Module;