// src/components/McqForm.jsx
import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaSpinner } from 'react-icons/fa';

const McqForm = ({ contentId, initialData, onSave, onCancel, isSaving }) => {
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']); // Default to 4 options
  const [correctAnswer, setCorrectAnswer] = useState(''); // Store as 'A', 'B', 'C', or 'D'

  useEffect(() => {
    if (initialData) {
      setQuestionText(initialData.question_text || '');
      // Ensure options array always has a consistent number of elements for the form (e.g., 4)
      // even if the backend stores a different number or if initialData.options is undefined.
      const initialOptions = initialData.options || [];
      const filledOptions = Array(4).fill('').map((_, i) => initialOptions[i] || '');
      setOptions(filledOptions);
      setCorrectAnswer(initialData.correct_answer || ''); // Expecting 'A', 'B', 'C', or 'D'
    } else {
      // Reset for adding a new MCQ
      setQuestionText('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    }
  }, [initialData]); // Re-run effect when initialData changes (e.g., when switching from add to edit)

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validations
    if (!questionText.trim()) {
      alert("Question text cannot be empty.");
      return;
    }
    // Ensure all 4 option fields are filled if you require exactly 4 options
    // Modify this if you allow variable number of options
    if (options.some(opt => !opt.trim())) {
      alert("All 4 option fields must be filled.");
      return;
    }
    const upperCaseCorrectAnswer = correctAnswer.trim().toUpperCase();
    if (!['A', 'B', 'C', 'D'].includes(upperCaseCorrectAnswer)) {
      alert("Correct answer must be a single letter: A, B, C, or D.");
      return;
    }

    const mcqPayload = {
      question_text: questionText.trim(),
      options: options.map(opt => opt.trim()), // Send trimmed options
      correct_answer: upperCaseCorrectAnswer,
    };

    // onSave will handle if it's an update (initialData._id exists) or new (contentId is used)
    onSave(mcqPayload, initialData?._id, contentId);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 mt-2 mb-3 border border-blue-300 bg-blue-50 rounded-lg shadow">
      <h4 className="text-md font-semibold mb-3 text-blue-700">
        {initialData ? 'Edit MCQ' : 'Add New MCQ'}
      </h4>
      <div className="mb-3">
        <label htmlFor={`mcq-question-${initialData?._id || 'new'}`} className="block text-sm font-medium text-gray-700 mb-1">
          Question*
        </label>
        <textarea
          id={`mcq-question-${initialData?._id || 'new'}`}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter the question"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
          rows="3"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Options (A, B, C, D)*</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <span className="mr-2 text-gray-600 font-medium">{String.fromCharCode(65 + index)}.</span>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${String.fromCharCode(65 + index)}`}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
              required
            />
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label htmlFor={`mcq-correct-answer-${initialData?._id || 'new'}`} className="block text-sm font-medium text-gray-700 mb-1">
          Correct Answer (Enter letter: A, B, C, or D)*
        </label>
        <input
          type="text"
          id={`mcq-correct-answer-${initialData?._id || 'new'}`}
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value.toUpperCase())}
          placeholder="e.g., A"
          maxLength="1" // Enforce single character for better UX, though validation handles more
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm shadow-sm"
          required
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium border border-gray-400 rounded-md hover:bg-gray-100 transition-colors flex items-center shadow-sm"
        >
          <FaTimes className="inline mr-1.5" /> Cancel
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center shadow-sm"
        >
          {isSaving ? <FaSpinner className="animate-spin mr-1.5" /> : <FaSave className="inline mr-1.5" />}
          {initialData ? 'Update MCQ' : 'Save MCQ'}
        </button>
      </div>
    </form>
  );
};

export default McqForm;