import React, { useState, useEffect } from "react";
import "./VideoModal.css";
import VideoCard from "../components/Reels/VideoCard";

function VideoModal() {
  const [videos, setVideos] = useState([]);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);

  useEffect(() => {
    const fetchReelVideo = async () => {
      try {
        const response = await fetch(
          "https://elitetrips-backend.onrender.com/api/reel/reels"
        );
        const data = await response.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchReelVideo();
  }, []);
  return (
    <div className="app">
      <div className="app__videos">
        {videos.map(({ videoTitle, video, videoSubtitle, urlLink }, index) => (
          <VideoCard
            key={videoTitle}
            videoId={index} // Using index as a unique identifier
            videoTitle={videoTitle}
            videoSubtitle={videoSubtitle}
            video={video}
            url={`https://elitetrips-backend.onrender.com/upload/${video[0]}`} // Assuming this is the correct way to construct the video URL
            link={urlLink} // Pass the urlLink to VideoCard
            currentlyPlayingId={currentlyPlayingId}
            setCurrentlyPlayingId={setCurrentlyPlayingId}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoModal;
