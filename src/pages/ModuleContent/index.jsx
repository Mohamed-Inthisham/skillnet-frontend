// // ModuleContent.js
// import React, { useState, useRef, useEffect } from 'react';
// import UserHeader from "../../layout/UserHeader";
// import Footer from "../../layout/Footer";
// import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
// import axios from 'axios';
// import { FaSpinner } from 'react-icons/fa';

// const ModuleContent = () => {
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [content, setContent] = useState(null);
//     const [loadingContent, setLoadingContent] = useState(true);
//     const [errorContent, setErrorContent] = useState(null);
//     const [mcqData, setMcqData] = useState(null);
//     const [loadingMcq, setLoadingMcq] = useState(true);
//     const [errorMcq, setErrorMcq] = useState(null);
//     const [answerFeedback, setAnswerFeedback] = useState('');
//     const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
//     const { contentId } = useParams(); // Get contentId from params - for fetching content
//     const location = useLocation(); // Use useLocation hook
//     const navigate = useNavigate();
//     const contents = location.state?.contents || [];
//     const courseIdFromState = location.state?.courseId; // Get courseId from location.state

//     useEffect(() => {
//         const fetchContentData = async () => {
//             setLoadingContent(true);
//             setErrorContent(null);
//             try {
//                 const response = await axios.get(`http://localhost:5001/contents/${contentId}`);
//                 setContent(response.data);
//                 setLoadingContent(false);
//             } catch (err) {
//                 setErrorContent(err);
//                 setLoadingContent(false);
//                 console.error("Error fetching content data:", err);
//             }
//         };

//         fetchContentData();
//     }, [contentId]);

//     useEffect(() => {
//         const fetchMcqData = async () => {
//             if (content) {
//                 setLoadingMcq(true);
//                 setErrorMcq(null);
//                 try {
//                     const response = await axios.get(`http://localhost:5001/contents/${contentId}/mcqs`);
//                     if (response.data && response.data.length > 0) {
//                         setMcqData(response.data[0]);
//                     } else {
//                         setMcqData(null);
//                     }
//                     setLoadingMcq(false);
//                 } catch (err) {
//                     setErrorMcq(err);
//                     setLoadingMcq(false);
//                     console.error("Error fetching MCQ data:", err);
//                 }
//             } else {
//                 setLoadingMcq(false);
//             }
//         };
//         fetchMcqData();
//     }, [content]);

//     const handleOptionSelect = (optionIndex) => {
//         console.log("handleOptionSelect called with index:", optionIndex);
//         setSelectedOption(optionIndex);
//         setAnswerFeedback('');
//         setIsAnswerCorrect(false);
//     };

//     const checkAnswer = async () => {
//         if (selectedOption === null) {
//             alert("Please select an answer before checking.");
//             return;
//         }

//         if (mcqData && mcqData._id) {
//             try {
//                 const studentAnswer = mcqData.options[selectedOption];
//                 console.log("Sending student_answer to backend:", studentAnswer, "selectedOption Index:", selectedOption);

//                 const response = await axios.post(`http://localhost:5001/mcqs/${mcqData._id}/checkAnswer`, {
//                     student_answer: studentAnswer
//                 });

//                 console.log("Full response.data from backend:", response.data);

//                 if (response.data.is_correct) {
//                     setAnswerFeedback('Correct Answer!');
//                     setIsAnswerCorrect(true);
//                 } else {
//                     setAnswerFeedback('Wrong Answer. Please try again.');
//                     setIsAnswerCorrect(false);
//                 }
//             } catch (error) {
//                 console.error("Error checking answer:", error);
//                 setAnswerFeedback('Error checking answer. Please try again later.');
//                 setIsAnswerCorrect(false);
//             }
//         } else {
//             alert("MCQ data is not available to check the answer.");
//             setIsAnswerCorrect(false);
//         }
//     };

//     const currentContentIndex = contents.findIndex(c => c._id === contentId);
//     const previousContentId = currentContentIndex > 0 ? contents[currentContentIndex - 1]._id : null;
//     const nextContentId = currentContentIndex < contents.length - 1 ? contents[currentContentIndex + 1]._id : null;
//     const isLastContent = nextContentId === null;

