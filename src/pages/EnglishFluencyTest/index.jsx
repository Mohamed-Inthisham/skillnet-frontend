import React, { useState, useRef, useEffect } from "react";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import Button from "../../components/Button";

const EnglishFluencyTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60); 
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Start Recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("Microphone access granted:", stream);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        console.log("MediaRecorder stopped. Processing audio...");

        if (audioChunksRef.current.length === 0) {
          console.error("No audio recorded. The chunk array is empty.");
          return;
        }

        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });

        if (!audioBlob || audioBlob.size === 0) {
          console.error("Blob creation failed or it's empty.");
          return;
        }

        const audioUrl = URL.createObjectURL(audioBlob);

        console.log("Audio recorded successfully:", audioBlob);
        console.log("Audio URL:", audioUrl);

        setAudioBlob(audioBlob);
        setAudioURL(audioUrl);
      };

      mediaRecorder.start();
      setIsRecording(true);
      console.log("Recording started...");

      // Start countdown
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
      console.error("Error accessing microphone:", error);
      alert("Microphone access is required for recording.");
    }
  };

  // Stop Recording
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      console.log("⏹ Recording stopped.");

      // Stop all audio tracks to release microphone
      const tracks = mediaRecorderRef.current.stream.getTracks();
      tracks.forEach((track) => track.stop());
      console.log("Microphone turned off.");
    }

    // Clear countdown timer
    clearInterval(timerRef.current);
  };

  return (
    <div className="flex flex-col min-h-screen font-[Poppins]">
      <UserHeader />
      <div className="flex-grow flex flex-col items-center mt-16 p-6">
        <h1 className="text-xl font-medium mb-16">English Fluency Test</h1>
        <div className="w-full max-w-2xl h-[300px] p-6 border border-blue-300 rounded-lg shadow-lg text-center">
          <p className="text-gray-600 mt-20">
            Tell us about yourself and how you feel about this course.
          </p>
        </div>


        <div className="mt-4 flex items-center space-x-4">
          {/* Countdown Timer */}
          <span className="countdown font-mono text-lg bg-blue-100 text-blue-500 rounded-lg py-2 px-2">
            <span
              style={{ "--value": Math.floor(timeLeft / 60) }}
              aria-live="polite"
              aria-label={`${Math.floor(timeLeft / 60)}`}
            >
              {Math.floor(timeLeft / 60)}
            </span>
            m
            <span
              style={{ "--value": timeLeft % 60 }}
              aria-live="polite"
              aria-label={`${timeLeft % 60}`}
            >
              {timeLeft % 60}
            </span>
            s
          </span>

          {/* Recording Buttons */}
          {!isRecording ? (
            <button
              className="flex items-center bg-blue-100 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-200"
              onClick={startRecording}
            >
              <span className="mr-2">🎤</span>
              <span>Start Recording</span>
            </button>
          ) : (
            <button
              className="flex items-center bg-red-100 text-red-500 px-4 py-2 rounded-lg hover:bg-red-200"
              onClick={stopRecording}
            >
              <span className="mr-2">⏹</span>
              <span>Stop Recording</span>
            </button>
          )}

          <Button
            text="Submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          />
        </div>

        {audioURL && (
          <div className="mt-4">
            <p className="text-green-600 font-medium">
              ✅ Recording saved! Play below:
            </p>
            <audio controls>
              <source src={audioURL} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
      <Footer bgColor="bg-black" textColor="text-white" />
    </div>
  );
};

export default EnglishFluencyTest;
