import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import CourseCard from "../../components/Home/CourseCard";
import courseImage from "../../assets/ai.webp";
import axios from "axios";

const ProgramsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("allPrograms");
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [apiCourses, setApiCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("Fetching courses from API...");
                const response = await axios.get("http://localhost:5001/courses");
                console.log("API Response:", response);
                console.log("API Response Data:", response.data);
                setApiCourses(response.data);
                console.log("apiCourses state updated:", response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.error("Error fetching courses:", err);
            }
        };

        fetchCourses();

        const storedCourses = localStorage.getItem("enrolledCourses");
        try {
            const savedCourses = storedCourses ? JSON.parse(storedCourses) : [];
            setEnrolledCourses(savedCourses);
        } catch (parseError) {
            console.error("Error parsing enrolledCourses from localStorage:", parseError);
            setEnrolledCourses([]);
        }
    }, [activeTab]);

    const enrollCourse = (course) => {
        if (!enrolledCourses.some((c) => c.course_name === course.course_name)) {
            const updatedCourses = [...enrolledCourses, course];
            setEnrolledCourses(updatedCourses);
            localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading courses...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center min-h-screen">Error fetching courses: {error.message}</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-[Poppins]">
            <UserHeader />

            <div className="flex justify-center mt-6 border-b border-gray-300">
                <button
                    className={`px-6 py-2 text-lg font-medium cursor-pointer ${activeTab === "allPrograms" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                    onClick={() => {
                        setActiveTab("allPrograms");
                        navigate("/Programs");
                    }}
                >
                    ALL PROGRAMS
                </button>
                <button
                    className={`px-6 py-2 text-lg font-medium ml-6 cursor-pointer ${activeTab === "myLearnings" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
                    onClick={() => {
                        setActiveTab("myLearnings");
                        navigate("/MyLearnings");
                    }}
                >
                    MY LEARNINGS
                </button>
            </div>

            {activeTab === "allPrograms" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto">
                    {apiCourses.map((course, index) => (
                        <CourseCard
                            key={index}
                            course_name={course.course_name}
                            company_name={course.company_name}
                            // Construct absolute URLs for images here in ProgramsPage
                            course_image={`http://localhost:5001${course.course_image}` || courseImage}
                            company_image={`http://localhost:5001${course.company_image}` || courseImage}
                            level={course.level}
                            uploaded_date={course.uploaded_date}
                            onEnroll={() => enrollCourse(course)}
                        />
                    ))}
                </div>
            )}

            {activeTab === "myLearnings" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto">
                    {enrolledCourses.length > 0 ? (
                        enrolledCourses.map((course, index) => (
                            <CourseCard
                                key={index}
                                course_name={course.course_name}
                                company_name={course.company_name}
                                // Construct absolute URLs for enrolled courses too
                                course_image={`http://localhost:5001${course.course_image}` || courseImage}
                                company_image={`http://localhost:5001${course.company_image}` || courseImage}
                                level={course.level}
                                uploaded_date={course.uploaded_date}
                                status="enrolled"
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center w-full">No courses enrolled yet.</p>
                    )}
                </div>
            )}

            <Footer bgColor="bg-black" textColor="text-white" />
        </div>
    );
};

export default ProgramsPage;