import React, { useState, useRef, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom"; 

const EnglishFluencyTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(5);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const navigate = useNavigate(); 

useEffect(() => {
  let modalTimer;
  if (isModalOpen) {
    modalTimer = setInterval(() => {
      setModalCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(modalTimer);
          setIsModalOpen(false);
          navigate("/EssayQuestions"); 
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }
  return () => clearInterval(modalTimer);
}, [isModalOpen, navigate]);

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
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
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
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
    clearInterval(timerRef.current);
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
    setModalCountdown(5);
  };

  return (
    <div className="flex flex-col min-h-screen font-[Poppins]">
      <UserHeader />
      <div className="flex-grow flex flex-col items-center mt-5">
        <h1 className="text-xl font-medium mb-6">English Fluency Test</h1>
        <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
          <li className="font-medium">Important Instructions Before Recording:</li>
          <li>Once you start recording, you must complete your full speech without interruptions.</li>
          <li>You cannot pause or stop the recording midway.</li>
        </ul>
        <div className="w-full max-w-2xl h-[300px] p-6 border border-blue-300 rounded-lg shadow-lg text-center">
          <p className="text-gray-600 mt-20">Tell us about yourself and how you feel about this course.</p>
        </div>
        <div className="mt-4 flex items-center space-x-4">
          <span className="countdown font-mono text-lg bg-blue-100 text-blue-500 rounded-lg py-2 px-2">
            {Math.floor(timeLeft / 60)}m {timeLeft % 60}s
          </span>
          {!isRecording ? (
            <button className="flex items-center bg-blue-100 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-200 cursor-pointer" onClick={startRecording}>
              <span className="mr-2">🎤</span> Start Recording
            </button>
          ) : (
            <button className="flex items-center bg-red-100 text-red-500 px-4 py-2 rounded-lg hover:bg-red-200 cursor-pointer" onClick={stopRecording}>
              <span className="mr-2">⏹</span> Stop Recording
            </button>
          )}
          <Button text="Submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer" onClick={handleSubmit} />
        </div>
        {audioURL && (
          <div className="mt-2">
            <p className="text-green-600 font-medium text-center">✅ Recording saved!</p>
            <audio controls>
              <source src={audioURL} type="audio/wav" />
            </audio>
          </div>
        )}
      </div>
      <Footer bgColor="bg-black" textColor="text-white" />
      <Transition appear show={isModalOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setIsModalOpen(false)}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
              <div className="flex flex-col items-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500" />
                <Dialog.Title as="h2" className="mt-4 text-lg font-medium text-gray-900">
                  Successfully Completed the Fluency Test!
                </Dialog.Title>
                <p className="mt-2 text-sm text-gray-600">Next test is based on essay questions.</p>
                <span className="countdown font-mono text-6xl">
                  <span style={{ "--value": modalCountdown }} aria-live="polite">{modalCountdown}</span>
                </span>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default EnglishFluencyTest;
