import React from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import logo from "../../assets/Logo.webp";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-white shadow-md p-4">
      {/* Logo */}
      <Link to="/Home">
          <img src={logo} alt="SkillNet Logo" className="h-8" />
      </Link>
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-1/3">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none ml-2 w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
          Contact Us
        </button> */}
        <Link to="/ContactUs">
        <Button text="Contact Us" variant="outline" />
      </Link>
        <FaUserCircle className="text-gray-600 text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
