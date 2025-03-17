import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import ExamMonitorLayout from "../../layout/ExamMonitor";
import axios from 'axios'; // Import axios for API calls

const EssayQuestionsPage = () => {
  const [question, setQuestion] = useState(null); // State to store the fetched question, initialize to null
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null);     // State to handle errors during fetching
  const WORD_LIMIT = 50;
  const navigate = useNavigate();
  const courseId = '67d1348c10d10a8f410c74c2'; // Hardcoded course ID - consider making this dynamic

  useEffect(() => {
    const fetchEssayQuestion = async () => {
      setLoading(true); // Start loading
      setError(null);    // Clear any previous errors
      try {
        const response = await axios.get(`http://localhost:5001/courses/${courseId}/essay_question`);
        console.log("Fetched Essay Question:", response.data); // Log the fetched data
        setQuestion(response.data);
      } catch (err) {
        console.error("Error fetching essay question:", err);
        setError(err); // Set error state
      } finally {
        setLoading(false); // End loading regardless of success or failure
      }
    };

    fetchEssayQuestion();
  }, [courseId]); // Fetch question when component mounts or courseId changes (if dynamic)


  const handleAnswerChange = (e) => {
    if (question) { // Check if question is loaded before accessing its id
      setAnswers(prev => ({
        ...prev,
        [question._id]: e.target.value // Use fetched question's _id
      }));
    }
  };

  const handleQuizSubmit = () => {
    console.log('Quiz submitted:', answers);
    // Handle the quiz submission here - consider sending answers to backend
    navigate("/ExamResult");
  };

  const getWordCount = (text) => {
    return text ? text.trim().split(/\s+/).length : 0;
  };

  const currentAnswer = question ? answers[question._id] || '' : ''; // Check if question is loaded
  const wordCount = getWordCount(currentAnswer);

  if (loading) {
    return <ExamMonitorLayout><div>Loading question...</div></ExamMonitorLayout>; // Simple loading state
  }

  if (error) {
    return <ExamMonitorLayout><div>Error loading question: {error.message}</div></ExamMonitorLayout>; // Simple error state
  }

  if (!question) {
    return <ExamMonitorLayout><div>Question not found for this course.</div></ExamMonitorLayout>; // Handle case where question is not found
  }


  return (
    <ExamMonitorLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins]">
        {/* Main content */}
        <main className="max-w-4xl w-full px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
            {/* Progress bar */}
            <div className="h-2 bg-gray-200">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `100%` }} // Always 100% progress for single question
              />
            </div>

            {/* Question content */}
            <div className="p-6 relative">
              {/* Question number */}
              <div className="text-sm text-gray-500 mb-2">
                Question 1 of 1
              </div>

              {/* Questions container */}
              <div className="relative overflow-hidden">
                {/* Current question */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      {question.question} {/* Display fetched question's text */}
                    </h2>
                    <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                      (Within {WORD_LIMIT} Words)
                    </span>
                  </div>

                  <div className="relative">
                    <textarea
                      className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Type your answer here..."
                      value={currentAnswer}
                      onChange={handleAnswerChange}
                    />
                    <div className={`text-sm mt-2 text-right ${wordCount > WORD_LIMIT ? 'text-red-500' : 'text-gray-500'}`}>
                      {wordCount} / {WORD_LIMIT} words
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation - Submit Button Only */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleQuizSubmit}
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-200 flex items-center"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </main>
      </div>
    </ExamMonitorLayout>
  );

};

export default EssayQuestionsPage;