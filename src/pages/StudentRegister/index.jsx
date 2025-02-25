import React from "react";
import CommonHeader from "../../layout/CommonHeader";
import Button from "../../components/Button";
import registerImage from "../../assets/registerImage.webp";
import phone from "../../assets/Phone.webp";
import emails from "../../assets/Email.webp";
import InputField from "../../components/InputField";
import Camera from "../../assets/camera.webp";
import { Link } from "react-router-dom";

const StudentRegister = () => {
  return (
    <div className="min-h-screen font-[Poppins] ">
      <CommonHeader />
      <div className="flex justify-center items-center h-full px-10">
        {/* Left Section */}
        <div className="w-1/2 p-10 ml-[100px]">
          <h1 className="text-4xl font-semibold mb-4 -mt-5 leading-[3.5rem]">
            Start Your
            <br />
            journey with us
          </h1>
          <p className="text-gray-700 mb-6">
            Skill Net empowers learners with innovative tools for
            skill-building, language fluency, and certification credibility.
            Take the first step towards a successful career today.
          </p>
          <img src={registerImage} />
          <div className="border-4 border-blue-400 p-4 rounded-lg w-3/4">
            <p className="font-semibold">For Company Registrations</p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center gap-2">
                <img src={emails} alt="Email Icon" className="w-5 h-5" />
                <p className="text-gray-600"> admin@aigl.com</p>
              </div>
              <div className="flex items-center gap-2">
                <img src={phone} alt="Phone Icon" className="w-5 h-5" />
                <p className="text-gray-600"> +94 77 8934 874</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Sign Up Form */}
        <div className="w-1/2 bg-neutral-200 p-8 rounded-lg shadow-lg mr-[100px] -mt-10 h-[700px]">
          <h2 className="text-3xl font-semibold mb-2 text-center">Sign Up</h2>
          <p className="text-sm text-gray-600 mb-16 text-center before:content-['*'] before:text-red-500 before:mr-1">
            have an account -{" "}
            <Link to="/login" className="text-blue-500 cursor-pointer">
              Login
            </Link>
          </p>

          <form className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[15px] mb-2">First name</p>
              <InputField type="text" />
            </div>
            <div>
              <p className="text-[15px] mb-2">Last name</p>
              <InputField type="text" />
            </div>
            <div>
              <p className="text-[15px] mb-2">Email</p>
              <InputField type="text" className="w-[515px]" />
            </div>
            <br />
            <div>
              <p className="text-[15px] mb-2">Phone</p>
              <InputField type="text" />
            </div>
            <div>
              <p className="text-[15px] mb-2">DOB</p>
              <InputField type="date" />
            </div>
            <div>
              <p className="text-[15px] mb-2">Address</p>
              <InputField type="text" className="w-[515px]" />
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-700 mb-2 before:content-['*'] before:text-red-500 before:mr-1">
                User’s Real Picture
              </p>

              <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-blue-500 border-blue-500 hover:bg-stone-100 bg-white mb-10">
                Click to Open
                <img src={Camera} alt="Camera Icon" className="w-5 h-5" />
              </button>
            </div>
            <div className="col-span-2 flex justify-end">
              <Button text="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
