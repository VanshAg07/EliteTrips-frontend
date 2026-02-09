import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdLocationPin, MdPeople } from "react-icons/md";

const HighLevelCorporateTour = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const res = await axios.get(
        "https://elitetrips-backend.onrender.com/api/corporate/partners-get"
      );
      setPartners(res.data.data);
    } catch (error) {
      console.error("Error fetching partners data:", error);
    }
  };

  // Function to convert YouTube link to embed format
  const getEmbedUrl = (youtubeLink) => {
    const videoId = youtubeLink.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="bg-white">
      {/* Title */}
      <div className="text-center py-8">
        <header className="w-full bg-white text-center">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center leading-tight sm:text-xl">
            Partners We've <span className="text-blue-500">Thrilled</span>
          </h1>
        </header>
      </div>

      {/* Main Content Section */}
      {partners.length > 0 ? (
        partners.map((partner) => (
          <div
            key={partner._id}
            className="relative bg-[#03346e] mb-20 text-white py-10 sm:py-16 top-10"
          >
            <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center lg:space-x-12 px-6 lg:px-16">
              {/* Left Content */}
              <div className="flex-1">
                <div className="mb-4">
                  {/* Logo */}
                  {partner.logo && partner.logo.length > 0 && (
                    <img
                      src={partner.logo} // Accessing the first logo in the array
                      alt={partner.heading}
                      className="h-10 sm:h-12 mb-4"
                    />
                  )}
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {partner.heading}
                  </h2>
                  <p className="mt-2 text-gray-300">{partner.description}</p>
                </div>

                {/* Details */}
                <div className="mt-4">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex p-2 border border-gray-300 rounded-md items-center">
                      <MdLocationPin />
                      <span className="ml-1">{partner.place}</span>
                    </div>
                    <div className="flex p-2 border border-gray-300 rounded-md items-center">
                      <MdPeople className="text-xl" />
                      <span className="ml-1">{partner.people}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content (Video Embed or Image) */}
              <div className="flex-1 mt-8 lg:mt-0 lg:max-w-lg w-full">
                {partner.youtubeLink ? (
                  <iframe
                    src={getEmbedUrl(partner.youtubeLink)}
                    title={`${partner.heading} YouTube video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video rounded-lg shadow-lg"
                  ></iframe>
                ) : (
                  partner.image &&
                  partner.image.length > 0 && (
                    <img
                      src={partner.image[0]} // Display the first image in the array
                      alt={`${partner.heading} image`}
                      className="rounded-lg shadow-lg w-full h-64 object-cover"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading partners data...</p>
        </div>
      )}
    </div>
  );
};

export default HighLevelCorporateTour;
