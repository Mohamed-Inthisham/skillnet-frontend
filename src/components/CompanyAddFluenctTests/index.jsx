import React, { useState } from "react";

const CompanyAddFluencyTest = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "", duration: "", expanded: false },
    { id: 2, text: "", duration: "", expanded: false },
    { id: 3, text: "Introduce your self taking 3 minutes", duration: "3 minutes", expanded: true }
  ]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentDuration, setCurrentDuration] = useState("");
  const [testName, setTestName] = useState("");

  const handleAddQuestion = () => {
    if (currentQuestion.trim() === "") return;
    
    const newQuestion = {
      id: questions.length + 1,
      text: currentQuestion,
      duration: currentDuration || "3 minutes",
      expanded: false
    };
    
    setQuestions([...questions, newQuestion]);
    setCurrentQuestion("");
    setCurrentDuration("");
  };

  const handleExpandQuestion = (id) => {
    setQuestions(
      questions.map(q => ({
        ...q,
        expanded: q.id === id ? !q.expanded : false
      }))
    );
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const handleEditQuestion = (id, text, duration) => {
    setQuestions(
      questions.map(q => 
        q.id === id ? { ...q, text, duration } : q
      )
    );
  };

  const handleSaveTest = () => {
    // Save logic would go here
    console.log("Saving test:", { name: testName, questions });
    // Redirect or show success message
  };

  const handleDiscard = () => {
    // Reset form or redirect
    setQuestions([
      { id: 1, text: "", duration: "", expanded: false },
      { id: 2, text: "", duration: "", expanded: false },
      { id: 3, text: "Introduce your self taking 3 minutes", duration: "3 minutes", expanded: true }
    ]);
    setCurrentQuestion("");
    setCurrentDuration("");
    setTestName("");
  };

  return (
    <>
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold mb-6">Add Fluency Tests</h1>
          
          {/* Test Name Input */}
          {/* <div className="mb-6">
            <label className="block text-gray-700 mb-2">Test Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter test name"
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
            />
          </div> */}
          
          {/* Questions Section */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-4">Questions</h2>
            
            {/* Add New Question */}
            <div className="mb-4">
              <div className="mb-2">
                <label className="block text-gray-700">Question*</label>
                <textarea
                  className="w-full p-2 border rounded-md"
                  placeholder="Write your answer"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  rows={3}
                />
              </div>
              
              <div className="mb-2">
                <label className="block text-gray-700">Duration (minutes)</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  placeholder="3 minutes"
                  value={currentDuration}
                  onChange={(e) => setCurrentDuration(e.target.value)}
                />
              </div>
              
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddQuestion}
              >
                Save
              </button>
            </div>
            
            {/* Question List */}
            <div>
              <h2 className="text-lg font-bold mb-2">Question List</h2>
              
              {questions.map((question, index) => (
                <div key={question.id} className="border rounded-md mb-2">
                  <div 
                    className="p-3 flex justify-between items-center cursor-pointer"
                    onClick={() => handleExpandQuestion(question.id)}
                  >
                    <div>Question {index + 1}</div>
                    <div className="flex">
                      <span className={`transform transition-transform ${question.expanded ? 'rotate-180' : ''}`}>
                        ▼
                      </span>
                    </div>
                  </div>
                  
                  {question.expanded && (
                    <div className="p-3 border-t">
                      <div>{question.text}</div>
                      {question.duration && <div className="text-sm text-gray-500">{question.duration}</div>}
                      <div className="mt-2 flex justify-end">
                        <button 
                          className="text-blue-500 rounded-full p-1 mx-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentQuestion(question.text);
                            setCurrentDuration(question.duration);
                          }}
                        >
                          <span className="text-blue-500">✏️</span>
                        </button>
                        <button 
                          className="text-red-500 rounded-full p-1 mx-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveQuestion(question.id);
                          }}
                        >
                          <span className="text-red-500">🗑️</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <button
              className="bg-white text-red-500 border border-red-500 px-6 py-2 rounded-md"
              onClick={handleDiscard}
            >
              Discard
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-md"
              onClick={handleSaveTest}
            >
              Public
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyAddFluencyTest;