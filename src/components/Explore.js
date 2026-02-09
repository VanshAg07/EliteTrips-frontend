import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Explore.css";

const ImageSlider = () => {
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
      
      // Add Corporate Trips (static - can be updated later)
      adventureItems.push({
        _id: 'corporate',
        title: 'Corporate Trips',
        image: res.data.national && res.data.national.length > 1 
          ? res.data.national[1].flipcardImage[0] 
          : res.data.national?.[0]?.flipcardImage?.[0] || '',
        route: '/Corporate'
      });
      
      setAdventures(adventureItems);
    } catch (error) {
      console.error("Error fetching adventures:", error);
    }
  };

  useEffect(() => {
    fetchAdventures();
  }, []);

  const navigateToPage = (route) => {
    window.location.href = route;
  };

  return (
    <div className="relative bg-[#FDFFE2] pb-[450px] h-[120%] w-full">
      <div className="w-4/5 mx-auto">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl mb-6 text-gray-800 font-bold">
          Discover Your Journey
        </h2>
        <div className="flex items-center justify-center relative py-2">
          <div className="flex transition-transform duration-500 ease-in-out w-full justify-center">
            {adventures.length > 0 &&
              adventures.map((adventure) => (
                  <div
                    key={adventure._id}
                    onClick={() => navigateToPage(adventure.route)}
                    className="w-1/4 p-2 relative cursor-pointer group"
                  >
                    <img
                      src={adventure.image}
                      alt={adventure.title}
                      className="w-full h-[480px] object-cover shadow-lg shadow-black transition-all duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x480?text=' + adventure.title;
                      }}
                    />
                    <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl shadow-lg text-center p-4 w-32 h-32 rounded-full bg-[#00000082] flex items-center justify-center custom-dashed-border">
                      {adventure.title}
                    </h1>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
