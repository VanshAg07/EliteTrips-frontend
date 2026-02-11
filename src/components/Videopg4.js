import React, { useState, useEffect } from "react";
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TravelPackageCard = ({ pkg }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/honeymoon-packages/${pkg.stateName}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="relative w-80 h-[380px] mr-2 mb-2 ml-4 rounded-md shadow-lg shadow-black overflow-hidden cursor-pointer group"
    >
      <img
        src={pkg.flipcardImage[0]}
        alt={pkg.stateName}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://via.placeholder.com/300x380?text=Image+Not+Available';
        }}
      />

      {/* Black gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Text content on image */}
      <div className="absolute bottom-0 left-0 p-4 text-white z-10">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold">Starting from</span>
          <span className="text-lg font-bold">₹{pkg.flipOfferPrice}/-</span>
        </div>
      </div>
    </div>
  );
};

const TravelPackages = () => {
  const [packages, setPackages] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [visiblePackages, setVisiblePackages] = useState(3);
  const [videoSrc, setVideoSrc] = useState("");
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

  const fetchVideoPages = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/video-page"
      );
      const honeymoonVideo = response.data.find(
        (video) => video.type === "Honeymoon"
      );
      if (honeymoonVideo) {
        if (honeymoonVideo.mediaType === 'image' && honeymoonVideo.backgroundImage) {
          setImageSrc(honeymoonVideo.backgroundImage);
          setMediaType('image');
          setIsGoogleDriveVideo(false);
        } else if (honeymoonVideo.backgroundVideo) {
          const videoUrl = honeymoonVideo.backgroundVideo;
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
      } else {
        console.error("No video found");
      }
    } catch (error) {
      console.error("Error fetching video pages:", error);
    }
  };

  // Fetch honeymoon packages from flipcard API
  const fetchHoneymoonPackages = async () => {
    try {
      const res = await axios.get(
        "https://elitetrips-backend.onrender.com/api/flip-card/flip"
      );
      // Get honeymoon packages from flipcard data
      if (res.data && res.data.honeymoon) {
        setPackages(res.data.honeymoon);
      }
    } catch (error) {
      console.error("Error fetching honeymoon packages:", error);
    }
  };

  useEffect(() => {
    fetchHoneymoonPackages();
    fetchVideoPages();

    const updateVisiblePackages = () => {
      if (window.innerWidth >= 1280) {
        setVisiblePackages(5);
      } else if (window.innerWidth >= 1024) {
        setVisiblePackages(4);
      } else {
        setVisiblePackages(3);
      }
    };

    updateVisiblePackages();
    window.addEventListener("resize", updateVisiblePackages);

    return () => {
      window.removeEventListener("resize", updateVisiblePackages);
    };
  }, []);

  const handleNext = () => {
    if (startIndex + visiblePackages < packages.length) {
      setStartIndex((prevIndex) =>
        Math.min(prevIndex + 1, packages.length - visiblePackages)
      );
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <div className="h-screen pt-10 bg-white flex flex-col">
      {/* Video/Image Section */}
      <div className="relative w-full h-[32%]">
        {mediaType === 'image' && imageSrc ? (
          <img
            className="w-full h-full object-cover"
            src={imageSrc}
            alt="Honeymoon"
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
              title="Honeymoon Video"
              style={{ pointerEvents: 'none' }}
            />
          ) : (
            <video
              className="w-full h-full object-cover"
              src={videoSrc}
              autoPlay
              loop
              muted
              onError={() => console.error("Error loading video")}
            />
          )
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-600">Media not available</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>

        {/* Text */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <h1 className="text-4xl uppercase font-bold">
            Explore <span className="text-yellow-400">Romantic Journeys</span>
          </h1>
          <h3 className="text-lg mt-2">
            Where
            <span className="text-yellow-400"> Love </span> Travels
            <span className="text-yellow-400"> First </span>
          </h3>
        </div>
      </div>

      {/* Packages Section */}
      <div className="w-[95vw] h-[80%] mx-auto px-4 sm:px-6 lg:px-8 overflow-y-auto">
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl pl-10 font-semibold">Honeymoon Packages</h2>
          <a href="/honeymoon" className="text-red-500 mr-12 font-bold text-sm">
            See All
          </a>
        </div>
        <div className="flex items-center mt-4 relative">
          <FaChevronCircleLeft
            size={30}
            className={`absolute -left-[5px] text-black cursor-pointer ${startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            onClick={handlePrev}
          />
          <div className="flex overflow-x-auto">
            {packages
              .slice(startIndex, startIndex + visiblePackages)
              .map((pkg) => (
                <TravelPackageCard key={pkg.tripName} pkg={pkg} />
              ))}
          </div>
          <FaChevronCircleRight
            size={30}
            className={`absolute -right-[10px] text-black cursor-pointer ${startIndex + visiblePackages >= packages.length ? "invisible" : ""
              }`}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default TravelPackages;
