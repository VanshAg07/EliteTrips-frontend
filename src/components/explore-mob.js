import React, { useEffect, useState } from "react";
import axios from "axios";

const TravelOptions = () => {
  const [adventures, setAdventures] = useState([]);

  const fetchAdventures = async () => {
    try {
      const res = await axios.get(
        "https://elitetrips-backend.onrender.com/api/flip-card/flip"
      );

      // Create adventure items from flipcard data
      const adventureItems = [];

      // Add National (Experience India)
      if (res.data.national && res.data.national.length > 0) {
        adventureItems.push({
          _id: 'national',
          title: 'Experience India',
          image: res.data.national[0].flipcardImage[0],
          route: '/national'
        });
      }

      // Add International
      if (res.data.international && res.data.international.length > 0) {
        adventureItems.push({
          _id: 'international',
          title: 'International',
          image: res.data.international[0].flipcardImage[0],
          route: '/intern'
        });
      }

      // Add Honeymoon (Romantic Escapes)
      if (res.data.honeymoon && res.data.honeymoon.length > 0) {
        adventureItems.push({
          _id: 'honeymoon',
          title: 'Romantic Escapes',
          image: res.data.honeymoon[0].flipcardImage[0],
          route: '/Honeymoon'
        });
      }

      setAdventures(adventureItems);
    } catch (error) {
      console.error("Error fetching adventures:", error);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  return (
    <div className="w-full explore-mob-wrper bg-white h-auto px-4 mb-12 block md:hidden lg:block">
      <h1 className="text-center text-lg font-bold mb-6">
        Explore Your Adventure
      </h1>

      {/* Flex layout with flex-wrap to wrap content if it overflows */}
      <div className="flex flex-wrap justify-center gap-4 mx-auto">
        {adventures.map((adventure) => (
          <a
            key={adventure._id}
            href={adventure.route}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 flex justify-center items-center overflow-hidden rounded-full">
              <img
                src={adventure.image}
                alt={adventure.title}
                className="object-cover w-full h-full"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/80?text=' + adventure.title.charAt(0);
                }}
              />
            </div>
            <span className="mt-1 text-center text-xs font-semibold">
              {adventure.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TravelOptions;
