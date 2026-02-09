import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import axios from "axios";

const TravelPackageCard = ({ pkg }) => {
  const navigate = useNavigate();

  // Function to handle navigation
  const handleNavigate = () => {
    navigate(`/places/${pkg.stateName}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="border w-80 mr-2 mb-2 ml-4 rounded-md shadow-lg shadow-black overflow-hidden cursor-pointer"
    >
      <img
        src={pkg.flipcardImage[0]}
        alt={pkg.stateName}
        className="w-full h-[240px] object-cover"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
        }}
      />
      <div className="pt-2 pl-3 pr-3 pb-2 h-[100px] bg-transparent">
        <div className="flex justify-between items-center">
          <h3 className="text-lg uppercase font-semibold truncate">
            {pkg.stateName}
          </h3>
        </div>
        <div className="flex justify-between items-center mt-2 mb-2">
          <div className="flex items-center text-black text-sm">
            <span className="line-through text-gray-500 mr-2">₹{pkg.flipPrice}/-</span>
          </div>
          <div className="flex items-center text-green-600 font-bold text-sm">
            Starting ₹{pkg.flipOfferPrice}/-
          </div>
        </div>
      </div>
    </div>
  );
};

const TravelPackages = () => {
  const [packages, setPackages] = useState([]); // State to store fetched packages
  const [startIndex, setStartIndex] = useState(0);
  const [videoSrc, setVideoSrc] = useState(""); // State for video source
  const [imageSrc, setImageSrc] = useState(""); // State for image source
  const [mediaType, setMediaType] = useState("video"); // State for media type
  const [isGoogleDriveVideo, setIsGoogleDriveVideo] = useState(false); // State for Google Drive video

  // Helper function to convert Google Drive URL to embeddable format
  const convertToGoogleDriveEmbedUrl = (url) => {
    if (!url) return url;
    
    // Already in embed format
    if (url.includes('/preview')) {
      return url;
    }
    
    // Extract file ID from various Google Drive URL formats
    let fileId = null;
    
    // Format: https://drive.google.com/file/d/FILE_ID/view
    const fileMatch = url.match(/\/file\/d\/([^\/]+)/);
    if (fileMatch) {
      fileId = fileMatch[1];
    }
    
    // Format: https://drive.google.com/open?id=FILE_ID
    const openMatch = url.match(/[?&]id=([^&]+)/);
    if (openMatch) {
      fileId = openMatch[1];
    }
    
    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
    
    return url;
  };

  // Fetch international packages from flipcard API
  const fetchInternationalPackages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5001/api/flip-card/flip"
      );
      // Get international packages from flipcard data
      if (res.data && res.data.international) {
        setPackages(res.data.international);
      }
    } catch (error) {
      console.error("Error fetching international packages:", error);
    }
  };

  useEffect(() => {
    fetchInternationalPackages();
    fetchVideoPages();
  }, []);

  // Fetch video pages
  const fetchVideoPages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/home/video-page"
      );
      const internationalVideo = response.data.find(
        (video) => video.type === "International"
      );
      if (internationalVideo) {
        if (internationalVideo.mediaType === 'image' && internationalVideo.backgroundImage) {
          setImageSrc(internationalVideo.backgroundImage);
          setMediaType('image');
          setIsGoogleDriveVideo(false);
        } else if (internationalVideo.backgroundVideo) {
          const videoUrl = internationalVideo.backgroundVideo;
          // Check if it's a Google Drive URL
          if (videoUrl.includes('drive.google.com')) {
            setVideoSrc(convertToGoogleDriveEmbedUrl(videoUrl));
            setIsGoogleDriveVideo(true);
          } else {
            setVideoSrc(videoUrl);
            setIsGoogleDriveVideo(false);
          }
          setMediaType('video');
        }
      }
    } catch (error) {
      console.error("Error fetching video pages:", error);
    }
  };

  const handleNext = () => {
    if (startIndex + visiblePackages < packages.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Determine how many packages to show based on screen width
  const visiblePackages =
    window.innerWidth >= 1280 ? 5 : window.innerWidth >= 1024 ? 4 : 3;

  return (
    <div className="h-screen pt-10 bg-white flex flex-col">
      {/* Video/Image Section */}
      <div className="relative w-full h-[32%]">
        {mediaType === 'image' && imageSrc ? (
          <img
            className="w-full h-full object-cover"
            src={imageSrc}
            alt="International"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
          />
        ) : videoSrc ? (
          isGoogleDriveVideo ? (
            <iframe
              className="w-full h-full object-cover"
              src={`${videoSrc}?autoplay=1&loop=1&mute=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
              title="International Video"
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              loop
              muted
            />
          )
        ) : null}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>

        {/* Text Overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-4xl uppercase font-bold">
            Explore <span className="text-yellow-400"> International Trip</span>{" "}
          </h1>
          <h3 className="text-lg mt-2">
            Embark on an<span className="text-yellow-400"> International </span>{" "}
            Adventure – Where Every{" "}
            <span className="text-yellow-400"> Destination </span> Tells a{" "}
            <span className="text-yellow-400">New Story!</span>
          </h3>
        </div>
      </div>

      {/* Packages Section */}
      <div className="w-[95vw] h-[80%] mx-auto px-4 sm:px-6 lg:px-8 overflow-y-auto">
        {/* Heading and "See All" */}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl pl-10 font-semibold">
            International Packages
          </h2>
          <a href="/intern" className="text-red-500 mr-12 font-bold  text-sm">
            See All
          </a>
        </div>
        {/* Packages Navigation */}
        <div className="flex items-center mt-4 relative">
          <FaChevronCircleLeft
            size={30}
            className={`absolute -left-[5px] text-black cursor-pointer ${
              startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePrev}
          />
          <div className="flex overflow-x-auto">
            {packages
              .slice(startIndex, startIndex + visiblePackages)
              .map((pkg, index) => (
                <TravelPackageCard key={index} pkg={pkg} />
              ))}
          </div>
          <FaChevronCircleRight
            size={30}
            className={`absolute -right-[10px] text-black cursor-pointer ${
              startIndex + visiblePackages >= packages.length ? "invisible" : ""
            }`}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelPackages;
