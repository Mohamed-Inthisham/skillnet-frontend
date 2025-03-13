import React, { useState } from 'react';
import Button from "../Button";

const CompanyAddDescriptiveQuizzes = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    courseContent: '',
    question: '',
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
      correctAnswer: ''
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Add Exam Quizzes</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl mb-4">Add Descriptive Questions</h3>
        
        <form onSubmit={handleSubmit}>
          {/* <div className="grid grid-cols-2 gap-6 mb-6"> */}
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
                <option value="">choose course</option>
                <option value="course1">Course 1</option>
                <option value="course2">Course 2</option>
              </select>
            </div>
            
            {/* <div>
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
            </div> */}
          {/* </div> */}

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
              Correct Answer*
            </label>
            <textarea
              name="correctAnswer"
              value={formData.correctAnswer}
              onChange={handleChange}
              placeholder="Write Correct answer"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              text="Discard"
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              onClick={handleDiscard}
            />
            <Button
              text="Save"
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyAddDescriptiveQuizzes;