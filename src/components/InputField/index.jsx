import React from "react";

const InputField = ({ type, placeholder, icon, className = "" }) => {
  return (
    <div className={`flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm ${className}`}>
      <span className="text-gray-500">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full ml-2 outline-none bg-transparent"
      />
    </div>
  );
};

export default InputField;
