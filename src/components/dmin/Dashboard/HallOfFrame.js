import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// helper function to convert Google Drive URL to displayable format
const convertGoogleDriveUrl = (url) => {
  if (!url) return url;

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

function HallOfFrame() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [editingImage, setEditingImage] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [error, setError] = useState(null);
  const [useGoogleDrive, setUseGoogleDrive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [editUseGoogleDrive, setEditUseGoogleDrive] = useState(false);
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editPreviewUrl, setEditPreviewUrl] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  // Update preview when Google Drive URL changes
  useEffect(() => {
    if (imageUrl && useGoogleDrive) {
      const converted = convertGoogleDriveUrl(imageUrl);
      setPreviewUrl(converted);
    } else {
      setPreviewUrl("");
    }
  }, [imageUrl, useGoogleDrive]);

  // Update edit preview when edit Google Drive URL changes
  useEffect(() => {
    if (editImageUrl && editUseGoogleDrive) {
      const converted = convertGoogleDriveUrl(editImageUrl);
      setEditPreviewUrl(converted);
    } else {
      setEditPreviewUrl("");
    }
  }, [editImageUrl, editUseGoogleDrive]);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/corporate/hall-of-frame"
      );
      const data = response.data?.data;
      setImages(data || []);
      setError(null);
    } catch (error) {
      setError("Error fetching images. Please try again.");
      console.error(error);
    }
  };

  const addImage = async () => {
    if (useGoogleDrive) {
      if (!imageUrl) return setError("Google Drive URL is required.");
    } else {
      if (!newImage) return setError("Image file is required.");
    }

    try {
      const formData = new FormData();

      if (useGoogleDrive && imageUrl) {
        formData.append("imageUrl", imageUrl);
      } else {
        formData.append("image", newImage);
      }

      await axios.post(
        "https://elitetrips-backend.onrender.com/api/corporate/hall-of-frame",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setNewImage(null);
      setImageUrl("");
      setPreviewUrl("");
      setUseGoogleDrive(false);
      toast.success("Image added successfully!");
      fetchImages();
    } catch (error) {
      setError("Error adding image. Please try again.");
      toast.error("Error adding image");
      console.error(error);
    }
  };

  const updateImage = async (id) => {
    if (editUseGoogleDrive) {
      if (!editImageUrl) return setError("Google Drive URL is required.");
    } else {
      if (!updatedImage) return setError("Updated image file is required.");
    }

    try {
      const formData = new FormData();

      if (editUseGoogleDrive && editImageUrl) {
        formData.append("imageUrl", editImageUrl);
      } else {
        formData.append("image", updatedImage);
      }

      await axios.put(
        `https://elitetrips-backend.onrender.com/api/corporate/hall-of-frame/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setEditingImage(null);
      setUpdatedImage(null);
      setEditImageUrl("");
      setEditPreviewUrl("");
      setEditUseGoogleDrive(false);
      toast.success("Image updated successfully!");
      fetchImages();
    } catch (error) {
      setError("Error updating image. Please try again.");
      toast.error("Error updating image");
      console.error(error);
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(
        `https://elitetrips-backend.onrender.com/api/corporate/hall-of-frame/${id}`
      );
      toast.success("Image deleted successfully!");
      fetchImages();
    } catch (error) {
      setError("Error deleting image. Please try again.");
      toast.error("Error deleting image");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">Hall of Frame</h2>

      {error && (
        <div className="bg-red-200 text-red-800 p-2 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      {/* Google Drive Toggle */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useGoogleDrive}
            onChange={(e) => {
              setUseGoogleDrive(e.target.checked);
              if (!e.target.checked) {
                setImageUrl("");
                setPreviewUrl("");
              }
            }}
            className="w-4 h-4"
          />
          <span className="text-sm font-medium">Use Google Drive URL</span>
        </label>
      </div>

      <div className="flex flex-col mb-6">
        {useGoogleDrive ? (
          <div className="space-y-2">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paste Google Drive share link here"
              value={imageUrl}
              onChange={(e) => {
                setError(null);
                setImageUrl(e.target.value);
              }}
            />
            <p className="text-xs text-gray-500">
              Example: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
            </p>
            {previewUrl && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-48 h-32 object-cover rounded-lg border"
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
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setError(null);
              setNewImage(e.target.files[0]);
            }}
          />
        )}
        <button
          onClick={addImage}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images?.map((img) => (
          <div
            key={img._id}
            className="bg-white rounded-lg shadow-md p-4 relative"
          >
            {editingImage === img._id ? (
              <div>
                {/* Edit Google Drive Toggle */}
                <div className="mb-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editUseGoogleDrive}
                      onChange={(e) => {
                        setEditUseGoogleDrive(e.target.checked);
                        if (!e.target.checked) {
                          setEditImageUrl("");
                          setEditPreviewUrl("");
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">Use Google Drive URL</span>
                  </label>
                </div>

                {editUseGoogleDrive ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Paste Google Drive share link here"
                      value={editImageUrl}
                      onChange={(e) => setEditImageUrl(e.target.value)}
                    />
                    {editPreviewUrl && (
                      <img
                        src={editPreviewUrl}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-lg border"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    )}
                  </div>
                ) : (
                  <input
                    type="file"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setUpdatedImage(e.target.files[0])}
                  />
                )}

                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => updateImage(img._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      setEditingImage(null);
                      setEditUseGoogleDrive(false);
                      setEditImageUrl("");
                      setEditPreviewUrl("");
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {img.image[0] && (
                  <img
                    src={img.image[0]}
                    alt="Hall of Frame"
                    className="w-full h-48 object-cover rounded-lg mb-2"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                )}
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => {
                      setEditingImage(img._id);
                      setUpdatedImage(null);
                      setEditUseGoogleDrive(false);
                      setEditImageUrl("");
                      setEditPreviewUrl("");
                    }}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteImage(img._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HallOfFrame;
