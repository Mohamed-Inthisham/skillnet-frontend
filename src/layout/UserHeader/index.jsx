import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/Logo.webp";
import userImageDefault from "../../assets/userImage.webp"; // Renamed for clarity
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserHeader = () => {
  const accessToken = localStorage.getItem("accessToken");
  const storedUserId = localStorage.getItem("userId"); // MongoDB _id

  const [profileImageUrl, setProfileImageUrl] = useState(userImageDefault);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("UserHeader: Stored MongoDB User ID from localStorage:", storedUserId);

    if (accessToken) {
      try {
        // Prefer profile_image_url from localStorage if set during login
        const storedImgUrlPath = localStorage.getItem("profileImageUrlPath"); // Assuming path like "/store/images/..."
        
        if (storedImgUrlPath && storedImgUrlPath !== "null" && storedImgUrlPath !== "undefined") {
          setProfileImageUrl(`http://localhost:5001${storedImgUrlPath}`);
          console.log("UserHeader: Profile image set from localStorage path:", storedImgUrlPath);
        } else {
          // Fallback to JWT claim if localStorage item is not found or invalid
          const decodedToken = jwtDecode(accessToken);
          console.log("Decoded JWT in UserHeader:", decodedToken);
          if (decodedToken.profile_image_url) {
            setProfileImageUrl(`http://localhost:5001${decodedToken.profile_image_url}`);
            console.log("UserHeader: Profile image set from JWT claim:", decodedToken.profile_image_url);
          } else {
            setProfileImageUrl(userImageDefault);
            console.log("UserHeader: No profile image in localStorage or JWT, using default.");
          }
        }
      } catch (error) {
        console.error("Error processing token or setting profile image in UserHeader:", error);
        setProfileImageUrl(userImageDefault);
      }
    } else {
      // No access token, ensure default image and clear any user-specific state if needed
      setProfileImageUrl(userImageDefault);
      console.log("UserHeader: No access token found, using default profile image.");
    }
  }, [accessToken, storedUserId]); // Re-run if accessToken or storedUserId changes (though storedUserId from localStorage won't trigger re-render directly)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear all user-specific items from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username"); // Display name
    localStorage.removeItem("profileImageUrlPath"); // The path to the image
    localStorage.removeItem("companyName"); // If applicable
    // Add any other items stored during login that need clearing

    console.log("UserHeader: User logged out, localStorage cleared.");
    navigate("/login");
    setIsDropdownOpen(false);
  };

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

  // Construct the user account link dynamically
  // Fallback to a generic '/user-account' if ID is somehow not available but user is logged in
  const userAccountLink = accessToken && storedUserId ? `/user-account/${storedUserId}` : "/user-account";

  return (
    <header className="flex items-center justify-between px-8 py-2 border-b-2 border-gray-200 ml-[100px] mr-[100px] font-[Poppins]">
      <div className="flex items-center">
        <Link to="/Home">
          <img src={logo} alt="SkillNet Logo" className="h-8 cursor-pointer" />
        </Link>
      </div>

      <nav className="flex space-x-20 text-gray-600 text-sm ml-[300px]">
        <Link to="/Home" className="hover:text-blue-500">
          Home
        </Link>
        <Link to="/Programs" className="hover:text-blue-500">
          Programs
        </Link>
        <Link to="/career-support" className="hover:text-blue-500">
          Career Support
        </Link>
        <Link to="/ContactUs" className="hover:text-blue-500">
          Contact Us
        </Link>
      </nav>

      <div className="relative">
        {accessToken && ( // Only show user icon and dropdown if logged in
          <>
            <button
              className="rounded-full hover:cursor-pointer focus:outline-none"
              onClick={toggleDropdown}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <img
                src={profileImageUrl}
                alt="User Profile"
                className="rounded-full h-8 w-8 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = userImageDefault; }} // Fallback if image fails to load
              />
            </button>

            {isDropdownOpen && (
              <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10 border border-gray-200">
                <Link to={userAccountLink} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
          </>
        )}
      </div>
    </header>
  );
};

export default UserHeader;