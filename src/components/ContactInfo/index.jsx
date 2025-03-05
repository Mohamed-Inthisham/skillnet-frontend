import React from "react";
import Button from "../Button";

const ContactInfo = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-blue-600">Get in Touch</h2>
      <p className="text-gray-600">
        Have questions or need assistance? We're here to help! Reach out via phone or email, and we'll respond as soon as possible.
      </p>
      <div className="flex items-center gap-3">
        <span className="bg-blue-100 p-2 rounded-full">
          📧
        </span>
        <span className="text-gray-700">admin@aigl.com</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="bg-blue-100 p-2 rounded-full">
          📞
        </span>
        <span className="text-gray-700">(239) 555-0108</span>
      </div>
    </div>
  );
};

export default ContactInfo;