import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Timer } from 'lucide-react';
import UserHeader from "../../layout/UserHeader";

const sampleQuiz = {
  questions: [
    {
      id: 1,
      question: "Explain the concept of Object-Oriented Programming.",
      timeLimit: 200, 
    },
    {
      id: 2,
      question: "What are the key differences between REST and GraphQL?",
      timeLimit: 200,
    },
    {
      id: 3,
      question: "Describe the principles of clean code architecture.",
      timeLimit: 200,
    }
  ]
};

const EssayQuestionsPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [slideDirection, setSlideDirection] = useState('right');
  const [timeLeft, setTimeLeft] = useState(sampleQuiz.questions[0].timeLimit);
  const [isSliding, setIsSliding] = useState(false);
  const WORD_LIMIT = 50; // Maximum word limit

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex]);

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuiz.questions.length - 1 && !isSliding) {
      setIsSliding(true);
      setSlideDirection('right');
      const nextIndex = currentQuestionIndex + 1;
      setTimeout(() => {
        setCurrentQuestionIndex(nextIndex);
        setTimeLeft(sampleQuiz.questions[nextIndex].timeLimit);
        setTimeout(() => {
          setIsSliding(false);
        }, 50);
      }, 300);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0 && !isSliding) {
      setIsSliding(true);
      setSlideDirection('left');
      const prevIndex = currentQuestionIndex - 1;
      setTimeout(() => {
        setCurrentQuestionIndex(prevIndex);
        setTimeLeft(sampleQuiz.questions[prevIndex].timeLimit);
        setTimeout(() => {
          setIsSliding(false);
        }, 50);
      }, 300);
    }
  };

  const handleAnswerChange = (e) => {
    setAnswers(prev => ({
      ...prev,
      [sampleQuiz.questions[currentQuestionIndex].id]: e.target.value
    }));
  };

  const handleQuizSubmit = () => {
    console.log('Quiz submitted:', answers);
    // Handle the quiz submission here
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getWordCount = (text) => {
    return text ? text.trim().split(/\s+/).length : 0;
  };

  const currentAnswer = answers[sampleQuiz.questions[currentQuestionIndex].id] || '';
  const wordCount = getWordCount(currentAnswer);

  return (
    <div className="min-h-screen bg-gray-50">
      <UserHeader />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Progress bar */}
          <div className="h-2 bg-gray-200">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / sampleQuiz.questions.length) * 100}%` }}
            />
          </div>

          {/* Question content */}
          <div className="p-6 relative">
            {/* Timer */}
            <div className="flex items-center justify-end mb-4 text-gray-600">
              <Timer className="w-5 h-5 mr-2" />
              <span className="font-mono">{formatTime(timeLeft)}</span>
            </div>

            {/* Question number */}
            <div className="text-sm text-gray-500 mb-2">
              Question {currentQuestionIndex + 1} of {sampleQuiz.questions.length}
            </div>

            {/* Questions container */}
            <div className="relative overflow-hidden">
              {/* Current question */}
              <div
                className={`transform transition-all duration-300 ${
                  isSliding
                    ? slideDirection === 'right'
                      ? '-translate-x-full opacity-0'
                      : 'translate-x-full opacity-0'
                    : 'translate-x-0 opacity-100'
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-medium text-gray-900">
                    {sampleQuiz.questions[currentQuestionIndex].question}
                  </h2>
                  <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">
                    (With in {WORD_LIMIT} Words)
                  </span>
                </div>

                <div className="relative">
                  <textarea
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Type your answer here..."
                    value={currentAnswer}
                    onChange={handleAnswerChange}
                    disabled={isSliding}
                  />
                  <div className={`text-sm mt-2 text-right ${wordCount > WORD_LIMIT ? 'text-red-500' : 'text-gray-500'}`}>
                    {wordCount} / {WORD_LIMIT} words
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || isSliding}
              className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                currentQuestionIndex === 0 || isSliding
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>

            {currentQuestionIndex === sampleQuiz.questions.length - 1 ? (
              <button
                onClick={handleQuizSubmit}
                className="bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md transition-all duration-200 flex items-center"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === sampleQuiz.questions.length - 1 || isSliding}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
                  currentQuestionIndex === sampleQuiz.questions.length - 1 || isSliding
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EssayQuestionsPage;