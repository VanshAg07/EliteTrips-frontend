import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Nav from "../../Nav";
import "../../Places.css";
import Whyuss from "../../Whyuss";
import Review from "../../Review";
import Dropnav from "../../../components/Dropnav";
import cont from "../../../img/cont-button.json";
import Lottie from "lottie-react";
import MainFooter from "../../Footer/MainFooter";
import Mainreview from "../../Mainreview";
import HoneymoonCard from "./HoneymoonCard";
import StateHoneymoon from "./StateHoneymoon";
import axios from "axios";
import {
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const HomeHoneymoon = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const { name } = useParams();
  const [packages, setPackages] = useState([]);
  const [visiblePackages, setVisiblePackages] = useState(6);
  const navigate = useNavigate();
  const whatsappMessage = "Hello, I need assistance with my issue.";
  const [nationalImages, setNationalImages] = useState([]);
  const stateName = name;
  useEffect(() => {
    fetchNationalImages();
  }, []);

  const fetchNationalImages = async () => {
    try {
      const res = await axios.get(
        `https://elitetrips-backend.onrender.com/api/package-image/honeymoon/${stateName}`
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
          `https://elitetrips-backend.onrender.com/api/honeymoon/getSimilarTrips/${stateName}`
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

  const loadMorePackages = () => {
    setVisiblePackages((prevVisible) => prevVisible + 6);
  };

  const handlePackageClick = (stateName, tripName) => {
    const sanitizedTripName = tripName.replace(/\//g, "-");
    navigate(
      `/honeymoon/${encodeURIComponent(sanitizedTripName)}/${stateName}`
    );
  };

  const containerRef = useRef(null);

  // Function to handle left arrow click
  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -280, behavior: "smooth" });
    }
  };

  // Function to handle right arrow click
  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 280, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="wrpper-inter">
        <Nav />
        <Dropnav />
        <div className="hero-section-left-1">
          {nationalImages.length > 0 ? (
            nationalImages.map((image, index) => (
              <img
                className="hero-img"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>
          <div className="relative flex flex-col items-center">
            <div className="relative w-full flex items-start justify-center">
              <h1 className="ml-6 text-center text-white font-bold text-2xl xs:text-2xl sm:text3xl lg:text-4xl leading-tight mt-4 sm:mt-8">
                {name} Tour Packages
              </h1>
            </div>

            {/* <h1 className="inline-block text-center text-black bg-[yellow] px-4 py-2 mt-4 text-xl xs:text-xl sm:text-2xl lg:text-3xl">
              The Perfect Blend of Adventure
            </h1> */}
          </div>
        </div>
        <div className="mt-[180px] md:mt-0">
          <Mainreview />
        </div>
        <div className="justify-center pt-10 items-center flex flex-col w-full ">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center leading-tight sm:text-xl">
            Featured Packages
          </h1>
          <div className="bg-[#ffff00] h-1 w-14 md:w-20 lg:w-40 mt-2"></div>
        </div>
        <div className="flex justify-center pb-10 mt-10">
          <div className="w-full">
            <Link to={`/Packagedetails/${name}`}>
              <StateHoneymoon />
            </Link>
          </div>
        </div>
        <div className="">
          {/* <Homeglry /> */}
          <Whyuss />
          {/* <Review /> */}
          {/* <Guide /> */}

          <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">
            Contact Form
          </h1>
          <div className=" flex items-center pb-14 justify-center px-4">
            {/* Outer div with 80% width */}
            <div className="bg-[#e1feff] rounded-lg shadow-md shadow-black p-6 md:p-8 w-full max-w-4xl lg:w-4/5">
              {/* Inner form container with 60% width */}
              <div className="w-full md:w-3/5 mx-auto">
                <h2 className="text-cyan-500 text-lg font-bold mb-1">
                  EliteTrips Calling?
                </h2>
                <h3 className="text-base font-semibold mb-6">
                  Allow Us to Call You Back!
                </h3>
                <form>
                  {/* Name */}
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="e.g. John Smith"
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="phone"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Enter your 10 digit number"
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email ID *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      className="w-full border border-gray-300 p-2 rounded-md"
                    />
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Any Message"
                      className="w-full border border-gray-300 p-2 rounded-md"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-cyan-500 text-white font-bold py-2 rounded-md transition duration-300"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
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

export default HomeHoneymoon;
