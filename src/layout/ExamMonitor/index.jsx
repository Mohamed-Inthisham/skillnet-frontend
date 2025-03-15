import React, { useState, useEffect } from 'react';
import { AlertCircle, Clock, Video, MessageSquare } from 'lucide-react';

const ExamMonitorLayout = ({ children }) => {
  const [totalTime, setTotalTime] = useState(480); // 8 minutes total (in seconds)
  const [warnings, setWarnings] = useState([]);
  const [faceStatus, setFaceStatus] = useState('Detecting...');

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulated face detection status updates
  useEffect(() => {
    const statuses = ['Face Detected', 'Looking Away', 'Multiple Faces', 'Face Detected'];
    let currentIndex = 0;

    const faceDetectionSimulator = setInterval(() => {
      setFaceStatus(statuses[currentIndex]);
      if (statuses[currentIndex] !== 'Face Detected') {
        setWarnings((prev) => [`${statuses[currentIndex]} detected at ${new Date().toLocaleTimeString()}`, ...prev]);
      }
      currentIndex = (currentIndex + 1) % statuses.length;
    }, 5000);

    return () => clearInterval(faceDetectionSimulator);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg flex flex-col font-[Poppins]">
        {/* Timer Section */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Total Time Remaining
            </h3>
          </div>
          <div className="text-3xl font-mono text-center text-blue-600">
            {formatTime(totalTime)}
          </div>
        </div>

        {/* Face Detection Section */}
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Video className="w-5 h-5 mr-2" />
            Face Detection
          </h3>
          <div className="aspect-video bg-gray-100 rounded-lg mb-2 overflow-hidden">
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              Camera Preview
            </div>
          </div>
          <div
            className={`text-center p-2 rounded ${
              faceStatus === 'Face Detected' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}
          >
            {faceStatus}
          </div>
        </div>

        {/* Warnings Section */}
        <div className="flex-1 p-4 overflow-auto">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Activity Log
          </h3>
          <div className="space-y-2">
            {warnings.map((warning, index) => (
              <div key={index} className="flex items-start p-2 bg-yellow-50 rounded text-sm">
                <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

export default ExamMonitorLayout;
