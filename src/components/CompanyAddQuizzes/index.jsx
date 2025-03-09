import React, { useState } from "react";
import CompanyHeader from "../../layout/CompanyHeader";

const CompanyAddQuizzes = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      expanded: false,
      questionText: "",
      questionType: "",
      options: ["", "", "", ""],
      answer: ""
    },
    {
      id: 2,
      expanded: false,
      questionText: "",
      questionType: "",
      options: ["", "", "", ""],
      answer: ""
    },
    {
      id: 3,
      expanded: true,
      questionText: "Which of the following is the correct syntax for declaring a variable in Java?",
      questionType: "Multiple Choice",
      options: ["int number = 10;", "int number = 10;", "int number = 10;", "int number = 10;"],
      answer: "int number = 10;"
    }
  ]);

  const [currentQuestion, setCurrentQuestion] = useState({
    questionType: "",
    questionText: "",
    options: ["", "", "", ""],
    answer: ""
  });

  const handleQuestionTypeChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      questionType: e.target.value
    });
  };

  const handleQuestionTextChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      questionText: e.target.value
    });
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions
    });
  };

  const handleAnswerChange = (e) => {
    setCurrentQuestion({
      ...currentQuestion,
      answer: e.target.value
    });
  };

  const handleSave = () => {
    const newQuestion = {
      id: questions.length + 1,
      expanded: false,
      ...currentQuestion
    };
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion({
      questionType: "",
      questionText: "",
      options: ["", "", "", ""],
      answer: ""
    });
  };

  const toggleQuestion = (id) => {
    setQuestions(
      questions.map(q => 
        q.id === id ? { ...q, expanded: !q.expanded } : { ...q, expanded: false }
      )
    );
  };

  const handleDeleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleEditQuestion = (id) => {
    // Implementation for editing questions
    console.log("Edit question", id);
  };

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Add Quizzes</h1>
        
        {/* Questions Form Section */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-lg font-bold mb-4">Questions</h2>
          
          <div className="mb-4">
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-2 mb-4">
                <label className="block text-gray-700 mb-2">
                  Question Type<span className="text-red-500">*</span>
                </label>
                <select 
                  className="w-full border rounded-md p-2"
                  value={currentQuestion.questionType}
                  onChange={handleQuestionTypeChange}
                >
                  <option value="">Choose question type</option>
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="Short Answer">Short Answer</option>
                  <option value="True/False">True/False</option>
                </select>
              </div>
              
              <div className="w-1/2 px-2 mb-4">
                <label className="block text-gray-700 mb-2">
                  Question<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  className="w-full border rounded-md p-2" 
                  placeholder="Write your question"
                  value={currentQuestion.questionText}
                  onChange={handleQuestionTextChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                Options / Answer<span className="text-red-500">*</span>
              </label>
              
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-1/2 px-2 mb-2">
                  <input 
                    type="text" 
                    className="w-full border rounded-md p-2" 
                    placeholder="Option A"
                    value={currentQuestion.options[0]}
                    onChange={(e) => handleOptionChange(0, e.target.value)}
                  />
                </div>
                <div className="w-1/2 px-2 mb-2">
                  <input 
                    type="text" 
                    className="w-full border rounded-md p-2" 
                    placeholder="Option B"
                    value={currentQuestion.options[1]}
                    onChange={(e) => handleOptionChange(1, e.target.value)}
                  />
                </div>
                <div className="w-1/2 px-2 mb-2">
                  <input 
                    type="text" 
                    className="w-full border rounded-md p-2" 
                    placeholder="Option C"
                    value={currentQuestion.options[2]}
                    onChange={(e) => handleOptionChange(2, e.target.value)}
                  />
                </div>
                <div className="w-1/2 px-2 mb-2">
                  <input 
                    type="text" 
                    className="w-full border rounded-md p-2" 
                    placeholder="Option D"
                    value={currentQuestion.options[3]}
                    onChange={(e) => handleOptionChange(3, e.target.value)}
                  />
                </div>
              </div>
              
              <textarea 
                className="w-full border rounded-md p-2" 
                rows="4" 
                placeholder="Write your answer"
                value={currentQuestion.answer}
                onChange={handleAnswerChange}
              ></textarea>
            </div>
            
            <div className="text-center">
              <button 
                className="bg-blue-500 text-white py-2 px-6 rounded-md"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
        
        {/* Question List Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-4">Question List</h2>
          
          {questions.map((question) => (
            <div key={question.id} className="border rounded-md mb-4">
              <div 
                className="flex justify-between items-center p-3 cursor-pointer"
                onClick={() => toggleQuestion(question.id)}
              >
                <span>Question {question.id}</span>
                <span>{question.expanded ? "▲" : "▼"}</span>
              </div>
              
              {question.expanded && (
                <div className="p-4 border-t">
                  <p className="mb-4">{question.questionText}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="font-semibold">A.</span> {question.options[0]}
                    </div>
                    <div>
                      <span className="font-semibold">B.</span> {question.options[1]}
                    </div>
                    <div>
                      <span className="font-semibold">C.</span> {question.options[2]}
                    </div>
                    <div>
                      <span className="font-semibold">D.</span> {question.options[3]}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      className="text-blue-500 mr-2"
                      onClick={() => handleEditQuestion(question.id)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                      </svg>
                    </button>
                    <button 
                      className="text-red-500"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          <div className="flex justify-between mt-6">
            <button className="bg-white border border-red-500 text-red-500 py-2 px-6 rounded-md">
              Discard
            </button>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-md">
              Public
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyAddQuizzes;
