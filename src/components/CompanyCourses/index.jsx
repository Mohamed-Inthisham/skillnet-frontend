import { FaEye, FaTrash, FaPlus } from "react-icons/fa";

const courses = [
  { name: "Introduction to JAVA", lessons: 8, time: "5h" },
  { name: "Introduction to C++", lessons: 11, time: "7h" },
  { name: "React Intermediate", lessons: 6, time: "4h" },
  { name: "Introduction to Python", lessons: 9, time: "7h" },
  { name: "Introduction to C", lessons: 8, time: "5h" },
  { name: "Introduction to React", lessons: 6, time: "5h" },
  { name: "Introduction to .Net", lessons: 11, time: "5h" },
  { name: "React Intermediate", lessons: 8, time: "5h" },
  { name: "Python Intermediate", lessons: 12, time: "5h" },
  { name: "Introduction to Ruby", lessons: 4, time: "5h" },
];

const CompanyCourses = () => {
  
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Courses</h2>
      
      {/* Action Buttons */}
      <div className="flex space-x-6 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600">
          Add Course <FaPlus className="ml-2" />
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600">
          Add Fluency Test <FaPlus className="ml-2" />
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600">
          Add Quiz <FaPlus className="ml-2" />
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600">
          Add Certificate <FaPlus className="ml-2" />
        </button>
      </div>

      {/* Course Table */}
      {/* <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="p-2 text-left">Course Name</th>
            <th className="p-2">Lessons</th>
            <th className="p-2">Total Time</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{course.name}</td>
              <td className="p-2 text-center">{course.lessons}</td>
              <td className="p-2 text-center">{course.time}</td>
              <td className="p-2 flex justify-center space-x-2">
                <button className="text-blue-500">
                  <FaEye size={16} />
                </button>
                <button className="text-red-500">
                  <FaTrash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

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
              key={index}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200 transition`}
            >
              <td className="p-3">{course.name}</td>
              <td className="p-3 text-center">{course.lessons}</td>
              <td className="p-3 text-center">{course.time}</td>
              <td className="p-3 flex justify-center space-x-3">
                <button className="text-blue-500 hover:text-blue-700 transition">
                  <FaEye size={18} />
                </button>
                <button className="text-red-500 hover:text-red-700 transition">
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
