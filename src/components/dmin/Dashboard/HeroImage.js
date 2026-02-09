import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Helper function to convert Google Drive URL for preview
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
    fileId = fileMatch[1].split('?')[0];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([^&]+)/);
  if (openMatch) {
    fileId = openMatch[1].split('?')[0];
  }
  
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  return url;
};

function HeroImage() {
  const [heroImage, setHeroImage] = useState(null);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchHeroImage();
  }, []);

  // Update preview when URL changes
  useEffect(() => {
    if (newImageUrl) {
      const converted = convertGoogleDriveUrl(newImageUrl);
      setPreviewUrl(converted);
    } else {
      setPreviewUrl("");
    }
  }, [newImageUrl]);

  const fetchHeroImage = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/home/hero-image"
      );
      setHeroImage(response.data);
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error("Error fetching hero image:", error);
      }
    }
  };

  const handleSaveImage = async () => {
    if (!newImageUrl.trim()) {
      toast.error("Please enter an image URL.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/api/home/hero-image",
        { imageUrl: newImageUrl }
      );

      setHeroImage(response.data.data);
      setNewImageUrl("");
      setPreviewUrl("");
      setIsEditing(false);
      toast.success("Hero image saved successfully!");
      fetchHeroImage();
    } catch (error) {
      toast.error("Error saving hero image.");
      console.error("Error saving hero image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    if (!window.confirm("Are you sure you want to delete this hero image?")) {
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete("http://localhost:5001/api/home/hero-image");
      setHeroImage(null);
      toast.success("Hero image deleted successfully!");
    } catch (error) {
      toast.error("Error deleting hero image.");
      console.error("Error deleting hero image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = () => {
    setIsEditing(true);
    setNewImageUrl(heroImage?.imageUrl || "");
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setNewImageUrl("");
    setPreviewUrl("");
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Home Page Hero Image</h1>
      
      {/* Instructions */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="font-bold text-blue-800 mb-2">🖼️ How to Add Hero Image from Google Drive:</h3>
        <div className="text-sm text-gray-700 space-y-2">
          <ol className="list-decimal ml-5 space-y-1">
            <li>Upload your image to Google Drive</li>
            <li>Right-click the image → "Share" → "Anyone with the link"</li>
            <li>Copy the sharing link</li>
            <li>Paste the link below</li>
          </ol>
          <p className="text-xs text-green-600 mt-2">
            ✅ The system will automatically convert the URL for proper display
          </p>
        </div>
      </div>

      {/* Add/Edit Form */}
      {(!heroImage || isEditing) && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {isEditing ? "Edit Hero Image" : "Add Hero Image"}
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Paste Google Drive image URL here..."
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
            />
            
            {/* Live Preview */}
            {previewUrl && (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Image+Failed+to+Load';
                  }}
                />
              </div>
            )}
            
            <div className="flex gap-2">
              <button
                onClick={handleSaveImage}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium disabled:bg-gray-400 transition-colors"
              >
                {isLoading ? "Saving..." : "Save Image"}
              </button>
              {isEditing && (
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
      )}

      {/* Current Image Display */}
      {heroImage && !isEditing && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Current Hero Image</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              {/* Image info */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Original URL:</strong> 
                  <br />
                  <span className="break-all text-xs">{heroImage.imageUrl}</span>
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Display URL:</strong> 
                  <br />
                  <span className="break-all text-xs">{heroImage.image}</span>
                </p>
              </div>
              
              {/* Image Preview */}
              <img
                src={heroImage.image}
                alt="Hero"
                className="w-full h-80 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x400?text=Image+Failed+to+Load';
                }}
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={startEdit}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteImage}
                    disabled={isLoading}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium disabled:bg-gray-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No image state */}
      {!heroImage && !isEditing && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-gray-500 text-center py-8">
            No hero image added yet. Add an image URL above to get started.
          </p>
        </div>
      )}
    </div>
  );
}

export default HeroImage;
