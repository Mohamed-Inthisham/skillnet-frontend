import React, { useState, useRef } from 'react';
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import { Link } from 'react-router-dom';
import { FaLock, FaCaretDown, FaSpinner, FaEdit, FaTrash, FaUpload, FaSave } from "react-icons/fa";

const ModuleContentEdiPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isEditingQuestion, setIsEditingQuestion] = useState(false);
  const [isEditingVideo, setIsEditingVideo] = useState(false); 
  const [videoSrc, setVideoSrc] = useState("sample-video.mp4"); 
  const [question, setQuestion] = useState("Which of the following is the correct syntax for declaring a variable in Java?"); // State for question
  const [options, setOptions] = useState([
    "int number = 10;",
    "var number = 10;",
    "number = 10;",
    "integer number = 10;"
  ]); 
  const videoRef = useRef(null);

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  // Video control functions
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleDurationChange = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const seekTime = (e.nativeEvent.offsetX / e.target.clientWidth) * duration;
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  // Format time in MM:SS format
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle video file upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newVideoSrc = URL.createObjectURL(file);
      setVideoSrc(newVideoSrc);
      setIsEditingVideo(false); 
    }
  };

  const handleSaveQuestion = () => {
    setIsEditingQuestion(false); 
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Main Content */}
      <main className="flex-grow p-4">
        <div className="container mx-auto max-w-4xl bg-white rounded-lg p-8">
          <h1 className="text-2xl font-semibold mb-4">Java Syntax</h1>
          
          {/* Video Section */}
          <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
            <div className="relative">
              <video 
                ref={videoRef}
                className="w-full"
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                onClick={togglePlay}
                poster="/api/placeholder/640/360"
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Play overlay - visible when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5v10l7-5-7-5z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="bg-gray-800 p-2 flex flex-col text-white">
              <div 
                className="h-1 bg-gray-600 w-full cursor-pointer mb-2"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-red-500" 
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-1 hover:bg-gray-700 rounded"
                    onClick={togglePlay}
                  >
                    {isPlaying ? 
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg> : 
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    }
                  </button>
                  <button 
                    className="p-1 hover:bg-gray-700 rounded"
                    onClick={toggleMute}
                  >
                    {isMuted ? 
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg> : 
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                      </svg>
                    }
                  </button>
                  <span className="text-xs">
                    {formatTime(currentTime)} / {formatTime(duration)} • JavaClass
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    className="p-1 hover:bg-gray-700 rounded"
                    onClick={() => setIsEditingVideo(!isEditingVideo)}
                  >
                    {isEditingVideo ? "Cancel" : "Uplod New Video"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Upload Section */}
          {isEditingVideo && (
            <div className="border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Upload New Video:</h3>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="w-full p-2 border rounded-lg mb-4"
              />
            </div>
          )}
          
          {/* Question Edit Section */}
          {isEditingQuestion && (
            <div className="border rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Edit Question:</h3>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-2 border rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Edit Options:</h3>
              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  className="w-full p-2 border rounded-lg mb-2"
                />
              ))}
              <button 
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                onClick={handleSaveQuestion}
              >
                Save Changes
              </button>
            </div>
          )}
          
          <div className="text-sm text-gray-600 text-right mb-4">
            Last modified: Friday, 26 July 2024, 7:45 AM
          </div>
          
          {/* Quiz Section */}
          <div className="border rounded-lg p-6 mb-6">
            <button 
                className="text-blue-500 hover:text-blue-700 ml-182"
                onClick={() => setIsEditingQuestion(!isEditingQuestion)}
            >
                {isEditingQuestion ? "Cancel": <FaEdit size={18} /> }
            </button>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Question:</h3>
              <p>{question}</p>
            </div>

            
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Options:</h3>
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <div 
                    key={index}
                    className={`bg-gray-200 p-3 rounded-lg flex items-center ${selectedOption === index ? 'border-2 border-green-500' : ''}`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${selectedOption === index ? 'bg-green-500' : 'border border-gray-400'}`}>
                      {selectedOption === index && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span>{String.fromCharCode(65 + index)}. {option}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModuleContentEdiPage;