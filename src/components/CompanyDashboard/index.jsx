import React from "react";
import java from "../../assets/java.webp";
import cpp from "../../assets/c++.webp";
import react from "../../assets/react.svg";
import python from "../../assets/python.jpg";
import CompanyHeader from "../../layout/CompanyHeader";

const CompanyDashboard = () => {
  return (
    <>
    
    <div className="p-4">
      {/* Top Stats Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-gray-600">No. of Courses</h2>
          <p className="text-xl font-bold">5 Courses</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-gray-600">Total Students</h2>
          <p className="text-xl font-bold">42 Students</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-gray-600">No. of JDs</h2>
          <p className="text-xl font-bold">12 JDs</p>
        </div>
      </div>

      {/* Popular Courses */}
      <h2 className="text-lg font-bold mb-2">Popular Courses</h2>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-8 rounded-lg shadow">
          <img src={java} alt="Java" className="w-55 mx-auto mb-2" />
          <h3 className="text-left font-semibold">JAVA</h3>
          <h3 className="text-left text-gray-500">Introduction to JAVA</h3>
          <p className="text-left text-sm text-gray-500">8 lessons - 5 hours</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <img src={cpp} alt="C++" className="w-45 mx-auto mb-2" />
          <h3 className="text-left font-semibold">C++</h3>
          <h3 className="text-left text-gray-500">Introduction to C++</h3>
          <p className="text-left text-sm text-gray-500">11 lessons - 7 hours</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <img src={react} alt="React" className="w-35 mx-auto mt-4 mb-10" />
          <h3 className="text-left font-semibold">React</h3>
          <h3 className="text-left text-gray-500">React Intermediate</h3>
          <p className="text-left text-sm text-gray-500">6 lessons - 4 hours</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <img src={python} alt="React" className="w-45 mx-auto  mb-2" />
          <h3 className="text-left font-semibold">python</h3>
          <h3 className="text-left text-gray-500">Python Intermediate</h3>
          <p className="text-left text-sm text-gray-500">6 lessons - 4 hours</p>
        </div>
      </div>

      {/* Course Tracking Table */}
      <h2 className="text-lg font-bold mb-2">Course Tracking</h2>
      <table className="w-full bg-white shadow rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Course</th>
            <th className="p-2 text-left">Completed</th>
            <th className="p-2 text-left">Duration</th>
            <th className="p-2 text-left">Applicants</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">Introduction to Java</td>
            <td className="p-2">12/18</td>
            <td className="p-2">47h 22m</td>
            <td className="p-2">7</td>
          </tr>
          <tr className="border-t">
            <td className="p-2">Introduction to C++</td>
            <td className="p-2">9/13</td>
            <td className="p-2">65h 54m</td>
            <td className="p-2">7</td>
          </tr>
          <tr className="border-t">
            <td className="p-2">React Intermediate</td>
            <td className="p-2">7/11</td>
            <td className="p-2">30h 12m</td>
            <td className="p-2">4</td>
          </tr>
        </tbody>
      </table>
    </div>
    </>
  );
};

export default CompanyDashboard;
