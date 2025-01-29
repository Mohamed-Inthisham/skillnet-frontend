import React from "react";

const Button = ({ text, variant = "primary" }) => {
  const baseStyles = "px-6 py-2 rounded-lg transition font-semibold";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border bg-white border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
  };
  return <button className={`${baseStyles} ${variants[variant]}`}>{text}</button>;
};

export default Button;
