import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Visit.css";
import { FaClock } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Shop = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(
          `https://elitetrips-backend.onrender.com/api/user/getShops/${name}` 
        );
        // console.log(response.data);
        setShops(response.data.shops || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, [name]);

  return (
    <div className="mx-auto" style={{ width: '90vw' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shops.length > 0 ? (
          shops.map((shop, index) => (
            <div key={index} className="visiting-card shadow-lg rounded-lg overflow-hidden flex flex-col">
              <img src={shop.img} alt={shop.title} className="w-full h-52 object-cover" />
              <div className="visiting-card-content p-4 flex-grow bg-white">
                <div className="clock-text-container flex items-center">
                  <FaClock className="shop-card-clock text-gray-800 mr-2" />
                  <span className="duration-text text-sm text-gray-600">{shop.duration}</span>
                </div>
                <h1 className="text-lg font-semibold">{shop.title}</h1>
                <p className="text-sm text-gray-600">{shop.description}</p>
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

export default Shop;