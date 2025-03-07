import React from "react";
import AuthCard from "../../components/AuthCard";
import logo from "../../assets/Logo.webp";
import graduationImg from "../../assets/graduation.webp"; 
import cornerShapeImage from "../../assets/cornerShape.webp";

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
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src={cornerShapeImage}
          style={{ width: "100%", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <AuthCard />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
