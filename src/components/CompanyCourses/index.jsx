import { FaEye, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const courses = [
  { id: 1, name: "Introduction to JAVA", lessons: 8, time: "5h" },
  { id: 2, name: "Introduction to C++", lessons: 11, time: "7h" },
  { id: 3, name: "React Intermediate", lessons: 6, time: "4h" },
  { id: 4, name: "Introduction to Python", lessons: 9, time: "7h" },
  { id: 5, name: "Introduction to C", lessons: 8, time: "5h" },
  { id: 6, name: "Introduction to React", lessons: 6, time: "5h" },
  { id: 7, name: "Introduction to .Net", lessons: 11, time: "5h" },
  { id: 8, name: "React Intermediate", lessons: 8, time: "5h" },
  { id: 9, name: "Python Intermediate", lessons: 12, time: "5h" },
  { id: 10, name: "Introduction to Ruby", lessons: 4, time: "5h" },
];

const CompanyCourses = () => {
  const navigate = useNavigate();

  const handleRowClick = (courseId) => {
    navigate(`/CompanyModule`); //navigate(`/CompanyModulePage/${courseId}`); 
  };

  const handleButtonClick = (e, courseId, action) => {
    e.stopPropagation(); // Stop event propagation to prevent row click
    if (action === 'view') {
      console.log('View clicked for:', courseId);
    } else if (action === 'delete') {
      console.log('Delete clicked for:', courseId);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Courses</h2>

      <div className="flex space-x-6 mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          onClick={() => navigate('/CompanyAddCourses')}
        >
          Add Course <FaPlus className="ml-2" />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          onClick={() => navigate('/CompanyAddFluencyTests')}
        >
          Add Fluency Test <FaPlus className="ml-2" />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          onClick={() => navigate('/CompanyAddQuizzes')}
        >
          Add Quiz <FaPlus className="ml-2" />
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600"
          onClick={() => navigate('/CompanyAddCertifications')}
        >
          Add Certificate <FaPlus className="ml-2" />
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full border-collapse bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-sm uppercase">
              <th className="p-3 text-left">Course Name</th>
              <th className="p-3 text-center">Lessons</th>
              <th className="p-3 text-center">Total Time</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition cursor-pointer`}
                onClick={() => handleRowClick(course.id)} 
              >
                <td className="p-3">{course.name}</td>
                <td className="p-3 text-center">{course.lessons}</td>
                <td className="p-3 text-center">{course.time}</td>
                <td className="p-3 flex justify-center space-x-3">
                  <button
                    className="text-blue-500 hover:text-blue-700 transition"
                    onClick={(e) => handleButtonClick(e, course.id, 'view')} 
                  >
                    <FaEye size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={(e) => handleButtonClick(e, course.id, 'delete')} 
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyCourses;