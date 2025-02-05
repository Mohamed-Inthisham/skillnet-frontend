import React from "react";
import InputField from "../InputField";
import Button from "../Button";
import { FaUser, FaLock } from "react-icons/fa";
import LockIcon from "../../assets/pwIcon.webp";
import UserIcon from "../../assets/userIcon.webp";

const AuthCard = () => {
  return (
    <div className="font-[Poppins]">
      <h2 className="text-5xl font-bold text-black text-center tracking-wider">
        WELCOME
      </h2>
      <p className="text-[13px] text-black text-center mb-10">
        Please enter your credentials to login
      </p>

      <form className="">
        <div>
          <p className="text-[15px] mb-2">User name</p>
          <InputField
            type="text"
            icon={<img src={UserIcon} alt="User Icon" className="w-7 h-6" />}
          />
        </div>
        <div className="mt-4 mb-4">
          <p className="text-[15px] mb-2">Password</p>
          <InputField
            type="password"
            icon={<img src={LockIcon} alt="Lock Icon" className="w-6 h-6" />}
          />
        </div>
        <p className="text-sm text-black mb-4">
          Don't have an account?{" "}
          <span className="text-blue-500 cursor-pointer">Register</span>
        </p>
        <Button text="Login" className="w-full" />
      </form>
    </div>
  );
};

export default AuthCard;
