import React from 'react';
import { Award, CheckCircle2, XCircle, RefreshCw, Download } from 'lucide-react';

// Mock exam data - replace with actual data from your application
const examResults = {
  studentName: "John Doe",
  totalQuestions: 3,
  correctAnswers: 2,
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: "Explain the concept of Object-Oriented Programming.",
      studentAnswer: "OOP is a programming paradigm based on objects that contain data and code.",
      correctAnswer: "Object-Oriented Programming is a programming paradigm based on the concept of objects, which can contain data and code. It includes features like inheritance, polymorphism, and encapsulation.",
      isCorrect: true,
      marks: 10,
    },
    {
      id: 2,
      question: "What is a React component?",
      studentAnswer: "A piece of code",
      correctAnswer: "A React component is a reusable piece of UI that can contain both logic and presentation code.",
      isCorrect: false,
      marks: 10,
    },
    {
      id: 3,
      question: "Explain REST API.",
      studentAnswer: "REST API is a set of architectural constraints for web services.",
      correctAnswer: "REST API is a set of architectural constraints for web services that emphasize scalability and stateless communication.",
      isCorrect: true,
      marks: 10,
    },
  ],
};

function ExamResults() {
  const totalMarks = examResults.questions.reduce((sum, q) => sum + q.marks, 0);
  const maxMarks = examResults.questions.length * 10;
  const percentage = (totalMarks / maxMarks) * 100;
  const passed = percentage >= examResults.passingScore;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">Exam Results</h1>
              <p className="mt-2 text-sm text-gray-600">{examResults.studentName}</p>
            </div>
            
            {/* Score Summary */}
            <div className="mt-6 flex justify-center">
              <div className="bg-gray-50 rounded-full p-6 w-40 h-40 flex flex-col items-center justify-center border-4 border-blue-500">
                <span className="text-3xl font-bold text-blue-600">{percentage.toFixed(1)}%</span>
                <span className="text-sm text-gray-600 mt-1">Overall Score</span>
              </div>
            </div>

            {/* Pass/Fail Status */}
            <div className="mt-6 text-center">
              {passed ? (
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  <span>Passed</span>
                </div>
              ) : (
                <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-full">
                  <XCircle className="w-5 h-5 mr-2" />
                  <span>Failed</span>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Results */}
          <div className="px-6 py-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Question Details</h2>
            <div className="space-y-6">
              {examResults.questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Question {index + 1}
                    </h3>
                    <div className="flex items-center">
                      {question.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className="ml-2 text-sm font-medium">
                        {question.marks}/10 marks
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{question.question}</p>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">Your Answer:</p>
                    <p className="mt-1 text-gray-800">{question.studentAnswer}</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">Correct Answer:</p>
                    <p className="mt-1 text-gray-800">{question.correctAnswer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 flex justify-center space-x-4">
            {passed ? (
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Award className="w-5 h-5 mr-2" />
                Claim Certificate
              </button>
            ) : (
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </button>
            )}
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <Download className="w-5 h-5 mr-2" />
              Download Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamResults;