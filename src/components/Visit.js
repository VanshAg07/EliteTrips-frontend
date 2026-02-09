import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Visit.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Visit = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          `https://elitetrips-backend.onrender.com/api/user/getBeautifulPlaces/${name}`
        );
        // console.log(response.data);
        setPlaces(response.data.places || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [name]);

  return (
    <div className=" mx-auto" style={{ width: "90vw" }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.length > 0 ? (
          places.map((place, index) => (
            <div
              key={index}
              className="visiting-card shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={place.img}
                alt={place.title}
                className="w-full h-52 object-cover"
              />
              <div className="visiting-card-content p-4 flex-grow bg-white">
                <h1 className="text-lg font-semibold">{place.title}</h1>
                <p className="text-sm text-gray-800">{place.description}</p>
                <div className="location-info flex items-center mt-2">
                  <FaMapMarkerAlt className="location-icon text-black mr-2" />
                  <span className="location-text text-sm text-black">
                    {place.location}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Visit;
