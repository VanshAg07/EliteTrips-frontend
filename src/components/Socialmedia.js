import React from "react";
import { FaWhatsapp, FaInstagram, FaLinkedin } from "react-icons/fa";
import GmailIcon from "../img/icons8-gmail.svg";
import "./Socialmedia.css"; // Import the CSS file

const SocialMediaIcons = () => {
  return (
    <div className="social-icons">
      <a
        href="https://www.linkedin.com/in/vansh-agarwal-b08022290"
        className="icon linkedin"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedin />
        <span>
          Connect on
          <br /> LinkedIn
        </span>
      </a>
      <a
        href="https://wa.me/918852019731?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="icon whatsapp"
      >
        <FaWhatsapp />
        <span>
          Chat on <br /> WhatsApp
        </span>
      </a>
      <a
        href="https://www.instagram.com/vanshagarwal007/"
        target="_blank"
        rel="noopener noreferrer"
        className="icon instagram"
      >
        <FaInstagram />
        <span>
          View on <br /> Instagram
        </span>
      </a>
      <a
        href="mailto:vanshagarwal0144@gmail.com"
        className="icon email"
      >
        <img src={GmailIcon} alt="Gmail" className="gmail-icon" />
        <span>
          Send <br /> Email
        </span>
      </a>
    </div>
  );
};

export default SocialMediaIcons;
