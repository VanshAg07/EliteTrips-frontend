import React, { useState, useEffect } from "react";
import backgroundImage from "../../img/login.jpg";
import { useDispatch } from "react-redux";
import { setUser } from "../../Slices/UserSlice";
import { jwtDecode } from "jwt-decode"; // Correct import
import toast from "react-hot-toast";

const logo = "/Elitetriplogo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://elitetrips-backend.onrender.com/login-user", {
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

      if (data.status === "ok") {
        toast.success("Login Success");
        window.localStorage.setItem("token", data.data.token);
        window.localStorage.setItem("username", data.data.username);
        window.localStorage.setItem("loggedIn", true);

        // Decode the token and dispatch the user data
        const decodedToken = jwtDecode(data.data.token);
        dispatch(setUser(data.data));

        // Redirect based on the user role
        const role = decodedToken.role;
        if (role === "admin") {
          window.location.href = "/"; // Redirect to admin page
        } else {
          window.location.href = "/"; // Redirect to home page
        }
      } else {
        setError(data.error || "Login failed");
        toast.error(data.error || "Login failed");
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
      {/* Bluish background layer */}
      <div className="absolute inset-0 bg-[#4B6681B2] z-0"></div>

      {/* Form Container */}
      <div className="relative w-full max-w-xs p-5 z-10 bg-transparent">
        {/* Logo */}
        <div className="flex justify-center">
          <img src={logo} alt="EliteTrips Logo" className="h-40" />
        </div>

        {/* Heading */}
        <h2 className="text-center text-white text-xl font-bold mb-6">
          Login to your Account
        </h2>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
          {/* Forgot Link */}
          <p className="mt-2 text-end text-white text-sm">
            <a
              href="/forgotmob"
              className="text-white ml-1 cursor-pointer hover:underline"
            >
              Forgot Password?
            </a>
          </p>
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-cyan-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 w-1/4"></div>
          <span className="mx-2 text-white text-sm">OR</span>
          <div className="border-t border-gray-300 w-1/4"></div>
        </div>

        {/* Login Link */}
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

export default Login;
