// import React from "react";
// import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";
// import { NavLink } from "react-router-dom";

// const CompanySidebar = () => {
//   return (
//     <div className="w-64 h-screen bg-gray-100 p-4 shadow-lg flex flex-col justify-between">
//       <div>
//         <nav className="mt-6">
//           <ul>
//             <li className="py-2 px-4 bg-white rounded-lg shadow-sm mb-2 cursor-pointer">
//               <NavLink to="/CompanyDashboard" className="block w-full">
//                 Dashboard
//               </NavLink>
//             </li>
//             <li className="py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer">
//               <NavLink to="/" className="block w-full">
//                 Courses
//               </NavLink>
//             </li>
//             <li className="py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer">
//               <NavLink to="/CompanyStudents" className="block w-full">
//                 Students
//               </NavLink>
//             </li>
//             <li className="py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer">
//               <NavLink to="/" className="block w-full">
//                 Recruitment
//               </NavLink>
//             </li>
//             <li className="py-2 px-4 hover:bg-gray-200 rounded-lg cursor-pointer">
//               <NavLink to="/" className="block w-full">
//                 Settings
//               </NavLink>
//             </li>
//           </ul>
//         </nav>
//       </div>

//       <div className="flex justify-center space-x-4 text-blue-500">
//         <FaFacebook size={20} />
//         <FaInstagram size={20} />
//         <FaTwitter size={20} />
//         <FaGoogle size={20} />
//       </div>
//     </div>
//   );
// };

// export default CompanySidebar;

// import React from "react";
// import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";
// import { FaX } from "react-icons/fa6";
// import { NavLink } from "react-router-dom";

// const CompanySidebar = () => {
//   const menuItems = [
//     { name: "Dashboard", path: "/CompanyDashboard" },
//     { name: "Courses", path: "/CompanyCourses" },
//     { name: "Students", path: "/CompanyStudents" },
//     { name: "Recruitment", path: "/CompanyRecruitment" },
//     { name: "Settings", path: "*" },
//   ];

//   return (
//     <div className="w-64 h-screen bg-gray-100 p-4 flex flex-col justify-between">
//       <nav>
//         <ul>
//           {menuItems.map((item) => (
//             <li key={item.name} className="mb-2">
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `block w-full py-2 px-4 rounded-lg cursor-pointer transition ${
//                     isActive ? "bg-white shadow-sm font-bold text-blue-500" : "hover:bg-gray-200"
//                   }`
//                 }
//               >
//                 {item.name}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Social Media Icons */}
//       <div className="flex justify-center space-x-4 text-blue-500 mt-4">
//         <FaFacebook size={20} />
//         <FaInstagram size={20} />
//         <FaX size={20} />
//         <FaGoogle size={20} />
//       </div>
//     </div>
//   );
// };

// export default CompanySidebar;



import React from "react";
import {
  FaTachometerAlt, // Dashboard
  FaBookOpen,      // Courses
  FaUsers,         // Students
  FaBriefcase,     // Recruitment
  FaCog,           // Settings
  FaFacebookF,     // Facebook (F version is often cleaner)
  FaInstagram,
  FaTwitter,       // Using FaTwitter as FaX might be for X/Twitter
  FaGoogle,
  FaBuilding       // Generic company icon for placeholder
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const CompanySidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/CompanyDashboard", icon: <FaTachometerAlt /> },
    { name: "Courses", path: "/CompanyCourses", icon: <FaBookOpen /> },
    { name: "Students", path: "/CompanyStudents", icon: <FaUsers /> },
    { name: "Recruitment", path: "/CompanyRecruitment", icon: <FaBriefcase /> },
    { name: "Settings", path: "*", icon: <FaCog /> }, // Consider a specific path like /CompanySettings
  ];

  const socialLinks = [
    { name: "Facebook", icon: <FaFacebookF />, href: "#" }, // Replace # with actual links
    { name: "Instagram", icon: <FaInstagram />, href: "#" },
    { name: "Twitter", icon: <FaTwitter />, href: "#" },
    { name: "Google", icon: <FaGoogle />, href: "#" },
  ];

  return (
    <div className="w-64 h-screen bg-white text-gray-800 p-5 flex flex-col justify-between shadow-lg border-r border-gray-200">
      <div>
        {/* Brand/Logo Area */}
        <div className="mb-8 flex items-center justify-center py-4">
          <FaBuilding className="text-blue-500 h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold text-blue-500">Company Portal</h1>
        </div>

        {/* Navigation Menu */}
        <nav>
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2">
                <NavLink
                  to={item.path}
                  // We will use a custom class for the active state to style the icon
                  // and rely on Tailwind's group-hover for the icon's hover state.
                  className={({ isActive }) =>
                    `flex items-center w-full py-2.5 px-4 rounded-lg cursor-pointer transition-all duration-150 ease-in-out group
                    ${
                      isActive
                        ? "bg-blue-500 text-white shadow-md font-semibold active-nav-link" // Added 'active-nav-link'
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-500 hover:pl-5"
                    }`
                  }
                >
                  {/* 
                    For the icon, we can't directly use isActive from NavLink's className callback here.
                    Instead, we'll style it based on the parent's state using group-hover for hover
                    and a more specific selector (or inline style if necessary) for active.
                    The 'active-nav-link' class can be used if you add custom CSS,
                    or we can make the icon's color conditional here.
                  */}
                  <span className={`mr-3 text-lg 
                                   ${/* The NavLink's text-white will apply if active,
                                       otherwise, these classes will take effect. */''} 
                                   text-gray-400 group-hover:text-blue-500 
                                   ${/* If NavLink is active, its text-white should cascade.
                                       If not, text-gray-400 applies, and group-hover overrides it. */''}`}>
                    {/* A better way for active icon color is to use the parent's active class for more direct control
                        or ensure the parent's text color cascades properly.
                        Tailwind applies text color to children by default.
                        So, when the NavLink has `text-white`, the icon should also become white.
                        The `text-gray-400` is for the non-active, non-hover state.
                    */}
                    {item.icon}
                  </span>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Social Media Icons Section */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="flex justify-center space-x-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit our ${social.name} page`}
              className="text-gray-400 hover:text-blue-500 hover:scale-110 transform transition-all duration-150 ease-in-out"
            >
              {React.cloneElement(social.icon, { size: 20 })}
            </a>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">
          © {new Date().getFullYear()} AIGL Team
        </p>
      </div>
    </div>
  );
};

export default CompanySidebar;