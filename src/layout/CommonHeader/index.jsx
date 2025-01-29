import React from "react";
import logo from "../../assets/Logo.webp";

const CommonHeader = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b-2 border-gray-200 px-10 mr-[100px] ml-[100px] mb-3 font-[Poppins]">
      <h1 className="text-xl font-bold">
        <img src={logo} alt="SkillNet Logo" className="h-8" />
      </h1>
      <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition">
        Contact Us
      </button>
    </nav>
  );
};

export default CommonHeader;
