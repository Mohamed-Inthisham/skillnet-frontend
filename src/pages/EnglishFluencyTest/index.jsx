import React from "react";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import Button from "../../components/Button";

const EnglishFluencyTest = () => {
  return (
    <div className="flex flex-col min-h-screen font-[Poppins]">
      <UserHeader />
      <div className="flex-grow flex flex-col items-center mt-16 p-6">
        <h1 className="text-xl font-medium mb-16">English Fluency Test</h1>
        <div className="w-full max-w-2xl h-[300px] p-6 border border-blue-300 rounded-lg shadow-lg text-center">
          <p className="text-gray-600 mt-20">
            Tell us about yourself and how you feel about this course.
          </p>
        </div>
        <div className="flex mt-4 space-x-[450px]">
          <button className="flex items-center bg-blue-100 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-200">
            <span className="mr-2">🎤</span>
            <span>00:27</span>
          </button>
          <Button text="Submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" />
        </div>
      </div>
      <Footer bgColor="bg-black" textColor="text-white" />
    </div>
  );
};

export default EnglishFluencyTest;