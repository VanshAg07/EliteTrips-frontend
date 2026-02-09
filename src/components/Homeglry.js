import React, { useEffect, useRef, useState } from "react";
import "./Homeglry.css";
import axios from "axios";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa"; // Import icons

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const galleryCenterRef = useRef(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/gallery/home-galleries"
      );
      setGalleryImages(response.data.images[0].images || []);
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const handlePrevious = () => {
    setRotation((prevRotation) => prevRotation - 30);
  };

  const handleNext = () => {
    setRotation((prevRotation) => prevRotation + 30);
  };

  const handleWheel = (event) => {
    setRotation((prevRotation) => prevRotation + (event.deltaY < 0 ? -10 : 10));
  };

  return (
    <div className="relative mb-80 mt-20">
      <div className="flex relative flex-row">
        <div className="arrow-wrapper">
          <div className="arrow-glry arrow-left-glry" onClick={handlePrevious}>
            <FaChevronCircleLeft className="" /> {/* Use left icon */}
          </div>
          <div className="gallery-wrap" onWheel={handleWheel}>
            {/* Heading */}
            <h1 className="text-center text-3xl md:text-4xl pt-4 lg:text-5xl font-bold mb-4">
              Travel Gallery
            </h1>
            <p className="text-center md:text-xl text-lg homeglry-p font-semibold mb-2 text-gray-800">
              Moments In Motion
            </p>
            <div
              className="gallery-center"
              ref={galleryCenterRef}
              style={{
                transform: `translate(-50%, -50%) perspective(2800px) rotateY(${rotation}deg)`,
              }}
            >
              {galleryImages.map((image, index) => (
                <div
                  className="gallery-box"
                  key={index}
                  style={{
                    transform: `translate(-50%, -50%) rotateY(${
                      index * -30
                    }deg) translateZ(-1000px)`,
                  }}
                >
                  <a>
                    <img
                      className="img-glry"
                      src={image}
                      alt={`Image ${index + 1}`}
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                      }}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="arrow-wrapper">
          <div className="arrow-glry arrow-right-glry" onClick={handleNext}>
            <FaChevronCircleRight />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
