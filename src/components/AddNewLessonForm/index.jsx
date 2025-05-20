// src/components/AddNewLessonForm.jsx
import React, { useState } from 'react';
import { FaSave, FaTimes, FaSpinner, FaPlusCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AddNewLessonForm = ({ onSave, onCancel, courseId }) => {
  const [lessonName, setLessonName] = useState('');
  const [link, setLink] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleInternalSave = async () => {
    if (!lessonName.trim()) {
      toast.error("Lesson topic is required.");
      return;
    }
    if (!link.trim()) {
      toast.error("Video link is required.");
      return;
    }
    try {
      new URL(link); // Basic URL validation
    } catch (_) {
      toast.error("Please enter a valid video link URL (e.g., https://www.example.com).");
      return;
    }

    setIsSaving(true);
    // Backend expects a list, even for a single item, based on create_content_logic
    const newLessonData = [{ lesson_name: lessonName, link }]; 
    await onSave(newLessonData); // Pass the data to parent handler
    setIsSaving(false);
    // Optionally clear form and call onCancel if parent handles closing
    setLessonName('');
    setLink('');
    // onCancel(); // Let parent decide if form closes
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg mt-4 shadow-lg border border-blue-300">
      <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <FaPlusCircle className="mr-2 text-blue-600" /> Add New Lesson
      </h4>
      <div className="mb-4">
        <label htmlFor="new-lesson-name" className="block text-sm font-medium text-gray-700 mb-1">
          Lesson Topic
        </label>
        <input
          type="text"
          id="new-lesson-name"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter new lesson topic"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="new-lesson-link" className="block text-sm font-medium text-gray-700 mb-1">
          Video Link
        </label>
        <input
          type="text"
          id="new-lesson-link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g., https://www.youtube.com/watch?v=..."
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center"
          disabled={isSaving}
        >
          <FaTimes className="mr-2" /> Cancel
        </button>
        <button
          onClick={handleInternalSave}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center"
          disabled={isSaving}
        >
          {isSaving ? <FaSpinner className="animate-spin mr-2" /> : <FaSave className="mr-2" />}
          Add Lesson
        </button>
      </div>
    </div>
  );
};

export default AddNewLessonForm;