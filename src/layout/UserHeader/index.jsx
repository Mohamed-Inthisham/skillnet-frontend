import React from "react";
import logo from "../../assets/Logo.webp";
import userImage from "../../assets/userImage.webp";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const UserHeader = () => {
  // Get access token from local storage
  const accessToken = localStorage.getItem("accessToken");
  let profileImageUrl = userImage; // Default user image

  if (accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken);
      // Construct absolute image URL pointing to your backend (port 5001)
      profileImageUrl = `http://localhost:5001${decodedToken.profile_image_url}` || userImage; // Use JWT image if available, otherwise default
      // For debugging - keep this line in development, remove in production
      console.log("Decoded JWT in UserHeader:", decodedToken);
    } catch (error) {
      console.error("Error decoding JWT in UserHeader:", error);
      // If decoding fails, fall back to default image
      profileImageUrl = userImage;
    }
  }

  return (
    <header className="flex items-center justify-between px-8 py-2 border-b-2 border-gray-200 ml-[100px] mr-[100px] ">
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

      {/* User Icon - Displaying User Image */}
      <div>
        <button className="rounded-full hover:cursor-pointer">
          <img
            src={profileImageUrl} // Use profileImageUrl here - absolute URL
            alt="User Profile"
            className="rounded-full h-8 w-8 object-cover" // Tailwind classes for styling
          />
        </button>
      </div>
    </header>
  );
};

export default UserHeader;