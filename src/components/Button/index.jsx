import React from "react";

const Button = ({ text, variant = "primary", className = "", onClick, image }) => {
    const baseStyles = "px-6 py-2 rounded-lg transition font-medium flex items-center justify-center";
    const variants = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 font-[Poppins]",
        outline: "border bg-white border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-[Poppins]",
        custom: "bg-blue-100 text-blue-500 hover:bg-blue-200 cursor-pointer font-[Poppins]"
    };

    return (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
            {image && <img src={image} alt="Button Icon" className=" h-7 w-7" />} 
            {text}
        </button>
    );
};

export default Button;