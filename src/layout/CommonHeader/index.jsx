import React from "react";
import Button from "../../components/Button";
import logo from "../../assets/Logo.webp";

const CommonHeader = () => {
  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b-2 border-gray-200 px-10 mr-[100px] ml-[100px] mb-3 font-[Poppins]">
      <h1 className="text-xl font-bold">
        <img src={logo} alt="SkillNet Logo" className="h-8" />
      </h1>
      <Button text="Contact Us" variant="outline" />
    </nav>
  );
};

export default CommonHeader;
