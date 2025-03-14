// ProgramsPage.js
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
    const [enrollSuccessMessage, setEnrollSuccessMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const storedCourses = localStorage.getItem("enrolledCourses");
            let savedCourses = [];
            try {
                savedCourses = storedCourses ? JSON.parse(storedCourses) : [];
                setEnrolledCourses(savedCourses);
                console.log("useEffect: enrolledCourses loaded from localStorage:", savedCourses);
                console.log("Structure of savedCourses from localStorage:", savedCourses); // LOG 1: Log savedCourses structure
            } catch (parseError) {
                console.error("Error parsing enrolledCourses from localStorage:", parseError);
                setEnrolledCourses([]);
            }

            try {
                console.log("Fetching courses from API...");
                const response = await axios.get("http://localhost:5001/courses");
                console.log("API Response:", response);
                console.log("API Response Data:", response.data);
                console.log("Structure of first apiCourse:", response.data[0]); // LOG 2: Log structure of first apiCourse

                // Correctly enhance apiCourses with isEnrolled status
                const enhancedApiCourses = response.data.map(course => {
                    const isCourseEnrolledBool = savedCourses.some(ec => {
                        console.log(`Comparing apiCourse._id: ${course._id}, enrolledCourse._id: ${ec._id}`); // LOG 3: Log _id comparison
                        return ec._id === course._id;
                    });
                    return {
                        ...course,
                        isEnrolled: isCourseEnrolledBool
                    };
                });
                setApiCourses(enhancedApiCourses);
                console.log("apiCourses state updated:", enhancedApiCourses);


            } catch (err) {
                setError(err);
                console.error("Error fetching courses:", err);
            } finally {
                setLoading(false);
                console.log("useEffect: Loading set to false");
            }
        };

        fetchData();

    }, [activeTab]);

    const enrollCourse = async (course) => {
        const token = localStorage.getItem("accessToken");
        const decodedJWTString = localStorage.getItem('decodedJWT');
        const decodedJWT = decodedJWTString ? JSON.parse(decodedJWTString) : null;
        const studentEmail = decodedJWT?.sub;

        if (!studentEmail) {
            console.error("Student email not found in JWT.");
            alert("Enrollment failed. Could not retrieve user email.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5001/courses/${course._id}/enroll`,
                {
                    course_id: course._id,
                    student_email: studentEmail
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
            console.log("Enrollment Response:", response);
            console.log("Enrollment Status Code:", response.status);
            if (response.status === 200 || response.status === 201) {
                if (!enrolledCourses.some((c) => c._id === course._id)) {
                    const updatedEnrolledCourses = [...enrolledCourses, course];
                    setEnrolledCourses(updatedEnrolledCourses);
                    localStorage.setItem("enrolledCourses", JSON.stringify(updatedEnrolledCourses));

                    // Update apiCourses to mark the course as enrolled
                    const updatedApiCourses = apiCourses.map(c =>
                        c._id === course._id ? { ...c, isEnrolled: true } : c
                    );
                    setApiCourses(updatedApiCourses);


                    setEnrollSuccessMessage(`Congratulations! You have successfully enrolled in the course: ${course.course_name}`);
                    setTimeout(() => setEnrollSuccessMessage(""), 3000);
                    console.log("enrolledCourses state after enrollment:", enrolledCourses);
                }
            } else {
                console.error("Enrollment failed:", response.status, response.data);
                alert("Enrollment failed. Please try again.");
            }
        } catch (error) {
            console.error("Error enrolling in course:", error);
            if (error.response && error.response.status === 400 && error.response.data && error.response.data.msg === "Already enrolled in this course") {
                alert("You are already enrolled in this course.");
            } else {
                alert("Enrollment failed. Please try again.");
            }
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

             {enrollSuccessMessage && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-md z-50" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> {enrollSuccessMessage}</span>
                </div>
            )}

            {activeTab === "allPrograms" && !loading && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto">
                    {apiCourses.map((course, index) => (
                        <CourseCard
                            key={index}
                            {...course}
                            isEnrolled={course.isEnrolled} // Now correctly set from enhanced apiCourses
                            course_image={`http://localhost:5001${course.course_image}` || courseImage}
                            company_image={`http://localhost:5001${course.company_image}` || courseImage}
                            onEnroll={() => enrollCourse(course)}
                        />
                    ))}
                </div>
            )}

            {activeTab === "myLearnings" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto">
                    {enrolledCourses.length > 0 ? (
                        enrolledCourses.map((course, index) => (
                            <div key={index}>
                                <CourseCard
                                    key={index}
                                    {...course}
                                    isEnrolled={true}
                                    isMyLearningsPage={true}
                                    course_image={`http://localhost:5001${course.course_image}` || courseImage}
                                    company_image={`http://localhost:5001${course.company_image}` || courseImage}
                                    onViewCourse={() => navigate(`/module`)}
                                />
                            </div>
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