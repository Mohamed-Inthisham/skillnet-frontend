import React from "react";
import Button from "../../components/Button";
import logo from "../../assets/Logo.webp";

const Footer = ({ bgColor, textColor }) => {
  return (
    <nav
      className={`flex justify-center items-center p-4 ${bgColor} ${textColor} border-t-2 border-gray-200 px-10 mr-[100px] ml-[100px]  font-[Poppins mt-10`}
    >
      <h1 className="text-sm">
        <p>
          Copyright © 2025 <span className="text-blue-500">AIGL Team.</span> All
          Rights Reserved.
        </p>
      </h1>
    </nav>
  );
};

export default Footer;
