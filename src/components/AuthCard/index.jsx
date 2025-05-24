import React, { useState } from "react";
import InputField from "../InputField";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
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

      // --- DATA FROM LOGIN RESPONSE ---
      const accessToken = response.data.access_token;
      const userMongoDBId = response.data.userId; // <<< --- GET THE userId (MongoDB _id)
      const userRole = response.data.role;
      const userFirstname = response.data.firstname; // Get from response body
      const userLastname = response.data.lastname;   // Get from response body
      const companyNameFromResponse = response.data.company_name; // Get from response body
      // You can also get username, profile_image_url etc. from response.data if needed directly

      console.log("Login successful. Access Token:", accessToken);
      console.log("User MongoDB ID from response:", userMongoDBId);
      console.log("User Role from response:", userRole);

      if (!userMongoDBId) {
        console.error("CRITICAL: userId (MongoDB _id) not found in login response!");
        setLoginError("Login failed: User identification missing. Please contact support.");
        return;
      }
      // --- END DATA FROM LOGIN RESPONSE ---


      // Storing token and crucial IDs
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", userMongoDBId); // <<< --- STORE THE MONGODB _id
      localStorage.setItem("userRole", userRole); // Store role if needed elsewhere

      // Optional: Store decoded JWT if you need other claims not directly in response body
      // const decodedToken = jwtDecode(accessToken);
      // localStorage.setItem("decodedJWT", JSON.stringify(decodedToken));

      // Store display username
      if (userFirstname && userLastname) {
        const displayName = `${userFirstname} ${userLastname}`;
        localStorage.setItem("username", displayName); // For display purposes
        console.log("Display username stored:", displayName);
      } else if (response.data.username) { // Fallback to the generated username from response
        localStorage.setItem("username", response.data.username);
        console.log("Display username (fallback) stored:", response.data.username);
      } else {
        localStorage.setItem("username", email); // Last fallback
        console.warn("Firstname/lastname not in response. Storing email as display username.");
      }


      if (userRole === "student") {
        navigate("/Home");
      } else if (userRole === "company") {
        if (companyNameFromResponse) {
          localStorage.setItem("companyName", companyNameFromResponse);
          console.log("Company name stored:", companyNameFromResponse);
        } else {
          console.warn("Company role but company_name not found in login response for user:", email);
        }
        navigate("/CompanyDashboard");
      } else {
        console.warn("Unknown user role:", userRole);
        setLoginError(
          "Login successful, but unknown user role. Redirecting to default."
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response && error.response.data && error.response.data.msg) {
        setLoginError(error.response.data.msg);
      } else {
        setLoginError("Login failed. Please check your credentials.");
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
        {loginError && (
          <p className="text-red-500 text-sm mb-2 text-center">{loginError}</p>
        )}
        <div>
          <p className="text-[15px] mb-2">User name</p>
          <InputField
            type="email"
            placeholder="Email"
            icon={<img src={UserIcon} alt="User Icon" className="w-7 h-6" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            required
          />
        </div>
        <p className="text-sm text-black mb-4">
          Don't have an account?{" "}
          <Link to="/StudentRegister" className="text-blue-500 cursor-pointer hover:underline">
            Register
          </Link>
        </p>
        <Button text="Login" className="w-full" type="submit" />
      </form>
    </div>
  );
};

export default AuthCard;