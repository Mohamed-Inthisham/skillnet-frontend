import React from "react";
import Button from "../../Button";
import email from "../../../assets/email_contactus.webp";
import whatsapp from "../../../assets/whatsappImage.webp";

const ContactInfo = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg flex flex-col md:flex-row justify-between items-center font-[Poppins] ml-6 mr-6">
      <div className="md:w-2/3">
        <h2 className="text-lg font-semibold text-blue-400 -mt-2">Get in Touch</h2>
        <p className="text-gray-600 mt-6 tracking-wide">
          Have questions or need assistance? We're here to help! Reach out via
          phone or email, and we'll respond as soon as possible.
        </p>
      </div>
      <div className="md:w-1/4 flex flex-col gap-3 mt-4 md:mt-0">
        <div className="flex items-center gap-3">
          <span className="bg-blue-300 p-2 rounded-full"><img src={email}/></span>
          <span className="text-gray-700">admin@aigl.com</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-blue-300 p-2 rounded-full"><img src={whatsapp}/></span>
          <span className="text-gray-700">(239) 555-0108</span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;