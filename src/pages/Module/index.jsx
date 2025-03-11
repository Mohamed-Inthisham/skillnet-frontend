import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import CourseCard from "../../components/Home/CourseCard";
import { FaLock } from "react-icons/fa";
import javaModule from "../../assets/JavaModule.webp";
import sysco from "../../assets/sysco.webp";
const ModulePage = () => {

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-[Poppins]">
        <UserHeader />
    
            <main className="flex-1 py-10 px-20 bg-gray-100">
            {/* Introduction Section */}
                <section className="mb-10 bg-white p-8 rounded-lg shadow-md flex items-center">
                    <img src={javaModule} alt="Introduction" className="w-78 h-48 rounded-lg mr-8" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-20 ">Introduction to JAVA</h1>
                        <div className="mb-10 flex items-center">
                            <img src={sysco} alt="Introduction" className="w-8 h-8 rounded-lg mr-4" />
                            <h1 className="text-sm text-gray-800 mb-1">Sysco Labs</h1>
                        </div>
                        
                    </div>
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
                <section className="mb-10 bg-white p-8 rounded-lg shadow-md items-center">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Introduction</h2>
                        <p className="text-gray-600">
                        Kevin Harris took at work, construction capability of k. Job do availored proper headquarters at Boston or Golden League sillips, for some part from wherever job is installed as remediated submicro telefonia will of aiding the KG commode onepaying; that code issue order is reprehended in real-gram well; case citizen offence on legal route position. Excepteur sint occasional duplicate inter per district, such in major call office disassum merit merits of out take-nim.
                        </p>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Lessons</h2>
                    <div className="">
                        {[
                        "Java Syntax",
                        "Java Output / Print",
                        "Java Comments",
                        "Java Variables",
                        "Java Data Types",
                        "Java Type Casting",
                        "Java Operators",
                        "Java Strings",
                        "Java If ... Else",
                        "June Switch"
                        ].map((lesson, index) => (
                            <div key={index} className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm w-auto h-22">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-blue-800 font-semibold">{index+1}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-800">{lesson}</h3>
                                    </div>
                                </div>
                                <span
                                    className={`font-semibold text-sm px-3 py-1 rounded ${
                                    index === 0 ? "bg-green-600 text-white" : "text-blue-400"
                                    }`}>
                                    {index === 0 ? "Done" : "Incomplete"}
                                </span>
                            </div>
                        ))}
                    </div>
                    {/* </section> */}
            
                    {/* Exam Section */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Exam</h2>
                        <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-blue-800 font-semibold"></span>
                                    </div>
                                    <div>
                                        <h3 className="text-sm text-gray-800">Start here</h3>
                                        {/* <p className="text-sm text-gray-600">Learn the basics of {lesson}</p> */}
                                    </div>
                                </div>
                                <span><FaLock className="text-blue-500 mr-10" /></span>
                        </div>
                    </div>
            
                    {/* Certificate Section */}
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
            
                    {/* Job Application Section */}
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 mt-10">Apply For Job</h2>
                        <div className="flex items-center justify-between p-4 mb-4 bg-gray-50 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                        <span className="text-blue-800 font-semibold"></span>
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

export default ModulePage;
