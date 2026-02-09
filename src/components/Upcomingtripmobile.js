import React, { useState, useEffect } from "react";
import TripDetailCard from "./Tripdetail";
import underline from "../img/underline.png";
import "./Explore-mob.css";

const TravelOptions = () => {
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const fetchUpcomingTrips = async () => {
    try {
      const response = await fetch("https://elitetrips-backend.onrender.com/api/home/upcoming");
      const data = await response.json();
      setUpcomingTrips(data.upcomingTrips);
      if (Object.keys(data.upcomingTrips).length > 0) {
        setSelectedMonth(Object.keys(data.upcomingTrips)[0]);
      }
    } catch (error) {
      console.error("Error fetching upcoming trips:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingTrips();
  }, []);

  const tripsForSelectedMonth = upcomingTrips[selectedMonth] || [];
  const tripsToShow = window.innerWidth < 1024 ? 100 : 4;

  return (
    <div className="w-full bg-[#ffffe6] mt-10 h-[80vh] px-2 mb-96">
      <div className="flex justify-between items-center mb-4 h-[10vh]">
        <div className="flex mt-24 ml-4 flex-col">
          <h1 className="text-lg font-bold">Upcoming Trips</h1>
          <img src={underline} alt="underline" className="w-28 -mt-10" />
        </div>
      </div>

      {/* Scrollable month selection section */}
      <div className="relative w-full mb-4 overflow-hidden">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-3 pr-4 pb-2 w-max">
            {Object.keys(upcomingTrips).map((month) => (
              <button
                key={month}
                className={`p-1 min-w-[64px] h-8 flex-shrink-0 flex justify-center text-sm items-center text-center bg-white border border-black rounded-lg ${
                  selectedMonth === month ? "bg-blue-200" : ""
                }`}
                onClick={() => setSelectedMonth(month)}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trip cards section */}
      <div className="flex items-center justify-between mb-4">
        <div className="overflow-x-auto scrollbar-hide h-[60vh]">
          <div className="flex flex-nowrap space-x-2">
            {tripsForSelectedMonth
              .slice(startIndex, startIndex + tripsToShow)
              .map((option, index) => (
                <div
                  key={index}
                  className="relative border-2 border-black rounded-lg shadow-md min-w-[240px]"
                >
                  <img
                    src={
                      option.tripImages.length > 0
                        ? option.tripImages[0]
                        : "defaultImage.jpg"
                    }
                    alt={option.tripLocation}
                    className="w-full h-[34vh] object-cover rounded-t-lg"
                  />
                  <TripDetailCard trip={option} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelOptions;