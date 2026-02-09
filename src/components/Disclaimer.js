import React from "react";
import Nav from "./Nav";
import Dropnav from "../components/Dropnav";
import MainFooter from "./Footer/MainFooter";
import "./Disclaimer.css"

const Disclaimer = () => {
  return (
    <>
      <Nav />
      <Dropnav />
      <div className="disclaimer-container px-4 py-8">
        <div className=" max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center">
            DISCLAIMER
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            The information provided on www.EliteTrips.com is for general informational purposes only.
            Welcome to www.EliteTrips.com The terms and conditions of your use of this Site are described below.
            These terms and conditions may be updated or changed without any notice to you.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
            The website, www.EliteTrips.com is developed, owned and operated by EliteTripsIndia Pvt.Ltd having
            Its Registered Office at 3rd Floor Plot, Kakarola Housing Complex, 103, Kakrola Rd, opposite DDA park,
            Raju Enclave, Sector 15 Dwarka, Dwarka, Delhi, 110078. The use and viewing of this site and the content
            therein is governed by the Terms of Use. When you use this site you acknowledge that you have read the
            Terms of Use and that you agree to be bound by the same, which may be modified from time to time.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
            The content on EliteTripsIndia Pvt.Ltd is intended for informational purposes only. While we strive for accuracy,
            we cannot guarantee that all information is complete, current, or error-free. Prices, schedules, and availability
            of travel services may change without notice, and we recommend verifying all details directly with TravelloTen
            service providers.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mt-4">
            Links from EliteTrips.com to third-party sites do not constitute an endorsement by EliteTrips of the parties or their products and services. The appearance on the website of advertisements and product or service information does not constitute an endorsement by EliteTrips.
          </p>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Disclaimer;

