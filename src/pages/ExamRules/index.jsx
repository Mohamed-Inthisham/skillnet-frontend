import React from "react";
import UserHeader from "../../layout/UserHeader";
import Footer from "../../layout/Footer";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const ExamRules = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <UserHeader />
      
      <main className="flex-grow flex justify-center items-center p-10">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold text-center mb-6">Exam General Guidelines</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Ensure your face is clearly visible throughout the exam.</li>
            <li>The system will continuously verify your identity using face recognition technology.</li>
            <li>Any mismatch or unrecognized face will trigger an alert and may result in disqualification.</li>
            <li>Choose a quiet, distraction-free, and well-lit location.</li>
            <li>Avoid having other individuals or devices in your surroundings.</li>
            <li>No talking or external assistance is allowed during the exam.</li>
            <li>Continuous monitoring of head movement will detect deviations (e.g., looking away).</li>
            <li>Unauthorized materials, such as notes or electronic devices, are strictly prohibited.</li>
            <li>Speak clearly and audibly when answering oral questions.</li>
            <li>Avoid long silences, excessive filler words, or incomplete answers.</li>
            <li>Respond to all questions within the allocated time.</li>
            <li>Submit your responses before the timer ends.</li>
            <li>Review the submission confirmation screen.</li>
          </ul>
          <div className="flex justify-end mt-6">
            <Link to="/EnglishFluency">
            <Button text="Click Here To Start" className="text-sm cursor-pointer" variant="outline" />
            </Link>
          </div>
        </div>
      </main>
      
      <Footer bgColor="bg-black" textColor="text-white" />
    </div>
  );
};

export default ExamRules;
