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
              EliteTrips specializes in Travel &
              Transport services, exclusively for the academic sector. We
              arrange educational & fun tours for students all over India,
              providing insights on history, geography, and culture. Our
              services extend to school tours, college tours, corporate tours,
              and family trips across India. With years of experience, we ensure
              quality, authenticity, and exceptional service. We believe in
              "Service with Quality & Smile."
            </p>
          </div>

          {/* Quick Links Section with Right Border */}
          <div className="text-center md:text-left md:border-r md:border-white md:px-8">
            <h2 className="font-bold text-xl md:text-2xl lg:text-3xl mb-4">
              Quick Links
            </h2>
            <ul className="text-[#fff] space-y-2 text-sm md:text-base lg:text-lg">
              <li>
                <Link
                  to="/Privcy"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/Cancellation"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/Termcondition"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="/Disclaimer"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  to="/Aboutus"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
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
            <ul className="text-[#fff] space-y-2 text-sm md:text-base lg:text-lg">
              <li>
                <Link
                  to="/places/Ladakh"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Ladakh
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Kashmir"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Kashmir
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Spiti"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Spiti
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Himachal"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Himachal
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Thailand"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Thailand
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Australia"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Australia
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Maldives"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
                >
                  Maldives
                </Link>
              </li>
              <li>
                <Link
                  to="/places/Dubai"
                  className="hover:text-[#fffe9] transition-all ease-in-out duration-200"
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