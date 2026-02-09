import React, { useEffect, useState } from "react";
import bg from "../../images/LoginImg.png";
import { jwtDecode } from "jwt-decode";
import useMediaQuery from "../hooks/UseMediaQuery";
import Loginmobile from "./Loginmobile";
import { Link } from "react-router-dom";
import { setUser } from "../../Slices/UserSlice";
import { useDispatch } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Login() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
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
  
      if (response.status === 200) {
        toast.success("Login Successful");
        window.localStorage.setItem("token", data.data.token);
        window.localStorage.setItem("username", data.data.username);
        window.localStorage.setItem("loggedIn", true);
        const decodedToken = jwtDecode(data.data.token);
        dispatch(setUser(data.data));
        
        const role = decodedToken.role;
        window.location.href = role === "admin" ? "/admin-dashboard" : "/home";
      } else {
        setError(data.error || "Login failed");
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      toast.error("An error occurred. Please try again.");
    }
  };
  

  // Conditionally render `Signupmobile` for screens smaller than tablet size
  if (isMobile) {
    return <Loginmobile />;
  }

  return (
    <div
      className="bg-cover bg-center bg-[#e1feff] h-screen w-full flex justify-center items-center"
      // style={{ backgroundImage: `url(${bg2})` }}
    >
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
            Welcome Back!
          </h1>
          <p className="text-black font-medium mb-4 text-sm">
            Login to your account
          </p>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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

            <div className="flex flex-col relative">
              <label className="text-black font-medium mb-1 text-sm">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#16423C]"
              />
              <div
                className="absolute right-3 top-10 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <p className="mt-2 text-blue-600 font-medium text-right text-sm">
              <Link to="/forgot">Forgot Your Password?</Link>
            </p>
            <button
              type="submit"
              className="w-full py-2 font-medium bg-cyan-500 text-white rounded-lg hover:scale-95 transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-3 font-medium text-black text-sm">
            -------------- OR --------------
          </p>

          <p className="mt-2 font-medium text-black text-sm">
            Don't have an account?
            <span className="text-blue-600 font-medium cursor-pointer hover:underline ml-1">
              <Link to="/Signup">Register Now</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
