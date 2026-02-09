import React, { useEffect, useState } from "react";
import bg from "../../images/LoginImg.png";
import useMediaQuery from "../hooks/UseMediaQuery";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Forgotmob from "./Forgotmob";
import axios from "axios";

function Forgot() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [signInData, setSignInData] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    fetchSignInData();
  }, []);
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSendOtp = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

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
    if (otp.length !== 6) {
      setErrorMessage("OTP should be 6 digits.");
      return;
    }

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
    if (newPassword.length < 6) {
      setErrorMessage("Password should be at least 6 characters long.");
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
        toast.success("Password reset successfully.");
        navigate("/login");
        resetForm();
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to reset password."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setOtpSent(false);
    setVerifiedOtp(false);
    setEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  if (isMobile) {
    return <Forgotmob />;
  }

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

  return (
    <div className="bg-cover bg-center bg-[#e1feff] h-screen w-full flex justify-center items-center">
      <div className="w-[80%] max-w-[70%] h-[75%] bg-[#C4DAD2] shadow-xl shadow-black rounded-2xl flex">
        {signInData && signInData.image && signInData.image.length > 0 && (
          <div
            className="w-[50%] h-full bg-cover bg-center rounded-l-xl"
            style={{
              backgroundImage: `url(${signInData.image[0]})`,
            }}
          ></div>
        )}
        <div className="w-[50%] h-full flex flex-col justify-center items-center bg-[#e1feff] p-10 rounded-r-2xl">
          <h1 className="text-2xl font-bold text-cyan-500 mb-4">
            Forgot Your Password
          </h1>

          <form
            className="w-full flex flex-col gap-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="flex flex-col">
              <label className="text-black font-medium mb-1 text-sm">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16423C]"
              />
            </div>

            {otpSent && (
              <>
                <div className="flex flex-col">
                  <label className="text-black font-medium mb-1 text-sm">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16423C]"
                  />
                </div>
              </>
            )}

            {verifiedOtp && (
              <>
                <div className="flex flex-col">
                  <label className="text-black font-medium mb-1 text-sm">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16423C]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-black font-medium mb-1 text-sm">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16423C]"
                  />
                </div>
              </>
            )}

            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}

            <button
              type="button"
              onClick={
                !otpSent
                  ? handleSendOtp
                  : !verifiedOtp
                  ? handleVerifyOtp
                  : handleResetPassword
              }
              className={`w-full py-2 font-medium text-white rounded-lg hover:scale-95 transition duration-300 ${
                loading ? "bg-gray-500" : "bg-cyan-500"
              }`}
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : otpSent
                ? verifiedOtp
                  ? "Submit"
                  : "Verify OTP"
                : "Send OTP"}
            </button>

            <p className="mt-3 font-medium text-black text-sm">
              -------------- OR --------------
            </p>

            <p className="mt-2 font-medium text-black text-sm">
              Don't have an account?
              <span className="text-blue-600 font-medium cursor-pointer hover:underline ml-1">
                <Link to="/Signup">Register Now</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
