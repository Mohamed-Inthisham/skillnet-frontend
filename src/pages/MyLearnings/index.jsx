import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import CourseCard from "../../components/Home/CourseCard";
import courseImage from "../../assets/ai.webp";

const ProgramsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("myLearnings");

  const courses = Array(4).fill({
    title: "Artificial Intelligence Industrial Control Systems Security",
    provider: "Sysco Labs",
    date: "January 6, 2025",
    image: courseImage,
  });

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-[Poppins]">
      <UserHeader />

      <div className="flex justify-center mt-6 border-b border-gray-300">
        <button
          className={`px-6 py-2 text-lg font-medium cursor-pointer ${
            activeTab === "allPrograms"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
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
            activeTab === "myLearnings"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => {
            setActiveTab("myLearnings");
            navigate("/MyLearnings");
          }}
        >
          MY LEARNINGS
        </button>
      </div>

      {activeTab === "myLearnings" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-10 max-w-6xl mx-auto">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} status="enrolled" />
          ))}
        </div>
      )}

      <Footer bgColor="bg-black" textColor="text-white" />
    </div>
  );
};

export default ProgramsPage;
