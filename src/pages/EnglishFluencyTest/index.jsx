import React, { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import ExamMonitorLayout from "../../layout/ExamMonitor";
import Button from "../../components/Button"; // Assuming you have this Button component
import lamejs from '@breezystack/lamejs';
import { jwtDecode } from "jwt-decode"; // For getting email from JWT

const TOTAL_RECORDING_TIME_SECONDS = 120;
const MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS = 5;

const EnglishFluencyTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_RECORDING_TIME_SECONDS);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(5);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [questionText, setQuestionText] = useState("Loading question...");
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzingPopupOpen, setIsAnalyzingPopupOpen] = useState(false);
  const [isEncoding, setIsEncoding] = useState(false);
  const fileInputRef = useRef(null);

  const [currentUserId, setCurrentUserId] = useState(null); // MongoDB _id
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [currentStudentEmail, setCurrentStudentEmail] = useState(null); // For flow_analyzer if needed

  // Get critical IDs on component mount
  useEffect(() => {
    const userIdFromStorage = localStorage.getItem('userId');
    const roleFromStorage = localStorage.getItem('userRole');
    const token = localStorage.getItem("accessToken");

    if (userIdFromStorage && roleFromStorage === 'student') {
      setCurrentUserId(userIdFromStorage);
      console.log("EnglishFluencyTest: User ID (MongoDB _id) from localStorage:", userIdFromStorage);
    } else {
      console.error("EnglishFluencyTest: CRITICAL - User ID not found in localStorage or user is not a student. Redirecting to login.");
      setUploadError("User identification error. Please log in again.");
      navigate("/login");
      return;
    }

    const courseIdFromState = location.state?.courseId;
    if (courseIdFromState) {
      setCurrentCourseId(courseIdFromState);
      console.log("EnglishFluencyTest: Course ID from location.state:", courseIdFromState);
    } else {
      console.error("EnglishFluencyTest: CRITICAL - Course ID not found in location.state. Cannot proceed.");
      setUploadError("Course information missing. Please go back and select a course.");
      // Consider navigate(-1) or to a course selection page
    }

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            setCurrentStudentEmail(decodedToken.sub); // 'sub' claim usually holds email/username
            console.log("EnglishFluencyTest: Student Email from JWT 'sub' claim:", decodedToken.sub);
        } catch (e) {
            console.error("EnglishFluencyTest: Error decoding JWT for email:", e);
        }
    } else {
        console.warn("EnglishFluencyTest: No access token found, student email cannot be retrieved from JWT.");
    }

  }, [navigate, location.state]);

  // Initialize WASM
  useEffect(() => {
    const initializeWasm = async () => {
      try {
        if (lamejs.WasmModule && typeof lamejs.WasmModule.isLoaded === 'function' && !lamejs.WasmModule.isLoaded()) {
          await lamejs.WasmModule.load('/wasm/lame.wasm');
          console.log("@breezystack/lamejs WASM module loaded.");
        } else if (lamejs.WasmModule && lamejs.WasmModule.isLoaded && lamejs.WasmModule.isLoaded()) {
            console.log("@breezystack/lamejs WASM module already loaded.");
        } else {
            console.log("@breezystack/lamejs: WASM loading mechanism not explicitly called or unknown structure.");
        }
      } catch (error) {
        console.error("Failed to initialize @breezystack/lamejs WASM:", error);
        setUploadError("Failed to initialize MP3 encoder (WASM).");
      }
    };
    initializeWasm();
  }, []);

  // Fetch Fluency Test Question
  useEffect(() => {
    const fetchFluencyTestQuestionByCourseId = async () => {
      if (!currentCourseId) {
        setQuestionText("Course ID not available. Cannot load question.");
        return;
      }
      try {
        const response = await fetch(`http://127.0.0.1:5001/courses/${currentCourseId}/fluency_test`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setQuestionText(data.oral_question || "Question not found for this course.");
      } catch (error) {
        console.error("Failed to load question:", error);
        setQuestionText("Failed to load question. Please try again later.");
      }
    };
    if (currentCourseId) {
        fetchFluencyTestQuestionByCourseId();
    }
  }, [currentCourseId]);

  // Modal Countdown and Navigation
  useEffect(() => {
    let modalTimer;
    if (isSuccessModalOpen) {
      modalTimer = setInterval(() => {
        setModalCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(modalTimer);
            setIsSuccessModalOpen(false);
            
            if (!currentUserId || !currentCourseId) {
                console.error("EnglishFluencyTest: Cannot navigate to EssayQuestions. Missing currentUserId or currentCourseId.");
                setUploadError("Critical information missing, cannot proceed to next step.");
                return prev; 
            }

            console.log("EnglishFluencyTest: Navigating to EssayQuestions with currentUserId (MongoDB _id):", currentUserId, "and currentCourseId:", currentCourseId);
            navigate("/EssayQuestions", {
              state: {
                userId: currentUserId,
                courseId: currentCourseId,
                // fluencyTestResults: actualFluencyResults, // Pass actual results if collected
              }
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(modalTimer);
  }, [isSuccessModalOpen, navigate, currentUserId, currentCourseId]);

  // Cleanup for audioURL
  useEffect(() => {
    const currentAudioRevokeURL = audioURL; // Capture current value
    return () => {
        if (currentAudioRevokeURL) {
            URL.revokeObjectURL(currentAudioRevokeURL);
            console.log("EnglishFluencyTest: Revoked object URL for previous audio.");
        }
    };
  }, [audioURL]);


  const stopStreamTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      console.log("EnglishFluencyTest: Media stream tracks stopped.");
    }
  };

  const startRecording = async () => {
    setAudioURL(null); setUploadedFileName(null); setUploadError(null); setIsEncoding(false);
    stopStreamTracks(); // Ensure previous stream is stopped
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const options = { mimeType: 'audio/webm; codecs=opus' };
      let mediaRecorder;
      if (MediaRecorder.isTypeSupported(options.mimeType)) {
        mediaRecorder = new MediaRecorder(stream, options);
      } else {
        mediaRecorder = new MediaRecorder(stream);
      }
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setIsEncoding(true); setUploadError(null); setIsRecording(false);
        if (audioChunksRef.current.length === 0) {
          setUploadError("No audio data captured."); setIsEncoding(false); stopStreamTracks(); return;
        }
        const recordedBlob = new Blob(audioChunksRef.current, { type: mediaRecorderRef.current?.mimeType || 'audio/webm' });
        if (recordedBlob.size === 0) {
          setUploadError("Recorded audio is empty."); setIsEncoding(false); stopStreamTracks(); return;
        }

        try {
          console.log("Starting MP3 encoding with @breezystack/lamejs (WASM)...");
          // ... (rest of your MP3 encoding logic - no changes here) ...
          if (lamejs.WasmModule && typeof lamejs.WasmModule.isLoaded === 'function' && !lamejs.WasmModule.isLoaded()) { /* ... */ }
          const arrayBuffer = await recordedBlob.arrayBuffer();
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          const sampleRate = audioBuffer.sampleRate;
          if (!lamejs.Mp3Encoder) throw new Error("@breezystack/lamejs Mp3Encoder not found.");
          const mp3Encoder = new lamejs.Mp3Encoder(1, sampleRate, 128);
          let pcmData = audioBuffer.numberOfChannels === 2 ? /* stereo to mono */ (() => { const l = audioBuffer.getChannelData(0), r = audioBuffer.getChannelData(1), p = new Float32Array(l.length); for(let i=0;i<l.length;i++)p[i]=(l[i]+r[i])/2; return p; })() : audioBuffer.getChannelData(0);
          const pcmInt16 = new Int16Array(pcmData.length);
          for (let i = 0; i < pcmData.length; i++) pcmInt16[i] = Math.max(-1, Math.min(1, pcmData[i])) * 0x7FFF;
          const mp3Data = []; const bufferSize = 1152;
          for (let i = 0; i < pcmInt16.length; i += bufferSize) { const chunk = pcmInt16.subarray(i, i + bufferSize); const encodedChunk = mp3Encoder.encodeBuffer(chunk); if (encodedChunk.length > 0) mp3Data.push(encodedChunk); }
          const finalEncodedChunk = mp3Encoder.flush(); if (finalEncodedChunk.length > 0) mp3Data.push(finalEncodedChunk);
          console.log("@breezystack/lamejs: Encoding complete.");
          const mp3Blob = new Blob(mp3Data, { type: 'audio/mpeg' });
          if (mp3Blob.size === 0) throw new Error("Resulting MP3 is empty (WASM).");
          const mp3Url = URL.createObjectURL(mp3Blob);
          setAudioURL(mp3Url);
        } catch (error) {
          console.error("Error during MP3 encoding with @breezystack/lamejs:", error);
          setUploadError(`MP3 encoding (WASM) failed: ${error.message}.`); setAudioURL(null);
        } finally {
          setIsEncoding(false); stopStreamTracks();
        }
      };

      mediaRecorder.start(1000);
      setIsRecording(true);
      setTimeLeft(TOTAL_RECORDING_TIME_SECONDS);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) { stopRecording(); return 0; }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setUploadError(`Could not start recording: ${error.message}. Ensure microphone access.`);
      setIsRecording(false); stopStreamTracks();
    }
  };

  const stopRecording = () => {
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    } else {
      setIsRecording(false);
      if (!audioChunksRef.current || audioChunksRef.current.length === 0) setIsEncoding(false);
      stopStreamTracks();
    }
  };

  const handleSubmitInternal = async (audioBlobForUpload, fileNameForUpload) => {
    if (isEncoding) {
      setUploadError("Encoding in progress. Please wait."); return;
    }
    if (!audioBlobForUpload || audioBlobForUpload.size === 0) {
      setUploadError("No valid audio data to submit."); return;
    }

    const elapsedRecordingTime = TOTAL_RECORDING_TIME_SECONDS - timeLeft;
    // For direct recordings, check minimum duration. For uploads, this check might be less relevant
    // or you might want a different validation (e.g., file size).
    if (!uploadedFileName && elapsedRecordingTime < MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS) {
      setUploadError(`Recording must be at least ${MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS}s. Duration: ${elapsedRecordingTime}s.`);
      return;
    }

    setUploadError(null);
    setIsAnalyzing(true);
    setIsAnalyzingPopupOpen(true);

    try {
      const formData = new FormData();
      formData.append("audio_file", audioBlobForUpload, fileNameForUpload || "recording.mp3");

      if (currentUserId) formData.append("userId", currentUserId);
      if (currentCourseId) formData.append("courseId", currentCourseId);
      if (currentStudentEmail) formData.append("studentEmail", currentStudentEmail);

      console.log("EnglishFluencyTest: Submitting to /api/flow_analyzer with formData:", {
          userId: currentUserId, courseId: currentCourseId, studentEmail: currentStudentEmail, fileName: fileNameForUpload 
      });

      const apiResponseFetch = await fetch("http://127.0.0.1:5000/api/flow_analyzer", {
        method: "POST", body: formData,
      });
      if (!apiResponseFetch.ok) {
        const errorText = await apiResponseFetch.text();
        throw new Error(`HTTP error! status: ${apiResponseFetch.status}, message: ${errorText}`);
      }
      // const responseData = await apiResponseFetch.json(); 
      // Store responseData if you need to pass it as fluencyTestResults

      setIsAnalyzingPopupOpen(false);
      setModalCountdown(5);
      setIsSuccessModalOpen(true);

    } catch (error) {
      setUploadError(`Failed to submit audio: ${error.message}.`);
      setIsAnalyzingPopupOpen(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => { // For recorded audio
    if (!audioURL) {
        setUploadError("No recording available to submit."); return;
    }
    const response = await fetch(audioURL);
    const audioBlob = await response.blob();
    handleSubmitInternal(audioBlob, "recording.mp3");
  };

  const handleSubmitUploadedFile = async () => { // For uploaded file
    if (!fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      setUploadError("Please select an audio file to upload."); return;
    }
    const audioFile = fileInputRef.current.files[0];
    handleSubmitInternal(audioFile, audioFile.name);
  };

  const isCriticalDataMissing = !currentUserId || !currentCourseId;
  const isSubmitDisabled =
    isCriticalDataMissing ||
    isAnalyzing ||
    isRecording ||
    isEncoding ||
    (!audioURL && !uploadedFileName) ||
    (audioURL && !uploadedFileName && timeLeft > (TOTAL_RECORDING_TIME_SECONDS - MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS)) ||
    (uploadedFileName && !fileInputRef.current?.files?.[0]);

  return (
    <ExamMonitorLayout>
      <div className="flex flex-col items-center justify-center min-h-screen font-[Poppins] py-8">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          {isCriticalDataMissing && !uploadError && (
              <div className="text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm w-full text-center">
                  Error: User or Course information is missing. Please ensure you are logged in and have selected a course.
              </div>
          )}
          <h1 className="text-xl font-medium mb-6">English Fluency Test</h1>
          {/* ... Instructions ... */}
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 text-left w-full">
            <li className="font-medium">Important Instructions:</li>
            <li>Complete your speech without long, unnatural interruptions once recording starts.</li>
            <li>You cannot pause the recording and resume; it's a single take.</li>
            <li>A minimum recording duration of {MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS} seconds is required for submission.</li>
          </ul>
          <div className="w-full max-w-2xl min-h-[200px] p-6 border border-blue-300 rounded-lg shadow-inner text-center flex items-center justify-center bg-gray-50">
            <p className="text-gray-700 text-lg">{questionText}</p>
          </div>
          <div className="mt-6 flex items-center justify-center space-x-4 flex-wrap gap-y-3">
            <span className="countdown font-mono text-lg bg-blue-100 text-blue-600 rounded-lg py-2 px-3 shadow-sm">
              {`${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`}
            </span>
            {!isRecording && !isEncoding ? (
              <button 
                onClick={startRecording} 
                disabled={isAnalyzing || isCriticalDataMissing} 
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow active:bg-green-700 disabled:opacity-50"
              >
                <span className="mr-2 text-xl">🎤</span> Start Recording
              </button>
            ) : (
              <button 
                onClick={stopRecording} 
                disabled={isAnalyzing || (isEncoding && !isRecording) || isCriticalDataMissing} 
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow active:bg-red-700 disabled:opacity-50"
              >
                <span className="mr-2 text-xl">⏹</span> {isEncoding ? "Encoding..." : "Stop Recording"}
              </button>
            )}
   
            <input 
              type="file" 
              id="audio-upload"
              ref={fileInputRef} 
              className="hidden" 
              accept="audio/mp3,audio/mpeg,audio/wav,audio/webm"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    setUploadedFileName(e.target.files[0].name);
                    setAudioURL(null); 
                    setTimeLeft(TOTAL_RECORDING_TIME_SECONDS); 
                    setUploadError(null);
                } else {
                    setUploadedFileName(null);
                }
                e.target.value = null; 
            }}
            disabled={isCriticalDataMissing}
            />
            {/* Assuming Button component handles disabled prop */}
            
            <Button
              text="Submit"
              variant="primary"
              onClick={uploadedFileName ? handleSubmitUploadedFile : handleSubmit}
              disabled={isSubmitDisabled} // isSubmitDisabled already includes isCriticalDataMissing
            />
          </div>

          {uploadError && (<p className="text-red-600 text-sm mt-3 text-center w-full">{uploadError}</p>)}
          {isEncoding && (<p className="mt-3 text-blue-600 font-medium text-center w-full">Encoding to MP3, please wait...</p>)}
          
          {audioURL && !isEncoding && !uploadedFileName && (
            <div className="mt-4 text-center w-full">
              <p className="text-green-700 font-semibold">✅ Recording complete and ready!</p>
              {/* ... message about submit readiness ... */}
              <audio controls src={audioURL} className="mt-2 mx-auto shadow-sm rounded-full"/>
            </div>
          )}
          {uploadedFileName && (<p className="text-sm text-gray-600 mt-3 text-center w-full">Selected file for submission: <strong>{uploadedFileName}</strong></p>)}
          
        </div>
      </div>

      {/* Analyzing Popup Dialog */}
      <Transition appear show={isAnalyzingPopupOpen} as={React.Fragment}>
        {/* ... (Dialog JSX - no changes) ... */}
        <Dialog as="div" className="relative z-20" onClose={() => { /* Prevent manual close */ }}>
          <Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0" >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95" >
              <Dialog.Panel className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl text-center">
                <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-800">Analyzing Audio</Dialog.Title>
                <div className="mt-2"><p className="text-sm text-gray-600">Please wait, this may take a moment...</p></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Success Modal Dialog */}
      <Transition appear show={isSuccessModalOpen} as={React.Fragment}>
        {/* ... (Dialog JSX - no changes) ... */}
        <Dialog as="div" className="relative z-10" onClose={() => setIsSuccessModalOpen(false)}>
         <Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0" >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child as={React.Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95" >
              <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl text-center">
                <div className="flex flex-col items-center">
                  <CheckCircleIcon className="w-20 h-20 text-green-500" />
                  <Dialog.Title as="h2" className="mt-5 text-2xl font-semibold text-gray-800">Fluency Test Submitted!</Dialog.Title>
                  <p className="mt-2 text-md text-gray-600">Proceeding to Essay questions in...</p>
                  <span className="countdown font-mono text-7xl mt-4 text-blue-600">{modalCountdown}</span>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </ExamMonitorLayout>
  );
};

export default EnglishFluencyTest;