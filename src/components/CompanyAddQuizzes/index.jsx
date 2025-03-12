import React, { useState } from 'react';

const CompanyAddQuizzes = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseContent: '',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const handleDiscard = () => {
    setFormData({
      courseName: '',
      courseContent: '',
      question: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: ''
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Quizzes</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl mb-4">Questions</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name*
              </label>
              <select
                name="courseName"
                value={formData.courseName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">choose question type</option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Content*
              </label>
              <select
                name="courseContent"
                value={formData.courseContent}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">choose question type</option>
                <option value="content1">Content 1</option>
                <option value="content2">Content 2</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question*
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="write your question"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Options / Answer*
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="optionA"
                value={formData.optionA}
                onChange={handleChange}
                placeholder="option A"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="optionB"
                value={formData.optionB}
                onChange={handleChange}
                placeholder="option B"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="optionC"
                value={formData.optionC}
                onChange={handleChange}
                placeholder="option C"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="optionD"
                value={formData.optionD}
                onChange={handleChange}
                placeholder="option D"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correct Answer*
            </label>
            <input
              type="text"
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              placeholder="Write correct answer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleDiscard}
              className="px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default CompanyAddQuizzes;