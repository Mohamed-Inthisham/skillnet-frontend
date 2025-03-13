import React, { useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const CompanyEnglishFluencyTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(5);
  const [response, setResponse] = useState("");
  const [question, setQuestion] = useState("What are your career goals, and how do you plan to achieve them?"); 
  const [isEditingQuestion, setIsEditingQuestion] = useState(false); 
  const [timeDuration, setTimeDuration] = useState("60 minutes"); 
  const [isEditingTimeDuration, setIsEditingTimeDuration] = useState(false); 

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

  const handleSaveQuestion = () => {
    setIsEditingQuestion(false); 
  
  };

  const handleEditQuestion = () => {
    setIsEditingQuestion(true); 
  };

  const handleSaveTimeDuration = () => {
    setIsEditingTimeDuration(false); 
  };

  const handleEditTimeDuration = () => {
    setIsEditingTimeDuration(true); 
  };

  return (
    <div className="flex flex-col mb-8 font-[Poppins]">
      <div className="flex-grow flex flex-col items-center mt-5">
        <h1 className="text-xl font-medium mb-6">English Fluency Test</h1>
        <div className="w-full max-w-2xl p-6 border border-blue-300 rounded-lg shadow-lg">
          {/* Editable Question Section */}
          <div className="mb-4">
            {isEditingQuestion ? (
              <div className="flex flex-col space-y-2">
                <textarea
                  text="Question"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Edit the question..."
                />
                <Button
                  text="Save Question"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                  onClick={handleSaveQuestion}
                />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-gray-600">{question}</p>
              </div>
            )}
          </div>

          {/* Editable Time Duration Section */}
          <div className="mb-4">
            {isEditingTimeDuration ? (
              <div className="flex flex-col space-y-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={timeDuration}
                  onChange={(e) => setTimeDuration(e.target.value)}
                  placeholder="Edit the time duration..."
                />
                <Button
                  text="Save Time Duration"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                  onClick={handleSaveTimeDuration}
                />
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-gray-600">Time Duration: {timeDuration}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center space-x-4">
          <Button
            text="Edit Question"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={handleEditQuestion}
          />
          <Button
            text="Edit Time Duration"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
            onClick={handleEditTimeDuration}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyEnglishFluencyTest;