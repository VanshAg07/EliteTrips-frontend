import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { setUser } from "../../Slices/UserSlice";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyOtpLoading, setVerifyOtpLoading] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    
    console.log("Attempting login with:", { email, password: "***" });
    
    try {
      const response = await fetch("https://elitetrips-backend.onrender.com/api/admin/login", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      
      const data = await response.json();
      console.log("Response status:", response.status);
      console.log("Response data:", data);
      
      if (response.status === 200) {
        toast.success("Login Success");
        window.localStorage.setItem("token", data.data.token);
        const decodedToken = jwtDecode(data.data.token);
        dispatch(setUser(data.data));
        const role = decodedToken.role;
        if (role === "admin") {
          window.location.href = "/admin";
        } else {
          setErrorMessage("You do not have admin access.");
        }
      } else {
        setErrorMessage(data.error || data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred during login. Please check the console.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setOtpLoading(true);
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
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setVerifyOtpLoading(true);
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
      setVerifyOtpLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setResetPasswordLoading(true);
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setResetPasswordLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        "https://elitetrips-backend.onrender.com/api/auth/reset-password",
        { email, password: newPassword }
      );
      if (response.status === 200) {
        toast.success("Password reset successfully.");
        setShowForgotPassword(false);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Failed to reset password."
      );
    } finally {
      setResetPasswordLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">
          {showForgotPassword ? "Forgot Password" : "Admin Login"}
        </h2>
        {errorMessage && (
          <div className="p-2 text-red-600 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}
        {!showForgotPassword ? (
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-sm text-blue-600 hover:underline flex justify-end w-full mt-2"
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
              />
            </div>
            {otpSent && !verifiedOtp && (
              <>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <input
                    type="text"
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter the OTP"
                  />
                </div>
                <button
                  onClick={handleVerifyOtp}
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
                  disabled={verifyOtpLoading}
                >
                  {verifyOtpLoading ? "Verifying OTP..." : "Verify OTP"}
                </button>
              </>
            )}
            {verifiedOtp && (
              <>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  onClick={handleResetPassword}
                  className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
                  disabled={resetPasswordLoading}
                >
                  {resetPasswordLoading ? "Resetting Password..." : "Reset Password"}
                </button>
              </>
            )}
            {!otpSent && (
              <button
                onClick={handleForgotPassword}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
                disabled={otpLoading}
              >
                {otpLoading ? "Sending OTP..." : "Send OTP"}
              </button>
            )}
            <button
              onClick={() => setShowForgotPassword(false)}
              className="text-sm text-blue-600 hover:underline"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminLogin;
