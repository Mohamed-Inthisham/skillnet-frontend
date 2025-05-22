// src/components/CompanyEssayQuestionForm.jsx
import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaSpinner } from 'react-icons/fa';

const CompanyEssayQuestionForm = ({ courseId, initialData, onSave, onCancel, isSaving }) => {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question || '');
      setCorrectAnswer(initialData.correctAnswer || '');
    } else {
      // Reset for new form
      setQuestion('');
      setCorrectAnswer('');
    }
    setErrors({}); // Clear errors when initialData changes or form is reset
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};
    if (!question.trim()) newErrors.question = "Question text is required.";
    if (!correctAnswer.trim()) newErrors.correctAnswer = "Correct answer is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ question, correctAnswer });
    }
  };

  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">
        {initialData ? 'Edit Essay Question' : 'Add New Essay Question'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="essay-question" className="block text-sm font-medium text-gray-700 mb-1">
            Question*
          </label>
          <textarea
            id="essay-question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter the essay question"
            className={`w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.question ? 'border-red-500' : 'border-gray-300'}`}
            rows="3"
          />
          {errors.question && <p className="text-red-500 text-xs mt-1">{errors.question}</p>}
        </div>

        <div>
          <label htmlFor="essay-correctAnswer" className="block text-sm font-medium text-gray-700 mb-1">
            Correct Answer / Model Answer*
          </label>
          <textarea
            id="essay-correctAnswer"
            name="correctAnswer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            placeholder="Enter the correct or model answer for the essay question"
            className={`w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${errors.correctAnswer ? 'border-red-500' : 'border-gray-300'}`}
            rows="5"
          />
          {errors.correctAnswer && <p className="text-red-500 text-xs mt-1">{errors.correctAnswer}</p>}
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            <FaTimes className="mr-1.5 inline-block" /> Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center"
          >
            {isSaving ? (
              <FaSpinner className="animate-spin mr-1.5" />
            ) : (
              <FaSave className="mr-1.5" />
            )}
            {initialData ? 'Update Question' : 'Save Question'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyEssayQuestionForm;