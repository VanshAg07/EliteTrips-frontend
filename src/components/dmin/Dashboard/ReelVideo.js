import React, { useState, useEffect } from "react";
import axios from "axios";

function ReelVideo() {
  const [videos, setVideos] = useState([]);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoFiles, setVideoFiles] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [urlLink, setUrl] = useState("");
  const [videoSubtitle, setVideoSubtitle] = useState("");
  // Fetch all videos
  const fetchVideos = async () => {
    try {
      const response = await axios.get("https://elitetrips-backend.onrender.com/api/reel/reel");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle video file input change
  const handleFileChange = (e) => {
    setVideoFiles(e.target.files);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("videoTitle", videoTitle);
    formData.append("videoSubtitle", videoSubtitle); // Add this line
    formData.append("urlLink", urlLink);
    // Append files only if there are new selected files
    if (videoFiles) {
      Array.from(videoFiles).forEach((file) => formData.append("video", file));
    }

    try {
      if (editingId) {
        // Conditional check in URL request based on whether new files are uploaded
        await axios.put(
          `https://elitetrips-backend.onrender.com/api/reel/reel/${editingId}`,
          formData
        );
      } else {
        await axios.post("https://elitetrips-backend.onrender.com/api/reel/reel", formData);
      }
      // Reset fields and fetch updated videos
      setVideoTitle("");
      setVideoFiles(null);
      setEditingId(null);
      setVideoSubtitle("");
      setUrl("");
      fetchVideos();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (video) => {
    setEditingId(video._id);
    setVideoTitle(video.videoTitle);
    setVideoSubtitle(video.videoSubtitle);
    setUrl(video.urlLink);
  };

  // Handle delete button click
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`https://elitetrips-backend.onrender.com/api/reel/reel/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Reel Videos</h1>

      {/* Form for creating or updating a video */}
      <form
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Update Video" : "Create New Video"}
        </h2>
        <input
          type="text"
          placeholder="Video Title"
          value={videoTitle}
          onChange={(e) => setVideoTitle(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Video Subtitle"
          value={videoSubtitle}
          onChange={(e) => setVideoSubtitle(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Video URL"
          value={urlLink}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded
        md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          accept="video/*"
          className="w-full mb-4"
        />
        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300"
        >
          {editingId ? "Update Video" : "Create Video"}
        </button>
      </form>

      {/* Video list */}
      <div className="max-w-3xl mx-auto space-y-6">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row md:items-center justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">{video.videoTitle}</h3>
              <div className="mt-2 flex gap-4 flex-wrap">
                {video.video.map((filePath, index) => (
                  <video
                    key={index}
                    src={`https://elitetrips-backend.onrender.com/upload/${filePath}`}
                    controls
                    className="w-40 h-auto mt-2"
                    muted
                    autoPlay
                  />
                ))}
                <div className="flex flex-col">
                  <p>{video.videoSubtitle}</p>
                  <p>{video.urlLink}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <button
                onClick={() => handleEditClick(video)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(video._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReelVideo;
