// FaceMonitor.jsx (Updated - Camera Mirrored)
import React, { useRef, useState, useEffect } from 'react';

const FaceMonitor = ({ username, onFaceStatusChange, onActivityLogUpdate, onAnalysisDataUpdate }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        let animationFrameId;

        const startWebcam = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                onFaceStatusChange('Detecting...');
            } catch (err) {
                console.error("Error accessing webcam:", err);
                setError("Error accessing webcam: " + err.message);
                onFaceStatusChange('Camera Error');
            }
        };

        const processVideo = async () => {
            if (!videoRef.current || videoRef.current.readyState < 2) {
                animationFrameId = requestAnimationFrame(processVideo);
                return;
            }

            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataURL = canvas.toDataURL('image/jpeg', 0.8);

            if (!username) {
                // No username provided
            }

            const formData = new FormData();
            formData.append('username', username);
            formData.append('image_file', dataURLtoBlob(imageDataURL), 'frame.jpg');

            try {
                // --- Call /api/face_detection ---
                const detectionResponse = await fetch('http://127.0.0.1:5000/api/face_detection', {
                    method: 'POST',
                    body: formData,
                });

                if (!detectionResponse.ok) {
                    const errorText = `HTTP error! status: ${detectionResponse.status} for /api/face_detection`;
                    console.error(errorText);
                    throw new Error(errorText);
                }
                const detectionData = await detectionResponse.json();
                console.log("Detection API Response Data:", detectionData);

                // --- Call /api/face_monitoring ---
                const monitoringResponse = await fetch('http://127.0.0.1:5000/api/face_monitoring', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({ username: username }),
                });

                if (!monitoringResponse.ok) {
                    const errorText = `HTTP error! status: ${monitoringResponse.status} for /api/face_monitoring`;
                    console.error(errorText);
                    throw new Error(errorText);
                }
                const monitoringData = await monitoringResponse.json();
                console.log("Monitoring API Response Data:", monitoringData);

                setResults(detectionData);
                setError('');

                // Update Face Status and Activity Log
                const detectedUsername = detectionData.Username && detectionData.Username !== "N/A" ? detectionData.Username : "N/A";
                const headPoseText = detectionData["Head Pose"] || "Unknown";

                if (detectedUsername !== "N/A") {
                    onFaceStatusChange(`User: ${detectedUsername}`);
                    onActivityLogUpdate({
                        username: detectedUsername,
                        headPose: headPoseText,
                        timestamp: new Date().toLocaleTimeString(),
                    });
                } else {
                    onFaceStatusChange('User: N/A');
                    onActivityLogUpdate({
                        username: 'N/A',
                        headPose: headPoseText,
                        timestamp: new Date().toLocaleTimeString(),
                    });
                }

                onAnalysisDataUpdate(monitoringData);

            } catch (err) {
                console.error("Error in processVideo:", err);
                setError("communicatiion failed.");
                setResults(null);
                onFaceStatusChange('Unrecognized Face');
            }

            animationFrameId = requestAnimationFrame(processVideo);
        };

        startWebcam();
        processVideo();

        return () => {
            cancelAnimationFrame(animationFrameId);
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            onFaceStatusChange('Stopped');
        };
    }, [username, onFaceStatusChange, onActivityLogUpdate, onAnalysisDataUpdate]);

    const dataURLtoBlob = (dataURL) => {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <div style={{ position: 'relative' }}>
            <video ref={videoRef} width="100%" height="100%"  autoPlay muted style={{ display: 'block', transform: 'scaleX(-1)' }} /> {/* Mirrored Video with transform: scaleX(-1) */}
            <canvas ref={canvasRef} width="640" height="480" style={{ position: 'absolute', top: 0, left: 0, display: 'none' }} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default FaceMonitor;