//     const goToPreviousContent = (e) => {
//         e.preventDefault();
//         if (previousContentId) {
//             navigate(`/module-content/${previousContentId}`, { state: { contents, courseId: courseIdFromState } }); // Pass courseIdFromState
//         }
//     };

//     const goToNextContent = (e) => {
//         e.preventDefault();
//         if (isLastContent) {
//             if (isAnswerCorrect) {
//                 console.log("isLastContent:", isLastContent);
//                 console.log("Redirecting to module page: /module/" + courseIdFromState);
//                 navigate(`/module/${courseIdFromState}`); // Redirect to specific module page using courseIdFromState
//             }
//         }
//         else if (nextContentId && isAnswerCorrect) {
//             navigate(`/module-content/${nextContentId}`, { state: { contents, courseId: courseIdFromState } }); // Pass courseIdFromState
//         }
//     };


//     if (loadingContent) {
//         return <div className="flex justify-center items-center min-h-screen">
//             <FaSpinner className="animate-spin text-blue-500 text-4xl" />
//         </div>;
//     }

//     if (errorContent) {
//         return <div className="flex justify-center items-center min-h-screen">Error fetching content: {errorContent.message}</div>;
//     }
//     if (errorMcq) {
//         return <div className="flex justify-center items-center min-h-screen">Error fetching MCQ: {errorMcq.message}</div>;
//     }

//     if (!content) {
//         return <div className="flex justify-center items-center min-h-screen">Content not found.</div>;
//     }

//     const youtubeVideoId = content.link ? content.link.split('v=')[1] : '';
//     const embedLink = youtubeVideoId ? `https://www.youtube.com/embed/${youtubeVideoId}` : '';

//     const correctAnswerIndex = mcqData?.correct_answer ? mcqData.correct_answer.charCodeAt(0) - 'A'.charCodeAt(0) : -1;

//     console.log("mcqData.correct_answer from API:", mcqData?.correct_answer);
//     console.log("Calculated correctAnswerIndex:", correctAnswerIndex);


//     return (
//         <div className="flex flex-col min-h-screen font-[Poppins]">
//             <UserHeader />

//             {/* Main Content */}
//             <main className="flex-grow p-4 bg-gray-100">
//                 <div className="container mx-auto max-w-4xl bg-white rounded-lg p-8">
//                     <h1 className="text-2xl font-semibold mb-4">{content.lesson_name || "Lesson Title Missing"}</h1>

//                     {/* Video Section */}
//                     <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
//                         <div className="relative">
//                             {embedLink ? (
//                                 <iframe
//                                     width="100%"
//                                     height="360"
//                                     src={embedLink}
//                                     title="YouTube video player"
//                                     frameBorder="0"
//                                     allowFullScreen
//                                 ></iframe>
//                             ) : (
//                                 <div className="bg-gray-800 aspect-w-16 aspect-h-9 flex justify-center items-center text-white">
//                                     {content.link ? "Error loading video" : "No video link provided"}
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     <div className="text-sm text-gray-600 text-right mb-4">
//                         Last modified: Friday, 26 July 2024, 7:45 AM
//                     </div>

//                     {/* Quiz Section */}
//                     {mcqData && !loadingMcq && !errorMcq ? (
//                         <div className="border rounded-lg p-6 mb-6">
//                             <div className="mb-6">
//                                 <h3 className="text-lg font-semibold mb-2">Question:</h3>
//                                 <p>{mcqData.question_text}</p>
//                             </div>

//                             <div className="mb-6">
//                                 <h3 className="text-lg font-semibold mb-2">Options:</h3>
//                                 <div className="grid grid-cols-2 gap-4">
//                                     {mcqData.options.map((option, index) => (
//                                         <div
//                                             key={index}
//                                             className={`bg-gray-200 p-3 rounded-lg flex items-center cursor-pointer ${selectedOption === index ? 'border-2 border-green-500' : ''} ${answerFeedback && selectedOption === index && correctAnswerIndex !== index ? 'border-2 border-red-500' : ''}`}
//                                             onClick={() => handleOptionSelect(index)}
//                                         >
//                                             <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${selectedOption === index ? 'bg-green-500' : 'border border-gray-400'}`}>
//                                                 {selectedOption === index && <span className="text-white text-xs">✓</span>}
//                                             </div>
//                                             <span>{option}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="flex justify-center">
//                                 <button
//                                     className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
//                                     onClick={checkAnswer}
//                                     disabled={answerFeedback !== ''}
//                                 >
//                                     Check Answer
//                                 </button>
//                             </div>
//                             {answerFeedback && <p className={`mt-2 text-center font-semibold ${answerFeedback === 'Correct Answer!' ? 'text-green-600' : 'text-red-600'}`}>{answerFeedback}</p>}

