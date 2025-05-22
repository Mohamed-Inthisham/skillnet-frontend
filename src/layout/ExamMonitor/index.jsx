// ExamMonitorLayout.jsx (Updated - Option 2)
import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle, Clock, Video, MessageSquare } from 'lucide-react';
import FaceMonitor from '../../components/FaceMonitor';
import ExamHeader from "../../layout/ExamHeader"; // Ensure this path is correct
// Removed jwtDecode import from here unless used for other purposes in this file

const ExamMonitorLayout = ({ children }) => {
    const [totalTime, setTotalTime] = useState(1800);
    const [warnings, setWarnings] = useState([]);
    const [faceStatus, setFaceStatus] = useState('Detecting...');
    const [usernameForMonitoring, setUsernameForMonitoring] = useState(null); // Initialize as null or ""
    const [analysisData, setAnalysisData] = useState(null);

    useEffect(() => {
        // Fetch username from localStorage
        const storedUsername = localStorage.getItem('username'); // This is what you set in AuthCard
        if (storedUsername) {
            setUsernameForMonitoring(storedUsername);
            console.log("Using username for monitoring:", storedUsername);
        } else {
            console.error("Username for monitoring not found in localStorage!");
            // Handle this case: maybe show an error, prevent FaceMonitor from loading, or redirect.
            // For now, FaceMonitor won't render if usernameForMonitoring is null (see conditional rendering below)
        }
    }, []); // Empty dependency array: run once on mount


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

    const handleAnalysisDataUpdate = useCallback((data) => {
        setAnalysisData(data);
    }, []);

    // Dynamic face status check
    const isUserRecognized = usernameForMonitoring && (faceStatus === `User: ${usernameForMonitoring}` || faceStatus === 'Face Detected' || (faceStatus.startsWith('User:') && faceStatus.includes(usernameForMonitoring)));


    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <ExamHeader />
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-80 bg-white shadow-lg flex flex-col font-[Poppins] overflow-y-auto">
                    {/* ... (Timer Section) ... */}
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
                            {usernameForMonitoring ? ( // Only render FaceMonitor if username is available
                                <FaceMonitor
                                    username={usernameForMonitoring}
                                    onFaceStatusChange={handleFaceStatusChange}
                                    onActivityLogUpdate={handleActivityLogUpdate}
                                    onAnalysisDataUpdate={handleAnalysisDataUpdate}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    Loading user data for monitoring...
                                </div>
                            )}
                        </div>
                        <div
                            className={`text-center p-2 rounded ${
                                isUserRecognized ? 'bg-green-100 text-green-700' :
                                faceStatus === 'Unrecognized User' ? 'bg-orange-100 text-orange-700' :
                                'bg-red-100 text-red-700'
                            }`}
                        >
                            {faceStatus}
                        </div>
                        {analysisData && (
                            <div className="mt-2 text-sm">
                                <p>Detected Percentage (last 10 mins): {analysisData.detected_percentage || 'N/A'}</p>
                                <p>Forward Percentage (last 10 mins): {analysisData.forward_percentage || 'N/A'}</p>
                            </div>
                        )}
                    </div>

                    {/* ... (Warnings Section) ... */}
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
        </div>
    );
};

export default ExamMonitorLayout;