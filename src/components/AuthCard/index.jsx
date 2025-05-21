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
        const decodedToken = jwtDecode(accessToken);
        console.log("Decoded JWT:", decodedToken); // Log decoded JWT for inspection!
        const userRole = decodedToken.role;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("decodedJWT", JSON.stringify(decodedToken)); // Store decoded JWT as string

        // --- Store username (firstname + lastname) ---
        // Adjust these claim names based on your actual JWT payload from the backend
        const userFirstname = decodedToken.firstname;
        const userLastname = decodedToken.lastname;

        if (userFirstname && userLastname) {
          const username = `${userFirstname} ${userLastname}`;
          localStorage.setItem("username", username);
          console.log("Username stored:", username);
        } else {
          // Fallback if firstname/lastname are not in the token
          localStorage.setItem("username", decodedToken.identity || "User"); // Use email (identity) or a generic "User"
          console.warn(
            "Firstname or lastname not found in JWT claims. Storing identity/generic 'User' as username."
          );
        }
        // --- End store username ---


        if (userRole === "student") {
          navigate("/Home");
        } else if (userRole === "company") {
          navigate("/CompanyDashboard");
        } else {
          console.warn("Unknown user role:", userRole);
          setLoginError(
            "Login successful, but unknown user role. Redirecting to default."
          );
          navigate("/"); // Or a generic dashboard / default page
        }
      } catch (decodeError) {
        console.error("Error decoding JWT:", decodeError);
        setLoginError("Error processing login. Please try again.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // setLoginError("Invalid email or password."); // Generic message
      if (error.response && error.response.data && error.response.data.msg) {
        setLoginError(error.response.data.msg); // Use backend message
      } else {
        setLoginError("Login failed. Please check your credentials."); // More specific generic message
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
            required // Add required attribute for basic browser validation
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
            required // Add required attribute
          />
        </div>
        <p className="text-sm text-black mb-4">
          Don't have an account?{" "}
          <Link to="/StudentRegister" className="text-blue-500 cursor-pointer hover:underline"> {/* Make it clear it's a Link */}
            Register
          </Link>
        </p>
        <Button text="Login" className="w-full" type="submit" />
      </form>
    </div>
  );
};

export default AuthCard;