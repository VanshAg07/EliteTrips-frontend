import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import bg from "../../images/signup.jpg";
import useMediaQuery from "../hooks/UseMediaQuery";
import Signupmobile from "./Signupmobile";

function Signup() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  // Handle sending OTP to the user's email
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setIsSendingOtp(true); // Set loading state
    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.status === "ok") {
        toast.success("OTP sent to your email");
        setIsOtpSent(true);
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP");
    } finally {
      setIsSendingOtp(false); // Reset loading state
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsVerifyingOtp(true); // Set loading state
    try {
      const response = await fetch(
        "http://localhost:5001/api/auth/verifyOtp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();

      if (data.status === "ok") {
        toast.success("OTP verified successfully");
        setIsOtpVerified(true);
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (error) {
      toast.error("An error occurred during OTP verification");
    } finally {
      setIsVerifyingOtp(false); // Reset loading state
    }
  };

  // Handle signup form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      toast.error("Please verify the OTP before signing up");
      return;
    }

    if (phoneNo.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return;
    }

    setIsSigningUp(true); // Set loading state
    try {
      const response = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          phoneNo,
        }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        toast.success("Signup Successful");
        // Redirect to the login page after successful registration
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000); // Optional: Add a delay before redirecting
      } else {
        setError(data.error || "Signup failed");
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred");
      toast.error("An error occurred");
    } finally {
      setIsSigningUp(false); // Reset loading state
    }
  };
  const [signInData, setSignInData] = useState(null);
  const fetchSignInData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/popup/auth-image-user"
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
  if (isMobile) {
    return <Signupmobile />;
  }

  return (
    <div className="bg-cover bg-center bg-[#e1feff] h-screen w-full flex justify-center items-center">
      <div className="w-[80%] max-w-[70%] h-[85%] bg-white shadow-xl shadow-black rounded-xl flex">
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
            Create an Account
          </h1>
          <p className="text-black font-medium mb-8">
            Sign up to create a new account
          </p>
          <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="text-black font-medium mb-1 text-sm">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16423C]"
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black font-medium mb-1 text-sm">
                Phone No.
              </label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,10}$/.test(value)) {
                    setPhoneNo(value);
                    setPhoneError(""); // Clear error when valid input
                  } else {
                    setPhoneError(
                      "Phone number must be exactly 10 digits and contain only numbers."
                    );
                  }
                }}
                placeholder="Enter phone number"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16423C]"
                autoComplete="off"
              />
              {phoneError && (
                <p className="text-red-500 text-sm">{phoneError}</p>
              )}
            </div>
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
            <button
              type="button"
              className="w-full py-2 mt-2 font-medium bg-blue-500 text-white rounded-lg hover:scale-95 transition duration-300 cursor-pointer"
              onClick={handleSendOtp}
              disabled={isSendingOtp || isOtpSent}
            >
              {isSendingOtp ? "Sending OTP..." : isOtpSent ? "OTP Sent" : "Send OTP"}
            </button>

            {isOtpSent && !isOtpVerified && (
              <>
                <div className="flex flex-col mt-4">
                  <label className="text-black font-medium mb-1 text-sm">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the OTP sent to your email"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16423C]"
                  />
                  <button
                    type="button"
                    className="w-full py-2 mt-2 font-medium bg-green-500 text-white rounded-lg hover:scale-95 transition duration-300"
                    onClick={handleVerifyOtp}
                    disabled={isVerifyingOtp || isOtpVerified}
                  >
                    {isVerifyingOtp ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                </div>
              </>
            )}
            {isOtpVerified && (
              <div className="flex flex-col">
                <label className="text-black font-medium mb-1 text-sm">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16423C]"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 font-medium bg-cyan-500 text-white rounded-lg hover:scale-95 transition duration-300"
              disabled={isSigningUp || !isOtpVerified} // Disable button while loading or until OTP is verified
            >
              {isSigningUp ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
          <p className="mt-3 font-medium text-black">
            -------------- OR --------------
          </p>
          <p className="mt-2 font-medium text-black">
            Already have an account?
            <span className="text-blue-600 cursor-pointer hover:underline ml-1">
              <a href="/login">Login</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
