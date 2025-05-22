import React, { useState, useEffect } from "react";

// Helper to get the JWT token from localStorage
const getAuthToken = () => localStorage.getItem("accessToken");

// Helper to decode JWT. In a real app, use a library like jwt-decode.
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
};

// Gets company info if logged-in user is a company
const getCurrentCompanyInfo = () => {
  const token = getAuthToken();
  if (!token) return null;
  const decoded = decodeToken(token);
  if (!decoded || decoded.role !== 'company' || !decoded.company_name) {
    return null;
  }
  return { companyName: decoded.company_name };
};

const Students = () => {
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);

  useEffect(() => {
    const currentCompany = getCurrentCompanyInfo();
    setCompanyInfo(currentCompany);

    if (!currentCompany) {
      setError("Please log in as a company user to view student enrollments.");
      setIsLoading(false);
      return;
    }

    const fetchCompanyEnrolledStudents = async () => {
      setIsLoading(true);
      setError(null);
      const token = getAuthToken();

      try {
        const response = await fetch(
          `http://localhost:5001/companies/${encodeURIComponent(currentCompany.companyName)}/enrolled-students`,
          {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
        }

        const studentsData = await response.json();
        setDisplayedStudents(studentsData);

      } catch (err) {
        setError(err.message);
        console.error("Failed to fetch company enrolled students:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyEnrolledStudents();
  }, []); // Runs once when the component mounts

  if (isLoading) {
    return <div className="p-6 text-center">Loading student enrollment data...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }
  
  if (!companyInfo) {
      // This case should be caught by the error state above, but as a fallback:
      return <div className="p-6 text-center text-gray-500">Please log in as a company user.</div>;
  }


  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Student Enrollments for {companyInfo.companyName}
      </h2>

      <div className="bg-gray-100 py-4 px-8 rounded-md mb-4 text-center w-fit mx-auto border-2 border-blue-200">
          <h2 className="text-gray-600">Total No. of Enrollments</h2>
          <p className="text-xl font-bold">{displayedStudents.length} Enrollments</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border border-gray-300 text-left">Student Name</th>
              <th className="p-2 border border-gray-300 text-left">Student Email</th>
              <th className="p-2 border border-gray-300 text-center">Course Name</th>
              <th className="p-2 border border-gray-300 text-center">Enrolled Date</th>
            </tr>
          </thead>
          <tbody>
            {displayedStudents.length > 0 ? (
              displayedStudents.map((student, index) => (
                <tr key={`${student.student_email}-${student.course_name}-${index}`} className="border border-gray-300 hover:bg-gray-50">
                  <td className="p-2 border border-gray-300">{student.student_name || "N/A"}</td>
                  <td className="p-2 border border-gray-300">{student.student_email}</td>
                  <td className="p-2 border border-gray-300 text-center">{student.course_name}</td>
                  <td className="p-2 border border-gray-300 text-center">{student.enrolled_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No student enrollments found for this company's courses.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;