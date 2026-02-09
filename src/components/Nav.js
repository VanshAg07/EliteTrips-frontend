import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Nav.css";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import SearchBar from "./Search/SearchBar";

const travel_img = "/Elitetriplogo.png";

const Nav = () => {
  const [username, setUsername] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1342);
  const [navOffer, setNavOffer] = useState(null);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };
  useEffect(() => {
    const loggedIn = window.localStorage.getItem("loggedIn");
    const storedUsername = window.localStorage.getItem("username");
    if (loggedIn) {
      setUsername(storedUsername);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1342);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("loggedIn");
    setUsername(null);
    window.location.href = "/";
  };

  const fetchNavBar = () => {
    fetch("http://localhost:5001/api/home/nav-offer", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.navOffer && data.navOffer.length > 0) {
          const offer = data.navOffer[0];
          if (offer.status === "active") {
            setNavOffer(offer.title);
          }
        } else {
          throw new Error("Failed to fetch navigation bar data");
        }
      })
      .catch((error) =>
        console.error("Error fetching navigation bar data:", error)
      );
  };

  useEffect(() => {
    fetchNavBar();
  }, []);

  return (
    <div className="nav-wrapper">
      <div className="flex items-center">
        <Link to="/">
          <img src={travel_img} alt="Logo" className="logo" />
        </Link>
        <SearchBar />
      </div>
      <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        {isMenuOpen && <div className="gradient-background"></div>}
      </div>
      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        {!isMobile && (
          <>
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/")}
            >
              <div className="flex flex-row justify-center mr-5 items-center gap-1">
                <p>Home</p>
              </div>
            </Link>
            <Link
              to="/Aboutus"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/Aboutus")}
            >
              <div className="flex flex-row justify-center mr-5 items-center gap-1">
                <p>About Us</p>
              </div>
            </Link>

            <Link
              to="/offer"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/offer")}
            >
              {navOffer && (
                <div className="mr-5">
                  <p>{navOffer}</p>
                </div>
              )}
            </Link>
            <Link
              to="/Payments"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/Payments")}
            >
              <div className="flex flex-row justify-center mr-5 items-center gap-1">
                <p>Payments</p>
              </div>
            </Link>
            <Link
              to="/Cont"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/Cont")}
            >
              <div className="flex flex-row justify-center mr-5 items-center gap-1">
                <p>Contact</p>
              </div>
            </Link>
            <Link
              to="/Glry"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/Glry")}
            >
              <div className="flex flex-row justify-center mr-5 items-center gap-1">
                <p>Gallery</p>
              </div>
            </Link>
            <Link
              to="/Blog"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/Blog")}
            >
              <div className="flex flex-row justify-center mr-5 items-center gap-1">
                <p>Blogs</p>
              </div>
            </Link>

            {/* mobile icon */}
            <a href="tel:+918852019731" onClick={() => setIsMenuOpen(false)}>
              <div
                className={`flex flex-row justify-center items-center gap-2 border-2 border-white rounded-full md:px-4 py-2 ${
                  isMobile
                    ? "mr-0 font-semibold text-sm text-black"
                    : "mr-5 text-sm"
                }`}
              >
                <FaPhoneAlt className="transform" />
                <p className="font-semibold">
                  {isMobile ? "+91-8852019731" : "+91-8852019731"}
                </p>
              </div>
            </a>

            {/* Signin logout */}
            <div className="desktop-only">
              {username ? (
                <div className="flex flex-row items-center">
                  <div className="username-display">
                    <strong className="mr-2">{username}!</strong>
                  </div>
                  <button className="Btn-n" onClick={handleLogout}>
                    <div className="sign-n">
                      <svg viewBox="0 0 512 512">
                        <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                      </svg>
                    </div>
                    <div className="text-n">Logout</div>
                  </button>
                </div>
              ) : (
                <div className={`flex lappi-nav justify-center flex-row `}>
                  <Link to="/Login" onClick={() => setIsMenuOpen(false)}>
                    <a className="cta">
                      <span>Sign In</span>
                      <svg width="15px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                      </svg>
                    </a>
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
        {isMobile && (
          <div className="flex scrollbar-hide flex-col h-[calc(100vh-70px)]">
            {" "}
            {/* Adjust the height based on your nav header */}
            <div className="flex-1 overflow-y-auto">
              <Link
                to="/offer"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/offer")}
              >
                <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                  <p clasName="text-sm">{navOffer}</p>
                </div>
              </Link>
              <hr class="w-full border-t-1 border-gray-200" />
              <Link
                to="/national"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/national")}
              >
                <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                  <p clasName="text-sm">Indian Trips</p>
                </div>
              </Link>
              <hr class="w-full border-t-1 border-gray-200" />
              <Link
                to="/intern"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/intern")}
              >
                <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                  <p clasName="text-sm">International Deals </p>
                </div>
              </Link>
              <hr class="w-full border-t-1 border-gray-200" />
              <Link
                to="/Honeymoon"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/Honeymoon")}
              >
                <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                  <p clasName="text-sm">Honeymoon Packages</p>
                </div>
              </Link>
              <hr class="w-full border-t-1 border-gray-200" />
              <Link
                to="/Corporate"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/Corporate")}
              >
                <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                  <p clasName="text-sm">Corporate Trips</p>
                </div>
              </Link>
              <hr class="w-full border-t-1 border-gray-200" />
              <Link
                to="/Aboutus"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/Aboutus")}
              >
                <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                  <p clasName="text-sm">About Us</p>
                </div>
              </Link>
              <hr class="w-full border-t-1 border-gray-200" />
              <Link
                to="/Payments"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/Payments")}
              >
                <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                  <p clasName="text-sm">Payments</p>
                </div>
              </Link>
              <hr class="w-full border-t-1 border-gray-200" />
              <Link
                to="/Blog"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/Blog")}
              >
                <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                  <p clasName="text-sm">Blogs</p>
                </div>
              </Link>
              <hr class="w-full border-t-1 border-gray-200" />
              <Link
                to="/Glry"
                onClick={() => setIsMenuOpen(false)}
                className={isActive("/Glry")}
              >
                <div className="flex flex-row justify-center mr-10 items-center gap-1">
                  <p clasName="text-sm">Gallery</p>
                </div>
                <hr class="w-full border-t-1 border-gray-200" />
              </Link>
            </div>
            {/* Fixed bottom section */}
            <div className="mt-auto md:h-40 h-32 border-t border-gray-200 bg-white py-2 px-4">
              <Link to="Login">
                <button className="bg-[#03346e] text-white w-full p-2 rounded-xl items-center text-center">
                  Sign In
                </button>
              </Link>
              <a href="tel:+918852019731" onClick={() => setIsMenuOpen(false)}>
                <div className="flex flex-row justify-center items-center gap-2 border-2 border-white rounded-full md:px-4 py-2 mr-0 font-semibold text-sm text-black">
                  <FaPhoneAlt className="transform" />
                  <p className="font-semibold">+91-8852019731</p>
                </div>
              </a>
            </div>
          </div>
        )}
        {/* {isMobile && (
          <div className="flex flex-col overflow-y-auto ">
            <Link
              to="/offer"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/offer")}
            >
              {navOffer && (
                <div className="flex flex-row justify-center  mr-10 items-center gap-1">
                  <p clasName='text-sm'>{navOffer}</p>
                </div>
              )}
            </Link>
            <hr class="w-full border-t-1 border-gray-200" />
            <Link to="/national" onClick={() => setIsMenuOpen(false)}>
              <div className="flex flex-row justify-center  mr-10 items-center gap-1">
                <p clasName='text-sm'>Indian Trips</p>
              </div>
            </Link>
            <hr class="w-full border-t-1 border-gray-200" />
            <Link to="/intern" onClick={() => setIsMenuOpen(false)}>
              <div className="flex flex-row justify-center  mr-10 items-center gap-1">
                <p clasName='text-sm'>International Deals</p>
              </div>
            </Link>
            <hr class="w-full border-t-1 border-gray-200" />
            <Link to="/Honeymoon" onClick={() => setIsMenuOpen(false)}>
              <div className="flex flex-row justify-center  mr-10 items-center gap-1">
                <p clasName='text-sm'>Honeymoon Packages</p>
              </div>
            </Link>
            <hr class="w-full border-t-1 border-gray-200" />
            <Link to="/Corporate" onClick={() => setIsMenuOpen(false)}>
              <div className="flex flex-row justify-center  mr-10 items-center gap-1">
                <p clasName='text-sm'>Corporate Trips</p>
              </div>
            </Link>
            <hr class="w-full border-t-1 border-gray-200" />
            <Link
              to="/Aboutus"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/Aboutus")}
            >
              <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                <p clasName='text-sm'>About Us</p>
              </div>
            </Link>
            <hr class="w-full border-t-1 border-gray-200" />
            <Link
              to="/Payments"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/Payments")}
            >
              <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                <p clasName='text-sm'>Payments</p>
              </div>
            </Link>
            <hr class="w-full border-t-1 border-gray-200" />
            <Link
              to="/Blog"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/Blog")}
            >
              <div className="flex flex-row justify-center mb-1 mr-10 items-center gap-1">
                <p clasName='text-sm'>Blogs</p>
              </div>
            </Link>
            <hr class="w-full border-t-1 border-gray-200" />
            <Link
              to="/Glry"
              onClick={() => setIsMenuOpen(false)}
              className={isActive("/Glry")}
            >
              <div className="flex flex-row justify-center mr-10 items-center gap-1">
                <p clasName='text-sm'>Gallery</p>
              </div>
              <hr class="w-full border-t-1 border-gray-200" />
            </Link>
            <Link to="Login">
              <button className="bg-[#03346e] text-white w-full p-2 rounded-xl items-center text-center">
                Sign In
              </button>
            </Link>
            <hr class="w-full border-t-1 border-gray-200" />
            <a href="tel:+918852019731" onClick={() => setIsMenuOpen(false)}>
            <div
              className={`flex flex-row justify-center items-center gap-2 border-2 border-white rounded-full md:px-4 py-2 ${
                isMobile
                  ? "mr-0 font-semibold text-sm text-black"
                  : "mr-5 text-sm"
              }`}
            >
              <FaPhoneAlt className="transform" />
              <p className="font-semibold">
                {isMobile ? "+91-8852019731" : "+91-8852019731"}
              </p>
            </div>
          </a>
          </div>
        )} */}
        {/* <div
          className={`flex justify-center flex-col ${isMobile ? "w-full" : ""}`}
        >
          <a href="tel:+918852019731" onClick={() => setIsMenuOpen(false)}>
            <div
              className={`flex flex-row justify-center items-center gap-2 border-2 border-white rounded-full md:px-4 py-2 ${
                isMobile
                  ? "mr-0 font-semibold text-sm text-black"
                  : "mr-5 text-sm"
              }`}
            >
              <FaPhoneAlt className="transform" />
              <p className="font-semibold">
                {isMobile ? "+91-8852019731" : "+91-8852019731"}
              </p>
            </div>
          </a>
          {/* {isMobile ? (
            <Link to="Login">
              <button className="bg-[#03346e] text-white w-full p-2 rounded-xl items-center text-center">
                Sign In
              </button>
            </Link>
          ) : (
            ""
          )} 
        </div> */}

        <div className="desktop-only">
          {username ? (
            <>
              {/* <div className="flex flex-row items-center">
                <div className="username-display">
                  <strong className="mr-2">{username}!</strong>
                </div>
                <button className="Btn-n" onClick={handleLogout}>
                  <div className="sign-n">
                    <svg viewBox="0 0 512 512">
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                    </svg>
                  </div>
                  <div className="text-n">Logout</div>
                </button>
              </div> */}
            </>
          ) : (
            <div className={`flex lappi-nav justify-center flex-row `}>
              {/* <a href="tel:+918852019731" onClick={() => setIsMenuOpen(false)}>
            <div
              className={`flex flex-row justify-center items-center gap-2 border-2 border-white rounded-full md:px-4 py-2 ${
                isMobile
                  ? "mr-0 font-semibold text-sm text-black"
                  : "mr-5 text-sm"
              }`}
            >
              <FaPhoneAlt className="transform" />
              <p className="font-semibold">
                {isMobile ? "+91-8852019731" : "+91-8852019731"}
              </p>
            </div>
          </a> */}

              {/* <Link to="/Login" onClick={() => setIsMenuOpen(false)}>
              <a className="cta">
                <span>Sign In</span>
                <svg width="15px" height="10px" viewBox="0 0 13 10">
                  <path d="M1,5 L11,5"></path>
                  <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
              </a>
            </Link> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
