import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper function to convert Google Drive URL to lh3 format for preview
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

const AddBackground = () => {
  const [reload, setReload] = useState(0);
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    image: null,
    heading: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // New state for Google Drive URL mode
  const [useGoogleDrive, setUseGoogleDrive] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Fetch all background images
  const fetchBackgroundImages = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/background-images/images"
      );
      setBackgroundImages(response.data);
    } catch (error) {
      console.error("Error fetching background images:", error);
      setErrorMessage("Failed to load images.");
    }
  };

  useEffect(() => {
    fetchBackgroundImages();
  }, [reload]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: e.target.files[0] }); // Capture the file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission for create/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      if (useGoogleDrive && imageUrl) {
        // Send URL directly as JSON
        const jsonData = {
          type: formData.type,
          heading: formData.heading,
          imageUrl: imageUrl,
        };

        if (editingId) {
          await axios.put(
            `https://elitetrips-backend.onrender.com/api/background-images/images/${editingId}`,
            jsonData
          );
          setSuccessMessage("Background image updated successfully!");
        } else {
          await axios.post(
            "https://elitetrips-backend.onrender.com/api/background-images/images",
            jsonData
          );
          setSuccessMessage("Background image created successfully!");
        }
      } else {
        // Send files as FormData
        const formDataToSend = new FormData();
        formDataToSend.append("type", formData.type);
        formDataToSend.append("image", formData.image);
        formDataToSend.append("heading", formData.heading);

        if (editingId) {
          await axios.put(
            `https://elitetrips-backend.onrender.com/api/background-images/images/${editingId}`,
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setSuccessMessage("Background image updated successfully!");
        } else {
          await axios.post(
            "https://elitetrips-backend.onrender.com/api/background-images/images",
            formDataToSend,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          setSuccessMessage("Background image created successfully!");
        }
      }

      setFormData({ type: "", image: null, heading: "" });
      setImageUrl('');
      setEditingId(null);
      await fetchBackgroundImages();
      setReload((prev) => prev + 1);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting form. Please try again.");
    }
  };

  // Handle deleting a background image
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://elitetrips-backend.onrender.com/api/background-images/images/${id}`
      );
      setSuccessMessage("Background image deleted successfully!");
      await fetchBackgroundImages();
      setReload((prev) => prev + 1);
    } catch (error) {
      console.error("Error deleting background image:", error);
      setErrorMessage("Error deleting image. Please try again.");
    }
  };

  // Handle editing a background image
  const handleEdit = (image) => {
    setEditingId(image._id);
    setFormData({
      type: image.type,
      image: image.image[0], // This will need to be handled for updates
      heading: image.heading,
    });
    setImageUrl('');
    setUseGoogleDrive(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">
        Background Image Manager
      </h2>

      {successMessage && (
        <div className="bg-green-200 text-green-800 p-2 rounded mb-4">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-200 text-red-800 p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <select
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="National">National</option>
          <option value="International">International</option>
          <option value="Honeymoon">Honeymoon</option>
          <option value="About Us">About Us</option>
        </select>

        {/* Toggle for upload mode */}
        <div className="flex items-center space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useGoogleDrive}
              onChange={(e) => setUseGoogleDrive(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Use Google Drive URL</span>
          </label>
        </div>

        {useGoogleDrive ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (Google Drive)
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste Google Drive share link"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {imageUrl && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <img
                  src={convertGoogleDriveUrl(imageUrl)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
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
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required={!editingId}
          />
        )}

        <input
          type="text"
          name="heading"
          placeholder="Heading"
          value={formData.heading}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {editingId ? "Update" : "Create"} Background Image
        </button>
      </form>

      <div className="space-y-4">
        {backgroundImages.map((media) => (
          <div key={media._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{media.heading}</h3>
            <p className="text-gray-600">Type: {media.type}</p>
            {media.image[0] && media.image[0].endsWith(".mp4") ? (
              <video controls className="w-[64%] h-64 rounded mt-2">
                <source src={media.image[0]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={media.image[0]}
                alt={media.heading}
                className="w-[64%] h-64 rounded mt-2 object-cover"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
              />
            )}
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEdit(media)}
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(media._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBackground;
