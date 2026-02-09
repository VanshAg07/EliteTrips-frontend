import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HomeVideo() {
  const [videos, setVideos] = useState([]);
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editUrl, setEditUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch all videos
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/home-page-video"
      );
      setVideos(response.data.video || []); // Assuming the response structure is { video: [] }
    } catch (error) {
      if (error.response?.status !== 404) {
        toast.error("Error fetching videos.");
      }
      console.error("Error fetching videos:", error);
    }
  };

  // Helper function to convert Google Drive/Photos URL to embeddable format
  const convertToEmbeddableUrl = (url) => {
    // YouTube: Extract video ID and create embed URL
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      let videoId = "";
      
      if (url.includes("youtube.com/watch?v=")) {
        videoId = url.split("v=")[1]?.split("&")[0];
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]?.split("?")[0];
      } else if (url.includes("youtube.com/embed/")) {
        videoId = url.split("embed/")[1]?.split("?")[0];
      }
      
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1`;
      }
    }
    
    // Google Drive: Convert sharing link to preview format
    if (url.includes("drive.google.com")) {
      let fileId = null;
      
      const fileIdMatch1 = url.match(/\/d\/([^/]+)/);
      const fileIdMatch2 = url.match(/[?&]id=([^&]+)/);
      
      if (fileIdMatch1) {
        fileId = fileIdMatch1[1];
      } else if (fileIdMatch2) {
        fileId = fileIdMatch2[1];
      }
      
      if (fileId) {
        fileId = fileId.split('?')[0];
        return `https://drive.google.com/file/d/${fileId}/preview`;
      }
    }
    
    // Google Photos or direct URL
    return url;
  };

  // Create or update video
  const handleAddOrUpdateVideo = async () => {
    const urlToUse = editIndex !== null ? editUrl : newVideoUrl;
    
    if (!urlToUse.trim()) {
      toast.error("Please enter a video URL.");
      return;
    }

    setIsLoading(true);
    try {
      const embeddableUrl = convertToEmbeddableUrl(urlToUse);
      
      const response = await axios.post(
        "https://elitetrips-backend.onrender.com/api/home/create-home-page-video",
        { video: [embeddableUrl] }, // Send as array
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setVideos(response.data.data.video || []);
      setNewVideoUrl("");
      setEditIndex(null);
      setEditUrl("");
      toast.success(editIndex !== null ? "Video updated successfully!" : "Video added successfully!");
      fetchVideos(); // Refresh the list
    } catch (error) {
      toast.error("Error saving video.");
      console.error("Error saving video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a video
  const handleDeleteVideo = async () => {
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(
        "https://elitetrips-backend.onrender.com/api/home/home-page-video/delete"
      );
      setVideos([]);
      toast.success("Video deleted successfully!");
    } catch (error) {
      toast.error("Error deleting video.");
      console.error("Error deleting video:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Start editing
  const startEdit = () => {
    if (videos.length > 0) {
      setEditIndex(0);
      setEditUrl(videos[0]);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditIndex(null);
    setEditUrl("");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Home Page Background Video</h1>
      
      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="font-bold text-blue-800 mb-2">📹 Supported Video Sources:</h3>
        <div className="text-sm text-gray-700 space-y-3">
          
          <div className="bg-white p-3 rounded">
            <strong className="text-green-600">✅ RECOMMENDED: YouTube (Unlisted)</strong>
            <ol className="list-decimal ml-5 mt-1 space-y-1">
              <li>Upload video to YouTube</li>
              <li>Set to "Unlisted" (not searchable but accessible)</li>
              <li>Copy video URL: <code className="bg-gray-100 px-1">https://www.youtube.com/watch?v=VIDEO_ID</code></li>
              <li>Paste below → Works perfectly! ✨</li>
            </ol>
          </div>

          <div className="bg-white p-3 rounded">
            <strong className="text-green-600">✅ Cloudinary (Already Configured)</strong>
            <ol className="list-decimal ml-5 mt-1 space-y-1">
              <li>Go to <a href="https://cloudinary.com/console/media_library" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Cloudinary Dashboard</a></li>
              <li>Upload video (Cloud: dojrvt4vx)</li>
              <li>Copy URL: <code className="bg-gray-100 px-1">https://res.cloudinary.com/.../video.mp4</code></li>
              <li>Paste below → Works directly! ✨</li>
            </ol>
          </div>

          <div className="bg-white p-3 rounded">
            <strong className="text-blue-600">📁 Direct MP4/WebM URL</strong>
            <p className="ml-5 mt-1">Any direct video file URL will work</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 p-3 rounded">
            <strong className="text-red-600">⚠️ Google Drive: NOT RELIABLE</strong>
            <p className="ml-5 mt-1 text-xs">Google blocks direct video streaming. Use YouTube or Cloudinary instead.</p>
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {editIndex !== null ? "Edit Video URL" : "Add Video URL"}
        </h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste Google Drive or Google Photos video URL here..."
            value={editIndex !== null ? editUrl : newVideoUrl}
            onChange={(e) => editIndex !== null ? setEditUrl(e.target.value) : setNewVideoUrl(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddOrUpdateVideo}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? "Saving..." : editIndex !== null ? "Update Video" : "Add Video"}
            </button>
            {editIndex !== null && (
              <button
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Current Video Display */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Current Background Video</h2>
        {videos.length > 0 ? (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              {/* Show URL info and type detection */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Video URL:</strong> 
                  <br />
                  <span className="break-all text-xs">{videos[0]}</span>
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Type Detected:</strong>{" "}
                  <span className="font-semibold">
                    {videos[0].includes("youtube.com") || videos[0].includes("youtu.be") 
                      ? "🎬 YouTube Video" 
                      : videos[0].includes("drive.google.com")
                      ? "📁 Google Drive (Preview Only)"
                      : videos[0].includes("cloudinary.com")
                      ? "☁️ Cloudinary Video"
                      : "🎥 Direct Video URL"}
                  </span>
                </p>
                {(videos[0].includes("youtube.com") || videos[0].includes("youtu.be")) && (
                  <p className="text-xs text-green-600 mt-1">✅ YouTube videos work perfectly!</p>
                )}
                {videos[0].includes("drive.google.com") && (
                  <p className="text-xs text-red-600 mt-1">
                    ⚠️ Google Drive may not work reliably. Consider using YouTube or Cloudinary.
                  </p>
                )}
              </div>
              
              {/* Video Preview */}
              {(videos[0].includes("youtube.com") || videos[0].includes("youtu.be")) ? (
                // YouTube Preview
                <iframe
                  src={convertToEmbeddableUrl(videos[0])}
                  className="w-full rounded-lg mb-4"
                  style={{ height: "400px" }}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : videos[0].includes("drive.google.com") ? (
                // Google Drive Preview
                <iframe
                  src={convertToEmbeddableUrl(videos[0])}
                  className="w-full rounded-lg mb-4"
                  style={{ height: "400px" }}
                  allow="autoplay"
                />
              ) : (
                // Direct Video Preview
                <video 
                  src={videos[0]} 
                  controls 
                  className="w-full rounded-lg mb-4"
                  style={{ maxHeight: "400px" }}
                  onError={(e) => {
                    console.error("Video preview failed to load:", e);
                    toast.error("Video preview failed. Check if the link is accessible.");
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={startEdit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteVideo}
                    disabled={isLoading}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium disabled:bg-gray-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No video added yet. Add a video URL above to get started.
          </p>
        )}
      </div>
    </div>
  );
}

export default HomeVideo;