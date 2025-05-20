// src/components/ModuleContentEditForm.jsx
import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes, FaSpinner } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ModuleContentEditForm = ({ content, onSave, onCancel }) => {
  const [lessonName, setLessonName] = useState('');
  const [link, setLink] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (content) {
      setLessonName(content.lesson_name || '');
      setLink(content.link || '');
    }
  }, [content]);

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
      // Basic URL validation
      new URL(link);
    } catch (_) {
      toast.error("Please enter a valid video link URL (e.g., https://www.example.com).");
      return;
    }

    setIsSaving(true);
    await onSave(content._id, { lesson_name: lessonName, link });
    setIsSaving(false);
    // onCancel(); // Parent decides if form closes on save via editingContentId reset
  };

  if (!content) return null;

  return (
    <div className="p-6 bg-gray-100 rounded-b-lg mt-0 shadow-inner">
      <h4 className="text-md font-semibold text-gray-700 mb-3">Edit Lesson</h4>
      <div className="mb-4">
        <label htmlFor={`lesson-name-${content._id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Lesson Topic
        </label>
        <input
          type="text"
          id={`lesson-name-${content._id}`}
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter lesson topic"
        />
      </div>
      <div className="mb-6">
        <label htmlFor={`lesson-link-${content._id}`} className="block text-sm font-medium text-gray-700 mb-1">
          Video Link
        </label>
        <input
          type="text"
          id={`lesson-link-${content._id}`}
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
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ModuleContentEditForm;