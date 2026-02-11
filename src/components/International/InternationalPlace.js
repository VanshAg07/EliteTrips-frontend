import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Nav from "../Nav";
import "../Places.css";
import { useRef } from "react";
import Whyuss from "../Whyuss";
import Forms from "../../components/Forms.js";
import Review from "../Review";
import Dropnav from "../../components/Dropnav";
import cont from "../../img/cont-button.json";
import Lottie from "lottie-react";
import MainFooter from "../Footer/MainFooter";
import Mainreview from "../Mainreview";
import HikingIntern from "./HikingIntern";
import VisitIntern from "./VisitIntern";
import FoodInern from "./FoodIntern";
import ShopIntern from "./ShopIntern";
import StateInternational from "./StateInternatioanl";
import Homeglry from "../../components/Homeglry.js";
import axios from "axios";
import {
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import MobileHomeGallery from "../MobileHomeGallery.js";

const InernationalPlaces = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { name } = useParams();
  // console.log(name);
  const [packages, setPackages] = useState([]);

  const whatsappMessage = "Hello, I need help with my issue.";
  const [nationalImages, setNationalImages] = useState([]);
  const stateName = name;
  useEffect(() => {
    fetchNationalImages();
  }, []);
  const fetchNationalImages = async () => {
    try {
      const res = await axios.get(
        `https://elitetrips-backend.onrender.com/api/package-image/international/${stateName}`
      );
      // console.log(res.data);
      setNationalImages([res.data]);
    } catch (error) {
      console.error("Error fetching national images: ", error);
    }
  };

  useEffect(() => {
    const stateName = name;
    const fetchSimilarPackages = async () => {
      try {
        const response = await fetch(
          `https://elitetrips-backend.onrender.com/api/international/getSimilarTrips/${stateName}`
        );
        const data = await response.json();
        // console.log("Fetched Packages:", data); // Check if data is correct
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchSimilarPackages();
  }, []);


  return (
    <>
      <div className="wrpper-inter">
        <Nav />
        <Dropnav />
        <div className="relative">
          <div className="hero-section-left-1 mt-[60px] md:mt-[105px]">
            {nationalImages.length > 0 ? (
              nationalImages.map((image, index) => (
                <img
                  className="hero-img z-0"
                  key={index}
                  src={image.imageUrl} // Assuming each image object has a 'url' property
                  alt={image.name || "National Image"} // Assuming each image object has a 'name' property
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              ))
            ) : (
              <p>No images available for this location.</p>
            )}
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"></div>
            <div className="relative flex flex-col items-center z-20">
              <div className="relative w-full flex items-start justify-center">
                <h1 className="ml-6 text-center text-white font-bold text-2xl xs:text-2xl sm:text3xl lg:text-4xl leading-tight mt-4 sm:mt-8">
                  {name} Tour Packages
                </h1>
              </div>
            </div>
          </div>
          <Mainreview />
        </div>
        <div className="justify-center pt-10 items-center flex flex-col w-full ">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center leading-tight sm:text-xl">
            Featured Packages
          </h1>
          <div className="bg-[#ffff00] h-1 w-14 md:w-20 lg:w-40 mt-2"></div>
        </div>
        <div className="flex justify-center mt-10">
          <div className="w-full">
            <StateInternational />
          </div>
        </div>
        <div className="w-full mx-auto pt-10 flex flex-col">
          <div className="w-[90%] mx-auto">
            <h1 className="text-xl text-left md:text-3xl lg:text-4xl pb-4 font-semibold leading-tight sm:text-x">
              Best activities to do in {name} for a thrilling adventure
            </h1>
            <p className="text-sm sm:text-base md:text-lg  pb-8 lg:text-xl text-gray-700 leading-relaxed">
              {name} is an excellent place to create cherished memories with
              loved ones through its various breathtaking activities like
              trekking, river canyoning, hiking, and more. You can also enjoy
              the breathtaking views of nature here.
            </p>
          </div>
          <HikingIntern />
        </div>

        <div className=" w-full mx-auto pt-10 flex flex-col">
          <div className="w-[90%] mx-auto">
            <h1 className="text-xl text-left md:text-3xl lg:text-4xl pb-4 font-semibold leading-tight sm:text-x">
              Beautiful Places To Visit In {name} For A Blissful Vacay
            </h1>
            <p className="text-sm sm:text-base md:text-lg  pb-8 lg:text-xl text-gray-700 leading-relaxed">
              Whether you're looking for an adrenaline rush or simply want to
              enjoy natural scenery, {name} is the perfect place for you. It
              should be at the top of your list for your next getaway.
            </p>
          </div>
          <VisitIntern />
        </div>
        <div className="w-full mx-auto pt-10 flex flex-col">
          <div className="w-[90%] mx-auto">
            <h1 className="text-xl text-left md:text-3xl lg:text-4xl pb-4 font-semibold leading-tight sm:text-x">
              Places to Enjoy The Rich Flavors Of {name}
            </h1>
            <p className="text-sm sm:text-base md:text-lg  pb-8 lg:text-xl text-gray-700 leading-relaxed">
              {name}, known as the abode of clouds, offers a diverse culinary
              experience with a range of traditional and modern food options.
              From local delicacies to global cuisines, the state has plenty of
              places to eat and explore.
            </p>
          </div>
          <FoodInern />
        </div>
        <div className="w-full mx-auto pb-12 pt-10 flex flex-col ">
          <div className="w-[90%] mx-auto">
            <h1 className="text-xl text-left md:text-3xl lg:text-4xl pb-4 font-semibold leading-tight sm:text-x">
              Best Places to shop in {name}
            </h1>
            <p className="text-sm sm:text-base md:text-lg  pb-8 lg:text-xl text-gray-700 leading-relaxed">
              {name}, a northeastern state of India, offers a unique shopping
              experience with its vibrant local markets and handicrafts.
              Visitors can explore the bustling bazaars for traditional clothes,
              accessories, bamboo crafts, and food items.
            </p>
          </div>
          <ShopIntern />
        </div>

        <div className="">
          <div className="pt-72">
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

        </div>
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
    </>
  );
};

export default InernationalPlaces;
