import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, CheckCircle2, XCircle, ArrowLeft, Briefcase } from 'lucide-react';
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";


const examResults = {
  studentName: "John Doe",
  totalQuestions: 3,
  correctAnswers: 2,
  totalMarks: 30,
  maxMarks: 30,
  passingScore: 70,
};

function ExamResults() {
  const navigate = useNavigate();
  const percentage = (examResults.totalMarks / examResults.maxMarks) * 100;
  const passed = percentage >= examResults.passingScore;

  const handleApplyForJobs = () => {
    navigate('/JobApplicationPortal');
  };

  return (
    <div>
    <UserHeader/>
    <div className="min-h-screen bg-gray-50 py-15 px-4 sm:px-6 lg:px-8 font-[Poppins]">
      
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Exam Results</h1>
              <p className="mt-2 text-sm text-gray-600">{examResults.studentName}</p>
            </div>
            
            {/* Score Summary */}
            <div className="mt-8 flex justify-center">
              <div className="bg-gray-50 rounded-full p-8 w-48 h-48 flex flex-col items-center justify-center border-4 border-blue-500">
                <span className="text-4xl font-bold text-blue-600">{examResults.totalMarks}/{examResults.maxMarks}</span>
                <span className="text-sm font-medium text-gray-800 mt-2">Overall Marks</span>
                <span className="text-sm text-gray-600 mt-1">{percentage.toFixed(1)}%</span>
              </div>
            </div>

            {/* Pass/Fail Status */}
            <div className="mt-8 text-center">
              {passed ? (
                <div className="inline-flex items-center px-6 py-3 bg-green-100 text-green-800 rounded-full text-lg font-medium">
                  <CheckCircle2 className="w-6 h-6 mr-2" />
                  <span>Passed</span>
                </div>
              ) : (
                <div className="inline-flex items-center px-6 py-3 bg-red-100 text-red-800 rounded-full text-lg font-medium">
                  <XCircle className="w-6 h-6 mr-2" />
                  <span>Failed</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-6 space-y-4">
            {passed && (
              <div className="flex flex-col space-y-4">
                <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Award className="w-5 h-5 mr-2" />
                  Download Certificate
                </button>
                <button 
                  className="w-full inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={handleApplyForJobs}
                >
                  <Briefcase className="w-5 h-5 mr-2" />
                  Apply for Jobs
                </button>
              </div>
            )}
            <button className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Course
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer bgColor="bg-black" textColor="text-white" />
  </div>  
  );
}

export default ExamResults;