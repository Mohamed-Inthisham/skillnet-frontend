import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct named import!
import LockIcon from "../../assets/pwIcon.webp";
import UserIcon from "../../assets/userIcon.webp";

const AuthCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");

    try {
      const response = await axios.post("http://localhost:5001/login", {
        email: email,
        password: password,
      });

      const accessToken = response.data.access_token;
      console.log("Login successful, JWT received:", accessToken);

      try {
        const decodedToken = jwtDecode(accessToken); // Correct jwtDecode import and function call
        console.log("Decoded JWT:", decodedToken); // Log decoded JWT for inspection!
        const userRole = decodedToken.role; // Access 'role' claim - assuming backend adds it as 'role'
        //-------------------------
        const companyNameFromToken = decodedToken.company_name; // Extract company_name
        const userEmailFromToken = decodedToken.sub; // Extract user email (subject)
        //-------------------------
        localStorage.setItem("accessToken", accessToken);
        // **ADD THIS LINE TO STORE DECODED JWT IN LOCALSTORAGE**
        localStorage.setItem("decodedJWT", JSON.stringify(decodedToken)); // Store decoded JWT as string

        if (userRole === "student") {
          navigate("/Home");
        // } else if (userRole === "company") {
        //   navigate("/CompanyDashboard");
         } else if (userRole === "company") {
          if (companyNameFromToken) {
            localStorage.setItem("companyName", companyNameFromToken); // Store company_name
            console.log("Company name stored:", companyNameFromToken);
          } else {
            console.warn("Company role but company_name not found in JWT for user:", userEmailFromToken);
            // Handle this case: maybe show an error, or proceed without companyName if dashboard can handle it
          }
          navigate("/CompanyDashboard");
        } else {
          console.warn("Unknown user role:", userRole);
          setLoginError("Login successful, but unknown user role. Redirecting to default.");
          navigate("/");
        }
      } catch (decodeError) {
        console.error("Error decoding JWT:", decodeError);
        setLoginError("Error processing login. Please try again.");
      }

    } catch (error) {
      console.error("Login failed:", error);
      setLoginError("Invalid email or password.");
      if (error.response && error.response.data && error.response.data.msg) {
        setLoginError(error.response.data.msg);
      }
    }
  };

  return (
    <div className="font-[Poppins]">
      <h2 className="text-5xl font-bold text-black text-center tracking-wider">
        WELCOME
      </h2>
      <p className="text-[13px] text-black text-center mb-10">
        Please enter your credentials to login
      </p>

      <form className="" onSubmit={handleLogin}>
        {loginError && <p className="text-red-500 text-sm mb-2">{loginError}</p>}
        <div>
          <p className="text-[15px] mb-2">User name</p>
          <InputField
            type="email"
            placeholder="Email"
            icon={<img src={UserIcon} alt="User Icon" className="w-7 h-6" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mt-4 mb-4">
          <p className="text-[15px] mb-2">Password</p>
          <InputField
            type="password"
            placeholder="Password"
            icon={<img src={LockIcon} alt="Lock Icon" className="w-6 h-6" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p className="text-sm text-black mb-4">
          Don't have an account?{" "}
          <span className="text-blue-500 cursor-pointer">
            <Link to="/StudentRegister">Register</Link>
          </span>
        </p>
        <Button text="Login" className="w-full" type="submit" />
      </form>
    </div>
  );
};

export default AuthCard;