import React, { useRef, useState, useCallback, useEffect } from "react";
import CommonHeader from "../../layout/CommonHeader";
import Button from "../../components/Button";
import registerImage from "../../assets/registerImage.webp";
import phone from "../../assets/Phone.webp";
import emails from "../../assets/Email.webp";
import InputField from "../../components/InputField";
import Camera from "../../assets/camera.webp";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import Axios

const StudentRegister = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  // Form input states - matching backend entities from Postman
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(""); // Date will be stored as YYYY-MM-DD directly from input type="date"
  const [address, setAddress] = useState("");

  const openCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }, []);

  const closeCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  const handleCameraButtonClick = () => {
    setIsModalOpen(true);
    openCamera();
  };

  const handleCapture = useCallback(async () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageSrc = canvas.toDataURL("image/webp");
      setCapturedImage(imageSrc);
      setIsModalOpen(false);
      closeCamera();
      console.log("Captured Image Data URL:", imageSrc);
    }
  }, [closeCamera]);

  const handleModalClose = () => {
    setIsModalOpen(false);
    closeCamera();
  };

  useEffect(() => {
    return () => {
      if (isModalOpen) {
        closeCamera();
      }
    };
  }, [isModalOpen, closeCamera]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convert captured image data URL to a File object
    let imageFile = null;
    if (capturedImage) {
      const blob = await (await fetch(capturedImage)).blob();
      imageFile = new File([blob], "profile_image.webp", { type: "image/webp" }); // You can change the filename and type
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('phone', phone);
    formData.append('dob', dob); // DOB is already in YYYY-MM-DD format from <input type="date">
    formData.append('address', address);
    if (imageFile) {
      formData.append('image', imageFile); // Append the File object
    }

    try {
      const response = await axios.post('http://localhost:5001/register/student', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });

      console.log("Registration successful!", response.data);
      alert("User registered successfully!"); // Popup success message
      // Optionally reset form fields
      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
      setPhone("");
      setDob("");
      setAddress("");
      setCapturedImage(null);


    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration Failed!"); // Popup failure message
      if (error.response) {
        console.error("Server error data:", error.response.data);
        console.error("Server error status:", error.response.status);
        if (error.response.data && error.response.data.msg) {
          alert(`Registration Failed: ${error.response.data.msg}`); // Show backend error message if available
        }
      } else if (error.request) {
        console.error("No response received from server:", error.request);
        alert("Registration Failed: No response from server.");
      } else {
        console.error("Error setting up the request:", error.message);
        alert("Registration Failed: Error setting up request.");
      }
    }
  };


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
          <img src={registerImage} alt="Register" />
          <div className="border-4 border-blue-400 p-4 rounded-lg w-3/4 mt-5">
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

          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div>
              <p className="text-[15px] mb-2">First name</p>
              <InputField
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <p className="text-[15px] mb-2">Last name</p>
              <InputField
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <p className="text-[15px] mb-2">Email</p>
              <InputField
                type="email" // Changed to email type
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <p className="text-[15px] mb-2">Password</p>
              <InputField
                type="password" // Added password field
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <p className="text-[15px] mb-2">Phone</p>
              <InputField
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <p className="text-[15px] mb-2">DOB</p>
              <InputField
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <p className="text-[15px] mb-2">Address</p>
              <InputField
                type="text"
                className="w-[515px]"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-700 mb-2 before:content-['*'] before:text-red-500 before:mr-1">
                User’s Real Picture
              </p>

              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-blue-500 border-blue-500 hover:bg-stone-100 bg-white mb-2"
                onClick={handleCameraButtonClick}
              >
                Click to Open Camera
                <img src={Camera} alt="Camera Icon" className="w-5 h-5" />
              </button>

              {capturedImage && (
                <div className="mt-2">
                  <p className="text-sm text-gray-700 mb-1">Captured Image:</p>
                  <img src={capturedImage} alt="Captured" className="max-h-[150px] rounded-lg" />
                </div>
              )}
            </div>
            <div className="col-span-2 flex justify-end">
              <Button text="Register" type="submit" />
            </div>
          </form>
        </div>
      </div>

      {/* Camera Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg relative">
            <h3 className="text-lg font-semibold mb-4">Capture Your Picture</h3>
            <div className="relative">
              <video ref={videoRef} autoPlay className="w-full max-h-[400px] rounded-lg mb-4" />
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border-2 border-dashed border-yellow-500 pointer-events-none box-border"
              ></div>
            </div>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            <div className="flex justify-between">
              <button
                onClick={handleCapture}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Capture Image
              </button>
              <button
                onClick={handleModalClose}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegister;