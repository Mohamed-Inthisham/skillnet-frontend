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
  const WORD_LIMIT = 50;
  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.state?.courseId;
  const [evaluationScore, setEvaluationScore] = useState(null); // State to store evaluation score

  useEffect(() => {
    const fetchEssayQuestion = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5001/courses/${courseId}/essay_question`);
        console.log("Fetched Essay Question Data:", response.data);
        setQuestion(response.data.question);
        setCorrectAnswer(response.data.correctAnswer);
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
      setError({ message: "Course ID is missing." });
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
    setIsAnalyzing(true);
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

      const response = await axios.post('http://127.0.0.1:5000/api/answer_evaluation', formData);
      console.log('Answer evaluation response:', response.data);
      setEvaluationScore(response.data.Score); // Store the score
      setIsAnalyzing(false);
      navigate("/ExamResult", { state: { evaluationScore: response.data.Score } }); // Pass score to ExamResults

    } catch (err) {
      console.error('Error submitting answer for evaluation:', err);
      setError({ message: "Failed to submit answer for evaluation. Please try again." });
      setIsAnalyzing(false);
    }
  };

  const getWordCount = (text) => {
    return text ? text.trim().split(/\s+/).length : 0;
  };

  const currentAnswer = answers.user_answer || '';
  const wordCount = getWordCount(currentAnswer);

  if (loading) {
    return (
      <ExamMonitorLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins]">
          <div>Loading question...</div>
        </div>
      </ExamMonitorLayout>
    );
  }

  if (error) {
    return (
      <ExamMonitorLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins]">
          <div>Error loading question: {error.message}</div>
        </div>
      </ExamMonitorLayout>
    );
  }

  if (!question) {
    return (
      <ExamMonitorLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins]">
          <div>Question not found for this course.</div>
        </div>
      </ExamMonitorLayout>
    );
  }

  return (
    <ExamMonitorLayout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-[Poppins]">
        <main className="max-w-4xl w-full px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full">
            <div className="h-2 bg-gray-200">
              <div
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `100%` }}
              />
            </div>

            <div className="p-6 relative">
              <div className="text-sm text-gray-500 mb-2">
                Question 1 of 1
              </div>

              <div className="relative overflow-hidden">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium text-gray-900">
                      {question}
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
                      disabled={isAnalyzing}
                    />
                    <div className={`text-sm mt-2 text-right ${wordCount > WORD_LIMIT ? 'text-red-500' : 'text-gray-500'}`}>
                      {wordCount} / {WORD_LIMIT} words
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
              <button
                onClick={handleQuizSubmit}
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-200 flex items-center"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Submit Quiz'}
              </button>
            </div>
          </div>
          {isAnalyzing && (
            <div className="mt-4 text-center text-blue-500">
              Analyzing...
            </div>
          )}
        </main>
      </div>
    </ExamMonitorLayout>
  );
};

export default EssayQuestionsPage;