import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Award, CheckCircle2, XCircle, ArrowLeft, Briefcase,
  BookOpen, User, Percent, BarChart2, Building, Layers, Activity, AlertTriangle // Added more icons
} from 'lucide-react';
import UserHeader from "../../layout/UserHeader"; // Assuming this layout component exists
import Footer from "../../layout/Footer";       // Assuming this layout component exists
import axios from 'axios';

const ExamResults = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get userId (MongoDB _id) and courseId (MongoDB _id) from navigation state
  const userId = location.state?.userId;
  const courseId = location.state?.courseId;

  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PASSING_PERCENTAGE = 10;

  useEffect(() => {
    // Ensure critical IDs are present
    if (!userId || !courseId) {
      console.error("ExamResults: User ID or Course ID is missing from location state.");
      setError("Required information (User ID or Course ID) is missing. Cannot fetch results.");
      setLoading(false);
      // Optional: navigate('/some-error-page or /dashboard');
      return;
    }

    const fetchExamResults = async () => {
      setLoading(true);
      setError(null);
      console.log(`ExamResults: Attempting to fetch specific marks for userId: ${userId}, courseId: ${courseId}`);

      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError("Authentication token not found. Please log in again.");
          setLoading(false);
          navigate('/login'); // Redirect to login if no token
          return;
        }

        const response = await axios.get(
          `http://localhost:5001/marks/user/${userId}/course/${courseId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );

        console.log("ExamResults: API Response Data:", response.data);

        // Backend returns the marks object directly, or an error object
        if (response.data && typeof response.data === 'object' && !response.data.error && response.status === 200) {
          setExamData(response.data);
        } else if (response.data && response.data.error) {
          // Error message handled by the backend logic and returned as JSON
          console.error("ExamResults: Error from backend API:", response.data.detail || response.data.error);
          setError(response.data.detail || response.data.error || "Failed to retrieve exam results.");
           if (response.status === 404) {
             setError(`No exam results found for this specific course (User: ${userId}, Course: ${courseId}). Please complete the exam or contact support.`);
           }
        } else {
          // Catch-all for unexpected response structure or if status is not 200 but no error field
          console.error("ExamResults: Unexpected response structure or non-success status:", response);
          setError("Received an unexpected response from the server.");
        }
      } catch (err) {
        console.error("ExamResults: Axios error fetching exam results:", err);
        if (err.response) {
          const errorMsg = err.response.data?.msg || err.response.data?.detail || err.response.data?.error || `Server error: ${err.response.status}`;
          setError(errorMsg);
          if (err.response.status === 404) {
            setError(`Exam results for this course are not found. You might need to complete the exam first.`);
          } else if (err.response.status === 401 || err.response.status === 403) {
            setError("Authentication or Authorization failed. Please log in again or check your permissions.");
            // navigate('/login'); // Consider redirecting
          }
        } else if (err.request) {
          setError("Network error: Could not connect to the server. Please check your connection.");
        } else {
          setError(`An unexpected error occurred: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExamResults();
  }, [userId, courseId, navigate]);


  const handleApplyForJobs = () => {
    navigate('/JobApplicationPortal'); // Make sure this route is defined in your router
  };

  const handleBackToCourse = () => {
    if (courseId) {
      navigate(`/Home`); // Example: /StudentCourseDetails/actualCourseId
    } else {
      navigate('/Home'); // Fallback to general courses page
    }
  };

  if (loading) {
    return (
      <div>
        <UserHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="text-center">
            <Activity className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-xl font-medium text-gray-700">Loading Your Exam Results...</p>
            <p className="text-sm text-gray-500">Please wait a moment.</p>
          </div>
        </div>
        <Footer bgColor="bg-black" textColor="text-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <UserHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-xl border border-red-200">
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-red-700 mb-3">Oops! Something Went Wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
                onClick={() => window.location.reload()} // Simple reload attempt
                className="w-full mb-3 inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
                Try Again
            </button>
            <button
                onClick={() => navigate('/Home')}
                className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go to Homepage
            </button>
          </div>
        </div>
        <Footer bgColor="bg-black" textColor="text-white" />
      </div>
    );
  }

  if (!examData) {
    // This case should ideally be caught by the error state if data fetching had issues or returned 404.
    // If loading is false, no error is set, but examData is still null, it implies an unexpected state.
    return (
      <div>
        <UserHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md mx-auto text-center bg-white p-8 rounded-lg shadow-xl">
                <Layers className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">No Exam Data</h2>
                <p className="text-gray-600 mb-6">We couldn't find any exam results to display for this course. This might happen if the exam hasn't been fully processed yet.</p>
                <button
                    onClick={handleBackToCourse}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </button>
            </div>
        </div>
        <Footer bgColor="bg-black" textColor="text-white" />
      </div>
    );
  }

  // Destructure data from examData
  const {
    overall_marks_percentage = 0, // Provide default if field is missing
    fluency_score_percentage = 0,
    essay_rating_percentage = 0,
    username = "Student",
    course_name = "N/A",
    company_name = "N/A",
    level = "N/A",
  } = examData;

  const totalMarksFloat = parseFloat(overall_marks_percentage);
  const passed = totalMarksFloat >= PASSING_PERCENTAGE;

  return (
    <div>
      <UserHeader />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-[Poppins]">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
            {/* Header Section */}
            <div className={`px-6 py-8 md:px-10 md:py-10 text-white text-center ${passed ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-red-600'}`}>
              {passed ? <CheckCircle2 className="w-20 h-20 mx-auto mb-3" /> : <XCircle className="w-20 h-20 mx-auto mb-3" />}
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Exam Results</h1>
              <p className="mt-3 text-lg opacity-90">
                {passed ? `Congratulations, ${username}!` : `Keep Trying, ${username}!`}
              </p>
            </div>

            {/* Main Score Display */}
            <div className="p-6 md:p-8 text-center">
              <div className={`relative inline-flex items-center justify-center w-56 h-56 rounded-full border-[10px] ${passed ? 'border-green-500' : 'border-red-500'} bg-white shadow-lg`}>
                <div className="text-center">
                  <span className={`block text-6xl font-bold ${passed ? 'text-green-600' : 'text-red-600'}`}>
                    {totalMarksFloat.toFixed(1)}
                    <span className="text-3xl">%</span>
                  </span>
                  <span className="block text-sm font-medium text-gray-600 mt-1">Overall Marks</span>
                </div>
              </div>
              <p className={`mt-6 text-2xl font-semibold ${passed ? 'text-green-700' : 'text-red-700'}`}>
                {passed ? "You Passed!" : "Attempt Unsuccessful"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                (Passing score: {PASSING_PERCENTAGE}%)
              </p>
            </div>
            
            {/* Detailed Score Breakdown */}
            <div className="bg-gray-50 px-6 py-8 md:px-8 md:py-10 border-t border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Detailed Breakdown</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <InfoCard icon={<User />} label="Student" value={username} />
                <InfoCard icon={<BookOpen />} label="Course" value={course_name} />
                <InfoCard icon={<Layers />} label="Level" value={level} />
                <InfoCard icon={<Building />} label="Provider" value={company_name} />
                <InfoCard icon={<Activity />} label="Fluency Score" value={`${parseFloat(fluency_score_percentage).toFixed(1)}%`} isScore={true} />
                <InfoCard icon={<Percent />} label="Essay Score" value={`${parseFloat(essay_rating_percentage).toFixed(1)}%`} isScore={true} />
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-6 md:px-8 md:py-8 space-y-4 border-t border-gray-200 bg-gray-100">
              {passed && (
                <>
                  <button 
                      className="w-full group inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150 ease-in-out transform hover:scale-105"
                      onClick={() => alert("Certificate download feature will be available soon!")}
                  >
                    <Award className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" />
                    Download Certificate
                  </button>
                  <button
                    className="w-full group inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-150 ease-in-out transform hover:scale-105"
                    onClick={handleApplyForJobs}
                  >
                    <Briefcase className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-1" />
                    Apply for Jobs
                  </button>
                </>
              )}
              <button
                className="w-full group inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-150 ease-in-out"
                onClick={handleBackToCourse}
              >
                <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer bgColor="bg-black" textColor="text-white" />
    </div>
  );
};

const InfoCard = ({ icon, label, value, isScore = false }) => (
  <div className={`p-4 rounded-lg shadow flex items-center space-x-3 ${isScore ? 'bg-blue-50' : 'bg-white border border-gray-200'}`}>
    <div className={`p-2 rounded-full ${isScore ? 'bg-blue-100 text-blue-600' : 'bg-indigo-100 text-indigo-600'}`}>
      {React.cloneElement(icon, { className: "w-5 h-5" })}
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{label}</p>
      <p className={`text-md font-semibold ${isScore ? 'text-blue-700' : 'text-gray-900'}`}>{value}</p>
    </div>
  </div>
);

export default ExamResults;