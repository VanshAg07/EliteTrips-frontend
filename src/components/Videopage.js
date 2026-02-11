import React, { useEffect, useState } from "react";
import Mainreview from "./Mainreview";
import "./Videopage.css";
import Homecrd from "./Homecrd";
import axios from "axios";
import QuotePopup from "../QuotePopup";
import Socialmedia from "./Socialmedia";

const Videopage = () => {
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/hero-image"
      );
      setHeroImage(response.data.image);
    } catch (error) {
      console.error("Error fetching hero image:", error);
    }
  };

  const [isQuotePopupVisible, setQuotePopupVisible] = useState(false);

  const handleGetQuotesClick = () => {
    setQuotePopupVisible(true);
  };


  const closeQuotePopup = () => {
    setQuotePopupVisible(false);
  };

  return (
    <div className="w-full relative">
      {/* Hero Section - positioned below fixed navbars */}
      <div className="relative w-full flex flex-col justify-center items-start mt-[60px] md:mt-[105px] hero-section">
        {/* Gradient overlay from black to transparent */}
        <div className="absolute top-0 left-0 w-[50vw] h-full z-10 gradient-bg"></div>

        {/* Hero Image Background */}
        {heroImage && (
          <img
            src={heroImage}
            alt="Hero Background"
            className="relative h-full w-full overflow-hidden vid-img-main object-cover z-0"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={(e) => {
              console.error("Hero image failed to load");
              e.target.style.display = 'none';
            }}
          />

        )}
        {/* Text content */}
        <div className="z-20 text-white relative max-w-lg hero-content">
          <h1
            className="hero-title left-14 text-4xl md:text-6xl"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
              lineHeight: "1.2",
            }}
          >
            <span className="">
              <span className="text-[yellow]">WANDER</span> MORE <br />
            </span>
            <span className="">
              WORRY <span className="space-x-1 text-[yellow]">LESS</span>
              <hr className="hidden md:block border-t-2 border-white w-[85%] " />
            </span>
          </h1>
          <p
            className="hero-subtitle left-14 text-sm md:text-xl uppercase tracking-wider"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
          >
            Your next adventure awaits <br /> Let us take you there <br /> seamlessly
          </p>
        </div>
        {/* Button for booking */}
        <div
          onClick={handleGetQuotesClick}
          className="z-50"
        >
          {/* <button className=" absolute left-14 bottom-36 bg-white text-black md:py-2 md:px-6 md:rounded-full rounded-lg md:text-sm font-bold text-xs p-2">
            Travel Now
          </button> */}
        </div>


        {/* Mainreview component - positioned at bottom of hero */}
        <Mainreview />
      </div>
      <Socialmedia />
      {/* Homecrd component */}
      <div>
        <Homecrd />
      </div>

    </div>
  );
}

export default Videopage;
