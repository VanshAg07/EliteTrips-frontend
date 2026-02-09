import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "./TripsModal.css";
import axios from "axios";

function TripsModal({ isOpen, onClose }) {
  const [adventures, setAdventures] = useState([]);

  const fetchAdventures = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/flip-card/flip"
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
      
      // Add Corporate Trips
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

  if (!isOpen) return null;

  return (
    <div className="fixed trip-z inset-0 flex justify-center items-end bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-t-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Choose A Trip</h2>
          <button onClick={onClose} className="text-gray-500">
            <AiOutlineClose className="text-xl" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {adventures.map((adventure) => (
            <a
              key={adventure._id}
              href={adventure.route}
              className="flex flex-col items-center p-2 rounded"
            >
              <img
                src={adventure.image}
                alt={adventure.title}
                className="w-16 h-16 object-cover rounded-full"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/64?text=' + adventure.title.charAt(0);
                }}
              />
              <span className="text-sm mt-2">{adventure.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripsModal;
