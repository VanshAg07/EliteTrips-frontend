import React, { useEffect, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa"; // Importing icons
import "./Homeyt.css"

const Logo = "/Elitetriplogo.png";

const VideoSlider = () => {
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/home/youtube");
      const data = await response.json(); // Parse JSON response
      setVideos(data); // Set the videos state
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex(
      (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
    );
  };

  return (
    <div className="flex flex-col pb-14 items-center space-y-4">
      {/* Title */}
      <h2 className="text-xl md:text-3xl lg:text-4xl pt-7 font-bold text-center leading-tight sm:text-xl">
        Visit Our Youtube Channel
      </h2>

      <div className="flex items-center">
        <button
          onClick={handlePrev}
          className="p-2 yt-left rounded-full z-10"
          style={{ zIndex: 10 }}
          disabled={videos.length === 0} // Disable if no videos
        >
          <FaChevronCircleLeft className=" yt-left text-2xl" />
        </button>

        <div className="relative w-[85vw] max-w-3xl mx-auto bg-white border-2 border-black p-4 rounded-lg overflow-hidden">
          {/* Video Display */}
          <div className="relative w-full">
            {videos.length > 0 ? ( // Check if videos are available
              <iframe
                className="w-full aspect-video rounded-md"
                src={`https://www.youtube.com/embed/${new URL(
                  videos[currentVideoIndex].videoLink
                ).searchParams.get("v")}`}
                title={videos[currentVideoIndex].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="text-center text-lg">Loading videos...</p> // Loading message
            )}
          </div>

          {videos.length > 0 && ( // Check if videos are available
            <div className="flex items-center justify-center mt-4 space-x-2">
              <img
                src={Logo}
                alt="Logo"
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full"
              />
              <p className="text-sm md:text-base lg:text-lg font-semibold text-center">
                {videos[currentVideoIndex].title}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleNext}
          className="p-2 rounded-full z-10"
          style={{ zIndex: 10 }}
          disabled={videos.length === 0} // Disable if no videos
        >
          <FaChevronCircleRight className="yt-right text-2xl" />
        </button>
      </div>

      <div className="flex space-x-2 mt-4">
        {videos.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              index === currentVideoIndex ? "bg-black" : "bg-gray-300"
            }`}
            onClick={() => setCurrentVideoIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoSlider;
