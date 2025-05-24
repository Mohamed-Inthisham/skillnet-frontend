import React, { useState, useRef, useEffect } from "react";
import logo from "../../assets/Logo.webp";
import userImageDefault from "../../assets/userImage.webp"; // Renamed for clarity
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ExamHeader = () => {
  const accessToken = localStorage.getItem("accessToken");
  const storedUserId = localStorage.getItem("userId"); // MongoDB _id

  const [profileImageUrl, setProfileImageUrl] = useState(userImageDefault);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ExamHeader: Stored MongoDB User ID from localStorage:", storedUserId);

    if (accessToken) {
      try {
        const storedImgUrlPath = localStorage.getItem("profileImageUrlPath");
        
        if (storedImgUrlPath && storedImgUrlPath !== "null" && storedImgUrlPath !== "undefined") {
          setProfileImageUrl(`http://localhost:5001${storedImgUrlPath}`);
          console.log("ExamHeader: Profile image set from localStorage path:", storedImgUrlPath);
        } else {
          const decodedToken = jwtDecode(accessToken);
          console.log("Decoded JWT in ExamHeader:", decodedToken);
          if (decodedToken.profile_image_url) {
            setProfileImageUrl(`http://localhost:5001${decodedToken.profile_image_url}`);
            console.log("ExamHeader: Profile image set from JWT claim:", decodedToken.profile_image_url);
          } else {
            setProfileImageUrl(userImageDefault);
            console.log("ExamHeader: No profile image in localStorage or JWT, using default.");
          }
        }
      } catch (error) {
        console.error("Error processing token or setting profile image in ExamHeader:", error);
        setProfileImageUrl(userImageDefault);
      }
    } else {
      setProfileImageUrl(userImageDefault);
      console.log("ExamHeader: No access token found, using default profile image.");
    }
  }, [accessToken, storedUserId]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("username");
    localStorage.removeItem("profileImageUrlPath");
    localStorage.removeItem("companyName");

    console.log("ExamHeader: User logged out, localStorage cleared.");
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

  const userAccountLink = accessToken && storedUserId ? `/user-account/${storedUserId}` : "/user-account";

  return (
    <header className="flex items-center justify-between px-8 py-2 border-b-2 border-gray-200 ml-[100px] mr-[100px] font-[Poppins]">
      <div className="flex items-center">
        {/* Link might go to a student dashboard or home depending on exam context */}
        <Link to="/Home"> 
          <img src={logo} alt="SkillNet Logo" className="h-8 cursor-pointer" />
        </Link>
      </div>

      {/* ExamHeader typically has minimal or no central navigation */}
      {/* <nav>...</nav> */}

      <div className="relative">
        {accessToken && (
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
                onError={(e) => { e.target.onerror = null; e.target.src = userImageDefault; }}
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

export default ExamHeader;