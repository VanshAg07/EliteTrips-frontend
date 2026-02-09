import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import "./Mainreview.css"

const FooterBanner = () => {
  return (
    <div className="bg-[#e1feff] mainreview-wrapper text-black py-2 text-center">
      {/* Container for the review and traveler information */}
      <div className="flex justify-center items-center space-x-4 sm:space-x-8 md:space-x-12">
        {/* Destinations */}
        <div className="flex items-center">
          <div className="bg-[#03346e] p-2 rounded-full mr-2">
            <FaMapMarkerAlt className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold footer-text-small">
              50+
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-sm footer-text-small">Destinations</span>
          </div>
        </div>

        {/* Happy Travelers */}
        <div className="flex items-center">
          <div className="bg-[#03346e] p-2 rounded-full mr-2">
            <FaUsers className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold footer-text-small">
              500+
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-sm footer-text-small">Happy Travelers</span>
          </div>
        </div>

        {/* Safe & Secure */}
        <div className="flex items-center">
          <div className="bg-[#03346e] p-2 rounded-full mr-2">
            <FaShieldAlt className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold footer-text-small">
              100%
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-sm footer-text-small">Safe & Secure</span>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="flex items-center">
          <div className="bg-[#03346e] p-2 rounded-full mr-2">
            <FaHeadset className="text-white w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-bold footer-text-small">
              24/7
            </span>
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-sm footer-text-small">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;

