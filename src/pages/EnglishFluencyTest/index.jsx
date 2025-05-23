import React, { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import ExamMonitorLayout from "../../layout/ExamMonitor";
import Button from "../../components/Button";
// import plus from "../../assets/plus.webp";

import lamejs from '@breezystack/lamejs';

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

  const userId = location.state?.userId;
  const courseId = location.state?.courseId;
  const studentEmail = location.state?.studentEmail;

  useEffect(() => {
    const initializeWasm = async () => {
      try {
        if (lamejs.WasmModule && typeof lamejs.WasmModule.isLoaded === 'function' && !lamejs.WasmModule.isLoaded()) {
          console.log("Attempting to initialize @breezystack/lamejs WASM module...");
          await lamejs.WasmModule.load('/wasm/lame.wasm'); // Ensure this path is correct for your public assets
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

  useEffect(() => {
    const fetchFluencyTestQuestionByCourseId = async () => {
      if (!courseId) {
        setQuestionText("Course ID not found. Cannot load question.");
        return;
      }
      try {
        const response = await fetch(`http://127.0.0.1:5001/courses/${courseId}/fluency_test`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setQuestionText(data.oral_question || "Question not found for this course.");
      } catch (error) {
        console.error("Failed to load question:", error);
        setQuestionText("Failed to load question. Please try again later.");
      }
    };
    fetchFluencyTestQuestionByCourseId();
  }, [courseId]);

  useEffect(() => {
    let modalTimer;
    if (isSuccessModalOpen) {
      modalTimer = setInterval(() => {
        setModalCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(modalTimer);
            setIsSuccessModalOpen(false);
            navigate("/EssayQuestions", { state: { userId, courseId, studentEmail } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(modalTimer);
  }, [isSuccessModalOpen, navigate, userId, courseId, studentEmail]);

  // Cleanup for audioURL object URL
  useEffect(() => {
    const currentAudioURL = audioURL;
    return () => {
        if (currentAudioURL) {
            URL.revokeObjectURL(currentAudioURL);
        }
    };
  }, [audioURL]);


  const stopStreamTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = async () => {
    setAudioURL(null); setUploadedFileName(null); setUploadError(null); setIsEncoding(false);
    stopStreamTracks();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const options = { mimeType: 'audio/webm; codecs=opus' };
      let mediaRecorder;
      if (MediaRecorder.isTypeSupported(options.mimeType)) {
        mediaRecorder = new MediaRecorder(stream, options);
      } else {
        console.warn("audio/webm; codecs=opus not supported, falling back to default MediaRecorder options.");
        mediaRecorder = new MediaRecorder(stream); // Fallback
      }
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setIsEncoding(true); setUploadError(null); setIsRecording(false);

        if (audioChunksRef.current.length === 0) {
          setUploadError("No audio data captured.");
          setIsEncoding(false); stopStreamTracks(); return;
        }
        const recordedBlob = new Blob(audioChunksRef.current, { type: mediaRecorderRef.current?.mimeType || 'audio/webm' });
        if (recordedBlob.size === 0) {
          setUploadError("Recorded audio is empty.");
          setIsEncoding(false); stopStreamTracks(); return;
        }

        try {
          console.log("Starting MP3 encoding with @breezystack/lamejs (WASM)...");

          if (lamejs.WasmModule && typeof lamejs.WasmModule.isLoaded === 'function' && !lamejs.WasmModule.isLoaded()) {
             console.warn("WASM module not loaded. Encoding might fail or use JS fallback.");
          }

          const arrayBuffer = await recordedBlob.arrayBuffer();
          const audioContext = new (window.AudioContext || window.webkitAudioContext)();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          const sampleRate = audioBuffer.sampleRate;

          if (!lamejs.Mp3Encoder) {
            throw new Error("@breezystack/lamejs does not have Mp3Encoder. Check import or library structure.");
          }
          
          const mp3Encoder = new lamejs.Mp3Encoder(1, sampleRate, 128); // 1 channel, specified sampleRate, 128 kbit/s

          let pcmData;
          if (audioBuffer.numberOfChannels === 2) { // Stereo to mono
            const left = audioBuffer.getChannelData(0);
            const right = audioBuffer.getChannelData(1);
            pcmData = new Float32Array(left.length);
            for (let i = 0; i < left.length; i++) pcmData[i] = (left[i] + right[i]) / 2;
          } else {
            pcmData = audioBuffer.getChannelData(0); // Already mono
          }
          // Convert PCM Float32 to Int16
          const pcmInt16 = new Int16Array(pcmData.length);
          for (let i = 0; i < pcmData.length; i++) {
            pcmInt16[i] = Math.max(-1, Math.min(1, pcmData[i])) * 0x7FFF; // Clamp and scale
          }
          
          const mp3Data = [];
          const bufferSize = 1152; // Recommended buffer size for LAME

          for (let i = 0; i < pcmInt16.length; i += bufferSize) {
            const chunk = pcmInt16.subarray(i, i + bufferSize);
            const encodedChunk = mp3Encoder.encodeBuffer(chunk);
            if (encodedChunk.length > 0) mp3Data.push(encodedChunk);
          }
          const finalEncodedChunk = mp3Encoder.flush();
          if (finalEncodedChunk.length > 0) mp3Data.push(finalEncodedChunk);
          
          console.log("@breezystack/lamejs: Encoding complete.");
          const mp3Blob = new Blob(mp3Data, { type: 'audio/mpeg' });
          if (mp3Blob.size === 0) throw new Error("Resulting MP3 is empty (WASM).");
          
          const mp3Url = URL.createObjectURL(mp3Blob);
          setAudioURL(mp3Url);

        } catch (error) {
          console.error("Error during MP3 encoding with @breezystack/lamejs:", error);
          setUploadError(`MP3 encoding (WASM) failed: ${error.message}. Check WASM setup or browser compatibility.`);
          setAudioURL(null);
        } finally {
          setIsEncoding(false); stopStreamTracks();
        }
      };

      mediaRecorder.start(1000); // ondataavailable event will fire every 1s
      setIsRecording(true);
      setTimeLeft(TOTAL_RECORDING_TIME_SECONDS);
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) { stopRecording(); return 0; }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setUploadError(`Could not start recording: ${error.message}. Please ensure microphone access is granted.`);
      setIsRecording(false); stopStreamTracks();
    }
  };

  const stopRecording = () => {
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop(); // This will trigger onstop
    } else {
      // If not recording (e.g., called manually or if start failed), ensure states are reset.
      setIsRecording(false);
      if (!audioChunksRef.current || audioChunksRef.current.length === 0) {
          setIsEncoding(false); // Ensure encoding is false if no data was captured
      }
      stopStreamTracks();
    }
  };

  const handleSubmit = async () => {
    if (isEncoding) {
      setUploadError("Encoding in progress. Please wait."); return;
    }
    if (!audioURL) {
      setUploadError("No recording available to submit."); return;
    }
    const elapsedRecordingTime = TOTAL_RECORDING_TIME_SECONDS - timeLeft;
    if (elapsedRecordingTime < MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS) {
      setUploadError(`Recording must be at least ${MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS} seconds long to submit. Current duration: ${elapsedRecordingTime}s.`);
      return;
    }

    setUploadError(null);
    setIsAnalyzing(true);
    setIsAnalyzingPopupOpen(true);

    try {
      const response = await fetch(audioURL);
      const audioBlob = await response.blob();
      if (audioBlob.size === 0) {
        throw new Error("Cannot submit empty audio. The recorded blob is empty.");
      }
      const formData = new FormData();
      formData.append("audio_file", audioBlob, "recording.mp3");
      // --- ADDED USER DETAILS TO FORMDATA ---
      if (userId) formData.append("userId", userId);
      if (courseId) formData.append("courseId", courseId);
      if (studentEmail) formData.append("studentEmail", studentEmail);
      // --- END OF ADDITIONS ---

      const apiResponseFetch = await fetch("http://127.0.0.1:5000/api/flow_analyzer", {
        method: "POST", body: formData,
      });
      if (!apiResponseFetch.ok) {
        const errorText = await apiResponseFetch.text();
        throw new Error(`HTTP error! status: ${apiResponseFetch.status}, message: ${errorText}`);
      }
      // const responseData = await apiResponseFetch.json(); // We don't display it
      
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

  const handleSubmitUploadedFile = async () => {
    setUploadError(null);
    if (!fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      setUploadError("Please select an audio file to upload."); return;
    }
    
    setIsAnalyzing(true);
    setIsAnalyzingPopupOpen(true);

    const audioFile = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    // --- ADDED USER DETAILS TO FORMDATA ---
    if (userId) formData.append("userId", userId);
    if (courseId) formData.append("courseId", courseId);
    if (studentEmail) formData.append("studentEmail", studentEmail);
    // --- END OF ADDITIONS ---

    try {
      const response = await fetch("http://127.0.0.1:5000/api/flow_analyzer", {
        method: "POST", body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      // const responseData = await response.json();

      setIsAnalyzingPopupOpen(false);
      setModalCountdown(5);
      setIsSuccessModalOpen(true);

    } catch (error) {
      setUploadError(`Failed to upload audio file: ${error.message}.`);
      setIsAnalyzingPopupOpen(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isSubmitDisabled =
    isAnalyzing ||
    isRecording ||
    isEncoding ||
    (!audioURL && !uploadedFileName) || // No audio recorded and no file selected
    (audioURL && // Audio recorded
      !uploadedFileName && // No file selected (to override recording)
      timeLeft > (TOTAL_RECORDING_TIME_SECONDS - MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS)) || // And recording too short
    (uploadedFileName && !fileInputRef.current?.files?.[0]); // File name set but no actual file (e.g. if input cleared)

  return (
    <ExamMonitorLayout>
      <div className="flex flex-col items-center justify-center min-h-screen font-[Poppins] py-8">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-xl font-medium mb-6">English Fluency Test</h1>
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
                disabled={isAnalyzing} 
                className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 shadow active:bg-green-700 disabled:opacity-50"
              >
                <span className="mr-2 text-xl">🎤</span> Start Recording
              </button>
            ) : (
              <button 
                onClick={stopRecording} 
                disabled={isAnalyzing || (isEncoding && !isRecording)} 
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
              accept="audio/mp3,audio/mpeg,audio/wav,audio/webm" // Specify accepted types
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    setUploadedFileName(e.target.files[0].name);
                    setAudioURL(null); // Clear any previous recording
                    setTimeLeft(TOTAL_RECORDING_TIME_SECONDS); // Reset timer if a file is uploaded
                    setUploadError(null);
                } else {
                    setUploadedFileName(null);
                }
                e.target.value = null; // Allow re-selecting the same file
            }}/>
            <Button
              text="Submit"
              variant="primary" // Assuming 'primary' is blue or a prominent color
              onClick={uploadedFileName ? handleSubmitUploadedFile : handleSubmit}
              disabled={isSubmitDisabled}
            />
          </div>

          {uploadError && (<p className="text-red-600 text-sm mt-3 text-center w-full">{uploadError}</p>)}
          {isEncoding && (<p className="mt-3 text-blue-600 font-medium text-center w-full">Encoding to MP3, please wait...</p>)}
          
          {audioURL && !isEncoding && !uploadedFileName && (
            <div className="mt-4 text-center w-full">
              <p className="text-green-700 font-semibold">✅ Recording complete and ready!</p>
              {timeLeft <= (TOTAL_RECORDING_TIME_SECONDS - MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS) ? (
                <p className="text-sm text-green-600">You can now submit your recording.</p>
              ) : (
                <p className="text-sm text-orange-600">
                  Record for at least {MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS} more seconds to submit. (Currently {TOTAL_RECORDING_TIME_SECONDS - timeLeft}s recorded).
                </p>
              )}
              <audio controls src={audioURL} className="mt-2 mx-auto shadow-sm rounded-full"/>
            </div>
          )}
          {uploadedFileName && (<p className="text-sm text-gray-600 mt-3 text-center w-full">Selected file for upload: <strong>{uploadedFileName}</strong></p>)}
          
        </div>
      </div>

      <Transition appear show={isAnalyzingPopupOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-20" onClose={() => { /* Prevent manual close */ }}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xs rounded-xl bg-white p-6 shadow-2xl text-center">
                {/* Optional: Add a spinner icon here */}
                <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-800">
                  Analyzing Audio
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                    Please wait, this may take a moment...
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isSuccessModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsSuccessModalOpen(false)}>
         <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
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