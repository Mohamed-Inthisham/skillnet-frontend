// ExamMonitorLayout.jsx (Updated)
import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Clock, Video, MessageSquare } from 'lucide-react';
import FaceMonitor from '../../components/FaceMonitor';

const ExamMonitorLayout = ({ children }) => {
    const [totalTime, setTotalTime] = useState(480); // 8 minutes total (in seconds)
    const [warnings, setWarnings] = useState([]);
    const [faceStatus, setFaceStatus] = useState('Detecting...');
    const [usernameForMonitoring, setUsernameForMonitoring] = useState("Mohamed Inthisham"); // Example username
    const [analysisData, setAnalysisData] = useState(null); // State for analysis data

    useEffect(() => {
        const timer = setInterval(() => {
            setTotalTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleFaceStatusChange = useCallback((status) => {
        setFaceStatus(status);
    }, []);

    const handleActivityLogUpdate = useCallback((logEntry) => {
        setWarnings((prev) => [`User: ${logEntry.username}, Head Pose: ${logEntry.headPose} at ${logEntry.timestamp}`, ...prev]);
    }, []);

    const handleAnalysisDataUpdate = useCallback((data) => { // Callback for analysis data
        setAnalysisData(data);
    }, []);


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
                        <FaceMonitor
                            username={usernameForMonitoring}
                            onFaceStatusChange={handleFaceStatusChange}
                            onActivityLogUpdate={handleActivityLogUpdate}
                            onAnalysisDataUpdate={handleAnalysisDataUpdate} // Pass analysis data callback
                        />
                    </div>
                    <div
                        className={`text-center p-2 rounded ${
                          faceStatus === `User: Mohamed Inthisham` || faceStatus === 'Face Detected' || faceStatus.startsWith('User:') ? 'bg-green-100 text-green-700' :
                          faceStatus === 'Unrecognized User' ? 'bg-orange-100 text-orange-700' : // Orange for "Unrecognized User"
                          'bg-red-100 text-red-700' // Red for other errors (including Backend Error)
                      }`}
                  >
                        {faceStatus}
                    </div>
                    {analysisData && ( // Display analysis data if available
                        <div className="mt-2 text-sm">
                            <p>Detected Percentage (last 10 mins): {analysisData.detected_percentage || 'N/A'}</p>
                            <p>Forward Percentage (last 10 mins): {analysisData.forward_percentage || 'N/A'}</p>
                        </div>
                    )}
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