// import { useState } from "react";

// const CompanyRecruitment = () => {
//   const [activeTab, setActiveTab] = useState("job_descriptions");
//   const [jobDescriptions, setJobDescriptions] = useState([
//     { id: 1, title: "Software Engineering - Intern.pdf", date: "Oct 2, 2024" },
//     { id: 2, title: "Trainee QA.pdf", date: "Nov 20, 2024" },
//     { id: 3, title: "Trainee Project Manager.pdf", date: "Nov 29, 2024" },
//     { id: 4, title: "Associate QA Engineer.pdf", date: "Nov 29, 2024" },
//     { id: 5, title: "Trainee Site Reliable Engineer.pdf", date: "Nov 29, 2024" },
//     { id: 6, title: "Devops Engineer.pdf", date: "Nov 29, 2024" },
//   ]);

//   const handleDelete = (id) => {
//     setJobDescriptions(jobDescriptions.filter((job) => job.id !== id));
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">Recruitment</h2>
//       <div className="flex border-b">
//         <button
//           className={`px-4 py-2 ${activeTab === "job_descriptions" ? "border-b-2 border-blue-500" : ""}`}
//           onClick={() => setActiveTab("job_descriptions")}
//         >
//           Job Descriptions
//         </button>
//         <button
//           className={`px-4 py-2 ${activeTab === "curriculum_vitae" ? "border-b-2 border-blue-500" : ""}`}
//           onClick={() => setActiveTab("curriculum_vitae")}
//         >
//           Curriculum Vitae
//         </button>
//       </div>

//       {activeTab === "job_descriptions" && (
//         <div className="mt-4">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add JDs +</button>
//           <table className="w-full border">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="p-2">JD Title</th>
//                 <th className="p-2">Date</th>
//                 <th className="p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {jobDescriptions.map((job) => (
//                 <tr key={job.id} className="border-b">
//                   <td className="p-2 text-blue-500 cursor-pointer">{job.title}</td>
//                   <td className="p-2">{job.date}</td>
//                   <td className="p-2">
//                     <button className="text-red-500" onClick={() => handleDelete(job.id)}>🗑️</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CompanyRecruitment;

import { FaPlus, FaTrash } from "react-icons/fa";
import { useState } from "react";

const CompanyRecruitment = () => {
  const [activeTab, setActiveTab] = useState("job_descriptions");
  const [jobDescriptions, setJobDescriptions] = useState([
    { id: 1, title: "Software Engineering - Intern.pdf", date: "Oct 2, 2024" },
    { id: 2, title: "Trainee QA.pdf", date: "Nov 20, 2024" },
    { id: 3, title: "Trainee Project Manager.pdf", date: "Nov 29, 2024" },
    { id: 4, title: "Associate QA Engineer.pdf", date: "Nov 29, 2024" },
    { id: 5, title: "Trainee Site Reliable Engineer.pdf", date: "Nov 29, 2024" },
    { id: 6, title: "Devops Engineer.pdf", date: "Nov 29, 2024" },
  ]);

  const handleDelete = (id) => {
    setJobDescriptions(jobDescriptions.filter((job) => job.id !== id));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Recruitment</h2>
      <div className="flex justify-center border-b-[1px] border-gray-300 mb-4">
        <button
          className={`px-6 py-2 font-semibold ${activeTab === "job_descriptions" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("job_descriptions")}>
            Job Descriptions
        </button>
        <button
          className={`px-6 py-2 font-semibold ${activeTab === "curriculum_vitae" ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
          onClick={() => setActiveTab("curriculum_vitae")}>
            Curriculum Vitae
        </button>
      </div>

      {activeTab === "job_descriptions" && (
        <div className="mt-4">
          {/* <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add JDs +</button> */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2 flex items-center hover:bg-blue-600">
                    Add JDs <FaPlus className="ml-2" />
          </button>
          {/* <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 border-b border-gray-300">
                <th className="p-2 border-r border-gray-300">JD Title</th>
                <th className="p-2 border-r border-gray-300">Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobDescriptions.map((job) => (
                <tr key={job.id} className="border-b border-gray-300">
                  <td className="p-2 text-blue-500 cursor-pointer border-r border-gray-300">{job.title}</td>
                  <td className="p-2 border-r border-gray-300">{job.date}</td>
                  <td className="p-2 justify-center flex items-center">
                    <button className="text-red-500" onClick={() => handleDelete(job.id)}><FaTrash size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}

<div className="overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
                  <th className="p-3 border-r border-gray-300">JD Title</th>
                  <th className="p-3 border-r border-gray-300">Date</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {jobDescriptions.map((job, index) => (
                  <tr
                    key={job.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 transition`}
                  >
                    <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300">
                      {job.title}
                    </td>
                    <td className="p-3 border-r border-gray-300">{job.date}</td>
                    <td className="p-3 flex justify-center">
                      <button
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => handleDelete(job.id)}>
                        <FaTrash size={16}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyRecruitment;
