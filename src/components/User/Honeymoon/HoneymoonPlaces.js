import React from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../../Nav";
import "../../Places.css";
import bg from "../../../img/india.jpg";
import Forms from "../../../components/Forms.js";
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
  const whatsappMessage = "Hello, I need help with my issue.";
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
