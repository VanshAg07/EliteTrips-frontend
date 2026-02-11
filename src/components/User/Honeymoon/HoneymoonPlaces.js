import React from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../../Nav";
import "../../Places.css";
import bg from "../../../img/india.jpg";
import Card from "../../3dCard";
import Whyuss from "../../Whyuss";
import Review from "../../Review";
import Dropnav from "../../../components/Dropnav";
import cont from "../../../img/cont-button.json";
import Lottie from "lottie-react";
import MainFooter from "../../Footer/MainFooter";
import Mainreview from "../../Mainreview";
import PackageHoneymoon from "./PackageHoneymoon";

const HoneymoonPlaces = () => {
  const { name } = useParams();
  console.log(name);
  const whatsappMessage = "Hello, I need assistance with my issue.";
  return (
    <>
      <Nav />
      <Dropnav />
      <div className="place-container">
        <div className="place-hero">
                  {/* Gradient Overlay */}
          <img className="pl-img" src={bg} alt="Background" />
          
          <div>
            <h1>{name} Tour Packages</h1>
            <p>The Perfect Blend of Serenity and Adventure</p>
          </div>
        </div>
        <div className="mt-[130px] md:mt-0">
        <Mainreview />
      </div>
        <div>
          <h1 className="all-packages-heading">Featured Packages</h1>
          <div>
            <Link to={`/Packagedetails/${name}`}>
              <PackageHoneymoon />
            </Link>
          </div>
        </div>
        <div className="why">
          <Whyuss />
        </div>
        {/* <Review /> */}
        <h1 className="pt-14 md:pt-20 text-2xl md:text-4xl font-bold text-center text-gray-800">
          Contact Form
        </h1>
        <div className="min-h-screen flex items-center justify-center px-4">
          {/* Outer div with 80% width */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-4xl lg:w-4/5">
            {/* Inner form container with 60% width */}
            <div className="w-full md:w-3/5 mx-auto">
              <h2 className="text-cyan-500 text-lg font-semibold mb-1">
                EliteTrips Calling?
              </h2>
              <h3 className="text-lg font-semibold mb-6">
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
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-md transition duration-300"
                >
                  Submit
                </button>
              </form>
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

export default HoneymoonPlaces;
