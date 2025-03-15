// ProgramsPage.js
import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
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

    // Use useCallback to memoize fetchData function - prevent unnecessary re-creation
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("accessToken");

        try {
            console.log(`useEffect triggered for activeTab: ${activeTab}`);

            // 1. Fetch user-specific enrolled courses FIRST and wait for it to complete
            console.log("Fetching user-specific enrolled courses FIRST from API...");
            const enrolledResponse = await axios.get("http://localhost:5001/me/enrolled-courses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("User-specific enrolled courses API Response:", enrolledResponse);
            const fetchedEnrolledCourses = enrolledResponse.data; // Store fetched enrolled courses in a variable
            setEnrolledCourses(fetchedEnrolledCourses); // Update enrolledCourses state
            console.log("enrolledCourses state updated from API:", fetchedEnrolledCourses);


            // 2. Then, fetch all courses and enhance with isEnrolled status
            console.log("Fetching all courses from API...");
            const coursesResponse = await axios.get("http://localhost:5001/courses");
            console.log("All courses API Response:", coursesResponse);
            console.log("All courses API Response Data:", coursesResponse.data);

            const enhancedApiCourses = coursesResponse.data.map(course => ({
                ...course,
                isEnrolled: fetchedEnrolledCourses.some(ec => ec._id === course._id) // Use the *fetchedEnrolledCourses variable*
            }));
            setApiCourses(enhancedApiCourses);
            console.log("apiCourses state updated with isEnrolled:", enhancedApiCourses);


        } catch (err) {
            setError(err);
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
            console.log("useEffect: Loading set to false");
        }
    }, [activeTab]); // fetchData is dependent on activeTab

    useEffect(() => {
        fetchData(); // Call the memoized fetchData function
    }, [activeTab, fetchData]); // useEffect dependency now includes fetchData (memoized) and activeTab


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
                const updatedEnrolledCourses = [...enrolledCourses, course];
                setEnrolledCourses(updatedEnrolledCourses);

                const updatedApiCourses = apiCourses.map(c =>
                    c._id === course._id ? { ...c, isEnrolled: true } : c
                );
                setApiCourses(updatedApiCourses);


                setEnrollSuccessMessage(`Congratulations! You have successfully enrolled in the course: ${course.course_name}`);
                setTimeout(() => setEnrollSuccessMessage(""), 3000);
                console.log("enrolledCourses state after enrollment:", updatedEnrolledCourses);

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

    const isCourseEnrolled = (courseId) => {
        return enrolledCourses.some(enrolledCourse => enrolledCourse._id === courseId);
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
                            isEnrolled={course.isEnrolled}
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
                                    onViewCourse={() => navigate(`/module/${course._id}`)}
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