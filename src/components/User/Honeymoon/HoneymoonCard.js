import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate
import { FaClock, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

function AllPackagesCard() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate(); // Initializing useNavigate

  useEffect(() => {
    const fetchAllPackages = async () => {
      try {
        const response = await fetch(
          "https://elitetrips-backend.onrender.com/api/honeymoon/get-all-honeymoon"
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
    const name = encodeURIComponent(stateName);
    navigate(`/honeymoon/${tripName}/${name}`);
  };

  return (
    <div className="container mx-auto w-[80%]">
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-6">
        {packages.length > 0 ? (
          packages.map((pkg, index) =>
            pkg.trips.map((trip, tripIndex) => (
              <div
                key={`${index}-${tripIndex}`}
                className="h-[420px] relative shadow-black shadow-lg rounded-lg mb-10 flex justify-center items-center cursor-pointer"
                onClick={() => handlePackageClick(pkg.stateName, trip.tripName)}
              >
                <img
                  src={trip.tripImages?.length > 0 ? trip.tripImages[0] : 'fallback-image-url'} // Handle image mapping
                  alt={trip.tripName}
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
                <div className="absolute top-3 right-3 bg-yellow-400 pl-2 pr-2 p-1 rounded-full w-auto flex items-center justify-center">
                  <span className="font-bold text-sm">Customised</span>
                </div>
                <div className="w-full rounded-b pl-4 pt-2 pr-4 pb-2 flex flex-col md:flex-row absolute bottom-0 bg-white">
                  <div className="w-full">
                    <h2 className="text-lg uppercase truncate font-semibold text-black pb-6">
                      {trip.tripName}
                    </h2>
                    <div className="flex flex-row mb-4 justify-between items-center w-full">
                      {/* Duration */}
                      <div className="flex items-center text-black">
                        <FaClock className="mr-1 text-black" />
                        <span className="text-black text-xs">
                          {`${trip.tripDuration} `}
                        </span>
                      </div>
                      {/* Location */}
                      <div className="flex items-center text-black">
                        <FaMapMarkerAlt className="mr-1 text-black" />
                        <span className="text-black text-xs">
                          {pkg.stateName}
                        </span>
                      </div>
                    </div>
                    {/* Dates */}
                    <div className="flex items-center mb-2 text-black">
                      <FaCalendarAlt className="mr-2 text-black" />
                      <span className="text-black text-xs">
                        Customised
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          <p></p>
        )}
      </div>


    </div>
  );
}

export default AllPackagesCard;
