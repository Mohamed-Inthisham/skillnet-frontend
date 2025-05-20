import React, { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from "react-router-dom";
import ExamMonitorLayout from "../../layout/ExamMonitor";
import Button from "../../components/Button";
import plus from "../../assets/plus.webp";

// --- @breezystack/lamejs Integration ---
import lamejs from '@breezystack/lamejs'; // Import from the new package

const EnglishFluencyTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const [apiResponse, setApiResponse] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isEncoding, setIsEncoding] = useState(false);

  const userId = location.state?.userId;
  const courseId = location.state?.courseId;
  const studentEmail = location.state?.studentEmail;


  useEffect(() => {
    const initializeWasm = async () => {
      try {
        if (lamejs.WasmModule && typeof lamejs.WasmModule.isLoaded === 'function' && !lamejs.WasmModule.isLoaded()) {
          console.log("Attempting to initialize @breezystack/lamejs WASM module...");
          await lamejs.WasmModule.load('/wasm/lame.wasm'); // Adjust wasm filename if different
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

  useEffect(() => {
    let modalTimer;
    if (isModalOpen) {
      modalTimer = setInterval(() => {
        setModalCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(modalTimer);
            setIsModalOpen(false);
            navigate("/EssayQuestions", { state: { userId, courseId, studentEmail } });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(modalTimer);
  }, [isModalOpen, navigate, userId, courseId, studentEmail]);

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

          // Check if WASM is loaded (if the library provides a way to check)
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
          
          const mp3Encoder = new lamejs.Mp3Encoder(1, sampleRate, 128); // Mono, 128kbps

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
          const bufferSize = 1152; // LAME internal frame size for mono

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
      setIsRecording(true); setTimeLeft(60);
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
    clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    } else {
      setIsRecording(false); setIsEncoding(false); stopStreamTracks();
    }
  };

  const handleSubmit = async () => {
    if (isEncoding) {
      setUploadError("Encoding in progress."); return;
    }
    if (!audioURL) {
      setUploadError("No recording available."); return;
    }
    setUploadError(null); setApiResponse(null); setIsAnalyzing(true);
    try {
      const response = await fetch(audioURL);
      const audioBlob = await response.blob();
      if (audioBlob.size === 0) {
        setUploadError("Cannot submit empty audio."); setIsAnalyzing(false); return;
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
      const responseData = await apiResponseFetch.json();
      setApiResponse(responseData);
    } catch (error) {
      setUploadError(`Failed to submit audio: ${error.message}.`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitUploadedFile = async () => {
    setUploadError(null); setApiResponse(null); setIsAnalyzing(true);
    if (!fileInputRef.current.files || fileInputRef.current.files.length === 0) {
      setUploadError("Please upload an audio file."); setIsAnalyzing(false); return;
    }
    const audioFile = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("audio_file", audioFile);
    try {
      const response = await fetch("http://127.0.0.1:5000/api/flow_analyzer", {
        method: "POST", body: formData,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const responseData = await response.json();
      setApiResponse(responseData);
    } catch (error) {
      setUploadError("Failed to upload audio file.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNext = () => { setIsModalOpen(true); setModalCountdown(5); };
  const fileInputRef = useRef(null);
  const handleClick = () => { fileInputRef.current.click(); };

  return (
    <ExamMonitorLayout>
      <div className="flex flex-col items-center justify-center min-h-screen font-[Poppins]">
        <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-xl font-medium mb-6">English Fluency Test</h1>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li className="font-medium">Important Instructions:</li>
            <li>Complete speech without interruptions.</li>
            <li>Cannot pause/stop midway.</li>
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
                if (e.target.files && e.target.files[0]) setUploadedFileName(e.target.files[0].name);
                else setUploadedFileName(null);
                setAudioURL(null); 
            }}/>
            {/* <Button onClick={handleClick} variant="custom" image={plus} disabled={isRecording || isEncoding || isAnalyzing}/> */}
            <Button text="Submit" variant="primary" onClick={uploadedFileName ? handleSubmitUploadedFile : handleSubmit} disabled={isAnalyzing || isRecording || isEncoding || (!audioURL && !uploadedFileName)}/>
            <Button text="Next" variant="outline" onClick={handleNext} disabled={isAnalyzing || isEncoding || isRecording} />
          </div>
          
          {uploadError && (<p className="text-red-500 text-xs mt-2 text-center">{uploadError}</p>)}
          {isEncoding && (<p className="mt-2 text-blue-600 font-medium text-center">Encoding MP3 (WASM)...</p>)}
          {audioURL && !isEncoding && (
            <div className="mt-2 text-center">
              <p className="text-green-600 font-medium">✅ MP3 Ready!</p>
              <audio controls src={audioURL} className="mt-1 mx-auto"/>
              <a href={audioURL} download="recording.mp3" className="block text-blue-500 hover:underline mt-1">Download MP3</a>
            </div>
          )}
          {uploadedFileName && (<p className="text-xs text-gray-500 mt-1">Selected for upload: {uploadedFileName}</p>)}
          {isAnalyzing ? ( <div className="mt-6 p-6 border"><p>Analyzing...</p></div> ) : 
            apiResponse && ( <div className="mt-6 p-6 border"><pre>{JSON.stringify(apiResponse, null, 2)}</pre></div> )
          }
        </div>
      </div>
      <Transition appear show={isModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
              <div className="flex flex-col items-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500" />
                <Dialog.Title as="h2" className="mt-4 text-lg font-medium">Fluency Test Completed!</Dialog.Title>
                <p className="mt-2 text-sm text-gray-600">Next: Essay questions.</p>
                <span className="countdown font-mono text-6xl">{modalCountdown}</span>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </ExamMonitorLayout>
  );
};

export default EnglishFluencyTest;