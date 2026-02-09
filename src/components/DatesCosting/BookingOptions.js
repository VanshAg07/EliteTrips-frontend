import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../Nav";
import axios from "axios";
import Dropnav from "../../components/Dropnav";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const BookingOptions = () => {
  const location = useLocation();
  const {
    selectedDate,
    tripPrice,
    tripName,
    doubleSharing,
    tripleSharing,
    quadSharing,
    stateName,
    tripBookingAmount,
    tripSeats,
  } = location.state || {};
  const formattedDate = formatDate(selectedDate);

  // State hooks
  const [selectedSharing, setSelectedSharing] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("full");

  const handleSharingSelect = (type) => {
    setSelectedSharing(type);
    setPeopleCount(1); // Reset people count when changing sharing option
  };

  const validatePhoneNumber = (number) => /^[0-9]{10}$/.test(number);
  const validateEmail = (email) =>
    /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
  const validateName = (name) => /^[a-zA-Z\s]+$/.test(name);

  const handlePhoneChange = (e) => {
    setCustomerPhone(e.target.value);
    if (!validatePhoneNumber(e.target.value)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
    } else {
      setPhoneError("");
    }
  };
  const handleEmailChange = (e) => {
    setCustomerEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError("Please enter a valid email.");
    } else {
      setEmailError("");
    }
  };

  const handleNameChange = (e) => {
    setCustomerName(e.target.value);
    if (!validateName(e.target.value)) {
      setNameError("Please enter a valid name (letters only).");
    } else {
      setNameError("");
    }
  };

  const calculatePrice = (pricePerPerson, count) => pricePerPerson * count;

  const selectedPrice =
    selectedSharing === "double"
      ? doubleSharing
      : selectedSharing === "triple"
      ? tripleSharing
      : selectedSharing === "quad"
      ? quadSharing
      : 0;

  const basePrice = calculatePrice(selectedPrice, peopleCount);

  // Calculate GST based on payment type
  const gst = paymentType === "full" ? basePrice * 0.08 : 0; // 8% GST for full payment
  const gst2 = paymentType === "full" ? basePrice * 0.05 : 0; // 8% GST for full payment
  const totalPrice = basePrice + gst;
  const totalPrice2 = basePrice + gst2;
  const tripBook = calculatePrice(tripBookingAmount, peopleCount) * 1.03;
  const bookingAmount = tripBook;

  const paymentAmount =
    paymentType === "bookingAmount" ? bookingAmount : totalPrice;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!validatePhoneNumber(customerPhone)) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!validateEmail(customerEmail)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!validateName(customerName)) {
      setNameError("Please enter a valid name.");
      return;
    }

    setIsLoading(true);
    const res = await loadRazorpayScript();

    if (!res) {
      alert(
        "Failed to load Razorpay SDK. Please check your internet connection."
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://elitetrips-backend.onrender.com/api/payment/razorpay",
        {
          amount: paymentAmount,
          customerPhone,
          customerName,
          customerEmail,
          paymentType:
            paymentType === "bookingAmount" ? "bookingAmount" : "fullPayment",
        }
      );

      if (response.data.success) {
        const { amount, currency, orderId: razorpayOrderId } = response.data;

        const options = {
          key: "rzp_live_YO962mKh3iUw71",
          amount: paymentAmount,
          currency: currency,
          name: "TRAVELLOTEN",
          description: `Booking for ${tripName}`,
          order_id: razorpayOrderId,
          handler: async (response) => {
            const data = {
              orderId: razorpayOrderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              customerPhone,
              customerName,
              customerEmail,
              tripName,
              tripPrice,
              selectedDate,
              selectedSharing,
              stateName,
              paymentType:
                paymentType === "bookingAmount"
                  ? "bookingAmount"
                  : "fullPayment",
            };
            const result = await axios.post(
              "https://elitetrips-backend.onrender.com/api/payment/verify",
              data
            );
            if (result.data.success) {
              alert("Payment successful!");
              window.location.href = "/";
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          },
          prefill: {
            name: customerName,
            email: customerEmail,
            contact: customerPhone,
          },
          theme: {
            color: "#3399cc",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert("Payment initiation failed!");
      }
    } catch (error) {
      console.error(
        "Payment error:",
        error.response ? error.response.data : error
      );
      alert("Payment initiation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const incrementPeopleCount = () => setPeopleCount(peopleCount + 1);
  const decrementPeopleCount = () => {
    if (peopleCount > 1) setPeopleCount(peopleCount - 1);
  };

  return (
    <div>
      <Nav />
      <Dropnav />
      <div className="flex justify-center items-center pb-16 mx-auto min-h-screen">
        <div className="flex flex-col md:flex-row w-9/12 mx-auto bg-white shadow-lg rounded-lg mt-28 max-w-6xl">
          {/* Left Section */}
          <div className="flex-1 p-4 md:p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
              Booking Details for
            </h1>
            <div className="mt-4 bg-cyan-500 p-3 sm:p-4 rounded-lg text-white font-bold text-lg sm:text-xl text-center">
              {tripName}
            </div>
            <p className="text-lg md:text-xl mt-3 text-center text-gray-800 mb-8">
              Selected Date:{" "}
              <span className="text-[#03346E] font-semibold">
                {formattedDate}
              </span>
            </p>

            {/* Sharing Options with Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {doubleSharing && (
                <SharingOption
                  type="double"
                  price={doubleSharing}
                  selected={selectedSharing}
                  onClick={handleSharingSelect}
                  className={`transition-transform duration-300 transform ${
                    selectedSharing === "double"
                      ? "scale-105 border border-[#03346E] bg-gray-100"
                      : ""
                  }`}
                />
              )}
              {tripleSharing && (
                <SharingOption
                  type="triple"
                  price={tripleSharing}
                  selected={selectedSharing}
                  onClick={handleSharingSelect}
                  className={`transition-transform duration-300 transform ${
                    selectedSharing === "triple"
                      ? "scale-105 border border-[#03346E] bg-gray-100"
                      : ""
                  }`}
                />
              )}
              {quadSharing && (
                <SharingOption
                  type="quad"
                  price={quadSharing}
                  selected={selectedSharing}
                  onClick={handleSharingSelect}
                  className={`transition-transform duration-300 transform ${
                    selectedSharing === "quad"
                      ? "scale-105 border border-[#03346E] bg-gray-100"
                      : ""
                  }`}
                />
              )}
            </div>

            <PeopleInput
              peopleCount={peopleCount}
              incrementPeopleCount={incrementPeopleCount}
              decrementPeopleCount={decrementPeopleCount}
            />

            {/* Displaying the selected sharing option and price details */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-200">
              <h2 className="text-xl mb-2 font-semibold text-gray-800">
                Booking Details
              </h2>
              <p className="text-lg text-gray-600 w-full flex justify-between">
                Sharing Type:{" "}
                <span className="text-[#03346E] font-semibold">
                  {selectedSharing.charAt(0).toUpperCase() +
                    selectedSharing.slice(1)}{" "}
                  Sharing
                </span>
              </p>
              <p className="text-lg text-gray-600 w-full flex justify-between">
                Price per Person:
                <span>
                  ₹
                  {selectedSharing === "double"
                    ? doubleSharing
                    : selectedSharing === "triple"
                    ? tripleSharing
                    : selectedSharing === "quad"
                    ? quadSharing
                    : 0}
                </span>
              </p>
              <p className="text-lg text-gray-600 w-full flex justify-between">
                Total Price for {peopleCount} people:
                <span>
                  ₹
                  {(
                    (selectedSharing === "double"
                      ? doubleSharing
                      : selectedSharing === "triple"
                      ? tripleSharing
                      : selectedSharing === "quad"
                      ? quadSharing
                      : 0) * peopleCount
                  ).toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 p-6 md:p-8 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment</h2>
            <div className="flex flex-col mb-4">
              <label className="text-gray-800 mb-2">Payment Type:</label>
              <select
                className="border rounded p-2"
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
              >
                <option value="full">Full Payment</option>
                <option value="bookingAmount">Booking Amount</option>
              </select>
              <p className="w-full justify-end flex">+ convenience fees</p>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Total Amount: ₹{paymentAmount.toFixed(2)}
            </h3>
            {/* <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Total Amount: ₹{paymentAmount.toFixed(2)}
            </h3> */}
            <div className="flex flex-col mb-4">
              <label className="text-gray-800 mb-2">Name:</label>
              <input
                type="text"
                className="border rounded p-2"
                value={customerName}
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
              {nameError && <p className="text-red-500">{nameError}</p>}
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-800 mb-2">Email:</label>
              <input
                type="email"
                className="border rounded p-2"
                value={customerEmail}
                onChange={handleEmailChange}
                placeholder="Enter your email"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="flex flex-col mb-6">
              <label className="text-gray-800 mb-2">Phone:</label>
              <input
                type="text"
                className="border rounded p-2"
                value={customerPhone}
                onChange={handlePhoneChange}
                placeholder="Enter your phone number"
              />
              {phoneError && <p className="text-red-500">{phoneError}</p>}
            </div>

            <button
              className={`bg-cyan-500 text-white text-lg font-bold py-4 rounded w-full ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SharingOption = ({ type, price, selected, onClick, className }) => (
  <div
    className={`border rounded-lg p-4 text-center cursor-pointer hover:bg-gray-100 ${className}`}
    onClick={() => onClick(type)}
  >
    <h3 className="text-lg font-bold text-gray-800 capitalize">
      {type} Sharing
    </h3>
    <p className="text-xl font-semibold text-[#03346E]">₹{price}</p>
  </div>
);

const PeopleInput = ({
  peopleCount,
  incrementPeopleCount,
  decrementPeopleCount,
}) => (
  <div className="flex justify-between items-center mt-4">
    <h3 className="text-lg font-semibold">Number of People:</h3>
    <div className="flex items-center">
      <button
        className="bg-gray-200 py-2 px-4 rounded-l h-full"
        onClick={decrementPeopleCount}
        disabled={peopleCount <= 1}
      >
        -
      </button>
      <span className="border-t border-b px-4 py-2 flex items-center h-full">
        {peopleCount}
      </span>
      <button
        className="bg-gray-200 py-2 px-4 rounded-r h-full"
        onClick={incrementPeopleCount}
      >
        +
      </button>
    </div>
  </div>
);

export default BookingOptions;
