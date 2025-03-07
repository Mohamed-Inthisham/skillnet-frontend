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

import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const CompanySidebar = () => {
  const menuItems = [
    { name: "Dashboard", path: "/CompanyDashboard" },
    { name: "Courses", path: "/CompanyCourses" },
    { name: "Students", path: "/CompanyStudents" },
    { name: "Recruitment", path: "/" },
    { name: "Settings", path: "/" },
  ];

  return (
    <div className="space-x-4 text-blue-500">
      <div className="flex justify-center">
        <nav className="w-64 h-screen bg-gray-100 p-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block w-full py-2 px-4 rounded-lg cursor-pointer transition ${
                      isActive ? "bg-white shadow-sm font-bold text-blue-500" : "hover:bg-gray-200"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
          <div className="flex justify-center space-x-4 text-blue-500">
            <FaFacebook size={20} />
            <FaInstagram size={20} />
            <FaTwitter size={20} />
            <FaGoogle size={20} />
         </div>
    </div>
  );
};

export default CompanySidebar;
