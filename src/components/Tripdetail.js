import React from "react";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const TripDetailCard = ({ trip }) => {
  const navigate = useNavigate(); // Initialize navigate

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric" }; // Short month format
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options); // Format the date
  };

  const handleTripClick = (tripLocation, tripName) => {
    const sanitizedTripName = tripName.replace(/\//g, "-"); // Replace slashes with hyphens
    navigate(`/trip/${encodeURIComponent(sanitizedTripName)}/${encodeURIComponent(tripLocation)}`);
  };

  // Extract the first date from the allTripDates array
  const firstDate = trip.allTripDates[0];

  return (
    <div
      className="bg-white h-[20vh] overflow-hidden rounded-lg shadow-md cursor-pointer"
      onClick={() => handleTripClick(trip.stateName, trip.tripName)}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg uppercase font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            {trip.tripName}
          </h3>
        </div>
        <div className="flex items-center">
          <FaClock className="mr-1 text-sm text-black" />
          <p className="text-xs text-black">{trip.tripDuration}</p>
        </div>
        <div className="flex items-center mt-2 mb-2 ">
          <FaCalendarAlt className="mr-1 text-sm " />
          <p className="text-xs text-black mr-1">{formatDate(firstDate)}</p>
          <p className="text-xs text-red-500 text-end">
            + {trip.allTripDatesCount} batches
          </p>
        </div>
        <div className="flex items-center ">
          <FaMapMarkerAlt className="mr-1 text-sm " />
          <p className="text-xs text-black">{trip.tripLocation}</p>
        </div>
      </div>
    </div>
  );
};

export default TripDetailCard;
