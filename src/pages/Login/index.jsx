import React from "react";
import AuthCard from "../../components/AuthCard";
import logo from "../../assets/Logo.webp";
import graduationImg from "../../assets/graduation.webp"; // Your left side image
import CommonHeader from "../../layout/CommonHeader";

const LoginPage = () => {
  return (
    <div className="flex h-screen relative">
      {/* Top-left corner icon */}
      <div className="absolute top-4 left-4 flex items-center space-x-2 ml-[100px] p-4">
        <img src={logo} className="h-8" />
      </div>


      {/* Left Side (Image) */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <img src={graduationImg} alt="Graduation" className="max-w-md" />
      </div>

      {/* Right Side (Login Form) */}
      <div className="w-1/2 flex justify-center items-center bg-neutral-200">
        <AuthCard />
      </div>
    </div>
  );
};

export default LoginPage;
