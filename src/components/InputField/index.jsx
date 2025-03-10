import React from "react";

const InputField = ({ type, placeholder, icon, className = "", value, onChange }) => {
  return (
    <div className={`flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white shadow-sm ${className}`}>
      <span className="text-gray-500">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full ml-2 outline-none bg-transparent"
        value={value} // Add value prop
        onChange={(e) => { // Add onChange prop and handler with console.log
          console.log(`Input field '${placeholder || type}' changed:`, e.target.value); // Debugging log
          onChange(e); // Call the onChange prop passed from parent
        }}
      />
    </div>
  );
};

export default InputField;