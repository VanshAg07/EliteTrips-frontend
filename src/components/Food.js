import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Visit.css";
import { FaMapMarkerAlt, FaUtensils } from "react-icons/fa"; 
import { useParams } from "react-router-dom";

const Food = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchActivities = async () => {
      // console.log("Fetching activities..."); 
      try {
        const response = await axios.get(
          `https://elitetrips-backend.onrender.com/api/user/getRichFlavour/${name}`
        );
        // console.log(response.data); 
        setActivities(response.data.activities || []); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [name]); 

  return (
    <div className="mx-auto" style={{ width: '90vw' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.length > 0 ? (
          activities.map((food, index) => (
            <div key={index} className="visiting-card shadow-lg rounded-lg overflow-hidden flex flex-col">
              <img src={food.img} alt={food.title} className="w-full h-52 object-cover" />
              <div className="food-card-content p-4 flex-grow bg-white">
                <h1 className="text-lg font-semibold">{food.title}</h1>
                <div className="location-info flex items-center mt-2">
                  <FaMapMarkerAlt className="location-icon text-gray-800 mr-2" />
                  <span className="location-text text-sm text-gray-800">{food.stateName}</span>
                </div>
                <div className="food-info flex items-center mt-2">
                  <FaUtensils className="food-icon text-gray-800 mr-2" />
                  <span className="food-text text-sm text-gray-800">{food.foodType}</span>
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

export default Food;
