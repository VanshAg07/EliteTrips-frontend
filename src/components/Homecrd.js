import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Homecrd.css";

const TripCard = () => {
  const [banners, setBanners] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  // Fetch all banners
  const fetchBanners = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/homepage-banner"
      );
      setBanners(response.data); // Assuming response.data is an array of banner objects
    } catch (error) {
      console.error("Error fetching banners:", error);
      setError("Failed to fetch banners");
    }
  };

  const getCardSizeClasses = () => {
    if (banners.length === 3) {
      return "w-52"; // Fixed width for three cards
    } else if (banners.length === 2) {
      return "w-60"; // Slightly larger for two cards
    } else if (banners.length === 1) {
      return "w-80"; // Larger width for single card
    }
    return "w-52"; // Default width
  };

  return (
    <div className="hidden lg:block">
      {/* Hidden on small screens, visible on medium screens and larger */}
      <div className="flex homecrd-wrpper space-x-2 justify-center items-center -mt-10  ml-[550px]">
        {banners.map((banner, index) => (
          <div
            key={banner._id}
            className={`bg-white border-4 homecrd-div border-white mt-10 rounded-3xl shadow-lg shadow-black overflow-hidden ${getCardSizeClasses()} relative ${
              index === 1
                ? "h-[400px]"
                : index === 0
                ? "h-[365px]"
                : "h-[365px]"
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className={`w-full ${
                index === 1 ? "h-64" : "h-56"
              } object-cover rounded-2xl`}
            />
            <div className="p-4 text-center">
              <h2 className="text-red-600 font-bold text-lg mb-2">
                {banner.title || "Trip Title"}
              </h2>
              <p className="text-gray-700 mb-4">
                {banner.description || "Description"}
              </p>
              <button
                className="bg-[#03346e] text-white py-2 rounded-full w-full font-bold absolute bottom-0 left-0"
                onClick={() => window.open(banner.link, "_blank")}
              >
                BOOK NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default TripCard;
