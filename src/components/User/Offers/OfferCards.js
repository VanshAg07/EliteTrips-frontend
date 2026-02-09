import React, { useEffect, useState } from "react";
import { FaClock, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OfferCards() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        const response = await fetch(
          "http://localhost:5001/api/offer/getTripDetails"
        );
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchAllPackages();
  }, []);

  const handlePackageClick = (stateName, tripName) => {
    const sanitizedTripName = tripName.replace(/\//g, "-"); // Replace slashes with hyphens
    navigate(`/offer/${encodeURIComponent(sanitizedTripName)}/${stateName}`);
  };

  return (
    <div className="w-[90%] mx-auto">
      {packages.length > 0 ? (
        packages.map((pkg, index) => (
          <div key={index} className="mb-8">
            {/* State Name */}
            <h2 className="text-2xl font-bold mb-4">
              {pkg.stateName} Tour Packages
            </h2>

            {/* Grid for trips */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6">
              {pkg.trips.map((trip, tripIndex) => (
                <div
                  key={`${index}-${tripIndex}`}
                  className="h-[420px] relative shadow-black shadow-lg rounded-lg mb-10 flex justify-center items-center cursor-pointer"
                  onClick={() =>
                    handlePackageClick(pkg.stateName, trip.tripName)
                  }
                >
                  <img
                    src={trip.tripImages}
                    alt={trip.tripName}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-3 right-3 bg-yellow-400 pl-2 pr-2 p-1 rounded-full w-auto flex items-center justify-center">
                    <span className="font-semibold text-sm ">
                      {trip.customised ? (
                        "Customised"
                      ) : (
                        <>
                          <span className="relative mr-1 line-through">
                            {`₹ ${trip.tripPrice}/-`}
                          </span>
                          {`₹${trip.tripOfferPrice}/- onwards`}
                        </>
                      )}
                    </span>
                  </div>
                  <div className="w-full rounded-b pl-4 pt-2 pr-4 pb-2 flex flex-col md:flex-row absolute bottom-0 bg-white">
                    <div className="w-full">
                      <h2 className="text-lg truncate uppercase font-semibold text-black pb-4">
                        {trip.tripName}
                      </h2>
                      <div className="flex flex-row mb-4 justify-between items-center w-full">
                        {/* Duration */}
                        <div className="flex items-center text-black">
                          <FaClock className="mr-2 text-black" />
                          <span className="text-black text-xs">{`${trip.tripDuration}`}</span>
                        </div>
                        {/* Location */}
                        <div className="flex items-center text-black">
                          <FaMapMarkerAlt className="mr-1 text-black" />
                          <span className="text-black text-xs">
                            {trip.tripLocation}
                          </span>
                        </div>
                      </div>
                      {/* Dates */}
                      <div className="flex items-center mb-2 text-black">
                        <FaCalendarAlt className="mr-2 text-black" />
                        <span className="text-black text-xs">
                          {new Date(trip.tripDate).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                        {trip.tripDateCount >= 0 && (
                          <span className="text-xs text-red-500 ml-1">
                            +{trip.tripDateCount} Batches
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No packages available</p>
      )}
    </div>
  );
}

export default OfferCards;
