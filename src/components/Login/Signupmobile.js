import React, { useEffect, useState } from "react";
import backgroundImage from "../../img/login.jpg";
import toast from "react-hot-toast";

const logo = "/Elitetriplogo.png";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState("");
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
  // Handle sending OTP to the user's email
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const response = await fetch("https://elitetrips-backend.onrender.com/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        toast.success("OTP sent to your email");
        setIsOtpSent(true);
      } else {
        toast.error(data.error || "Failed to send OTP");
      }
    } catch (error) {
      toast.error("An error occurred while sending OTP");
    }
  };

  // Handle OTP verification
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      const response = await fetch("https://elitetrips-backend.onrender.com/api/auth/verifyOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (data.status === "ok") {
        toast.success("OTP verified successfully");
        setIsOtpVerified(true);
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (error) {
      toast.error("An error occurred during OTP verification");
    }
  };

  // Handle signup form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOtpVerified) {
      toast.error("Please verify the OTP before signing up");
      return;
    }

    try {
      const response = await fetch("https://elitetrips-backend.onrender.com/register", {
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
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        setError(data.error || "Signup failed");
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      setError("An error occurred");
      toast.error("An error occurred");
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
        <div className="flex justify-center ">
          <img src={logo} alt="EliteTrips Logo" className="h-40" />
        </div>

        <h2 className="text-center text-white text-xl font-bold mb-4">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="User Name"
            className="w-full p-3 placeholder-black rounded-md border border-gray-300 bg-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone No."
            className="w-full p-3 placeholder-black rounded-md border border-gray-300 bg-white"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 placeholder-black rounded-md border border-gray-300 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 placeholder-black rounded-md border border-gray-300 bg-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isOtpSent && (
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 placeholder-black rounded-md border border-gray-300 bg-white"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          )}
          {!isOtpSent ? (
            <button
              type="button"
              className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          ) : !isOtpVerified ? (
            <button
              type="button"
              className="w-full p-3 mt-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          ) : (
            <button
              type="submit"
              className="w-full p-3 mt-4 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 focus:outline-none"
            >
              Sign Up
            </button>
          )}
        </form>

        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-1/4"></div>
          <span className="mx-2 text-white text-sm">OR</span>
          <div className="border-t border-gray-300 w-1/4"></div>
        </div>

        <p className="mt-4 text-center text-white text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-white ml-1 cursor-pointer hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
