import React from "react";

const Button = ({ text, variant = "primary", className = "", onClick }) => {
  const baseStyles = "px-6 py-2 rounded-lg transition font-semibold";
  
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 font-[Poppins]",
    outline: "border bg-white border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-[Poppins]"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {text}
    </button>
  );
};

export default Button;
