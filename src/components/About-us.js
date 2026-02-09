import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import Nav from "./Nav";
import Dropnav from "../components/Dropnav";
import cont from "../img/cont-button.json";
import Lottie from "lottie-react";
import MainFooter from "./Footer/MainFooter";
import Aboutushero from "./aboutus-hero";
import "./About-us.css";

const Aboutus = () => {
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    fetchTeamMembers();
    fetchBackgroundImages();
  }, []);
  // Fetch all background images
  const fetchBackgroundImages = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/background-images/images"
      );
      setBackgroundImages(response.data);
    } catch (error) {
      console.error("Error fetching background images:", error);
      setErrorMessage("Failed to load images.");
    }
  };
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/get-team-member"
      );
      setTeamMembers(response.data.data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  const [teamMembers, setTeamMembers] = useState([]);
  const whatsappMessage = "Hello, I need assistance with my issue.";

  const nationalImages = backgroundImages.filter(
    (item) => item.type === "About Us"
  );

  return (
    <>
      <Nav />
      <Dropnav />
      <div>
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
              </div>
            </div>
          ))}
        </div>
        {/* Introduction Section */}
        <div className="py-8 px-4 sm:px-8 lg:px-24 w-full lg:w-[80%] mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
            What Do We Strive for and What Fuels Our Ambition?
          </h1>
          <p className="mb-4 text-sm sm:text-base lg:text-lg">
            EliteTrips is a specialist for Travel &
            Transport serving exclusively the academic sector by arranging
            educational & fun tours for students of every age all over India.
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            We are different as we educate and inform students about
            historical/geographical/cultural values etc. wherever the tour takes
            place. We also doing school tour , colleges tour , corporate tour &
            Family's tour for all place in India.
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            We have over many years combined experience in providing the almost
            in quality, authenticity and service in the group travel industry.
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            We have strong hold in the domestic market as well. We believe in
            “Service with quality & Smile”.
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            We use the best system for operations which adds “Valued Efficiency”
            to our teamwork thus making hospitality not a business affair but a
            “Commitment & Pledge” towards client’s satisfaction.
          </p>
          <p className="text-sm sm:text-base lg:text-lg">
            At EliteTrips understand that planning a
            group trip can be a lot of work and that is why we believe in
            providing value every step of the way.
          </p>
        </div>
        
        <Aboutushero />
        {/* Team Section */}

        <section className="text-center py-12 sm:py-16 bg-gray-50 px-4 sm:px-8 lg:px-24">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
            Meet Our Amazing Team. The Perfect Blend of Talent and Dedication
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover mb-4 shadow-lg"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.position}</p>
                <hr className="border-t-4 border-yellow-500 mt-1 w-16 mb-2" />
                <div className="flex space-x-4 mb-4">
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-gradient"
                  >
                    <FaInstagram size={20} />
                  </a>
                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" facebook-gradient text-blue-700 hover:text-blue-800"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>
                <p className="text-gray-600 text-left text-sm sm:text-base leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </section>

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
    </>
  );
};

export default Aboutus;
