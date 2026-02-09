import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import backgroundImage from "../../img/login.jpg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const logo = "/Elitetriplogo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInData, setSignInData] = useState(null);
  const fetchSignInData = async () => {
    try {
      const response = await fetch(
        "https://elitetrips-backend.onrender.com/api/popup/auth-image-user"
      );
      const data = await response.json(); // Make sure to parse the response
      setSignInData(data[0]); // Assuming you want the first object from the array
    } catch (error) {
      console.error("Error fetching sign-in data:", error);
    }
  };
  useEffect(() => {
    fetchSignInData();
  }, []);
  const navigate = useNavigate();
  const handleForgotPassword = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://elitetrips-backend.onrender.com/api/auth/request-password-reset",
        { email }
      );

      if (response.status === 200) {
        setOtpSent(true);
        toast.success("OTP sent to your email.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "https://elitetrips-backend.onrender.com/api/auth/verify-otp",
        { email, otp }
      );

      if (response.status === 200) {
        setVerifiedOtp(true);
        toast.success("OTP verified. You can now reset your password.");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.put(
        "https://elitetrips-backend.onrender.com/api/auth/reset-password",
        { email, password: newPassword }
      );

      if (response.status === 200) {
        navigate("/login");
        toast.success("Password reset successfully.");
        setOtpSent(false);
        setVerifiedOtp(false);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
    className="h-screen flex flex-col justify-center items-center bg-cover overflow-y-auto bg-center"
    style={{
      backgroundImage: `url(${
        signInData &&
        signInData.phoneImage &&
        signInData.phoneImage.length > 0
          ? signInData.phoneImage[0]
          : backgroundImage
      })`,
    }}
  >
      <div className="absolute inset-0 bg-[#4B6681B2] z-0"></div>
      <div className="relative w-full max-w-xs p-5 z-10 bg-transparent">
        <div className="flex justify-center">
          <img src={logo} alt="EliteTrips Logo" className="h-40" />
        </div>
        <h2 className="text-center -mt-5 text-white text-xl font-bold mb-6">
          Forgot Your Password
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 placeholder-black rounded-md border border-gray-300 bg-white"
            required
          />
          {!otpSent && (
            <button
              type="button"
              onClick={handleForgotPassword}
              className="w-full p-3 bg-cyan-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          )}
          {otpSent && !verifiedOtp && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 placeholder-black rounded-md border border-gray-300 bg-white"
                required
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full p-3 bg-cyan-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                disabled={loading}
              >
                {loading ? "Verifying OTP..." : "Verify OTP"}
              </button>
            </>
          )}
          {verifiedOtp && (
            <>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 placeholder-black rounded-md border border-gray-300 bg-white"
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 placeholder-black rounded-md border border-gray-300 bg-white"
                required
              />
              <button
                type="button"
                onClick={handleResetPassword}
                className="w-full p-3 bg-cyan-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                disabled={loading}
              >
                {loading ? "Resetting Password..." : "Submit"}
              </button>
            </>
          )}
        </form>

        {errorMessage && (
          <div className="text-red-500 text-center mt-4">{errorMessage}</div>
        )}

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-1/4"></div>
          <span className="mx-2 text-white text-sm">OR</span>
          <div className="border-t border-gray-300 w-1/4"></div>
        </div>
        <p className="mt-4 text-center text-white text-sm">
          Don't have an account?{" "}
          <a
            href="/Signup"
            className="text-white ml-1 cursor-pointer hover:underline"
          >
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
