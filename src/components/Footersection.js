import React from "react";
import { Link } from "react-router-dom";

const FooterSection = () => {

  return (
    <div className="bg-[#03346E] text-white w-full">
      <div className="py-12 px-4 md:px-16 flex justify-center items-center">
        {/* Main container with 80vw width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-[80vw] max-w-screen-xl">
          {/* About Us Section with Right Border */}
          <div className="text-center md:text-left md:border-r md:border-white md:pr-8">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl mb-4">
              About Us
            </h2>
            <p className="leading-relaxed text-[#fff] text-sm md:text-base lg:text-lg">
              EliteTrips is a trusted specialist in Travel & Transport services exclusively for the academic sector. We curate educational and fun-filled tours for students across India, offering meaningful insights into history, geography, and culture.

              Our expertise spans school tours, college tours, corporate travel, and family trips to destinations nationwide. Backed by years of industry experience, we are committed to delivering quality, authenticity, and exceptional service — driven by our belief in “Service with Quality & a Smile."
            </p>
          </div>

          {/* Quick Links Section with Right Border */}
          <div className="text-center md:text-left md:border-r md:border-white md:px-8">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl mb-4">
              Quick Links
            </h2>
            <ul className="text-[#b0b0b0] space-y-2 text-sm md:text-base lg:text-lg">
              <li>
                <Link
                  to="/National"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  National
                </Link>
              </li>
              <li>
                <Link
                  to="/International"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  International
                </Link>
              </li>
              <li>
                <Link
                  to="/Honeymoon"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Honeymoon
                </Link>
              </li>
              <li>
                <Link
                  to="/Contact"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/Gallery"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/Aboutus"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Trips Section */}
          <div className="text-center md:text-left md:pl-8">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl mb-4">
              Trips
            </h2>
            <ul className="text-[#b0b0b0] space-y-2 text-sm md:text-base lg:text-lg">
              <li>
                <Link
                  to="/places/Ladakh"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Ladakh
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Kashmir"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Kashmir
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Spiti"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Spiti
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Himachal"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Himachal
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Thailand"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Thailand
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Australia"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Australia
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Maldives"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Maldives
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Dubai"
                  className="hover:text-[#FFD700] transition-all ease-in-out duration-200"
                >
                  Dubai
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;