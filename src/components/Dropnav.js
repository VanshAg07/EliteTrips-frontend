import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "./Dropnav.css";
import axios from "axios";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [nationalNav, setNationalNav] = useState([]);
  const [internationalNav, setInternationalNav] = useState([]);
  const [honeymoonNav, setHoneymoonNav] = useState([]);

  const fetchNationalNav = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/home/get-national-nav"
      );
      setNationalNav(res.data);
    } catch (error) {
      console.error("Error fetching national navigation:", error);
    }
  };

  const fetchInternNationalNav = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/home/get-international-nav"
      );
      setInternationalNav(res.data);
    } catch (error) {
      console.error("Error fetching international navigation:", error);
    }
  };

  const fetchHoneymoonNav = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/home/get-honeymoon-nav"
      );
      setHoneymoonNav(res.data);
    } catch (error) {
      console.error("Error fetching honeymoon navigation:", error);
    }
  };

  useEffect(() => {
    fetchNationalNav();
    fetchInternNationalNav();
    fetchHoneymoonNav();
  }, []);

  const dropdownLinks = {
    indiaPackages: nationalNav,
    internationalPackage: internationalNav,
    honeymoonPackages: honeymoonNav,
    corporatePackages: [],
  };

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="navbar-1">
      <ul className="nav-links-1">
        {Object.keys(dropdownLinks).map((key) => (
          <li
            key={key}
            className="nav-item-1"
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
          >
            <a
              href={
                key === "indiaPackages"
                  ? "/national"
                  : key === "internationalPackage"
                  ? "/intern"
                  : key === "honeymoonPackages"
                  ? "/honeymoon"
                  : key === "corporatePackages"
                  ? "/corporate"
                  : "#"
              }
            >
              {key === "indiaPackages"
                ? "India Packages"
                : key === "internationalPackage"
                ? "International Package"
                : key === "honeymoonPackages"
                ? "Honeymoon Packages"
                : key === "corporatePackages"
                ? "Corporate Packages"
                : key.charAt(0).toUpperCase() +
                  key.replace(/([A-Z])/g, " $1").toLowerCase()}
            </a>
            {/* Only render the down arrow if it's not "corporatePackages" */}
            {key !== "corporatePackages" && (
              <FaChevronDown className="dropdown-icon" />
            )}
            {activeDropdown === key && dropdownLinks[key].length > 0 && (
              <ul className="dropdown">
                {dropdownLinks[key].map((link, index) => (
                  <li key={index} className="dropdown-item">
                    <a
                      href={
                        key === "honeymoonPackages"
                          ? `/honeymoon-packages/${link.stateName}`
                          : key === "indiaPackages"
                          ? `/place/${link.stateName}`
                          : key === "internationalPackage"
                          ? `/places/${link.stateName}`
                          : `/place/${link.stateName}`
                      }
                    >
                      {link.stateName}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
