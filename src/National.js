import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./National.css";
import Nav from "./components/Nav";
import Forms from "./components/Forms.js";
import Lottie from "lottie-react";
import animationData from "./img/India.json";
import Whyuss from "./components/Whyuss.js";
import cont from "./img/cont-button.json";
import axios from "axios";
import Review from "./components/Review";
import AllPackagesCard from "./components/Cards/AllPackagesCard.js";
import Dropnav from "./components/Dropnav.js";
import Mainreview from "./components/Mainreview.js";
import MainFooter from "./components/Footer/MainFooter.js";
import Homeglry from "./components/Homeglry.js";
import { useMediaQuery } from "react-responsive";
import MobileHomeGallery from "./components/MobileHomeGallery.js";

const National = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [places, setPlaces] = useState([]);
  const whatsappMessage = "Hello, I need assistance with my issue.";
  const [backgroundImages, setBackgroundImages] = useState([]);
  const fetchBackgroundImages = async () => {
    const response = await axios.get(
      "https://elitetrips-backend.onrender.com/api/background-images/images"
    );
    setBackgroundImages(response.data);
  };
  useEffect(() => {
    fetchBackgroundImages();
    fetchImageCard();
  }, []);
  const nationalImages = backgroundImages.filter(
    (item) => item.type === "National"
  );
  const type = "National";
  const fetchImageCard = async () => {
    try {
      const res = await fetch(
        `https://elitetrips-backend.onrender.com/api/popup/state-images-user/${type}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json(); // Ensure you await this call
      setPlaces(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="wrpper-inter">
      <Nav />
      <Dropnav />
      <div className=" object-cover hero-section-left-1">
        {nationalImages.map((item) => (
          <div key={item._id} className="relative">
            {item.image.map((imgUrl, index) =>
              imgUrl.endsWith(".mp4") ? (
                <video
                  key={index}
                  className="w-full h-auto"
                  autoPlay
                  muted
                  loop
                >
                  <source src={imgUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Image ${index}`}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              )
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-white font-bold text-2xl xs:text-2xl sm:text-3xl lg:text-4xl leading-tight mt-4 sm:mt-8 text-center">
                {item.heading}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[130px] z-10 md:mt-0">
        <Mainreview />
      </div>
      <div className="lottie-wr">
        {/* <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          className="hero-lottie"
        /> */}
      </div>
      <div className="justify-center items-center mb-4 flex flex-col w-full">
        <h1 className="text-center text-black text-2xl mt-8 sm:text-3xl lg:text-4xl font-bold">
          Destinations
        </h1>
        <div className="bg-[#ffff00] h-1 w-14 md:w-20 lg:w-40 mt-2"></div>
      </div>
      <div className=" w-full flex justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 w-[80%] gap-4">
          {Array.isArray(places) &&
            places.map((place) => (
              <Link key={place.stateName} to={`/place/${place.stateName}`}>
                <img
                  className="h-[90%] w-[100%] rounded-lg"
                  src={place.image[0]} // Ensure you are accessing the first image
                  alt={place.stateName}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              </Link>
            ))}
        </div>
      </div>
      <div className="justify-center pt-10 items-center flex flex-col w-full ">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center leading-tight sm:text-xl">
          All Packages
        </h1>
        <div className="bg-[#ffff00] h-1 w-14 md:w-20 lg:w-40 mt-2"></div>
        <div>
          <p className=" pt-2 inter-description">
            Discover Your Dream Journey with Our Best-Selling Travel Packages
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-full">
          <AllPackagesCard />
        </div>
      </div>
      <div className="">
        <div>
          {/* {isMobile ? (
            <div className="pl-[10px] pr-[10px] relative">
              <MobileHomeGallery />
            </div>
          ) : (
            <div className="px-28 relative">
              <Homeglry />
            </div>
          )} */}
        </div>
        <Whyuss />
        {/* <Review /> */}
        {/* <Guide /> */}
        <Forms />
      </div>
      <MainFooter />

      <div className="fixed-button-1">
        <a
          href={`https://wa.me/918852019731?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Lottie loop={true} animationData={cont} />
        </a>
      </div>
    </div>
  );
};

export default National;
