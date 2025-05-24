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
  const [isSavingOverallMarks, setIsSavingOverallMarks] = useState(false);
  const WORD_LIMIT = 50;
  const navigate = useNavigate();
  const location = useLocation();

  // ----- Get userId (MongoDB _id) directly from localStorage -----
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId'); // Get MongoDB _id
    if (userIdFromStorage) {
      setCurrentUserId(userIdFromStorage);
      console.log("<<<<< EssayQuestionsPage: userId (MongoDB _id) fetched from localStorage: >>>>>", userIdFromStorage);
    } else {
      console.error("<<<<< EssayQuestionsPage: CRITICAL - userId (MongoDB _id) not found in localStorage. User might not be logged in or login process is flawed. >>>>>");
      setError({ message: "User identification missing. Please log in again." });
      // Optionally navigate to login if critical
      // navigate("/login");
    }

    // Log the initially received location.state for context, though we won't use its userId
    console.log("<<<<< EssayQuestionsPage: Initial location.state received (userId from here will be ignored): >>>>>", location.state);
  }, []); // Run once on mount to get userId

  // Use location.state for courseId and fluencyTestResults as before
  const courseId = location.state?.courseId;
  const fluencyTestResults = location.state?.fluencyTestResults;
  // We will use `currentUserId` (from localStorage via state) instead of location.state.userId

  useEffect(() => {
    const fetchEssayQuestion = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("EssayQuestionsPage: Attempting to fetch essay question for courseId:", courseId);
        const response = await axios.get(`http://localhost:5001/courses/${courseId}/essay_question`);
        console.log("EssayQuestionsPage: Fetched Essay Question Data:", response.data);
        if (response.data && response.data.question !== undefined && response.data.correctAnswer !== undefined) {
          setQuestion(response.data.question);
          setCorrectAnswer(response.data.correctAnswer);
        } else {
          throw new Error("Question or correct answer missing in API response.");
        }
      } catch (err) {
        console.error("EssayQuestionsPage: Error fetching essay question:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) { // We need courseId from location.state
      fetchEssayQuestion();
    } else {
      console.warn("EssayQuestionsPage: Course ID is missing from location.state. Cannot load question.");
      setError({ message: "Course ID is missing. Cannot load question." });
      setLoading(false);
    }
  }, [courseId]);

  const handleAnswerChange = (e) => {
    setAnswers(prev => ({
      ...prev,
      'user_answer': e.target.value
    }));
  };

  const handleQuizSubmit = async () => {
    // ----- Use currentUserId (from localStorage) for the marks API path -----
    console.log(
        "<<<<< EssayQuestionsPage: handleQuizSubmit called. Values being used: >>>>>\n",
        "currentUserId (for marks API path - from localStorage):", currentUserId, "\n", // CHANGED
        "courseId (for marks API path - from location.state):", courseId, "\n",
        "question (for eval API):", question, "\n",
        "correctAnswer (for eval API):", correctAnswer, "\n",
        "userAnswer (for eval API):", answers.user_answer
    );

    setIsAnalyzing(true);
    setIsSavingOverallMarks(false);
    setError(null);
    let essayEvaluationScoreString = null;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error("EssayQuestionsPage: Authentication token not found in localStorage.");
      setError({ message: "Authentication token not found. Please log in again." });
      setIsAnalyzing(false);
      return;
    }

    try {
      if (!question || correctAnswer === null) {
        throw new Error("Question data or Correct Answer is not loaded.");
      }
      // --- Critical check now uses currentUserId (from localStorage) ---
      if (!currentUserId || !courseId) {
        console.error("EssayQuestionsPage: User ID (MongoDB _id from localStorage) or Course ID (from location.state) is missing. Cannot proceed.");
        throw new Error("User ID or Course ID is missing. Cannot proceed.");
      }

      const userAnswerText = answers.user_answer || '';
      const formData = new FormData();
      formData.append('question', question);
      formData.append('correct_answer', correctAnswer);
      formData.append('user_answer', userAnswerText);
      // For the evaluation API, use currentUserId if it needs a user identifier
      if (currentUserId) formData.append('userId', currentUserId);
      if (courseId) formData.append('courseId', courseId);

      console.log("EssayQuestionsPage: Calling essay evaluation API...");
      const evaluationResponse = await axios.post('http://127.0.0.1:5000/api/answer_evaluation', formData);
      console.log('EssayQuestionsPage: Answer evaluation response:', evaluationResponse.data);
      
      if (!evaluationResponse.data || evaluationResponse.data.Score === undefined) {
        throw new Error("Score missing in evaluation response.");
      }
      essayEvaluationScoreString = evaluationResponse.data.Score;
      setIsAnalyzing(false);

      setIsSavingOverallMarks(true);
      try {
        // --- Use currentUserId (from localStorage) for the API path ---
        console.log(`EssayQuestionsPage: Calling overall marks API for userId: ${currentUserId}, courseId: ${courseId}`);
        const overallMarksResponse = await axios.post(
          `http://127.0.0.1:5001/marks/user/${currentUserId}/course/${courseId}`, // CHANGED
          {},
          {
            headers: { 'Authorization': `Bearer ${token}` }
          }
        );
        console.log('EssayQuestionsPage: Overall marks calculation/save response:', overallMarksResponse.data);
      } catch (overallMarksError) {
        console.error('EssayQuestionsPage: Error saving/calculating overall marks:', overallMarksError);
        let specificErrorMessage = "Could not finalize overall score.";
        if (overallMarksError.response) {
            console.error("EssayQuestionsPage: Overall Marks Error data:", overallMarksError.response.data);
            console.error("EssayQuestionsPage: Overall Marks Error status:", overallMarksError.response.status);
            specificErrorMessage = overallMarksError.response.data?.msg || `Error: ${overallMarksError.response.status}`;
            if (overallMarksError.response.status === 401) {
                specificErrorMessage = "Authentication failed while finalizing score. Please log in again.";
            } else if (overallMarksError.response.status === 403) {
                specificErrorMessage = "You are not authorized to save these marks (backend check failed).";
            }
        } else if (overallMarksError.request) {
            specificErrorMessage = "No response from server while finalizing score.";
        } else {
            specificErrorMessage = overallMarksError.message;
        }
        console.warn("EssayQuestionsPage: Non-critical error during overall marks saving:", specificErrorMessage);
      } finally {
        setIsSavingOverallMarks(false);
      }

      if (essayEvaluationScoreString) {
        console.log("EssayQuestionsPage: Navigating to ExamResult with state:", { userId: currentUserId, courseId, essayScore: essayEvaluationScoreString, fluencyScore: fluencyTestResults?.fluency_score });
        navigate("/ExamResult", { 
            state: { 
                userId: currentUserId, // Pass the correct MongoDB _id
                courseId: courseId,
                essayScore: essayEvaluationScoreString,
                fluencyScore: fluencyTestResults?.fluency_score,
            } 
        });
      } else if (!error) {
          setError({ message: "Essay evaluation did not return a score. Cannot proceed." });
      }

    } catch (err) {
      console.error('EssayQuestionsPage: Error during quiz submission process:', err);
      let errorMessage = "An error occurred during submission. Please try again.";
      if (err.response && err.response.data && (err.response.data.message || err.response.data.msg) ) {
        errorMessage = err.response.data.message || err.response.data.msg;
      } else if (err.message) {
        errorMessage = err.message;
      }
      setError({ message: errorMessage });
      setIsAnalyzing(false);
      setIsSavingOverallMarks(false);
    }
  };

  // ... (getWordCount and other UI logic remains the same) ...
  const getWordCount = (text) => {
    return text ? text.trim().split(/\s+/).filter(word => word.length > 0).length : 0;
  };

  const currentAnswer = answers.user_answer || '';
  const wordCount = getWordCount(currentAnswer);

  const isProcessing = isAnalyzing || isSavingOverallMarks;
  let processingMessage = "Evaluating...";
  if (isSavingOverallMarks) {
    processingMessage = "Finalizing results...";
  }

  if (!currentUserId && !loading && !error) { // If userId couldn't be fetched from localStorage, show error
    return (
      <ExamMonitorLayout>
        <div className="flex flex-col justify-center items-center h-screen text-red-500 p-4 text-center">
          <p className="text-lg font-semibold">User Identification Error:</p>
          <p>{error?.message || "User ID not found. Please ensure you are logged in."}</p>
          <button onClick={() => navigate("/login")} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Login
          </button>
        </div>
      </ExamMonitorLayout>
    );
  }


  if (loading) {
    return <ExamMonitorLayout><div className="flex justify-center items-center h-screen text-lg">Loading question...</div></ExamMonitorLayout>;
  }
  // Updated error condition to check currentUserId as well
  if (error && (!question || !currentUserId) && !isProcessing) {
    return <ExamMonitorLayout><div className="flex flex-col justify-center items-center h-screen text-red-500 p-4 text-center">
      <p className="text-lg font-semibold">Error:</p>
      <p>{error.message}</p>
      <button onClick={() => window.location.reload()} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Try Again
      </button>
    </div></ExamMonitorLayout>;
  }
  if (!question && !loading && !isProcessing) {
    return <ExamMonitorLayout><div className="flex justify-center items-center h-screen text-lg">No essay question available for this course.</div></ExamMonitorLayout>;
  }


  return (
    <ExamMonitorLayout>
      {/* ... (rest of your JSX remains the same) ... */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins] py-8">
        <main className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full">
             <div className="h-2.5 bg-gray-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                style={{ width: `100%` }}
              />
            </div>
            <div className="p-6 sm:p-8 relative">
              <div className="text-sm text-gray-500 mb-3">
                Question 1 of 1
              </div>
              <div className="relative overflow-hidden">
                {question && (
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
                        disabled={isProcessing}
                        aria-label="Essay answer input"
                      />
                      <div className={`text-sm mt-2 text-right font-medium ${wordCount > WORD_LIMIT ? 'text-red-600' : 'text-gray-600'}`}>
                        {wordCount} / {WORD_LIMIT} words
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {error && error.message && ( 
                <div className="mt-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">
                  Error: {error.message}
                </div>
              )}
            </div>
            <div className="px-6 sm:px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end items-center">
              {isProcessing && (
                <div className="mr-4 text-blue-600 flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {processingMessage}
                </div>
              )}
              <button
                onClick={handleQuizSubmit}
                className="bg-green-600 text-white hover:bg-green-700 px-5 py-2.5 rounded-md shadow-md hover:shadow-lg transition-all duration-200 flex items-center disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={!currentUserId || !question || isProcessing || wordCount === 0 || wordCount > WORD_LIMIT}
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