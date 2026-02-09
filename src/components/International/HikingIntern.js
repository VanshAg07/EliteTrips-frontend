import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Visit.css";
import { FaClock } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Hiking = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchActivities = async () => {
      // console.log("Fetching activities...");
      try {
        const response = await axios.get(
          `https://elitetrips-backend.onrender.com/api/user/getInternActivities/${name}`
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
          activities.map((activity, index) => (
            <div key={index} className="visiting-card shadow-lg rounded-lg overflow-hidden flex flex-col">
              <img src={activity.img} alt={activity.title} className="w-full h-52 object-cover" />
              <div className="visiting-card-content p-4 flex-grow bg-white">
                <div className="clock-text-container flex items-center">
                  <FaClock className="hiking-card-clock text-gray-800 mr-2" />
                  <span className="duration-text text-sm text-gray-800">{activity.time}</span>
                </div>
                <h1 className="text-lg font-semibold">{activity.title}</h1>
                <p className="text-sm text-gray-800">{activity.description}</p>
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

export default Hiking;
