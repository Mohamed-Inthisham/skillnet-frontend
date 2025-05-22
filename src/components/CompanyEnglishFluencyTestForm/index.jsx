// // src/components/CompanyEnglishFluencyTest.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { FaEdit, FaTrash, FaSave, FaTimes, FaPlus, FaSpinner } from 'react-icons/fa';

// const CompanyEnglishFluencyTestForm = ({ courseId }) => {
//   const [fluencyTest, setFluencyTest] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isCreating, setIsCreating] = useState(false); // To show create form if no test exists
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     questions: [{ text: '' /* type: 'speaking' // Default type if needed */ }],
//   });
//   const [isSaving, setIsSaving] = useState(false);

//   //const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';
//   const getDefaultQuestion = () => ({ text: '' /* type: 'speaking' */ });

//   const fetchFluencyTest = async () => {
//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.get(`${API_URL}/courses/${courseId}/fluency_test`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.data && response.data._id) { // Check for a valid test object
//         setFluencyTest(response.data);
//         setFormData({
//           title: response.data.title || '',
//           description: response.data.description || '',
//           questions: response.data.questions && response.data.questions.length > 0 
//                      ? response.data.questions 
//                      : [getDefaultQuestion()],
//         });
//         setIsCreating(false);
//         setIsEditing(false);
//       } else {
//         // Handles 200 OK but no actual test data (e.g., null, empty object from backend)
//         setFluencyTest(null);
//         setIsCreating(true); // No test exists, switch to create mode
//         setFormData({ title: '', description: '', questions: [getDefaultQuestion()] });
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         setFluencyTest(null);
//         setIsCreating(true); // 404 means no test, switch to create mode
//         setFormData({ title: '', description: '', questions: [getDefaultQuestion()] });
//       } else {
//         toast.error(error.response?.data?.msg || "Failed to fetch fluency test.");
//         console.error("Fetch error:", error.response || error);
//         // Optionally, don't enter creating mode on other errors
//         // setIsCreating(false); 
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (courseId) {
//       fetchFluencyTest();
//     }
//   }, [courseId]);

//   const handleInputChange = (e, index, field) => {
//     const { name, value } = e.target;
//     if (name === "questions") { // Special handling for questions array
//       const updatedQuestions = formData.questions.map((q, i) => 
//         i === index ? { ...q, [field]: value } : q
//       );
//       setFormData({ ...formData, questions: updatedQuestions });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const addQuestion = () => {
//     setFormData({
//       ...formData,
//       questions: [...formData.questions, getDefaultQuestion()]
//     });
//   };

//   const removeQuestion = (index) => {
//     if (formData.questions.length <= 1) {
//         toast.warn("At least one question is required.");
//         return;
//     }
//     const updatedQuestions = formData.questions.filter((_, i) => i !== index);
//     setFormData({ ...formData, questions: updatedQuestions });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title.trim()) {
//         toast.error("Title is required.");
//         return;
//     }
//     if (formData.questions.some(q => !q.text.trim())) {
//         toast.error("All question texts are required.");
//         return;
//     }

//     setIsSaving(true);
//     const token = localStorage.getItem("accessToken");
//     // Ensure questions array is part of the payload
//     const payload = { 
//         title: formData.title,
//         description: formData.description,
//         questions: formData.questions 
//     };

//     try {
//       if (isEditing && fluencyTest && fluencyTest._id) {
//         await axios.put(`${API_URL}/fluency_tests/${fluencyTest._id}`, payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         toast.success("Fluency test updated successfully!");
//         setIsEditing(false);
//       } else {
//         const response = await axios.post(`${API_URL}/courses/${courseId}/fluency_tests`, payload, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         toast.success("Fluency test created successfully!");
//         // setFluencyTest(response.data); // Assuming backend returns the created test
//         setIsCreating(false); 
//       }
//       await fetchFluencyTest(); // Refresh data to show view mode or updated data
//     } catch (error) {
//       toast.error(error.response?.data?.msg || `Failed to ${isEditing ? 'update' : 'create'} fluency test.`);
//       console.error("Save error:", error.response || error);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!fluencyTest || !fluencyTest._id) return;
//     if (window.confirm("Are you sure you want to delete this fluency test?")) {
//       setIsSaving(true); // Use isSaving to disable delete button during operation
//       try {
//         const token = localStorage.getItem("accessToken");
//         await axios.delete(`${API_URL}/fluency_tests/${fluencyTest._id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         toast.success("Fluency test deleted successfully!");
//         setFluencyTest(null);
//         setIsEditing(false);
//         setIsCreating(true); // Switch to create mode
//         setFormData({ title: '', description: '', questions: [getDefaultQuestion()] });
//       } catch (error) {
//         toast.error(error.response?.data?.msg || "Failed to delete fluency test.");
//       } finally {
//         setIsSaving(false);
//       }
//     }
//   };

//   const startEdit = () => {
//     if (fluencyTest) {
//       // Ensure formData is populated from the current fluencyTest state for editing
//       setFormData({
//         title: fluencyTest.title || '',
//         description: fluencyTest.description || '',
//         questions: fluencyTest.questions && fluencyTest.questions.length > 0 
//                    ? fluencyTest.questions 
//                    : [getDefaultQuestion()],
//       });
//       setIsEditing(true);
//       setIsCreating(false);
//     }
//   };

//   const cancelChanges = () => {
//     setIsEditing(false);
//     if (fluencyTest) {
//       // Revert formData to current test data if editing existing
//       setFormData({
//         title: fluencyTest.title || '',
//         description: fluencyTest.description || '',
//         questions: fluencyTest.questions && fluencyTest.questions.length > 0 
//                    ? fluencyTest.questions 
//                    : [getDefaultQuestion()],
//       });
//       setIsCreating(false); // Not in create mode if a test exists
//     } else {
//       // If cancelling creation (no existing test), reset form and stay in create mode
//       setFormData({ title: '', description: '', questions: [getDefaultQuestion()] });
//       setIsCreating(true); 
//     }
//   };

//   if (isLoading) {
//     return <div className="flex justify-center items-center p-4"><FaSpinner className="animate-spin text-blue-500" size={24} /> <span className="ml-2">Loading Fluency Test...</span></div>;
//   }

//   // FORM (for creating or editing)
//   if (isEditing || isCreating) {
//     return (
//       <form onSubmit={handleSubmit} className="p-4 border rounded-md shadow-sm bg-white space-y-4">
//         <h4 className="text-lg font-semibold text-gray-700 mb-3">
//           {isEditing ? "Edit Fluency Test" : "Create New Fluency Test"}
//         </h4>
//         <div>
//           <label htmlFor="fluency-title" className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
//           <input
//             type="text"
//             name="title"
//             id="fluency-title"
//             value={formData.title}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
//         <div>
//           <label htmlFor="fluency-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//           <textarea
//             name="description"
//             id="fluency-description"
//             value={formData.description}
//             onChange={handleInputChange}
//             rows="3"
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//           />
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">Questions</label>
//           {formData.questions.map((q, index) => (
//             <div key={index} className="mb-3 p-3 border rounded-md bg-gray-50 space-y-2 relative">
//               <label htmlFor={`question-text-${index}`} className="block text-xs font-medium text-gray-600">Question {index + 1} Text*</label>
//               <textarea
//                 name="questions" // Name attribute used for generic handler logic
//                 id={`question-text-${index}`}
//                 value={q.text}
//                 onChange={(e) => handleInputChange(e, index, 'text')} // Pass 'text' as field
//                 required
//                 rows="2"
//                 placeholder={`Enter text for question ${index + 1}`}
//                 className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//               />
//               {/* Optional: Question Type (if your backend supports it)
//               <label htmlFor={`question-type-${index}`} className="block text-xs font-medium text-gray-600 mt-1">Type</label>
//               <select 
//                 name="questions"
//                 id={`question-type-${index}`}
//                 value={q.type || 'speaking'}
//                 onChange={(e) => handleInputChange(e, index, 'type')} // Pass 'type' as field
//                 className="w-full p-2 border border-gray-300 rounded-md shadow-sm"
//               >
//                 <option value="speaking">Speaking</option>
//                 <option value="reading">Reading</option>
//                 <option value="writing">Writing</option>
//               </select> 
//               */}
//               {formData.questions.length > 1 && (
//                 <button
//                   type="button"
//                   onClick={() => removeQuestion(index)}
//                   className="absolute top-1 right-1 text-red-500 hover:text-red-700 p-1"
//                   title="Remove Question"
//                 >
//                   <FaTimes size={14} />
//                 </button>
//               )}
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addQuestion}
//             className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
//           >
//             <FaPlus className="mr-1" size={14} /> Add Question
//           </button>
//         </div>

