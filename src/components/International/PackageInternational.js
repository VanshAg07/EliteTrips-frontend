import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Packagedetails.css";
import Nav from "../Nav";
import { FaFileDownload } from "react-icons/fa";
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { RxCrossCircled } from "react-icons/rx";
import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import Review from "../Review";
import { LuCircleDotDashed } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Dropnav from "../../components/Dropnav";
import cont from "../../img/cont-button.json";
import Lottie from "lottie-react";
import MainFooter from "../Footer/MainFooter";
import QuotePopup from "../../QuotePopup";
import TripForms from "../Contact/TripForms";
import { FaShareFromSquare } from "react-icons/fa6";
const PackageInternational = () => {
  const whatsappMessage = "Hello, I need help with my issue.";
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
  });
  const [activeSection, setActiveSection] = useState("overview");

  const [isExpanded, setIsExpanded] = useState(false);

  const [isDay1Expanded, setIsDay1Expanded] = useState(false);
  const { tripName, name } = useParams();
  const [trips, setTrip] = useState([]);
  const [sharing, setSharing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stateNames, setstateNames] = useState("");
  const handleDownload = () => {
    if (trips.pdf) {
      const fileUrl = `${trips.pdf}`;
      window.open(fileUrl, "_blank");
    } else {
      console.error("No PDF file available");
    }
  };

  // Handle sharing
  const handleShare = () => {
    const shareLink = window.location.href; // Get current URL of the page
    if (navigator.share) {
      // Native sharing on mobile browsers
      navigator
        .share({
          title: "Trip Itinerary",
          url: shareLink,
        })
        .catch((error) => console.error("Error sharing:", error));
    } else {
      // Fallback for desktop browsers that don't support the Share API
      navigator.clipboard.writeText(shareLink).then(() => {
        alert(
          "Link copied to clipboard! You can now share it on your social platform."
        );
      });
    }
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const [expandedDays, setExpandedDays] = useState({});

  const handleToggleDay = (day) => {
    setExpandedDays((prevState) => ({
      ...prevState,
      [day]: !prevState[day],
    }));
  };

  const handleToggleDay1 = () => {
    setIsDay1Expanded(!isDay1Expanded);
  };

  const stateName = name;
  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(
          `https://elitetrips-backend.onrender.com/api/international/findStateAndTrip/${stateName}/${tripName}`
        );
        setTrip(response.data.trip);
        setSharing(response.data.trip.sharing);
        setstateNames(response.data.state);
        // console.log(trips);
        // console.log(sharing);
      } catch (error) {
        console.error("Error fetching trip details:", error);
        setError("Failed to load trip details");
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails();
  }, [name, tripName]);

  // console.log(sharing);
  let doubleSharing;
  let tripleSharing;
  let quadSharing;
  // console.log(doubleSharing)
  if (sharing && sharing.length >= 1) {
    doubleSharing = sharing[0]?.price;
    tripleSharing = sharing[1]?.price;
    quadSharing = sharing[2]?.price;
  } else {
    console.log(
      "Error: sharing array is empty or does not have enough elements"
    );
  }
  const handleDatesAndCostingClick = () => {
    if (trips && trips.tripDate) {
      navigate("/dates-and-costing", {
        state: {
          tripDates: trips.tripDates,
          tripPrice: trips.tripPrice,
          tripName: trips.tripName,
          doubleSharing,
          tripleSharing,
          quadSharing,
          stateName: stateNames.stateName,
          tripBookingAmount: trips.tripBookingAmount,
          tripSeats: trips.tripSeats,
          tripOfferPrice: trips.tripOfferPrice
        },
      });
    } else {
      console.error("Trip dates not available");
    }
  };

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form data
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      // Send form data to the backend
      const res = await axios.post(
        "https://elitetrips-backend.onrender.com/api/contact/contact-trip",
        formData
      );

      // If the request is successful, clear the form and show success message
      if (res.status === 200) {
        setFormData({
          name: "",
          email: "",
          message: "",
          phone: "",
        });
        setSuccess("Your message has been sent successfully.");
        setError("");
      }
    } catch (err) {
      // Handle error case
      setError("Failed to send the message. Please try again later.");
      setSuccess("");
    }
  };
  const [isQuotePopupVisible, setQuotePopupVisible] = useState(false);

  const handleGetQuotesClick = () => {
    setActiveSection(""); // Reset active section to prevent highlighting
    setQuotePopupVisible(true); // Show the popup
  };

  const closeQuotePopup = () => {
    setQuotePopupVisible(false); // Hide the popup
  };
  return (
    <div>
      <>
        {isQuotePopupVisible && <QuotePopup onClose={closeQuotePopup} />}
        <Nav />
        <Dropnav />
        <div className="relative">
          <img
            src={trips.tripBackgroundImg}
            alt="Descriptive Alt Text"
            className="md:h-screen w-full"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
          {trips.pdf && (
            <>
              <button
                className="absolute rounded-3xl md:bottom-28 bottom-5 left-1/2 transform -translate-x-1/2 
                 flex items-center justify-center 
                 text-sm sm:text-base md:text-lg lg:text-xl 
                 bg-[#fee60b] text-black p-2 sm:p-3 md:p-4 lg:p-3 
                 transition-all duration-300"
                onClick={handleDownload}
              >
                <FaFileDownload className="mr-2" /> {/* Updated icon */}
                <span>Download Itinerary</span>
              </button>

              <button
                className="absolute sh-btn rounded-3xl md:bottom-28 bottom-5 left-1/2 transform 
    translate-x-28 flex items-center justify-center ml-3 text-sm sm:text-base md:text-lg lg:text-3xl 
     text-white p-2 sm:p-3 md:p-4 lg:p-3 
    transition-all duration-300"
                onClick={handleShare}
              >
                <FaShareFromSquare className="mr-2" />
              </button>
            </>
          )}
        </div>

        <div className="flex w-[95%] justify-center mb-16 m-2">
          {/* Main div responsive */}
          <div className="flex flex-col lg:flex-row w-[80vw] mx-auto">
            <div className="w-full lg:w-[65vw] md:mx-auto">
              {" "}
              {/* Responsive width and center below lg (1024px) */}
              <div className="md:mt-10">
                <p className="text-xl md:text-3xl lg:text-4xl pt-7 font-bold sm:text-xl">
                  {trips.tripName}
                </p>{" "}
                {/* Responsive font size */}
              </div>
              <div className="flex flex-col md:flex-row gap-5 mt-5">
                {" "}
                {/* Stack vertically on smaller screens */}
                <div className="flex flex-row items-center gap-5 bg-gray-700 rounded-lg border-2 p-4 inline-flex">
                  {" "}
                  {/* Added inline-flex */}
                  <FaMapMarkerAlt className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm md:text-base">
                      Pickup & Drop:
                    </span>{" "}
                    {/* Responsive text size */}
                    <span className="text-white text-sm md:text-base">
                      {trips.pickAndDrop}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-5 bg-gray-700 rounded-lg border-2 p-4 inline-flex">
                  {" "}
                  {/* Added inline-flex */}
                  <FaClock className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm md:text-base">
                      Duration:
                    </span>{" "}
                    {/* Responsive text size */}
                    <span className="text-white text-sm md:text-base">
                      {trips && trips.tripDuration}
                    </span>
                  </div>
                </div>
                <div
                  className="flex flex-row cursor-pointer w-auto items-center gap-5 bg-gray-700 rounded-lg border-2 p-4 inline-flex"
                  onClick={handleShare} // Added the same onClick handler as the button
                >
                  <FaShareFromSquare className="text-white" />
                  <div className="flex flex-col">
                    <span className="text-white text-sm md:text-base">
                      Share Itinerary
                    </span>
                  </div>
                </div>
              </div>
              {/* Navigation section */}
              <div className="mt-10 mb-5">
                <nav className="flex overflow-x-auto p-6 whitespace-nowrap bg-[#03346E] text-xs sm:text-sm md:text-base lg:text-lg justify-center">
                  <a
                    href="#overview"
                    className="flex-none text-center relative text-white mx-2"
                    onClick={() => setActiveSection("overview")}
                  >
                    Overview & Highlights
                    {activeSection === "overview" && (
                      <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 h-1 bg-white w-1/2"></span>
                    )}
                  </a>
                  <a
                    href="#itinerary"
                    className="flex-none text-center relative text-white mx-2 "
                    onClick={() => setActiveSection("itinerary")}
                  >
                    Itinerary
                    {activeSection === "itinerary" && (
                      <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 h-1 bg-white w-1/2"></span>
                    )}
                  </a>
                  <a
                    href="#inclusions"
                    className="flex-none text-center relative text-white mx-2"
                    onClick={() => setActiveSection("inclusions")}
                  >
                    Inclusion
                    {activeSection === "inclusions" && (
                      <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 h-1 bg-white w-1/2"></span>
                    )}
                  </a>
                  <a
                    href="#exclusions"
                    className="flex-none text-center relative text-white mx-2"
                    onClick={() => setActiveSection("exclusions")}
                  >
                    Exclusion
                    {activeSection === "exclusions" && (
                      <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 h-1 bg-white w-1/2"></span>
                    )}
                  </a>
                </nav>
              </div>
              {/* Other content goes here (Overview, Itinerary, etc.) */}
              <div
                id="overview"
                className="p-4 sm:p-5 bg-white rounded-lg shadow-lg box-border mt-8"
              >
                <h1 className="text-center font-bold text-base sm:text-lg md:text-2xl lg:text-4xl mb-4">
                  Overview & Highlights
                </h1>{" "}
                {/* Responsive text size */}
                <div className="border-2 pt-2 pb-2 items-center text-center flex justify-center mb-2 font-bold bg-blue-100 border-blue-300">
                  <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                    {trips.overView}
                  </p>
                </div>
                <div className="">
                  <p className="text-sm md:text-base">
                    {trips && trips.tripDescription}
                  </p>
                </div>
              </div>
              <div id="itinerary" className="mt-10">
                <p className="text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-4xl mb-4">
                  Itinerary
                </p>

                {trips &&
                  trips.tripItinerary &&
                  trips.tripItinerary.length > 0 ? (
                  trips.tripItinerary.map((itineraryItem, index) => (
                    <div
                      className="mb-5 cursor-pointer bg-blue-100 p-3 rounded-lg shadow-md"
                      key={index}
                      onClick={() => handleToggleDay(index + 1)}  // Move onClick to the parent div
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start flex-grow">
                          <div className="border-2 p-2 rounded-md mr-5 border-blue-400 bg-white text-sm md:text-base flex-shrink-0">
                            Day {index + 1}:
                          </div>
                          <p className="text-base sm:text-lg md:text-xl lg:text-xl flex-grow overflow-hidden">
                            {" "}
                            {/* Adjusted title size */}
                            {itineraryItem.title}
                          </p>
                        </div>
                        <span
                          className="cursor-pointer border-2 ml-2 border-blue-400 pl-2 pr-2 pt-[1px] pb-[1px] rounded-sm text-blue-400 hover:bg-blue-200 transition-colors duration-300"
                        >
                          {expandedDays[index + 1] ? "-" : "+"}
                        </span>
                      </div>

                      {expandedDays[index + 1] && (
                        <ul className="mt-4 mx-10">
                          {itineraryItem.points.map((detail, i) => (
                            <div
                              className="mt-2 flex items-start gap-3"
                              key={i}
                            >
                              <div className="flex-shrink-0 mt-2 w-3 h-3 flex items-center justify-center">
                                <LuCircleDotDashed className="w-full h-full" />
                              </div>
                              <li className="text-xs sm:text-sm md:text-base">
                                {" "}
                                {/* Adjusted text size for points */}
                                {detail}
                              </li>
                            </div>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                ) : (
                  <p>No Itinerary Available</p>
                )}
              </div>
              <div
                id="inclusions"
                className="p-4 sm:p-5 bg-[#F5FFF6] rounded-lg shadow-lg box-border mt-8"
              >
                <h1 className="text-center font-bold text-base sm:text-lg md:text-2xl lg:text-4xl mb-4">
                  Inclusions
                </h1>
                <ul className="list-none p-0 m-0 rounded-lg">
                  {trips &&
                    trips.tripInclusions &&
                    trips.tripInclusions.length > 0 ? (
                    trips.tripInclusions.map((inclusion, index) => (
                      <li
                        className="flex flex-row items-start gap-4 mt-2 text-xs sm:text-sm md:text-base"
                        key={index}
                      >
                        <SiTicktick
                          className="text-[#66bb6a] flex-none"
                          style={{
                            fontSize:
                              window.innerWidth <= 640 ? "12px" : "20px", // Adjust icon size based on screen width
                          }}
                        />
                        <span className="flex-1">{inclusion}</span>
                      </li>
                    ))
                  ) : (
                    <li>No Inclusions Available</li>
                  )}
                </ul>
              </div>
              <div
                id="exclusions"
                className="p-4 sm:p-5 bg-[#FFF4F4] rounded-lg shadow-lg box-border mt-8"
              >
                <h1 className="text-center font-bold text-base sm:text-lg md:text-2xl lg:text-4xl mb-4">
                  Exclusions
                </h1>
                <ul className="list-none p-0 m-0 rounded-lg">
                  {trips &&
                    trips.tripExclusions &&
                    trips.tripExclusions.length > 0 ? (
                    trips.tripExclusions.map((exclusion, index) => (
                      <li
                        className="flex flex-row items-start text-xs sm:text-sm md:text-base gap-4 mt-2" // Changed items-center to items-start
                        key={index}
                      >
                        <RxCrossCircled
                          className="text-red-500 flex-none"
                          style={{
                            fontSize:
                              window.innerWidth <= 640 ? "12px" : "22px", // Adjust icon size based on screen width
                          }}
                        />
                        <span className="flex-1">{exclusion}</span>
                      </li>
                    ))
                  ) : (
                    <li>No Exclusions Available</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Form div with a width of 35% */}
            <div className="w-[35vw] hidden lg:block">
              {" "}
              {/* Form div is hidden below lg (1024px) */}
              <div className="ml-10 mt-20 sticky top-10">
                <div className="bg-white shadow-lg p-4 rounded-2xl">
                  <p className="text-xl md:text-2xl">
                    {trips.customised ? "Customised" : `Starting From`}
                  </p>
                  <p className="text-xl md:text-2xl text-blue-500">
                    <span className="font-bold text-2xl md:text-3xl">
                      {trips.customised
                        ? "Customise Your Trip"
                        : `Rs.${trips.tripOfferPrice}/-`}{" "}
                    </span>
                    {trips.customised ? "" : "per person"}
                  </p>
                  <div className="bg-[#03346E] items-center justify-center flex p-4 rounded-xl mt-5">
                    <button
                      onClick={
                        trips.customised
                          ? handleGetQuotesClick
                          : handleDatesAndCostingClick
                      }
                    >
                      <p className="text-white text-lg md:text-xl font-bold">
                        {trips.customised ? "Get Quotes" : "Dates & Costing"}
                      </p>
                    </button>
                  </div>
                </div>
                <TripForms />
              </div>
            </div>
          </div>
          {/* mobile form footer */}
          <div className="fixed bottom-0 w-full bg-white text-black p-4 flex justify-between items-center lg:hidden">
            {/* First Section: Starting Price */}
            <div className="text-lg md:text-xl font-bold flex flex-col">
              {trips.customised ? "" : `Starting From`}
              <span className="font-bold text-2xl md:text-3xl">
                {trips.customised ? "Customised" : `Rs.${trips.tripOfferPrice}/-`}{" "}
              </span>{" "}
              {trips.customised ? "" : "per person"}
            </div>
            {/* Second Section: Book Now Button */}
            <div
              onClick={
                trips.customised
                  ? handleGetQuotesClick
                  : handleDatesAndCostingClick
              }
            >
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Book Now
              </button>
            </div>
          </div>
        </div>
        <div className="pb-7">
          {/* <Review /> */}
        </div>
        <div className="mb-[100px]">
          <MainFooter />
        </div>
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
    </div>
  );
};

export default PackageInternational;
