import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import icon1 from "../img/payment.svg";
import icon2 from "../img/sbi.svg";
import Dropnav from "../components/Dropnav";
import cont from "../img/cont-button.json";
import Lottie from "lottie-react";
import MainFooter from "./Footer/MainFooter";

const Payments = () => {
  const [paymentImages, setPaymentImages] = useState([]);
  const whatsappMessage = "Hello, I need assistance with my issue.";

  const fetchPayment = async () => {
    try {
      const res = await fetch(
        "https://elitetrips-backend.onrender.com/api/corporate/payment-image"
      );
      const data = await res.json();
      // Filter images with "active" status
      const activeImages = data.data.filter((item) => item.status === "active");
      setPaymentImages(activeImages);
    } catch (error) {
      console.log("Failed to fetch payment images:", error);
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  return (
    <>
      <Nav />
      <Dropnav />
      <div className="payment-section bg-gray-100 min-h-screen md:pt-28 py-10">
        <div className="container mx-auto max-w-6xl px-4">
          <div className=" flex flex-col sm:flex-row items-center justify-center pt-10 mb-4">
            <img
              src={icon1}
              alt="Payment Icon"
              className="w-16 h-16 mb-4 sm:mb-0 sm:mr-4"
            />
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 text-center">
              Pay Us At
            </h1>
          </div>
          {/* Active Payment Images Section */}
          {paymentImages.length > 0 && (
            <div className="gap-6">
              {paymentImages.map((item) => (
                <div
                  key={item._id}
                  className="flex justify-center items-center"
                >
                  <img
                    src={item.image[0]}
                    alt="Payment Method"
                    className="h-[70vh] w-full"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 md:p-8 shadow-md rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                Bank Transfer
              </h2>
              <div className="flex items-center mb-4">
                <img src={icon2} alt="SBI Logo" className="w-10 h-10 mr-3" />
                <p className="text-lg text-gray-700">
                  SBI - State Bank of India
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Account Number:</span>{" "}
                  41539879323
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-700">
                  <span className="font-semibold">Account Name:</span>{" "}
                  EliteTripsINDIA PVT.LTD
                </p>
              </div>
              <div className="mb-2">
                <p className="text-gray-700">
                  <span className="font-semibold">IFSC Code:</span> SBIN0061209
                </p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 shadow-md rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                UPI Payment
              </h2>
              <div className="mb-4">
                <p className="text-gray-700">
                  <span className="font-semibold">
                    UPI (Google Pay/BHIM/PhonePe):
                  </span>{" "}
                  8130706886@ybl
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <span className="font-semibold">Account Name:</span>{" "}
                  EliteTripsINDIA PVT.LTD
                </p>
              </div>
            </div>

            <div className="bg-white p-6 md:p-8 shadow-md rounded-lg">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                Razorpay Link
              </h2>
              <p className="text-gray-700 text-sm md:text-base mb-4">
                <span className="font-semibold">Payment via Razorpay: </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#01afd1] underline break-words whitespace-normal"
                  href="https://razorpay.me/@travellotenindiaprivatelimite"
                >
                  https://razorpay.me/@travellotenindiaprivatelimite
                </a>
              </p>
              <p className="text-gray-700 text-sm md:text-base">
                <span className="font-semibold">Note:</span> Payment gateway
                charges will be levied on using the above payment link.
              </p>
            </div>
          </div>
        </div>
      </div>

      <MainFooter />
    </>
  );
};

export default Payments;
