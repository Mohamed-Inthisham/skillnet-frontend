// MyLearningsPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import CourseCard from "../../components/Home/CourseCard";
import courseImage from "../../assets/ai.webp";
import axios from "axios";

const MyLearningsPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("myLearnings");
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("accessToken");
            console.log("Token being used for fetching enrolled courses:", token);

            if (!token) {
                console.error("Auth token is missing from localStorage.");
                setError({ message: "Auth token is missing." });
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get("http://localhost:5001/me/enrolled-courses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Enrolled courses response:", response.data);
                setEnrolledCourses(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
                console.error("Error fetching enrolled courses:", err);
                if (err.response) {
                    console.error("Response Data:", err.response.data);
                    console.error("Response Status:", err.response.status);
                    console.error("Response Headers:", err.response.headers);
                } else if (err.request) {
                    console.error("Request:", err.request);
                } else {
                    console.error("Error Message:", err.message);
                }
            }
        };
        fetchEnrolledCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        navigate(`/module`);
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading enrolled courses...</div>;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Error fetching enrolled courses: {error.message}
                {error.response && (
                    <div>
                        <p>Status Code: {error.response.status}</p>
                        <p>Response Data: {JSON.stringify(error.response.data)}</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-[Poppins]">
            <UserHeader />

            <div className="flex justify-center mt-6 border-b border-gray-300">
                <button
                    className={`px-6 py-2 text-lg font-medium cursor-pointer ${
                        activeTab === "allPrograms" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                    }`}
                    onClick={() => {
                        setActiveTab("allPrograms");
                        navigate("/Programs");
                    }}
                >
                    ALL PROGRAMS
                </button>
                <button
                    className={`px-6 py-2 text-lg font-medium ml-6 cursor-pointer ${
                        activeTab === "myLearnings" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
                    }`}
                    onClick={() => {
                        setActiveTab("myLearnings");
                        navigate("/MyLearnings");
                    }}
                >
                    MY LEARNINGS
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto cursor-pointer">
                {enrolledCourses.length > 0 ? (
                    enrolledCourses.map((course, index) => (
                        <div key={index}>
                            <CourseCard
                                key={index}
                                {...course}
                                isEnrolled={true}
                                isMyLearningsPage={true} // Set to true for MyLearningsPage
                                course_image={`http://localhost:5001${course.course_image}` || courseImage}
                                company_image={`http://localhost:5001${course.company_image}` || courseImage}
                                onViewCourse={() => handleCourseClick(course._id)}
                            />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center w-full">No courses enrolled yet.</p>
                )}
            </div>

            <Footer bgColor="bg-black" textColor="text-white" />
        </div>
    );
};

export default MyLearningsPage;