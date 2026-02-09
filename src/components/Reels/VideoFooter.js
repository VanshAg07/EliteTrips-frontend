import React from "react";
import "./VideoFooter.css";
import { Avatar } from "@mui/material";
import { RiShareFill } from "react-icons/ri";
const logo = "/Elitetriplogo.png";

function VideoFooter({ title, videoSubtitle, urlLink }) {

  const handleShareClick = () => {
    const shareUrl = `https://www.EliteTrips.com/reel-slider`;
    if (navigator.share) {
      navigator
        .share({
          title: `Check out this reel by EliteTrips`,
          text: `${title} - ${videoSubtitle}`,
          url: shareUrl,
        })
        .then(() => console.log(""))
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert("Link copied to clipboard!");
      });
    }
  };

  const handleNavigate = () => {
    window.open(urlLink, "_blank");
  };

  return (
    <div className="bottom-20 ml-10 w-full">
      <div className="videoFooter__text">
        <div className="flex flex-row items-center gap-5">
          <Avatar src={logo} className="" />
          <h3>EliteTrips</h3>
        </div>
        <div
          onClick={handleNavigate}
          className="bg-black mb-4 bg-opacity-45 w-[80%] mt-4 p-3 rounded-md flex flex-col cursor-pointer items-center justify-center"
        >
          <p className="font-bold">{title}</p>
          <p>{videoSubtitle}</p>
        </div>
      </div>
      <div className="absolute right-5 bottom-52">
        <div onClick={handleShareClick} className="cursor-pointer">
          <RiShareFill size={30} color="white" />
        </div>
      </div>
    </div>
  );
}

export default VideoFooter;
