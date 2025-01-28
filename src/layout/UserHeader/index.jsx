import React from "react";
import logo from "../../assets/Logo.png";

const UserHeader = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b-2 border-gray-200">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="SkillNet Logo" className="h-8" />
      </div>

      {/* Navigation */}
      <nav className="flex space-x-20 text-gray-600 text-sm">
        <a href="/" className="hover:text-blue-500">
          Home
        </a>
        <a href="/programs" className="hover:text-blue-500">
          Programs
        </a>
        <a href="/career-support" className="hover:text-blue-500">
          Career Support
        </a>
        <a href="/contact-us" className="hover:text-blue-500">
          Contact Us
        </a>
      </nav>

      {/* User Icon */}
      <div>
        <button className="rounded-full bg-gray-200 p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6.75a3 3 0 11-6 0 3 3 0 016 0zM4.5 20.25a8.25 8.25 0 0115 0"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default UserHeader;
