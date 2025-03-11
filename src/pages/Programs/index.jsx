import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import CourseCard from "../../components/Home/CourseCard";
import courseImage from "../../assets/ai.webp";

const ProgramsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("allPrograms");
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const courses = [
    {
      title: "Artificial Intelligence Industrial Control Systems Security",
      provider: "Sysco Labs",
      date: "January 6, 2025",
      image: courseImage,
    },
    {
      title: "Cybersecurity for Industrial Control Systems",
      provider: "CyberSec Academy",
      date: "February 15, 2025",
      image: courseImage,
    },
    {
      title: "Machine Learning for Business",
      provider: "Tech Innovations",
      date: "March 10, 2025",
      image: courseImage,
    },
    {
      title: "Cloud Security Fundamentals",
      provider: "AWS Training",
      date: "April 5, 2025",
      image: courseImage,
    },
    {
      title: "Blockchain and Cryptocurrency",
      provider: "Crypto Institute",
      date: "May 20, 2025",
      image: courseImage,
    },
    {
      title: "Full Stack Web Development",
      provider: "Code Academy",
      date: "June 12, 2025",
      image: courseImage,
    },
    {
      title: "Data Science with Python",
      provider: "DataCamp",
      date: "July 8, 2025",
      image: courseImage,
    },
    {
      title: "Ethical Hacking and Penetration Testing",
      provider: "Hackers Academy",
      date: "August 18, 2025",
      image: courseImage,
    },
    {
      title: "DevOps and Cloud Engineering",
      provider: "Google Cloud",
      date: "September 25, 2025",
      image: courseImage,
    },
    {
      title: "UI/UX Design for Beginners",
      provider: "Design School",
      date: "October 14, 2025",
      image: courseImage,
    },
    {
      title: "AI-powered Robotics",
      provider: "Robotics Institute",
      date: "November 30, 2025",
      image: courseImage,
    },
    {
      title: "Big Data Analytics",
      provider: "Harvard Online",
      date: "December 22, 2025",
      image: courseImage,
    },
  ];

  useEffect(() => {
    const storedCourses = localStorage.getItem("enrolledCourses");
    try {
      const savedCourses = storedCourses ? JSON.parse(storedCourses) : [];
      setEnrolledCourses(savedCourses);
    } catch (error) {
      console.error("Error parsing enrolledCourses from localStorage:", error);
      setEnrolledCourses([]);
    }
  }, [activeTab]);

  const enrollCourse = (course) => {
    if (!enrolledCourses.some((c) => c.title === course.title)) {
      const updatedCourses = [...enrolledCourses, course];
      setEnrolledCourses(updatedCourses);
      localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
    }
  };

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

      {/* Display all courses */}
      {activeTab === "allPrograms" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard 
              key={index} 
              {...course} 
              onEnroll={() => enrollCourse(course)} 
            />
          ))}
        </div>
      )}

      {/* Display enrolled courses */}
      {activeTab === "myLearnings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course, index) => (
              <CourseCard key={index} {...course} status="enrolled" />
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