//         <div className="flex justify-end space-x-3 pt-3">
//           <button
//             type="button"
//             onClick={cancelChanges}
//             disabled={isSaving}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md shadow-sm"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isSaving}
//             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm flex items-center disabled:opacity-70"
//           >
//             {isSaving ? <FaSpinner className="animate-spin mr-2" /> : <FaSave className="mr-2" />}
//             {isEditing ? "Save Changes" : "Create Test"}
//           </button>
//         </div>
//       </form>
//     );
//   }

//   // VIEW (if test exists and not editing/creating)
//   if (fluencyTest) {
//     return (
//       <div className="p-4 border rounded-md shadow-sm bg-white">
//         <div className="flex justify-between items-center mb-3">
//           <h4 className="text-lg font-semibold text-gray-700">{fluencyTest.title || "Fluency Test"}</h4>
//           <div className="flex space-x-2">
//             <button onClick={startEdit} className="text-blue-600 hover:text-blue-800 p-1" title="Edit Test">
//               <FaEdit size={18} />
//             </button>
//             <button onClick={handleDelete} disabled={isSaving} className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50" title="Delete Test">
//               {isSaving && isEditing ? <FaSpinner className="animate-spin" /> : <FaTrash size={18} />}
//             </button>
//           </div>
//         </div>
//         <p className="text-sm text-gray-600 mb-2 whitespace-pre-wrap">{fluencyTest.description || "No description provided."}</p>
//         {fluencyTest.questions && fluencyTest.questions.length > 0 ? (
//           <div className="space-y-2">
//             <h5 className="text-md font-medium text-gray-700 mt-3">Questions:</h5>
//             {fluencyTest.questions.map((q, index) => (
//               <div key={index} className="p-3 border-l-4 border-blue-200 bg-blue-50 rounded text-sm">
//                 <p className="text-gray-800"><strong>Q{index + 1}:</strong> {q.text}</p>
//                 {/* {q.type && <p className="text-xs text-gray-500 mt-1">Type: {q.type}</p>} */}
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-sm text-gray-500">No questions have been added to this test yet.</p>
//         )}
//       </div>
//     );
//   }

