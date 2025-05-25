// ExamMonitorLayout.jsx (Fully Updated)
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AlertCircle, Clock, Video, MessageSquare } from 'lucide-react';
import FaceMonitor from '../../components/FaceMonitor'; // Ensure this path is correct
import ExamHeader from "../../layout/ExamHeader"; // Ensure this path is correct

const ExamMonitorLayout = ({ children }) => {
    const [totalTime, setTotalTime] = useState(1800); // 30 minutes
    const [warnings, setWarnings] = useState([]);
    const [faceStatus, setFaceStatus] = useState('Detecting...');
    const [usernameForMonitoring, setUsernameForMonitoring] = useState(null);
    const [analysisData, setAnalysisData] = useState(null);

    // State and refs for unrecognized user warning
    const [unrecognizedDuration, setUnrecognizedDuration] = useState(0);
    const unrecognizedTimerRef = useRef(null);
    const currentUnrecognizedStreakRef = useRef(0);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsernameForMonitoring(storedUsername);
            console.log("Using username for monitoring:", storedUsername);
        } else {
            console.error("Username for monitoring not found in localStorage!");
            setWarnings(prev => ["Error: Username for monitoring not found. Face monitoring may not work correctly.", ...prev].slice(0,50));
        }
    }, []);

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
        setWarnings((prev) => [`User: ${logEntry.username}, Head Pose: ${logEntry.headPose} at ${logEntry.timestamp}`, ...prev].slice(0, 50)); // Keep last 50 warnings
    }, []);

    const handleAnalysisDataUpdate = useCallback((data) => {
        setAnalysisData(data);
    }, []);

    // Stricter definition: "Face Detected" (generic) does NOT count as the *matching user* being recognized.
    const isUserRecognized = usernameForMonitoring &&
        (
            faceStatus === `User: ${usernameForMonitoring}` ||
            (faceStatus.startsWith('User:') && faceStatus.includes(usernameForMonitoring))
        );

    // Effect for handling unrecognized user timer and warnings in Activity Log
    useEffect(() => {
        if (usernameForMonitoring && !isUserRecognized) {
            // User is expected but not recognized
            if (!unrecognizedTimerRef.current) { // Start interval only if not already running
                console.log("User not recognized, starting warning timer.");
                currentUnrecognizedStreakRef.current = 0; // Reset streak for this period

                unrecognizedTimerRef.current = setInterval(() => {
                    currentUnrecognizedStreakRef.current += 1;
                    const seconds = currentUnrecognizedStreakRef.current;
                    setUnrecognizedDuration(seconds); // Update state for UI display

                    // Warning logic for Activity Log: every 5 seconds, with a special one at 20 seconds
                    if (seconds > 0 && seconds % 5 === 0) {
                        if (seconds === 20) {
                            setWarnings(prev => [`Critical (Log): User not recognized for 20 seconds. Please adjust.`, ...prev].slice(0, 50));
                        } else if (seconds > 20 && seconds < 40) { // Update this if termination logic changes
                            setWarnings(prev => [`Warning (Log): User continuously not recognized for ${seconds} seconds.`, ...prev].slice(0, 50));
                        } else if (seconds < 20) { // 5, 10, 15 seconds
                            setWarnings(prev => [`Warning (Log): User not recognized for ${seconds} seconds.`, ...prev].slice(0, 50));
                        }
                        // At 40 seconds, you might trigger termination or a final critical warning.
                        // For now, this effect only manages activity log warnings and duration.
                        // Actual termination logic would be placed here if `seconds >= 40`.
                    }
                }, 1000); // Runs every second
            }
        } else {
            // User is recognized, or no user to monitor, or monitoring stopped
            if (unrecognizedTimerRef.current) {
                console.log("User recognized or monitoring stopped. Clearing warning timer.");
                clearInterval(unrecognizedTimerRef.current);
                unrecognizedTimerRef.current = null;
                if (currentUnrecognizedStreakRef.current > 0) { // If they were previously unrecognized
                    setWarnings(prev => [
                        `User recognition restored.`,
                        ...prev.filter(w =>
                            !w.includes('User not recognized') &&
                            !w.includes('User continuously not recognized')
                        )
                    ].slice(0, 50));
                }
                currentUnrecognizedStreakRef.current = 0;
                setUnrecognizedDuration(0); // Reset duration
            }
        }

        // Cleanup function for the effect
        return () => {
            if (unrecognizedTimerRef.current) {
                clearInterval(unrecognizedTimerRef.current);
                unrecognizedTimerRef.current = null;
            }
        };
    }, [isUserRecognized, usernameForMonitoring, setWarnings]);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <ExamHeader />
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-80 bg-white shadow-lg flex flex-col font-[Poppins] overflow-y-auto">
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
                            {usernameForMonitoring ? (
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
                                faceStatus === 'No Face Detected' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700' // For 'Detecting...' or generic 'Face Detected'
                            }`}
                        >
                            {faceStatus}
                        </div>
                        {usernameForMonitoring && !isUserRecognized && unrecognizedDuration > 0 && (
                            <div className="mt-2 text-sm text-center text-orange-600">
                                Unrecognized for: {unrecognizedDuration}s
                            </div>
                        )}

                        {/* CRITICAL UI WARNING MESSAGE */}
                        {usernameForMonitoring && !isUserRecognized && unrecognizedDuration >= 20 && unrecognizedDuration < 40 && (
                            <div className="mt-3 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm text-center shadow">
                                <p className="font-bold text-base">CRITICAL WARNING</p>
                                <p className="mt-1">
                                    You have been unrecognized for {unrecognizedDuration} seconds.
                                </p>
                                <p className="mt-1">
                                    If this continues for another{' '}
                                    <strong className="text-lg">{Math.max(0, 40 - unrecognizedDuration)}</strong>{' '}
                                    seconds (reaching 40s total), your exam session may be terminated.
                                </p>
                                <p className="mt-1">
                                    Please ensure your face is clearly visible and centered in the camera.
                                </p>
                            </div>
                        )}
                        {/* FINAL WARNING / TERMINATION IMMINENT (EXAMPLE - can be adapted) */}
                        {usernameForMonitoring && !isUserRecognized && unrecognizedDuration >= 40 && (
                             <div className="mt-3 p-3 bg-red-700 border border-red-900 text-white rounded-md text-sm text-center shadow">
                                <p className="font-bold text-base">FINAL WARNING - EXAM TERMINATION IMMINENT</p>
                                <p className="mt-1">
                                    You have been unrecognized for {unrecognizedDuration} seconds.
                                </p>
                                <p className="mt-1">
                                    Exam termination protocols are being initiated.
                                </p>
                            </div>
                        )}


                        {analysisData && (
                            <div className="mt-2 text-sm">
                                <p>Detected % (10m): {analysisData.detected_percentage || 'N/A'}</p>
                                <p>Forward % (10m): {analysisData.forward_percentage || 'N/A'}</p>
                            </div>
                        )}
                    </div>

                    {/* Activity Log Section */}
                    <div className="flex-1 p-4 overflow-auto">
                        <h3 className="text-lg font-semibold mb-2 flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Activity Log
                        </h3>
                        <div className="space-y-2">
                            {warnings.map((warning, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start p-2 rounded text-sm ${
                                        warning.startsWith('Critical (Log):') ? 'bg-red-100 text-red-700' :
                                        warning.startsWith('Warning (Log):') ? 'bg-yellow-100 text-yellow-700' :
                                        warning.startsWith('Error:') ? 'bg-pink-100 text-pink-700' :
                                        'bg-blue-50 text-blue-700' // Default for other logs
                                    }`}
                                >
                                    <AlertCircle className={`w-4 h-4 mr-2 flex-shrink-0 mt-0.5 ${
                                        warning.startsWith('Critical (Log):') ? 'text-red-500' :
                                        warning.startsWith('Warning (Log):') ? 'text-yellow-500' :
                                        warning.startsWith('Error:') ? 'text-pink-500' :
                                        'text-blue-500'
                                    }`} />
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