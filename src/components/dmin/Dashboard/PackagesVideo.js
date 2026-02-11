import React, { useEffect, useState } from "react";
import axios from "axios";

// helper function to convert Google Drive URL to lh3 format for images
const convertGoogleDriveUrl = (url) => {
  if (!url) return '';

  // Already in lh3 format
  if (url.includes('lh3.googleusercontent.com')) {
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

  // Format: https://drive.google.com/uc?id=FILE_ID
  const ucMatch = url.match(/uc\?.*id=([^&]+)/);
  if (ucMatch) {
    fileId = ucMatch[1];
  }

  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  return url;
};

// helper function to convert Google Drive URL to direct video URL
const convertGoogleDriveVideoUrl = (url) => {
  if (!url) return '';

  // Already a direct URL
  if (url.includes('drive.google.com/uc?export=download')) {
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

  // Format: https://drive.google.com/uc?id=FILE_ID
  const ucMatch = url.match(/uc\?.*id=([^&]+)/);
  if (ucMatch) {
    fileId = ucMatch[1];
  }

  if (fileId) {
    // Use export=download for video streaming
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  return url;
};

function PackagesVideo() {
  const [videoPages, setVideoPages] = useState([]);
  const [formData, setFormData] = useState({ type: "", backgroundVideo: "" });
  const [editing, setEditing] = useState(null);
  const [file, setFile] = useState(null);

  // New state for media type and Google Drive URL
  const [mediaType, setMediaType] = useState('video'); // 'video' or 'image'
  const [useGoogleDrive, setUseGoogleDrive] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState(''); // New state for video URL

  const fetchVideoPages = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/video-page"
      );
      setVideoPages(response.data);
    } catch (error) {
      console.error("Error fetching video pages:", error);
    }
  };

  useEffect(() => {
    fetchVideoPages();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (useGoogleDrive) {
        // Send Google Drive URL as JSON
        const jsonData = {
          type: formData.type,
          mediaType: mediaType,
        };

        if (mediaType === 'image' && imageUrl) {
          jsonData.imageUrl = imageUrl;
        } else if (mediaType === 'video' && videoUrl) {
          jsonData.videoUrl = videoUrl;
        }

        if (editing) {
          await axios.put(
            `https://elitetrips-backend.onrender.com/api/home/video-page/${editing}`,
            jsonData
          );
        } else {
          await axios.post("https://elitetrips-backend.onrender.com/api/home/video-page", jsonData);
        }
      } else {
        // Send files as FormData
        const data = new FormData();
        data.append("type", formData.type);
        data.append("mediaType", mediaType);

        if (mediaType === 'video') {
          data.append("backgroundVideo", file);
        } else {
          data.append("backgroundImage", file);
        }

        if (editing) {
          await axios.put(
            `https://elitetrips-backend.onrender.com/api/home/video-page/${editing}`,
            data
          );
        } else {
          await axios.post("https://elitetrips-backend.onrender.com/api/home/video-page", data);
        }
      }

      setEditing(null);
      setFormData({ type: "", backgroundVideo: "" });
      setFile(null);
      setImageUrl('');
      setVideoUrl('');
      setUseGoogleDrive(false);
      setMediaType('video');
      fetchVideoPages();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (videoPage) => {
    setEditing(videoPage._id);
    setFormData({
      type: videoPage.type,
      backgroundVideo: videoPage.backgroundVideo,
    });
    setMediaType(videoPage.mediaType || 'video');
    setImageUrl('');
    setVideoUrl('');
    setUseGoogleDrive(false);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    await axios.delete(`https://elitetrips-backend.onrender.com/api/home/video-page/${id}`);
    fetchVideoPages();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Packages Video / Image
      </h1>
      <form onSubmit={handleSubmit} className="mb-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select Type
            </option>
            <option value="Indian">Indian</option>
            <option value="International">International</option>
            <option value="Honeymoon">Honeymoon</option>
          </select>
        </div>

        {/* Toggle for Google Drive URL mode */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useGoogleDrive}
              onChange={(e) => {
                setUseGoogleDrive(e.target.checked);
              }}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Use Google Drive URL</span>
          </label>
        </div>

        {useGoogleDrive ? (
          <>
            {/* Media Type Selection for Google Drive */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gdriveMediaType"
                    value="video"
                    checked={mediaType === 'video'}
                    onChange={(e) => setMediaType(e.target.value)}
                    className="mr-2"
                  />
                  <span>Video</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gdriveMediaType"
                    value="image"
                    checked={mediaType === 'image'}
                    onChange={(e) => setMediaType(e.target.value)}
                    className="mr-2"
                  />
                  <span>Image</span>
                </label>
              </div>
            </div>

            {mediaType === 'image' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL (Google Drive)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste Google Drive share link for image"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
                {imageUrl && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <img
                      src={convertGoogleDriveUrl(imageUrl)}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg border"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Video URL (Google Drive)
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="Paste Google Drive share link for video"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  required
                />
                {videoUrl && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">Preview:</p>
                    <video
                      src={convertGoogleDriveVideoUrl(videoUrl)}
                      className="w-full h-64 object-cover rounded-lg border"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={(e) => {
                        console.error("Video preview error");
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Media Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Type
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={mediaType === 'video'}
                    onChange={(e) => setMediaType(e.target.value)}
                    className="mr-2"
                  />
                  <span>Video</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={mediaType === 'image'}
                    onChange={(e) => setMediaType(e.target.value)}
                    className="mr-2"
                  />
                  <span>Image</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                {mediaType === 'video' ? 'Background Video' : 'Background Image'}
              </label>
              <input
                type="file"
                name={mediaType === 'video' ? 'backgroundVideo' : 'backgroundImage'}
                accept={mediaType === 'video' ? 'video/*' : 'image/*'}
                onChange={handleFileChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                required={!editing}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {editing ? "Update" : "Add"} {mediaType === 'video' && !useGoogleDrive ? 'Video' : 'Image'}
        </button>
      </form>

      <div className="space-y-4">
        {videoPages.map((videoPage) => (
          <div
            key={videoPage._id}
            className="p-4 bg-white rounded-lg shadow-sm"
          >
            <h2 className="text-lg font-semibold">{videoPage.type}</h2>
            <p className="text-sm text-gray-500 mb-2">
              Type: {videoPage.mediaType === 'image' ? 'Image' : 'Video'}
            </p>

            {videoPage.mediaType === 'image' && videoPage.backgroundImage ? (
              <img
                src={videoPage.backgroundImage}
                alt={videoPage.type}
                className="w-full h-64 object-cover rounded-lg"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
            ) : videoPage.backgroundVideo ? (
              <video
                className="w-full h-64 rounded-lg object-cover"
                src={videoPage.backgroundVideo}
                muted
                autoPlay
                loop
                playsInline
              />
            ) : (
              <p className="text-gray-400">No media available</p>
            )}

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => handleEdit(videoPage)}
                className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(videoPage._id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
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

export default PackagesVideo;