//   // Fallback: Should ideally be covered by isCreating state.
//   // This might show if fetch fails and doesn't set isCreating.
//   return (
//     <div className="p-4 border rounded-md shadow-sm bg-white text-center">
//         <p className="text-gray-600 mb-3">Could not load fluency test data or no test setup.</p>
//         <button
//           onClick={() => { // Manually trigger create mode
//             setIsCreating(true);
//             setFormData({ title: '', description: '', questions: [getDefaultQuestion()] });
//           }}
//           className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md flex items-center mx-auto"
//         >
//           <FaPlus className="mr-2" /> Create Fluency Test
//         </button>
//     </div>
//   );
// };

// export default CompanyEnglishFluencyTestForm;



// src/components/CompanyEnglishFluencyTest.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaSave, FaSpinner } from 'react-icons/fa'; // Removed FaEdit, FaPlus, FaTimes as the UI is simpler

const CompanyEnglishFluencyTest = ({ courseId }) => {
  const [fluencyTestId, setFluencyTestId] = useState(null);
  const [oralQuestion, setOralQuestion] = useState(''); // Changed from questionText to oralQuestion
  const [isLoading, setIsLoading] = useState(true);
  // isEditing now just means a test record exists for this course
  const [isEditing, setIsEditing] = useState(false); 
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const fetchFluencyTestDetails = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(`${API_URL}/courses/${courseId}/fluency_test`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data._id) { // Test exists
        setFluencyTestId(response.data._id);
        // ****** KEY CHANGE: Look for 'oral_question' in the response data ******
        setOralQuestion(response.data.oral_question || ''); 
        setIsEditing(true);
      } else { // No test exists
        setFluencyTestId(null);
        setOralQuestion('');
        setIsEditing(false);
      }
    } catch (error) {
      setFluencyTestId(null);
      setOralQuestion('');
      setIsEditing(false);
      if (error.response && error.response.status === 404) {
        // Expected if no test exists yet for the course
      } else {
        toast.error(error.response?.data?.msg || "Failed to fetch fluency details.");
        console.error("Fetch error:", error.response || error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchFluencyTestDetails();
    }
  }, [courseId]);

  const handleOralQuestionChange = (e) => {
    setOralQuestion(e.target.value);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // if (!oralQuestion.trim()) { // Optional: Add validation if question cannot be empty
    //     toast.error("Fluency question cannot be empty.");
    //     return;
    // }

    setIsSaving(true);
    const token = localStorage.getItem("accessToken");
    
    try {
      if (fluencyTestId) { // Test exists, so UPDATE (PUT)
        // ****** KEY CHANGE: Send 'oral_question' in payload ******
        const payload = {
          oral_question: oralQuestion.trim(),
        };
        await axios.put(`${API_URL}/fluency_tests/${fluencyTestId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Fluency question updated successfully!");
      } else { // No test exists, so CREATE (POST)
        // ****** KEY CHANGE: Send 'oral_question' in payload ******
        // The create logic on the backend also needs to expect 'oral_question'
        // and potentially a 'title' if it's a separate entity
        const payload = {
          // title: `Fluency Test for Course ${courseId}`, // If your create_fluency_test_logic needs a title
          oral_question: oralQuestion.trim(),
        };
        const response = await axios.post(`${API_URL}/courses/${courseId}/fluency_tests`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data && response.data._id) {
            setFluencyTestId(response.data._id); // Store the new ID
        }
        toast.success("Fluency question set successfully!");
        setIsEditing(true); // Now it's an existing test
      }
      // Optionally, re-fetch to confirm, or trust the backend response if it returns the updated object
      // await fetchFluencyTestDetails(); 
    } catch (error) {
      toast.error(error.response?.data?.msg || `Failed to save fluency question.`);
      console.error("Save error:", error.response || error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!fluencyTestId) {
        toast.info("No fluency test to delete.");
        return;
    }
    if (window.confirm("Are you sure you want to delete this fluency test?")) {
      setIsSaving(true);
      try {
        const token = localStorage.getItem("accessToken");
        await axios.delete(`${API_URL}/fluency_tests/${fluencyTestId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Fluency test deleted successfully!");
        setFluencyTestId(null);
        setOralQuestion('');
        setIsEditing(false); // Back to 'create' mode (or simply "no test exists")
      } catch (error) {
        toast.error(error.response?.data?.msg || "Failed to delete fluency test.");
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center p-4"><FaSpinner className="animate-spin text-blue-500" size={24} /> <span className="ml-2">Loading Fluency Question...</span></div>;
  }

  return (
    <form onSubmit={handleSave} className="p-4 border rounded-md shadow-sm bg-white space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold text-gray-700">
          {isEditing && fluencyTestId ? "Edit Fluency Question" : "Set Fluency Question"}
        </h4>
        {fluencyTestId && (
             <button 
                type="button" 
                onClick={handleDelete} 
                disabled={isSaving} 
                className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50" 
                title="Delete Fluency Test"
            >
                {isSaving ? <FaSpinner className="animate-spin" /> : <FaTrash size={18} />}
            </button>
        )}
      </div>
      
      <div>
        <label htmlFor="fluency-oralQuestion" className="block text-sm font-medium text-gray-700 mb-1">
          Fluency Question*
        </label>
        <textarea
          name="oralQuestion"
          id="fluency-oralQuestion"
          value={oralQuestion} // This will now display the fetched oral question
          onChange={handleOralQuestionChange}
          rows="4"
          placeholder="Write the fluency question here..."
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-3">
        <button
          type="submit"
          disabled={isSaving}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm flex items-center disabled:opacity-70"
        >
          {isSaving ? <FaSpinner className="animate-spin mr-2" /> : <FaSave className="mr-2" />}
          {isEditing && fluencyTestId ? "Update Question" : "Save Question"}
        </button>
      </div>
    </form>
  );
};

export default CompanyEnglishFluencyTest;