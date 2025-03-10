import React from "react";
import logo from "../../assets/Logo.webp";
import userImage from "../../assets/userImage.webp";
import { Link } from "react-router-dom";

const UserHeader = () => {
  return (
    <header className="flex items-center justify-between px-8 py-2 border-b-2 border-gray-200 ml-[100px] mr-[100px]">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/Home">
          <img src={logo} alt="SkillNet Logo" className="h-8 cursor-pointer" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-20 text-gray-600 text-sm ml-[300px]">
        <a href="/Home" className="hover:text-blue-500">
          Home
        </a>
        <a href="/Programs" className="hover:text-blue-500">
          Programs
        </a>
        <a href="/career-support" className="hover:text-blue-500">
          Career Support
        </a>
        <a href="/ContactUs" className="hover:text-blue-500">
          Contact Us
        </a>
      </nav>

      {/* User Icon */}
      <div>
        <button className="rounded-full hover:cursor-pointer">
          <img src={userImage} />
        </button>
      </div>
    </header>
  );
};

export default UserHeader;
