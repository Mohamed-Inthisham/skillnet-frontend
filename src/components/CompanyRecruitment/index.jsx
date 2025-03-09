import { FaCloudUploadAlt, FaPlus, FaTimes, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useDropzone } from "react-dropzone"; 

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
    const [CV, setCV] = useState([
        { id: 1, title: "Kanishka Senevirathna-CV.pdf", date: "Oct 2, 2024" },
        { id: 2, title: "Lasal Perera-SE.pdf", date: "Nov 20, 2024" },
        { id: 3, title: "Nimesh Kodithuwakkku.pdf", date: "Nov 29, 2024" },
        { id: 4, title: "Kalindu Chathuranga Gamage.pdf", date: "Nov 29, 2024" },
        { id: 5, title: "L.Jayasinghe-QA.pdf", date: "Nov 29, 2024" },
        { id: 6, title: "Tharusha De Silva-BA.pdf", date: "Nov 29, 2024" },
        ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleDelete = (id) => {
        setJobDescriptions(jobDescriptions.filter((job) => job.id !== id));
        setCV(CV.filter((cv) => cv.id !== id));
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleFileChange,
        accept: ".pdf",
      });

  return (
    <div>
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
            <div className={`p-6 ${isModalOpen ? "blur-sm" : ""} relative z-0`}> 
                {activeTab === "job_descriptions" && (
                    <div className="mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4 flex items-center hover:bg-blue-600" onClick={() => setIsModalOpen(true)}>
                                Add JDs <FaPlus className="ml-2" onClick={() => setIsModalOpen(true)}/>
                    </button>

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
                                        } hover:bg-gray-200 transition`}>
                                        <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300"> {job.title}</td>
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
                {activeTab === "curriculum_vitae" && (
                    <div className="mt-4">
                        <div className="overflow-x-auto shadow-md rounded-lg">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-200 text-gray-700 text-sm uppercase border-b">
                                        <th className="p-3 border-r border-gray-300">CV Title</th>
                                        <th className="p-3 border-r border-gray-300">Date</th>
                                        <th className="p-3 text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CV.map((cv, index) => (
                                    <tr
                                        key={cv.id}
                                        className={`border-b ${
                                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                                        } hover:bg-gray-200 transition`}>
                                        <td className="p-3 text-blue-600 cursor-pointer border-r border-gray-300"> {cv.title}</td>
                                        <td className="p-3 border-r border-gray-300">{cv.date}</td>
                                        <td className="p-3 flex justify-center">
                                            <button
                                                className="text-red-500 hover:text-red-700 transition"
                                                onClick={() => handleDelete(cv.id)}>
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
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-100">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Add Job Description</h3>
                                <button className="text-blue-500" onClick={() => setIsModalOpen(false)}><FaTimes size={16}/></button>
                            </div>
                            <div className="border-2 border-dashed border-gray-400 p-6 text-center">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="fileUpload"
                                />
                                {!selectedFile && (
                                    <label htmlFor="fileUpload" className="cursor-pointer text-blue-500">
                                        <FaCloudUploadAlt size={40} className="mx-auto mb-2" />
                                        <span>Click to upload</span>
                                    </label>
                                )}
                                {selectedFile && (
                                    <p className="mt-2 text-gray-700">
                                        <strong>{selectedFile.name}</strong>
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-end mt-4">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Save</button>
                            </div>
                        </div>
                        
                    </div>
                )}    
    </div>    
  );
};

export default CompanyRecruitment;
