import React, { useEffect, useState } from "react";
import "./International.css";
import Nav from "./components/Nav";
import intern from "./img/india.jpg";
import Lottie from "lottie-react";
import Forms from "./components/Forms.js";
import animationData from "./img/intern.json";
import Whyuss from "./components/Whyuss.js";
import Review from "./components/Review";
import cont from "./img/cont-button.json";
import Dropnav from "./components/Dropnav.js";
import Mainreview from "./components/Mainreview.js";
import MainFooter from "./components/Footer/MainFooter.js";
import shi16 from "./img/16.png";
import shi17 from "./img/17.png";
import shi18 from "./img/18.png";
import shi20 from "./img/20.png";
import shi21 from "./img/21.png";
import shi19 from "./img/19.png";
import { Link } from "react-router-dom";
import AllInternational from "./components/International/AllInternational.js";
import Homeglry from "./components/Homeglry.js";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import MobileHomeGallery from "./components/MobileHomeGallery.js";
// import Lottie from "lottie-react";

const International = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    message: "",
  });
  const [places, setPlaces] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "contactNo") {
      const re = /^[0-9\b]+$/;
      if (value === "" || (re.test(value) && value.length <= 10)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const type = "International";
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

  const whatsappMessage = "Hello, I need assistance with my issue.";

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
    (item) => item.type === "International"
  );

  const name = places.stateName;
  return (
    <div className="wrpper-inter relative">
      <Nav />
      <Dropnav />
      <div className="hero-section-left-1">
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
              {/* <h1 className="inline-block text-center text-black bg-[yellow] px-4 py-2 mt-4 text-xl xs:text-xl sm:text-2xl lg:text-3xl">
                Unveil the Wonders
              </h1> */}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[130px] md:mt-0">
        <Mainreview />
      </div>

      <div className="lottie-wr">
        {/* <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          speed={0.5}
          className="hero-lottie"
        /> */}
      </div>
      <div className="justify-center items-center mb-4 flex flex-col w-full relative">
        <h1 className="text-center text-black text-2xl mt-8 sm:text-3xl lg:text-4xl font-bold">
          Destinations
        </h1>
        <div className="bg-[#ffff00] h-1 w-14 md:w-20 lg:w-40 mt-2"></div>
      </div>
      <div className=" w-full flex justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 w-[80%] gap-4">
          {Array.isArray(places) &&
            places.map((place) => (
              <Link key={place.stateName} to={`/places/${place.stateName}`}>
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
      <div className="justify-center pt-10 items-center flex flex-col w-full relative ">
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
      <div className="relative">
        <AllInternational />
      </div>
      <div className="">
        <div>
          {/* {isMobile ? (
            <div className="pl-[10px] pr-[10px] mt-10">
              <MobileHomeGallery />
            </div>
          ) : (
            <div className="px-28">
              <Homeglry />
            </div> */}
          {/* )} */}
        </div>

        <Whyuss />
        <Forms />
        {/* <Review /> */}
        {/* <Guide /> */}
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

export default International;
