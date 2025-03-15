import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import ExamMonitorLayout from "../../layout/ExamMonitor";

const EnglishFluency = () => {
  const [counter, setCounter] = useState(5);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (counter > -1) {
      const timer = setTimeout(() => setCounter(counter - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/EnglishFluencyTest"); 
    }
  }, [counter, navigate]);

  return (
    <ExamMonitorLayout>
      <div className="flex flex-col min-h-screen font-[Poppins]">      
        <main className="flex flex-grow items-center justify-center px-6 py-10">
          <div className="w-full max-w-3xl h-[500px] bg-white shadow-lg rounded-lg p-8 border border-gray-200 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-medium text-gray-800 text-center">
              English Fluency Test
            </h1>
            <p className="text-md text-gray-600 mt-2 text-center">
              Please speak for more than 1 minute
            </p>
            <p className="text-md text-gray-600 text-center">
              Record Starting in.....
            </p>

            {/* Countdown Timer */}
            <div className="mt-6">
              <span className="countdown font-mono text-6xl">
                <span aria-live="polite" aria-label={counter}>
                  {counter}
                </span>
              </span>
            </div>
          </div>
        </main>

      
      </div>
    </ExamMonitorLayout>
  );
};

export default EnglishFluency;
