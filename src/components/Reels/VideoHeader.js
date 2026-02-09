import React from "react";
import "./VideoHeader.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

function VideoHeader() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="videoHeader">
      <div onClick={handleBack} className="z-10">
        <ArrowBackIosIcon  />
      </div>
      <h3>Reels</h3>
    </div>
  );
}

export default VideoHeader;
