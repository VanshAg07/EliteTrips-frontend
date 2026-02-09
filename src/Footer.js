import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Footer.css";
import WhatsAppIcon from "./img/icons8-whatsapp.svg";
import GmailIcon from "./img/icons8-gmail.svg";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const [icons, setIcons] = useState([]);

  useEffect(() => {
    fetchIcons();
  }, []);

  const fetchIcons = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/footer-icons"
      );
      setIcons(response.data);
    } catch (error) {
      console.error("Error fetching icons:", error);
    }
  };

  return (
    <div className="footer-wrapper bg-gray-50 pb-5">
      <div className="footer-info text-center">
        <h1 className="text-xl font-bold">EliteTrips Private Limited</h1>
        <div className="footer-icons flex justify-center space-x-4 items-center">
          <a
            className="footer-anchors"
            href="mailto:vanshagarwal0144@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={GmailIcon} alt="Gmail" className="h-8 w-8" />
          </a>
          <a
            className="footer-anchors"
            href="https://www.linkedin.com/in/vansh-agarwal-b08022290"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="h-8 w-8 text-[#0077B5]" />
          </a>
          <a
            className="footer-anchors"
            href="https://wa.me/918852019731?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={WhatsAppIcon} alt="WhatsApp" className="h-8 w-8" />
          </a>
          <a
            className="footer-anchors"
            href="https://www.instagram.com/vanshagarwal007/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="h-8 w-8 text-[#E4405F]" />
          </a>
          {icons && Array.isArray(icons) && icons.map((icon) => (
            <a
              key={icon._id}
              className="footer-anchors text-[#3953fe]"
              href={icon.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={icon.iconImage[0]}
                alt={icon.name}
                className="h-8 w-8 rounded-full"
              />
            </a>
          ))}
        </div>

        {/* New Section for Contact Info */}
        <div className="font-semibold md:flex hidden justify-center items-center space-x-8 mt-6 mb-6 text-base w-full">
          <div className="flex items-center space-x-2">
            <i className="fa fa-envelope"></i>
            <span>vanshagarwal0144@gmail.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa fa-phone"></i>
            <span>+91 8852019731</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fa fa-globe"></i>
            <span>www.Elitetrips.com</span>
          </div>
        </div>

        <p className="footer-p mt-2">
          <i className="fa-regular fa-copyright icon-large-1"></i>
          EliteTrips All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
