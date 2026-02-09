import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const YoutubeDetails = () => {
  const [videos, setVideos] = useState([]);
  const [formData, setFormData] = useState({ videoLink: "", title: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all videos on component load
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/home/youtube");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.videoLink || !formData.title) {
      alert("Both fields are required.");
      return;
    }
    try {
      if (editingId) {
        await axios.put(`http://localhost:5001/api/home/youtube/${editingId}`, formData);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:5001/api/home/youtube", formData);
      }
      setFormData({ videoLink: "", title: "" });
      fetchVideos();
    } catch (error) {
      console.error("Error saving video", error);
    }
  };

  const handleEdit = (video) => {
    setEditingId(video._id);
    setFormData({ videoLink: video.videoLink, title: video.title });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await axios.delete(`http://localhost:5001/api/home/youtube/${id}`);
      fetchVideos();
    } catch (error) {
      console.error("Error deleting video", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        YouTube Video Manager
      </h1>

      {/* Video Form */}
      <form
        className="bg-white p-4 rounded-lg shadow-lg mb-6"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="videoLink"
          placeholder="Video Link"
          value={formData.videoLink}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="title"
          placeholder="Video Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full mb-3 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            {editingId ? "Update Video" : "Add Video"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ videoLink: "", title: "" });
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Video List */}
      <div className="space-y-4">
        {videos.map((video) => (
          <div
            key={video._id}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <a
                href={video.videoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-blue-500 hover:underline"
              >
                {video.title}
              </a>
            </div>
            <div className="flex space-x-2">
              <FaEdit
                onClick={() => handleEdit(video)}
                className="text-green-500 cursor-pointer hover:text-green-600 transition"
              />
              <FaTrashAlt
                onClick={() => handleDelete(video._id)}
                className="text-red-500 cursor-pointer hover:text-red-600 transition"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeDetails;
