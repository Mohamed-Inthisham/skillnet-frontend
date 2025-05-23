import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import ExamMonitorLayout from "../../layout/ExamMonitor";
import axios from 'axios';

const EssayQuestionsPage = () => {
  const [question, setQuestion] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const WORD_LIMIT = 50; // You can adjust this as needed
  const navigate = useNavigate();
  const location = useLocation();

  // --- GET userId and courseId from location.state ---
  const courseId = location.state?.courseId;
  const userId = location.state?.userId; // Add this line
  // You could also get studentEmail if you plan to use it:
  // const studentEmail = location.state?.studentEmail;
  // --- END OF ADDITIONS ---

  const [evaluationScore, setEvaluationScore] = useState(null);

  useEffect(() => {
    const fetchEssayQuestion = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5001/courses/${courseId}/essay_question`);
        console.log("Fetched Essay Question Data:", response.data);
        if (response.data && response.data.question !== undefined && response.data.correctAnswer !== undefined) {
          setQuestion(response.data.question);
          setCorrectAnswer(response.data.correctAnswer);
        } else {
          throw new Error("Question or correct answer missing in API response.");
        }
      } catch (err) {
        console.error("Error fetching essay question:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchEssayQuestion();
    } else {
      setError({ message: "Course ID is missing. Cannot load question." });
      setLoading(false);
    }
  }, [courseId]);

  const handleAnswerChange = (e) => {
    setAnswers(prev => ({
      ...prev,
      'user_answer': e.target.value // Assuming only one essay question, directly set 'user_answer'
    }));
  };

  const handleQuizSubmit = async () => {
    setIsAnalyzing(true);
    setError(null); // Clear previous errors
    try {
      if (!question || correctAnswer === null) {
        console.error("Question data or Correct Answer is not loaded.");
        setError({ message: "Question data or Correct Answer is not loaded. Please refresh the page." });
        setIsAnalyzing(false);
        return;
      }

      const userAnswerText = answers.user_answer || '';
      const formData = new FormData();
      formData.append('question', question);
      formData.append('correct_answer', correctAnswer);
      formData.append('user_answer', userAnswerText);

      // --- ADD userId and courseId TO FORMDATA ---
      if (userId) formData.append('userId', userId);
      if (courseId) formData.append('courseId', courseId);
      // --- END OF ADDITIONS ---

      const response = await axios.post('http://127.0.0.1:5000/api/answer_evaluation', formData);
      console.log('Answer evaluation response:', response.data);
      
      if (response.data && response.data.Score !== undefined) {
        setEvaluationScore(response.data.Score);
        setIsAnalyzing(false);
        // Pass the score and other relevant info (like userId, courseId if needed by ExamResult)
        navigate("/ExamResult", { 
            state: { 
                evaluationScore: response.data.Score,
                userId: userId, // Pass userId if ExamResult needs it
                courseId: courseId // Pass courseId if ExamResult needs it
            } 
        });
      } else {
        throw new Error("Score missing in evaluation response.");
      }

    } catch (err) {
      console.error('Error submitting answer for evaluation:', err);
      let errorMessage = "Failed to submit answer for evaluation. Please try again.";
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError({ message: errorMessage });
      setIsAnalyzing(false);
    }
  };

  const getWordCount = (text) => {
    return text ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
  };

  const currentAnswer = answers.user_answer || '';
  const wordCount = getWordCount(currentAnswer);

  if (loading) {
    return (
      <ExamMonitorLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins]">
          <div className="text-lg text-gray-700">Loading essay question...</div>
        </div>
      </ExamMonitorLayout>
    );
  }

  if (error && !question) { // Show error prominently if question couldn't load
    return (
      <ExamMonitorLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins]">
          <div className="text-center p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-red-600 mb-3">Error</h2>
            <p className="text-gray-700">{error.message || "An unknown error occurred."}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </ExamMonitorLayout>
    );
  }
  
  if (!question && !loading) { // If not loading and no question, and no specific error for it
     return (
      <ExamMonitorLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins]">
          <div>Essay question not found for this course or an issue occurred.</div>
        </div>
      </ExamMonitorLayout>
    );
  }


  return (
    <ExamMonitorLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins] py-8">
        <main className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full">
            <div className="h-2.5 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                style={{ width: `100%` }} // Assuming one question
              />
            </div>

            <div className="p-6 sm:p-8 relative">
              <div className="text-sm text-gray-500 mb-3">
                Question 1 of 1
              </div>

              <div className="relative overflow-hidden">
                <div>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                    <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-2 sm:mb-0">
                      {question}
                    </h2>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full ml-0 sm:ml-4 whitespace-nowrap">
                      Word Limit: {WORD_LIMIT}
                    </span>
                  </div>

                  <div className="relative">
                    <textarea
                      className="w-full h-56 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-shadow duration-200 hover:shadow-md"
                      placeholder="Type your comprehensive answer here..."
                      value={currentAnswer}
                      onChange={handleAnswerChange}
                      disabled={isAnalyzing}
                      aria-label="Essay answer input"
                    />
                    <div className={`text-sm mt-2 text-right font-medium ${wordCount > WORD_LIMIT ? 'text-red-600' : 'text-gray-600'}`}>
                      {wordCount} / {WORD_LIMIT} words
                    </div>
                  </div>
                </div>
              </div>
               {/* Display submission error, if any */}
              {error && (
                <div className="mt-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">
                  Error: {error.message}
                </div>
              )}
            </div>


            <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end items-center">
              {isAnalyzing && (
                <div className="mr-4 text-blue-600 flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Evaluating...
                </div>
              )}
              <button
                onClick={handleQuizSubmit}
                className="bg-green-600 text-white hover:bg-green-700 px-5 py-2.5 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isAnalyzing || wordCount === 0 || wordCount > WORD_LIMIT}
              >
                Submit Answer
              </button>
            </div>
          </div>
        </main>
      </div>
    </ExamMonitorLayout>
  );
};

export default EssayQuestionsPage;