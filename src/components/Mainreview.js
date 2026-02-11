import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaUsers, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import "./Mainreview.css"

const FooterBanner = () => {
  return (
    <div className="bg-[#e1feff] mainreview-wrapper w-full text-black py-1.5 text-center">
      {/* Container for the review and traveler information */}
      <div className="flex flex-nowrap justify-center items-center gap-1.5 sm:gap-6 md:gap-12 px-1 sm:px-2 overflow-hidden">
        {/* Destinations */}
        <div className="flex items-center flex-shrink-0">
          <div className="bg-[#03346e] p-1 sm:p-2 rounded-full mr-1 sm:mr-2">
            <FaMapMarkerAlt className="text-white w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[8px] sm:text-xs md:text-sm lg:text-base font-bold footer-text-small">
              50+
            </span>
            <span className="text-[7px] sm:text-xs md:text-sm lg:text-sm footer-text-small">Destinations</span>
          </div>
        </div>

        {/* Happy Travelers */}
        <div className="flex items-center flex-shrink-0">
          <div className="bg-[#03346e] p-1 sm:p-2 rounded-full mr-1 sm:mr-2">
            <FaUsers className="text-white w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[8px] sm:text-xs md:text-sm lg:text-base font-bold footer-text-small">
              500+
            </span>
            <span className="text-[7px] sm:text-xs md:text-sm lg:text-sm footer-text-small">Happy Travelers</span>
          </div>
        </div>

        {/* Safe & Secure */}
        <div className="flex items-center flex-shrink-0">
          <div className="bg-[#03346e] p-1 sm:p-2 rounded-full mr-1 sm:mr-2">
            <FaShieldAlt className="text-white w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[8px] sm:text-xs md:text-sm lg:text-base font-bold footer-text-small">
              100%
            </span>
            <span className="text-[7px] sm:text-xs md:text-sm lg:text-sm footer-text-small">Safe & Secure</span>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="flex items-center flex-shrink-0">
          <div className="bg-[#03346e] p-1 sm:p-2 rounded-full mr-1 sm:mr-2">
            <FaHeadset className="text-white w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-[8px] sm:text-xs md:text-sm lg:text-base font-bold footer-text-small">
              24/7
            </span>
            <span className="text-[7px] sm:text-xs md:text-sm lg:text-sm footer-text-small">Support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;

