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
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
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

  return (
    <div className="nav-wrapper">
      <div className="nav-left">
        <Link to="/">
          <img src={travel_img} alt="Logo" className="logo" />
        </Link>
        <div className="desktop-search">
          <SearchBar />
        </div>
      </div>

      <div className="tablet-search">
        <SearchBar />
      </div>

      <div className="nav-desktop">
        <Link to="/" className={"nav-link " + isActive("/")}>
          Home
        </Link>
        <Link to="/Aboutus" className={"nav-link " + isActive("/Aboutus")}>
          About Us
        </Link>
        <Link to="/Cont" className={"nav-link " + isActive("/Cont")}>
          Contact
        </Link>
        <Link to="/Glry" className={"nav-link " + isActive("/Glry")}>
          Gallery
        </Link>

        {/* Sign In / Logout */}
        {username ? (
          <div className="nav-user">
            <span className="username">{username}</span>
            <button onClick={handleLogout} className="Btn-n">
              <div className="sign-n">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="text-n">Logout</div>
            </button>
          </div>
        ) : (
          <Link to="/Login" className="cta">
            <span>Sign In</span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </Link>
        )}
      </div>

      <div className="nav-mobile-right">
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />
      )}

      <div className={"mobile-menu " + (isMenuOpen ? "open" : "")}>
        <div className="mobile-menu-content">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="mobile-link">
            Home
          </Link>
          <Link to="/national" onClick={() => setIsMenuOpen(false)} className="mobile-link">
            Indian Trips
          </Link>
          <Link to="/intern" onClick={() => setIsMenuOpen(false)} className="mobile-link">
            International Deals
          </Link>
          <Link to="/Honeymoon" onClick={() => setIsMenuOpen(false)} className="mobile-link">
            Honeymoon Packages
          </Link>
          <Link to="/Corporate" onClick={() => setIsMenuOpen(false)} className="mobile-link">
            Corporate Trips
          </Link>
          <Link to="/Aboutus" onClick={() => setIsMenuOpen(false)} className="mobile-link">
            About Us
          </Link>
          <Link to="/Cont" onClick={() => setIsMenuOpen(false)} className="mobile-link">
            Contact
          </Link>
          <Link to="/Glry" onClick={() => setIsMenuOpen(false)} className="mobile-link">
            Gallery
          </Link>
        </div>

        <div className="mobile-menu-footer">
          <a href="tel:+918852019731" className="mobile-phone">
            <FaPhoneAlt className="phone-icon" />
            <span>+91-8852019731</span>
          </a>
          {username ? (
            <button onClick={handleLogout} className="mobile-logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/Login" onClick={() => setIsMenuOpen(false)} className="mobile-signin-btn">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