//                         </div>
//                     ) : loadingMcq ? (
//                         <div className="border rounded-lg p-6 mb-6 flex justify-center"> <FaSpinner className="animate-spin text-blue-500 text-2xl" /> <span className="ml-2">Loading MCQ...</span> </div>
//                     ) : errorMcq ? (
//                         <div className="border rounded-lg p-6 mb-6 text-red-600">Error fetching MCQ: {errorMcq.message}</div>
//                     ) : (
//                         <div className="border rounded-lg p-6 mb-6 text-gray-500">No quiz available for this lesson.</div>
//                     )}

//                     {/* Navigation Buttons */}
//                     <div className="flex justify-between">
//                         <button onClick={goToPreviousContent} disabled={!previousContentId} className={`border rounded-lg px-6 py-2 hover:bg-gray-100 ${!previousContentId ? 'opacity-50 cursor-not-allowed' : ''}`}>
//                             Previous
//                         </button>
//                         <button
//                             onClick={goToNextContent}
//                             disabled={!isAnswerCorrect}
//                             className={`border rounded-lg px-6 py-2 hover:bg-gray-100 ${!isAnswerCorrect ? 'opacity-50 cursor-not-allowed' : ''}`}
//                         >
//                             {isLastContent ? 'Finish' : 'Next'}
//                         </button>
//                     </div>
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default ModuleContent;


// ModuleContent.js
import React, { useState, useEffect } from 'react';
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

