import React, { useState, useRef } from 'react';
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import { Link } from 'react-router-dom';

const ModuleContent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);
  
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  
  const checkAnswer = () => {
    // Answer checking logic here
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

  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      
      {/* Main Content */}
      <main className="flex-grow p-4">
        <div className="container mx-auto max-w-4xl bg-white rounded-lg p-8">
          <h1 className="text-2xl font-semibold mb-4">Java Syntax</h1>
          
          {/* Video Section */}
          <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
            
            
            {/* Actual video player */}
            <div className="relative">
              <video 
                ref={videoRef}
                className="w-full"
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDurationChange}
                onClick={togglePlay}
                poster="/api/placeholder/640/360"
              >
                {/* Replace with your actual video source */}
                <source src="sample-video.mp4" type="video/mp4" />
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
              {/* Progress bar */}
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
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="p-1 hover:bg-gray-700 rounded">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 text-right mb-4">
            Last modified: Friday, 26 July 2024, 7:45 AM
          </div>
          
          {/* Quiz Section */}
          <div className="border rounded-lg p-6 mb-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Question:</h3>
              <p>Which of the following is the correct syntax for declaring a variable in Java?</p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Options:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className={`bg-gray-200 p-3 rounded-lg flex items-center ${selectedOption === 0 ? 'border-2 border-green-500' : ''}`}
                  onClick={() => handleOptionSelect(0)}
                >
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${selectedOption === 0 ? 'bg-green-500' : 'border border-gray-400'}`}>
                    {selectedOption === 0 && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span>A. int number = 10;</span>
                </div>
                
                <div 
                  className={`bg-gray-200 p-3 rounded-lg flex items-center ${selectedOption === 1 ? 'border-2 border-green-500' : ''}`}
                  onClick={() => handleOptionSelect(1)}
                >
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${selectedOption === 1 ? 'bg-green-500' : 'border border-gray-400'}`}>
                    {selectedOption === 1 && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span>B. var number = 10;</span>
                </div>
                
                <div 
                  className={`bg-gray-200 p-3 rounded-lg flex items-center ${selectedOption === 2 ? 'border-2 border-green-500' : ''}`}
                  onClick={() => handleOptionSelect(2)}
                >
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${selectedOption === 2 ? 'bg-green-500' : 'border border-gray-400'}`}>
                    {selectedOption === 2 && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span>C. number = 10;</span>
                </div>
                
                <div 
                  className={`bg-gray-200 p-3 rounded-lg flex items-center ${selectedOption === 3 ? 'border-2 border-green-500' : ''}`}
                  onClick={() => handleOptionSelect(3)}
                >
                  <div className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${selectedOption === 3 ? 'bg-green-500' : 'border border-gray-400'}`}>
                    {selectedOption === 3 && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span>D. integer number = 10;</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button 
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
                onClick={checkAnswer}
              >
                Check Answer
              </button>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Link to="/previous" className="border rounded-lg px-6 py-2 hover:bg-gray-100">Previous</Link>
            <Link to="/next" className="border rounded-lg px-6 py-2 hover:bg-gray-100">Next</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ModuleContent;