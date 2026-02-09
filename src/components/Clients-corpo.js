import React, { useEffect, useState } from "react";
import "./Clients-corpo.css";

const ContinuousScroll = () => {
  const [hallOfFrame, setHallOfFrame] = useState([]);

  // Fetch the Hall of Fame data
  const fetchHall = async () => {
    try {
      const res = await fetch(
        "http://localhost:5001/api/corporate/hall-of-frame"
      );
      const data = await res.json();
      if (data && data.data) {
        setHallOfFrame(data.data); // Store the image data in state
      }
    } catch (error) {
      console.error("Error fetching Hall of Fame data:", error);
    }
  };

  useEffect(() => {
    fetchHall();
  }, []);

  // Extract image URLs from the fetched data
  const images = hallOfFrame.map((item) => item.image[0]); // Assuming each item has an array with one image URL

  // Repeat the images multiple times to ensure seamless scrolling
  const repeatedImages = [
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
    ...images,
  ];

  // Rotate the array for the second row to start at the 4th logo
  const rotatedImages = [
    ...repeatedImages.slice(3), // Start from the 4th logo
    ...repeatedImages.slice(0, 3), // Add the first 3 logos at the end
  ];

  return (
    <div className="scroll-container pt-8 pl-8 pr-8 pb-2 bg-white text-center">
      <h2 className="text-xl md:text-3xl mb-8 lg:text-4xl font-bold leading-tight sm:text-xl">
        Our Clientele <span className="text-gray-800">Hall of Fame</span>
      </h2>
      {/* First row */}
      <div className="animate-scroll pb-7 rounded-full">
        {repeatedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Client Logo"
            className="w-36 rounded-sm h-auto"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        ))}
      </div>
      {/* Second row */}
      <div className="animate-scroll rounded-full">
        {rotatedImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Client Logo"
            className="w-36 rounded-sm h-auto"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        ))}
      </div>
    </div>
  );
};

export default ContinuousScroll;
