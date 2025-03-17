// ModuleContent.js
import React, { useState, useRef, useEffect } from 'react';
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import { useParams, useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';

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
    const { contentId } = useParams(); // Get contentId from params - for fetching content
    const location = useLocation(); // Use useLocation hook
    const navigate = useNavigate();
    const contents = location.state?.contents || [];
    const courseIdFromState = location.state?.courseId; // Get courseId from location.state

    useEffect(() => {
        const fetchContentData = async () => {
            setLoadingContent(true);
            setErrorContent(null);
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

        fetchContentData();
    }, [contentId]);

    useEffect(() => {
        const fetchMcqData = async () => {
            if (content) {
                setLoadingMcq(true);
                setErrorMcq(null);
                try {
                    const response = await axios.get(`http://localhost:5001/contents/${contentId}/mcqs`);
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
                setLoadingMcq(false);
            }
        };
        fetchMcqData();
    }, [content]);

    const handleOptionSelect = (optionIndex) => {
        console.log("handleOptionSelect called with index:", optionIndex);
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
                console.log("Sending student_answer to backend:", studentAnswer, "selectedOption Index:", selectedOption);

                const response = await axios.post(`http://localhost:5001/mcqs/${mcqData._id}/checkAnswer`, {
                    student_answer: studentAnswer
                });

                console.log("Full response.data from backend:", response.data);

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
            navigate(`/module-content/${previousContentId}`, { state: { contents, courseId: courseIdFromState } }); // Pass courseIdFromState
        }
    };

    const goToNextContent = (e) => {
        e.preventDefault();
        if (isLastContent) {
            if (isAnswerCorrect) {
                console.log("isLastContent:", isLastContent);
                console.log("Redirecting to module page: /module/" + courseIdFromState);
                navigate(`/module/${courseIdFromState}`); // Redirect to specific module page using courseIdFromState
            }
        }
        else if (nextContentId && isAnswerCorrect) {
            navigate(`/module-content/${nextContentId}`, { state: { contents, courseId: courseIdFromState } }); // Pass courseIdFromState
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
    if (errorMcq) {
        return <div className="flex justify-center items-center min-h-screen">Error fetching MCQ: {errorMcq.message}</div>;
    }

    if (!content) {
        return <div className="flex justify-center items-center min-h-screen">Content not found.</div>;
    }

    const youtubeVideoId = content?.link ? (() => {
        try {
            const url = new URL(content.link);
            const params = new URLSearchParams(url.search);
            return params.get('v');
        } catch (e) {
            console.error("Error parsing URL:", e);
            return null; // Handle invalid URL
        }
    })() : '';
    console.log("Extracted youtubeVideoId:", youtubeVideoId); // Debugging line
    const embedLink = youtubeVideoId ? `https://www.youtube.com/embed/${youtubeVideoId}` : '';
    console.log("Constructed embedLink:", embedLink); // Debugging line


    const correctAnswerIndex = mcqData?.correct_answer ? mcqData.correct_answer.charCodeAt(0) - 'A'.charCodeAt(0) : -1;

    console.log("mcqData.correct_answer from API:", mcqData?.correct_answer);
    console.log("Calculated correctAnswerIndex:", correctAnswerIndex);


    return (
        <div className="flex flex-col min-h-screen font-[Poppins]">
            <UserHeader />

            {/* Main Content */}
            <main className="flex-grow p-4 bg-gray-100">
                <div className="container mx-auto max-w-4xl bg-white rounded-lg p-8">
                    <h1 className="text-2xl font-semibold mb-4">{content.lesson_name || "Lesson Title Missing"}</h1>

                    {/* Video Section */}
                    <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
                        <div className="relative">
                            {embedLink ? (
                                <iframe
                                    width="100%"
                                    height="360"
                                    src={embedLink}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="bg-gray-800 aspect-w-16 aspect-h-9 flex justify-center items-center text-white">
                                    {content.link ? "Error loading video" : "No video link provided"}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 text-right mb-4">
                        Last modified: Friday, 26 July 2024, 7:45 AM
                    </div>

                    {/* Quiz Section */}
                    {mcqData && !loadingMcq && !errorMcq ? (
                        <div className="border rounded-lg p-6 mb-6">
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Question:</h3>
                                <p>{mcqData.question_text}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">Options:</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {mcqData.options.map((option, index) => (
                                        <div
                                            key={index}
                                            className={`bg-gray-200 p-3 rounded-lg flex items-center cursor-pointer ${selectedOption === index ? 'border-2 border-green-500' : ''} ${answerFeedback && selectedOption === index && correctAnswerIndex !== index ? 'border-2 border-red-500' : ''}`}
                                            onClick={() => handleOptionSelect(index)}
                                        >
                                            <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${selectedOption === index ? 'bg-green-500' : 'border border-gray-400'}`}>
                                                {selectedOption === index && <span className="text-white text-xs">✓</span>}
                                            </div>
                                            <span>{option}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <button
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                                    onClick={checkAnswer}
                                    disabled={answerFeedback !== ''}
                                >
                                    Check Answer
                                </button>
                            </div>
                            {answerFeedback && <p className={`mt-2 text-center font-semibold ${answerFeedback === 'Correct Answer!' ? 'text-green-600' : 'text-red-600'}`}>{answerFeedback}</p>}

                        </div>
                    ) : loadingMcq ? (
                        <div className="border rounded-lg p-6 mb-6 flex justify-center"> <FaSpinner className="animate-spin text-blue-500 text-2xl" /> <span className="ml-2">Loading MCQ...</span> </div>
                    ) : errorMcq ? (
                        <div className="border rounded-lg p-6 mb-6 text-red-600">Error fetching MCQ: {errorMcq.message}</div>
                    ) : (
                        <div className="border rounded-lg p-6 mb-6 text-gray-500">No quiz available for this lesson.</div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between">
                        <button onClick={goToPreviousContent} disabled={!previousContentId} className={`border rounded-lg px-6 py-2 hover:bg-gray-100 ${!previousContentId ? 'opacity-50 cursor-not-allowed' : ''}`}>
                            Previous
                        </button>
                        <button
                            onClick={goToNextContent}
                            disabled={!isAnswerCorrect}
                            className={`border rounded-lg px-6 py-2 hover:bg-gray-100 ${!isAnswerCorrect ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLastContent ? 'Finish' : 'Next'}
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ModuleContent;