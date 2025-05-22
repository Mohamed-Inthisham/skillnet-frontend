import React, { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline"; // Assuming you might want a spinner later
import { useNavigate, useLocation } from "react-router-dom";
import ExamMonitorLayout from "../../layout/ExamMonitor";
import Button from "../../components/Button";
// import plus from "../../assets/plus.webp"; // Asset for the commented-out upload button

import lamejs from '@breezystack/lamejs';

const TOTAL_RECORDING_TIME_SECONDS = 120;
const MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS = 5;

const EnglishFluencyTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_RECORDING_TIME_SECONDS);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Renamed for clarity
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
  // const [apiResponse, setApiResponse] = useState(null); // Removed: No longer displaying API response
  const [isAnalyzing, setIsAnalyzing] = useState(false); // Still used to disable buttons
  const [isAnalyzingPopupOpen, setIsAnalyzingPopupOpen] = useState(false); // New state for analyzing popup
  const [isEncoding, setIsEncoding] = useState(false);

  const userId = location.state?.userId;
  const courseId = location.state?.courseId;
  const studentEmail = location.state?.studentEmail;

  useEffect(() => {
    const initializeWasm = async () => {
      try {
        if (lamejs.WasmModule && typeof lamejs.WasmModule.isLoaded === 'function' && !lamejs.WasmModule.isLoaded()) {
          console.log("Attempting to initialize @breezystack/lamejs WASM module...");
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

  useEffect(() => {
    const fetchFluencyTestQuestionByCourseId = async () => {
      if (!courseId) { return; }
      try {
        const response = await fetch(`http://127.0.0.1:5001/courses/${courseId}/fluency_test`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setQuestionText(data.oral_question || "Question not found.");
      } catch (error) {
        setQuestionText("Failed to load question.");
      }
    };
    fetchFluencyTestQuestionByCourseId();
  }, [courseId]);

  // Effect for the success modal and navigation
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

  const stopStreamTracks = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = async () => {
    // ... (startRecording logic remains the same)
    setAudioURL(null); setUploadedFileName(null); setUploadError(null); setIsEncoding(false);
    stopStreamTracks();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const options = { mimeType: 'audio/webm; codecs=opus' };
      let mediaRecorder = new MediaRecorder(stream, MediaRecorder.isTypeSupported(options.mimeType) ? options : undefined);
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
          
          const mp3Encoder = new lamejs.Mp3Encoder(1, sampleRate, 128); 

          let pcmData;
          if (audioBuffer.numberOfChannels === 2) {
            const left = audioBuffer.getChannelData(0);
            const right = audioBuffer.getChannelData(1);
            pcmData = new Float32Array(left.length);
            for (let i = 0; i < left.length; i++) pcmData[i] = (left[i] + right[i]) / 2;
          } else {
            pcmData = audioBuffer.getChannelData(0);
          }
          const pcmInt16 = new Int16Array(pcmData.length);
          for (let i = 0; i < pcmData.length; i++) pcmInt16[i] = Math.max(-1, Math.min(1, pcmData[i])) * 0x7FFF;
          
          const mp3Data = [];
          const bufferSize = 1152; 

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
          setUploadError(`MP3 (WASM) failed: ${error.message}. Check WASM setup.`);
          setAudioURL(null);
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
      alert(`Could not start recording: ${error.message}.`);
      setIsRecording(false); stopStreamTracks();
    }
  };

  const stopRecording = () => {
    // ... (stopRecording logic remains the same)
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    } else {
      setIsRecording(false); 
      if (!audioChunksRef.current || audioChunksRef.current.length === 0) {
          setIsEncoding(false); 
      }
      stopStreamTracks();
    }
  };

  const handleSubmit = async () => {
    if (isEncoding) {
      setUploadError("Encoding in progress."); return;
    }
    if (!audioURL) {
      setUploadError("No recording available."); return;
    }
    const elapsedRecordingTime = TOTAL_RECORDING_TIME_SECONDS - timeLeft;
    if (elapsedRecordingTime < MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS) {
      setUploadError(`Recording must be at least ${MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS} seconds long to submit. Current duration: ${elapsedRecordingTime}s.`);
      return;
    }

    setUploadError(null);
    setIsAnalyzing(true);       // For disabling buttons
    setIsAnalyzingPopupOpen(true); // Show analyzing popup

    try {
      const response = await fetch(audioURL);
      const audioBlob = await response.blob();
      if (audioBlob.size === 0) {
        throw new Error("Cannot submit empty audio.");
      }
      const formData = new FormData();
      formData.append("audio_file", audioBlob, "recording.mp3");
      const apiResponseFetch = await fetch("http://127.0.0.1:5000/api/flow_analyzer", {
        method: "POST", body: formData,
      });
      if (!apiResponseFetch.ok) {
        const errorText = await apiResponseFetch.text();
        throw new Error(`HTTP error! status: ${apiResponseFetch.status}, message: ${errorText}`);
      }
      // const responseData = await apiResponseFetch.json(); // We don't display it
      // setApiResponse(responseData); // Not needed anymore

      // On Success
      setIsAnalyzingPopupOpen(false); // Close analyzing popup
      setModalCountdown(5); // Reset countdown for success modal
      setIsSuccessModalOpen(true); // Open success modal for navigation

    } catch (error) {
      setUploadError(`Failed to submit audio: ${error.message}.`);
      setIsAnalyzingPopupOpen(false); // Close analyzing popup on error
    } finally {
      setIsAnalyzing(false); // Re-enable buttons if needed (though navigation might occur)
    }
  };

  const handleSubmitUploadedFile = async () => {
    setUploadError(null);
    if (!fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      setUploadError("Please upload an audio file."); return;
    }
    
    setIsAnalyzing(true);
    setIsAnalyzingPopupOpen(true);

    const audioFile = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/flow_analyzer", {
        method: "POST", body: formData,
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      // const responseData = await response.json(); // Not displayed
      // setApiResponse(responseData); // Not needed

      // On Success
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

  // const handleNext = () => { setIsSuccessModalOpen(true); setModalCountdown(5); }; // Removed
  const fileInputRef = useRef(null);
  // const handleClick = () => { fileInputRef.current.click(); }; // For the commented out upload button

  const isSubmitDisabled =
    isAnalyzing ||
    isRecording ||
    isEncoding ||
    (!audioURL && !uploadedFileName) ||
    (audioURL && !uploadedFileName && timeLeft > (TOTAL_RECORDING_TIME_SECONDS - MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS));

  return (
    <ExamMonitorLayout>
      <div className="flex flex-col items-center justify-center min-h-screen font-[Poppins]">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-xl font-medium mb-6">English Fluency Test</h1>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li className="font-medium">Important Instructions:</li>
            <li>Complete speech without interruptions.</li>
            <li>Cannot pause/stop midway.</li>
            <li>Minimum recording duration for submission is {MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS} seconds.</li>
          </ul>
          <div className="w-full max-w-2xl h-[300px] p-6 border border-blue-300 rounded-lg shadow-lg text-center">
            <p className="text-gray-600 mt-20">{questionText}</p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <span className="countdown font-mono text-lg bg-blue-100 text-blue-500 rounded-lg py-2 px-2">
              {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
            </span>
            {!isRecording && !isEncoding ? (
              <button onClick={startRecording} disabled={isAnalyzing} className="flex items-center bg-blue-100 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-200">
                <span className="mr-2">🎤</span> Start Recording
              </button>
            ) : (
              <button onClick={stopRecording} disabled={isAnalyzing || (isEncoding && !isRecording)} className="flex items-center bg-red-100 text-red-500 px-4 py-2 rounded-lg hover:bg-red-200">
                <span className="mr-2">⏹</span> {isEncoding ? "Encoding..." : "Stop Recording"}
              </button>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                    setUploadedFileName(e.target.files[0].name);
                    setAudioURL(null);
                    setUploadError(null);
                } else {
                    setUploadedFileName(null);
                }
            }}/>
            <Button
              text="Submit"
              variant="primary"
              onClick={uploadedFileName ? handleSubmitUploadedFile : handleSubmit}
              disabled={isSubmitDisabled}
            />
            {/* Next Button Removed */}
          </div>

          {uploadError && (<p className="text-red-500 text-xs mt-2 text-center">{uploadError}</p>)}
          {isEncoding && (<p className="mt-2 text-blue-600 font-medium text-center">Encoding MP3...</p>)}
          {audioURL && !isEncoding && (
            <div className="mt-2 text-center">
              <p className="text-green-600 font-medium">✅ Recording ready!</p>
              {timeLeft <= (TOTAL_RECORDING_TIME_SECONDS - MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS) ? (
                <p className="text-sm text-green-700">You can now submit.</p>
              ) : (
                <p className="text-sm text-orange-600">
                  Record for at least {MINIMUM_RECORDING_DURATION_FOR_SUBMIT_SECONDS} seconds to submit (currently {TOTAL_RECORDING_TIME_SECONDS - timeLeft}s).
                </p>
              )}
              <audio controls src={audioURL} className="mt-1 mx-auto"/>
            </div>
          )}
          {uploadedFileName && (<p className="text-xs text-gray-500 mt-1">Selected for upload: {uploadedFileName}</p>)}
          
          {/* Removed API Response display and inline "Analyzing..." message */}
        </div>
      </div>

      {/* Analyzing Popup */}
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
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
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
              <Dialog.Panel className="w-full max-w-xs rounded-lg bg-white p-6 shadow-xl text-center">
                {/* You can add a spinner icon here if desired */}
                {/* Example: <svg className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-3" ...>...</svg> */}
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Analyzing Audio
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Please wait, this may take a moment...
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Success Modal (for navigation) */}
      <Transition appear show={isSuccessModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsSuccessModalOpen(false) /* Allow close, though auto-navigates */}>
         <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
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
              <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <div className="flex flex-col items-center">
                  <CheckCircleIcon className="w-16 h-16 text-green-500" />
                  <Dialog.Title as="h2" className="mt-4 text-lg font-medium">Fluency Test Submitted!</Dialog.Title>
                  <p className="mt-2 text-sm text-gray-600">Proceeding to Essay questions.</p>
                  <span className="countdown font-mono text-6xl mt-3">{modalCountdown}</span>
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