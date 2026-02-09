import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "../Nav";

const DateCosting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    tripDates: tripDatesFromState = [],
    tripName,
    tripOfferPrice,
    doubleSharing,
    tripleSharing,
    quadSharing,
    stateName,
    tripBookingAmount,
  } = location.state || {};
  const tripDates = tripDatesFromState.map((dateObj) => {
    const date = dateObj.date || dateObj.tripDate;
    return {
      date,
      tripOfferPrice: dateObj.tripOfferPrice || tripOfferPrice || 0,
      tripSeats: dateObj.tripSeats || "N/A",
      status: dateObj.status || "Available",
    };
  });
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const groupDatesByMonth = (dates) => {
    return dates.reduce((acc, dateObj) => {
      const date = new Date(dateObj.date);
      if (isNaN(date)) {
        return acc;
      }
      const month = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(dateObj);
      return acc;
    }, {});
  };

  const datesByMonth = groupDatesByMonth(tripDates);
  const getCurrentMonth = () => {
    const currentDate = new Date();
    return currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  const [selectedDate, setSelectedDate] = useState(
    tripDates.length > 0 ? tripDates[0].date : ""
  );
  const [openMonth, setOpenMonth] = useState(getCurrentMonth());

  const toggleMonth = (month) => {
    setOpenMonth(openMonth === month ? "" : month);
  };

  const handleBooking = () => {
    navigate("/booking-options", {
      state: {
        selectedDate,
        tripName,
        doubleSharing,
        tripleSharing,
        quadSharing,
        stateName,
        tripBookingAmount,
        tripOfferPrice,
      },
    });
  };

  const getSeatStatusClass = (status) => {
    switch (status) {
      case "Full":
        return "text-red-500"; // Red color for 'Full'
      case "Available":
        return "text-green-500"; // Green color for 'Available'
      case "Filling Fast":
        return "text-yellow-500"; // Yellow color for 'FillingFast'
      default:
        return "text-gray-700"; // Default color
    }
  };
  const isBookingDisabled = () => {
    const selectedDateObj = tripDates.find(
      (dateObj) => dateObj.date === selectedDate
    );
    return selectedDateObj?.tripSeats === "Full";
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="p-4 mx-auto">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mt-20 sm:mt-14">
            Dates and Costing
          </h1>
          <div className="mt-4 bg-cyan-500 p-3 sm:p-4 rounded-lg text-white font-bold text-lg sm:text-xl text-center">
            {tripName || "Trip Details"}
          </div>
        </div>
        <div className="mt-6 flex flex-col md:flex-row w-[90vw] justify-center items-center">
          {/* Available Dates Section */}
          <div className="bg-white rounded-lg p-6 min-h-[67vh] flex flex-col overflow-y-auto max-h-[67vh]">
            <h2 className="text-2xl font-bold text-gray-800 text-center border-b pb-4">
              Available Dates
            </h2>
            <div className="mt-4 space-y-4">
              {Object.keys(datesByMonth).map((month, monthIndex) => (
                <div key={monthIndex} className="mb-6">
                  <div
                    className="cursor-pointer text-lg font-bold mb-2 flex justify-between items-center hover:text-blue-500 transition-all duration-200"
                    onClick={() => toggleMonth(month)}
                  >
                    {month}
                    <span>{openMonth === month ? "▲" : "▼"}</span>
                  </div>
                  {openMonth === month && (
                    <div className="transition-all duration-300">
                      {datesByMonth[month].map((dateObj, index) => (
                        <div
                          key={index}
                          className={`p-4 border w-full rounded-lg transition-all duration-300 cursor-pointer hover:bg-blue-50 mt-4 ${
                            selectedDate === dateObj.date ? "bg-blue-100" : ""
                          }`}
                          onClick={() => setSelectedDate(dateObj.date)}
                        >
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center md:gap-4 gap-2">
                            <span className="text-lg font-medium">
                              {formatDate(dateObj.date)}
                            </span>
                            <span
                              className={getSeatStatusClass(dateObj.tripSeats)}
                            >
                              {dateObj.tripSeats}
                            </span>
                            <span className="text-blue-500 font-bold">
                              Starting Price: ₹{dateObj.tripOfferPrice}/-
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Costing Section */}
          <div className="bg-white rounded-lg p-6 min-h-[67vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Costing
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-blue-100 p-4 rounded-lg">
                <span className="text-gray-700 font-bold">Room Sharing</span>
                <span className="text-gray-700 font-bold">
                  Cost (Per Person)
                </span>
              </div>
              {doubleSharing && (
                <div className="flex justify-between items-center p-4">
                  <span className="font-semibold">Double Sharing</span>
                  <span className="text-gray-800 font-semibold">
                    ₹{doubleSharing} /-
                  </span>
                </div>
              )}
              {tripleSharing && (
                <div className="flex justify-between items-center p-4">
                  <span className="font-semibold">Triple Sharing</span>
                  <span className="text-gray-800 font-semibold">
                    ₹{tripleSharing} /-
                  </span>
                </div>
              )}
              {quadSharing && (
                <div className="flex justify-between items-center p-4">
                  <span className="font-semibold">Quad Sharing</span>
                  <span className="text-gray-800 font-semibold">
                    ₹{quadSharing} /-
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-4xl mt-8 p-4 gap-4 bg-white rounded-lg">
              <div className="md:text-xl font-bold text-blue-600 text-sm">
                Starting Price: ₹{tripOfferPrice || "N/A"}/- Per Person
              </div>
              <button
                onClick={handleBooking}
                className={`${
                  isBookingDisabled()
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-cyan-500"
                } text-lg text-white px-4 py-3 md:mt-0 rounded-lg font-semibold transition-all duration-200`}
                disabled={isBookingDisabled()}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateCosting;
