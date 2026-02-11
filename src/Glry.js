import React, { useEffect, useState } from "react";
import "./Glry.css";
import Nav from "./components/Nav";
import Dropnav from "./components/Dropnav";
import MainFooter from "./components/Footer/MainFooter";
import Mainreview from "./components/Mainreview";

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
      <div className="relative">
        <div className="hero-section-left-1 mt-[60px] md:mt-[105px]">
          <img
            src="/gallery.jpg"
            alt="Gallery Hero"
            className="hero-img z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"></div>
          <div className="relative flex flex-col items-center z-20">
            <div className="relative w-full flex items-start justify-center">
              <h1 className="ml-6 text-center text-white font-bold text-2xl xs:text-2xl sm:text-3xl lg:text-4xl leading-tight mt-4 sm:mt-8">
                Our Stunning Gallery
              </h1>
            </div>
          </div>
        </div>
        <Mainreview />
      </div>
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