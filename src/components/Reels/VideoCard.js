import React, { useRef, useState, useEffect } from "react";
import "./VideoCard.css";
import VideoHeader from "./VideoHeader";
import VideoFooter from "./VideoFooter";
import { useNavigate } from "react-router-dom";

function VideoCard({
  url,
  likes,
  shares,
  channel,
  avatarSrc,
  song,
  videoTitle,
  videoSubtitle,
  videoId,
  currentlyPlayingId,
  setCurrentlyPlayingId,
  link,
}) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  // Handle video visibility changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible in viewport
            setCurrentlyPlayingId(videoId);
          }
        });
      },
      { threshold: 0.6 } // Trigger when 60% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoId, setCurrentlyPlayingId]);

  // Handle playing/pausing based on currently playing ID
  useEffect(() => {
    if (!videoRef.current) return;

    if (currentlyPlayingId === videoId) {
      videoRef.current.play();
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  }, [currentlyPlayingId, videoId]);

  const onVideoPress = () => {
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
      setCurrentlyPlayingId(null);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
      setCurrentlyPlayingId(videoId);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    videoRef.current.muted = !isMuted;
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="videoCard">
      <div onClick={handleBack}>
        <VideoHeader />
      </div>
      <video
        ref={videoRef}
        onClick={onVideoPress}
        className="videoCard__player"
        src={url}
        alt="IG reel video"
        loop
        muted={isMuted}
      />
      <button onClick={toggleMute} className="muteButton">
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <VideoFooter
        channel={channel}
        likes={likes}
        shares={shares}
        avatarSrc={avatarSrc}
        song={song}
        title={videoTitle}
        videoSubtitle={videoSubtitle}
        urlLink={link}
      />
    </div>
  );
}

export default VideoCard;
