import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const StateHoneymoon = () => {
  const [trips, setTrips] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/honeymoon/get-all-honeymoon/${name}`
        );
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, [name]);

  const filteredTrips = trips
    .filter((trip) => trip.stateName === name)
    .flatMap((trip) => trip.trips);

  return (
    <div className="w-[90%] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip, index) => (
            <Link
              key={index}
              to={`/honeymoon/${encodeURIComponent(
                trip.tripName.replace(/\//g, "-")
              )}/${name}`}
              className="h-[420px] relative shadow-black shadow-lg rounded-lg mb-10 flex justify-center items-center cursor-pointer"
            >
              <img
                src={
                  Array.isArray(trip.tripImages)
                    ? trip.tripImages[0]
                    : trip.tripImages
                }
                alt={trip.tripName}
                className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
              <div className="absolute top-3 right-3 bg-yellow-400 pl-2 pr-2 p-1 rounded-full w-auto flex items-center justify-center">
                <span className="font-semibold text-sm ">Customised</span>
              </div>
              <div className="w-full rounded-b pl-4 pt-2 pr-4 pb-2 flex flex-col md:flex-row absolute bottom-0 bg-white">
                <div className="w-full">
                  <h2 className="text-lg font-semibold text-black pb-4">
                    {trip.tripName}
                  </h2>
                  <div className="flex flex-row mb-4 justify-between items-center w-full">
                    {/* Duration */}
                    <div className="flex items-center text-black">
                      <FaClock className="mr-2 text-black" />
                      <span className="text-black text-xs">
                        {trip.tripDuration}
                      </span>
                    </div>
                    {/* Location */}
                    <div className="flex items-center text-black">
                      <FaMapMarkerAlt className="mr-1 text-black" />
                      <span className="text-black text-xs">
                        {trip.tripLocation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default StateHoneymoon;