// Helper component for rendering video
const VideoPlayer = ({ videoLink }) => {
  const getEmbedUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    try {
      const videoUrl = new URL(url);
      if (videoUrl.hostname.includes('youtube.com') || videoUrl.hostname.includes('youtu.be')) {
        let videoId;
        if (videoUrl.hostname === 'youtu.be') {
          videoId = videoUrl.pathname.slice(1);
        } else {
          videoId = videoUrl.searchParams.get('v');
        }
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      if (videoUrl.hostname === 'vimeo.com') {
        const pathParts = videoUrl.pathname.split('/');
        const videoId = pathParts[pathParts.length -1];
        if (videoId && /^\d+$/.test(videoId)) {
          return `https://player.vimeo.com/video/${videoId}`;
        }
      }
      if (/\.(mp4|webm|ogg)$/i.test(videoUrl.pathname)) {
        return url;
      }
    } catch (e) {
      console.warn("Error parsing video URL:", e, "URL:", url);
      if (url.startsWith('/') || (!url.startsWith('http') && /\.(mp4|webm|ogg)$/i.test(url))) {
          return url;
      }
      return null;
    }
    if (/\.(mp4|webm|ogg)$/i.test(url)) {
        return url;
    }
    return null; 
  };

  const embedUrl = getEmbedUrl(videoLink);

  if (!videoLink) {
    return <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-800 flex justify-center items-center text-white rounded-lg text-center p-4">No video link provided for this lesson.</div>;
  }

  if (!embedUrl) {
    return <div className="w-full h-64 sm:h-80 md:h-96 bg-gray-800 flex justify-center items-center text-white rounded-lg text-center p-4">Could not display video. Invalid or unsupported video link: <span className="text-xs ml-2 break-all block mt-2">{videoLink}</span></div>;
  }

  // For iframe (YouTube, Vimeo)
  if (!/\.(mp4|webm|ogg)$/i.test(embedUrl)) {
    return (
      // This div controls the aspect ratio and max height
      <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */, maxHeight: '70vh' }}> 
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={embedUrl}
          title="Lesson Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  // For HTML5 <video> tag
  return (
    <div className="w-full mx-auto bg-black rounded-lg overflow-hidden">
      <video 
        controls 
        src={embedUrl} 
        className="w-full h-auto block" // 'block' to remove extra space below video
        style={{ maxHeight: '70vh', aspectRatio: '16/9', objectFit: 'contain' }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};


const ModuleContent = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [content, setContent] = useState(null);
    const [loadingContent, setLoadingContent] = useState(true);
    const [errorContent, setErrorContent] = useState(null);
    const [mcqData, setMcqData] = useState(null);
    const [loadingMcq, setLoadingMcq] = useState(true);
    const [errorMcq, setErrorMcq] = useState(null);
    const [answerFeedback, setAnswerFeedback] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const { contentId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const contents = location.state?.contents || [];
    const courseIdFromState = location.state?.courseId;

    useEffect(() => {
        const fetchContentData = async () => {
            setLoadingContent(true);
            setErrorContent(null);
            setSelectedOption(null);
            setAnswerFeedback('');
            setIsAnswerCorrect(false);
            setMcqData(null);
            try {
                const response = await axios.get(`http://localhost:5001/contents/${contentId}`);
                setContent(response.data);
                console.log("Fetched Content Data:", response.data); // Debugging line
                setLoadingContent(false);
            } catch (err) {
                setErrorContent(err);
                setLoadingContent(false);
                console.error("Error fetching content data:", err);
            }
        };

        if (contentId) {
            fetchContentData();
        }
    }, [contentId]);

    useEffect(() => {
        const fetchMcqData = async () => {
            if (content && content._id) {
                setLoadingMcq(true);
                setErrorMcq(null);
                try {
                    const response = await axios.get(`http://localhost:5001/contents/${content._id}/mcqs`);
                    if (response.data && response.data.length > 0) {
                        setMcqData(response.data[0]);
                    } else {
                        setMcqData(null);
                    }
                    setLoadingMcq(false);
                } catch (err) {
                    setErrorMcq(err);
                    setLoadingMcq(false);
                    console.error("Error fetching MCQ data:", err);
                }
            } else {
                setMcqData(null);
                setLoadingMcq(false);
            }
        };
        fetchMcqData();
    }, [content]);

    const handleOptionSelect = (optionIndex) => {
        setSelectedOption(optionIndex);
        setAnswerFeedback('');
        setIsAnswerCorrect(false);
    };

    const checkAnswer = async () => {
        if (selectedOption === null) {
            alert("Please select an answer before checking.");
            return;
        }

        if (mcqData && mcqData._id) {
            try {
                const studentAnswer = mcqData.options[selectedOption];
                const response = await axios.post(`http://localhost:5001/mcqs/${mcqData._id}/checkAnswer`, {
                    student_answer: studentAnswer
                });

                if (response.data.is_correct) {
                    setAnswerFeedback('Correct Answer!');
                    setIsAnswerCorrect(true);
                } else {
                    setAnswerFeedback('Wrong Answer. Please try again.');
                    setIsAnswerCorrect(false);
                }
            } catch (error) {
                console.error("Error checking answer:", error);
                setAnswerFeedback('Error checking answer. Please try again later.');
                setIsAnswerCorrect(false);
            }
        } else {
            alert("MCQ data is not available to check the answer.");
            setIsAnswerCorrect(false);
        }
    };

    const currentContentIndex = contents.findIndex(c => c._id === contentId);
    const previousContentId = currentContentIndex > 0 ? contents[currentContentIndex - 1]._id : null;
    const nextContentId = currentContentIndex < contents.length - 1 ? contents[currentContentIndex + 1]._id : null;
    const isLastContent = nextContentId === null;

    const goToPreviousContent = (e) => {
        e.preventDefault();
        if (previousContentId) {
            navigate(`/module-content/${previousContentId}`, { state: { contents, courseId: courseIdFromState } });
        }
    };

    const goToNextContent = (e) => {
        e.preventDefault();
        if (isLastContent) {
            if (isAnswerCorrect || !mcqData) {
                navigate(`/module/${courseIdFromState}`);
            } else {
                alert("Please answer the question correctly to proceed.");
            }
        } else if (nextContentId) {
            if (isAnswerCorrect || !mcqData) {
                 navigate(`/module-content/${nextContentId}`, { state: { contents, courseId: courseIdFromState } });
            } else {
                alert("Please answer the question correctly to proceed.");
            }
        }
    };

    if (loadingContent) {
        return <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="animate-spin text-blue-500 text-4xl" />
        </div>;
    }

    if (errorContent) {
        return <div className="flex justify-center items-center min-h-screen">Error fetching content: {errorContent.message}</div>;
    }

    if (!content) {
        return <div className="flex justify-center items-center min-h-screen">Content not found.</div>;
    }

    const correctAnswerIndex = mcqData?.correct_answer && mcqData?.options ? 
                               mcqData.options.indexOf(mcqData.correct_answer) : -1;
    
    return (
        <div className="flex flex-col min-h-screen font-[Poppins]">
            <UserHeader />

            <main className="flex-grow p-4 sm:p-6 md:p-8 bg-gray-100">
                <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-xl p-6 sm:p-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">{content.lesson_name || "Lesson Title Missing"}</h1>

                    {/* Video Section - Wrapper ensures it takes full width available */}
                    <div className="mb-8 w-full"> {/* Added w-full here */}
                        <VideoPlayer videoLink={content.link} />
                    </div>

                    {/* Quiz Section */}
                    {loadingMcq ? (
                        <div className="border rounded-lg p-6 mb-6 flex justify-center items-center text-gray-600">
                            <FaSpinner className="animate-spin text-blue-500 text-2xl" />
                            <span className="ml-3">Loading Quiz...</span>
                        </div>
                    ) : errorMcq ? (
                        <div className="border border-red-300 bg-red-50 rounded-lg p-6 mb-6 text-red-700">
                            Error loading quiz: {errorMcq.message}. You can still proceed if there's a next lesson.
                        </div>
                    ) : mcqData ? (
                        <div className="border border-gray-300 rounded-lg p-6 mb-8 shadow-md">
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-700">Quiz:</h3>
                                <p className="text-gray-700">{mcqData.question_text}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3 text-gray-700">Options:</h3>
                                <div className="space-y-3">
                                    {mcqData.options.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`
                                                p-3 rounded-lg flex items-center cursor-pointer border-2 transition-all duration-150
                                                ${selectedOption === index ? 
                                                    (isAnswerCorrect ? 'border-green-500 bg-green-50' : (answerFeedback ? 'border-red-500 bg-red-50' : 'border-blue-500 bg-blue-50')) 
                                                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}
                                                ${answerFeedback && correctAnswerIndex === index && 'border-green-500 bg-green-50'} 
                                            `}
                                            onClick={() => !answerFeedback && handleOptionSelect(index)}
                                        >
                                            <div className={`
                                                w-5 h-5 rounded-full mr-3 flex items-center justify-center text-xs font-bold flex-shrink-0
                                                ${selectedOption === index ? 
                                                    (isAnswerCorrect ? 'bg-green-500 text-white' : (answerFeedback ? 'bg-red-500 text-white' : 'bg-blue-500 text-white')) 
                                                    : 'border border-gray-400 text-gray-600'}
                                                ${answerFeedback && correctAnswerIndex === index && 'bg-green-500 text-white'}
                                            `}>
                                                {String.fromCharCode(65 + index)}
                                            </div>
                                            <span className="text-gray-800">{option}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {!answerFeedback && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        className="bg-blue-600 text-white px-8 py-2.5 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                                        onClick={checkAnswer}
                                        disabled={selectedOption === null}
                                    >
                                        Check Answer
                                    </button>
                                </div>
                            )}

                            {answerFeedback && (
                                <p className={`mt-4 text-center font-semibold text-lg ${isAnswerCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                    {answerFeedback}
                                </p>
                            )}

                        </div>
                    ) : (
                        <div className="border border-gray-300 rounded-lg p-6 mb-8 text-gray-500 italic text-center">
                            No quiz available for this lesson.
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8">
                        <button 
                            onClick={goToPreviousContent} 
                            disabled={!previousContentId} 
                            className={`
                                border border-gray-400 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors
                                ${!previousContentId ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNextContent}
                            disabled={mcqData && !isAnswerCorrect}
                            className={`
                                bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors
                                ${(mcqData && !isAnswerCorrect) ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            {isLastContent ? 'Finish Course' : 'Next Lesson'}
                        </button>
                    </div>
                </div>
            </main>
            <Footer bgColor="bg-black" textColor="text-white" />
        </div>
    );
};

export default ModuleContent;