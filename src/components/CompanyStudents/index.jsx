import React from "react";

const Students = () => {
  // Sample student data
  const students = [
    { name: "Vishnu Vindo", email: "vishnuv99@gmail.com", courseName: "Introduction to Java", enrolled: "Dec 23, 2024" },
    { name: "J. S Kasuni", email: "skasunilearning@gmail.com", courseName: "Introduction to C++", enrolled: "Nov 18, 2024" },
    { name: "A.L.P Perera", email: "pawanipe­rera12@gmail.com", courseName: "Java Intermediate", enrolled: "Nov 7, 2024" },
    { name: "Plumi Gamage", email: "piyumigi2001@gmail.com", courseName: "Introduction to Python", enrolled: "Dec 23, 2024" },
    { name: "J. S Kasuni", email: "skasunilearning@gmail.com", courseName: "Introduction to AI", enrolled: "Nov 18, 2024" },
    { name: "A.A.P Perera", email: "pawaniperera322@gmail.com", courseName: "Introduction to C++", enrolled: "Nov 7, 2024" },
    { name: "D.R.P Hewage", email: "rasintha0002@gmail.com", courseName: "Introduction to Java", enrolled: "Nov 7, 2024" },
    { name: "Bigun Vindo", email: "bigunvt@gmail.com", courseName: "Python Intermediate", enrolled: "Dec 23, 2024" },
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Title */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">Students</h2>

      {/* Certificate Count Box */}
      <div className="bg-gray-100 py-4 px-8 rounded-md mb-4 text-center w-fit mx-auto border-2 border-blue-200">
          <h2 className="text-gray-600">No. of Certificates </h2>
          <p className="text-xl font-bold">14 Certificates</p>
      </div>

      {/* Students Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-300 text-left">Name</th>
              <th className="p-2 border border-gray-300 text-left">Email</th>
              <th className="p-2 border border-gray-300 text-center">Course Name</th>
              <th className="p-2 border border-gray-300 text-center">Enrolled</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border border-gray-300 hover:bg-gray-50">
                <td className="p-2 border border-gray-300">{student.name}</td>
                <td className="p-2 border border-gray-300">{student.email}</td>
                <td className="p-2 border border-gray-300 text-center">{student.courseName}</td>
                <td className="p-2 border border-gray-300 text-center">{student.enrolled}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
