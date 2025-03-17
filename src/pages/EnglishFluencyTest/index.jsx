// EnglishFluencyTest.js
import React, { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react"; // Keep imports, might add back later
import { CheckCircleIcon } from "@heroicons/react/24/outline"; // Keep imports, might add back later
import { useNavigate, useLocation } from "react-router-dom";
import ExamMonitorLayout from "../../layout/ExamMonitor";
import Button from "../../components/Button";
import { Upload } from "lucide-react";

const EnglishFluencyTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isModalOpen, setIsModalOpen] = useState(false); // Keep state, might add back modal later
  const [modalCountdown, setModalCountdown] = useState(5); // Keep state, might add back modal later
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [questionText, setQuestionText] = useState("Loading question...");
  const [fluencyTest, setFluencyTest] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const userId = location.state?.userId;
  const courseId = location.state?.courseId;
  const studentEmail = location.state?.studentEmail;

  useEffect(() => {
    console.log("EnglishFluencyTest: User ID from state:", userId);
    console.log("EnglishFluencyTest: Course ID from state:", courseId);
    console.log("EnglishFluencyTest: Student Email from state:", studentEmail);
  }, [userId, courseId, studentEmail]);

  useEffect(() => {
    const fetchFluencyTestQuestionByCourseId = async () => {
      if (!courseId) {
        console.error("Course ID is missing.");
        setQuestionText("Course ID is missing.");
        return;
      }
      try {
        const response = await fetch(
          `http://127.0.0.1:5001/courses/${courseId}/fluency_test`
        );
        if (!response.ok) {
          throw new Error(
            `HTTP error fetching fluency test by course_id! status: ${response.status}`
          );
        }
        const data = await response.json();
        console.log("Fetched Fluency Test Data by course_id:", data);
        setQuestionText(
          data.oral_question || "Question not found for this course."
        );
        setFluencyTest(data);
      } catch (error) {
        console.error(
          "Error fetching fluency test question by course ID:",
          error
        );
        setQuestionText("Failed to load fluency question for this course.");
      }
    };
    fetchFluencyTestQuestionByCourseId();
  }, [courseId]);

  // REMOVED useEffect for modalCountdown

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimeLeft(60);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      alert("Microphone access is required for recording.");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
    clearInterval(timerRef.current);
  };

  const handleSubmit = async () => {
    setUploadError(null);
    setApiResponse(null);

    if (!fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      setUploadError("Please upload an audio file to submit.");
      return;
    }

    const audioFile = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("audio_file", audioFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/flow_analyzer", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("File upload response:", responseData);
      setApiResponse(responseData);
      // REMOVED setIsModalOpen and setModalCountdown
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadError("Failed to upload audio file. Please try again.");
    }
  };

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // REMOVED openModalAndNavigate and closeModal functions

  return (
    <ExamMonitorLayout>
      <div className="flex flex-col items-center justify-center min-h-screen font-[Poppins]">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-xl font-medium mb-6">English Fluency Test</h1>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li className="font-medium">
              Important Instructions Before Recording:
            </li>
            <li>
              Once you start recording, you must complete your full speech
              without interruptions.
            </li>
            <li>You cannot pause or stop the recording midway.</li>
          </ul>
          <div className="w-full max-w-2xl h-[300px] p-6 border border-blue-300 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 mt-20">{questionText}</p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <span className="countdown font-mono text-lg bg-blue-100 text-blue-500 rounded-lg py-2 px-2">
              {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
            </span>
            {!isRecording ? (
              <button
                className="flex items-center bg-blue-100 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-200 cursor-pointer"
                onClick={startRecording}
              >
                <span className="mr-2">🎤</span> Start Recording
              </button>
            ) : (
              <button
                className="flex items-center bg-red-100 text-red-500 px-4 py-2 rounded-lg hover:bg-red-200 cursor-pointer"
                onClick={stopRecording}
              >
                <span className="mr-2">⏹</span> Stop Recording
              </button>
            )}
            <Button
              text="Submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
              onClick={handleSubmit}
            />
             {/* REMOVED NEXT BUTTON */}
          </div>
          {audioURL && (
            <div className="mt-2">
              <p className="text-green-600 font-medium text-center">
                ✅ Recording saved!
              </p>
              <audio controls>
                <source src={audioURL} type="audio/mp3" />
              </audio>
            </div>
          )}
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setUploadedFileName(e.target.files[0].name);
                } else {
                  setUploadedFileName(null);
                }
                console.log(e.target.files);
              }}
            />
            <Button
              text="Upload File"
              onClick={handleClick}
              className="flex items-center space-x-2 cursor-pointer mt-3"
            >
              <Upload size={18} />
              <span>Upload File</span>
            </Button>
            {uploadedFileName && (
              <p className="text-xs text-gray-500 mt-1">{uploadedFileName}</p>
            )}
            {uploadError && (
              <p className="text-red-500 text-xs mt-1">{uploadError}</p>
            )}
          </div>

          {apiResponse && (
            <div className="mt-6 w-full max-w-3xl p-6 border border-green-300 rounded-lg shadow-lg">
              <h2 className="text-lg font-medium mb-4 text-center">Test Results</h2>
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {JSON.stringify(apiResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      {/* REMOVED Transition.Root and Dialog */}
    </ExamMonitorLayout>
  );
};

export default EnglishFluencyTest;