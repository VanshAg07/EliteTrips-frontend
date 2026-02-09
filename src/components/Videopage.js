import React, { useEffect, useState } from "react";
import Mainreview from "./Mainreview";
import "../components/Videopage.css";
import Homecrd from "./Homecrd";
import axios from "axios";
import QuotePopup from "../QuotePopup";
import Socialmedia from "../components/Socialmedia.js";

const Videopage = () => {
  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/home/hero-image"
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
    <div className="w-full h-screen videopg-wrpper relative overflow-hidden">
      {/* Gradient overlay from black to transparent */}
      <div className="absolute top-0 left-0 w-[50vw] h-full z-10 gradient-bg"></div>

      {/* Hero Image Background */}
      {heroImage && (
        <img
          src={heroImage}
          alt="Hero Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          onError={(e) => {
            console.error("Hero image failed to load");
            e.target.style.display = 'none';
          }}
        />
      )}

      {/* Text content */}
      <div className="z-20 video-text text-white mb-20 md:mb-28 px-4 text-left relative">
        <h1
          className="absolute video-hed left-20 text-2xl md:top-[200px] top-[180px] sm:text-3xl md:text-4xl lg:text-[50px] xl:text-[50px] font-bold"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            lineHeight: "1.2",
          }}
        >
          <span className="">
            <span className="text-[yellow]">WANDER</span> MORE <br />
          </span>
          <span className="">
            WORRY <span className="sp-1 text-[yellow]">LESS</span>
            <hr className="hidden md:block border-t-2 border-white w-[85%] md:mt-6" />
          </span>
        </h1>

        <div className="h-10 w-full bg-white z-20"></div>
        <p
          className="videopg-p md:mt-6 left-20 absolute uppercase md:top-[350px] top-[340px] text-xs sm:text-sm md:text-lg lg:text-xl tracking-wider"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
        >
          Your next adventure awaits <br /> Let us take you there <br /> seamlessly
        </p>
      </div>
      {/* Button for booking */}
      <div
        onClick={handleGetQuotesClick}
        className="absolute videopg-btn left-20 top-[460px] z-50"
      >
        <button className="bg-white md:mt-6 video-btn text-black md:py-2 md:px-6 md:rounded-full rounded-lg md:text-sm font-bold text-xs p-2">
          Travel Now
        </button>
      </div>

      {/* Mainreview component */}
      <div className="z-20 w-full absolute bottom-0 ">
        <Mainreview />
      </div>
      {isQuotePopupVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <QuotePopup onClose={closeQuotePopup} />
        </div>
      )}
      <Socialmedia />
      {/* Homecrd component */}
      <div>
        <Homecrd />
      </div>
    </div>
  );
};

export default Videopage;
