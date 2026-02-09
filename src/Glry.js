import React, { useEffect, useState } from "react";
import "./Glry.css";
import Nav from "./components/Nav";
import Dropnav from "./components/Dropnav";
import MainFooter from "./components/Footer/MainFooter";

const Glry = () => {
  const [images, setGalleryImages] = useState([]);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch(
        "https://elitetrips-backend.onrender.com/api/gallery/home-galleries"
      );
      const data = await response.json();

      // Flatten all image arrays into a single array
      const allImages = data.images.flatMap((gallery) => gallery.images);
      setGalleryImages(allImages);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  return (
    <div className="glry-wr">
      <Nav />
      <Dropnav />
      <h2 className="gallery-heading">Our Stunning Gallery</h2>
      <div className="gallery-container">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img 
              src={image} 
              alt={`Gallery Image ${index + 1}`}
              referrerPolicy="no-referrer"
              crossOrigin="anonymous"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
              }}
            />
          </div>
        ))}
      </div>
      <MainFooter />
    </div>
  );
};

export default Glry;