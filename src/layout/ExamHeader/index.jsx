import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/Logo.webp";
import userImage from "../../assets/userImage.webp";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const ExamHeader = () => {
  // Get access token from local storage
  const accessToken = localStorage.getItem("accessToken");
  const [profileImageUrl, setProfileImageUrl] = useState(userImage);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const dropdownRef = useRef(null); // Ref for click outside dropdown
  const navigate = useNavigate(); // Hook for redirection

  useEffect(() => {
    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken);
        // Construct absolute image URL pointing to your backend (port 5001)
        setProfileImageUrl(`http://localhost:5001${decodedToken.profile_image_url}` || userImage);
        // For debugging - keep this line in development, remove in production
        console.log("Decoded JWT in UserHeader:", decodedToken);
      } catch (error) {
        console.error("Error decoding JWT in UserHeader:", error);
        setProfileImageUrl(userImage);
      }
    }
  }, [accessToken]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken"); // Clear access token on logout
    navigate("/login"); // Redirect to login page
    setIsDropdownOpen(false); // Close dropdown
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <header className="flex items-center justify-between px-8 py-2 border-b-2 border-gray-200 ml-[100px] mr-[100px] font-[Poppins]">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/Home">
          <img src={logo} alt="SkillNet Logo" className="h-8 cursor-pointer" />
        </Link>
      </div>

      

      {/* User Icon - Displaying User Image with Dropdown */}
      <div className="relative"> {/* Relative wrapper for dropdown */}
        <button
          className="rounded-full hover:cursor-pointer focus:outline-none"
          onClick={toggleDropdown}
          aria-haspopup="true"
          aria-expanded={isDropdownOpen}
        >
          <img
            src={profileImageUrl} // Use profileImageUrl here - absolute URL
            alt="User Profile"
            className="rounded-full h-8 w-8 object-cover"
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10 border border-gray-200">
            <Link to="/user-account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"> {/* Link to User Account page - adjust route if needed */}
              View Account
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ExamHeader;