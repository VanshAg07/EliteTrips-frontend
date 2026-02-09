import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper function to convert Google Drive URL to direct image URL
const convertGoogleDriveUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  
  // If already using lh3.googleusercontent.com, return as is
  if (url.includes('lh3.googleusercontent.com')) {
    return url;
  }
  
  let fileId = null;
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  if (!fileId) {
    const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (openMatch) {
      fileId = openMatch[1];
    }
  }
  
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  return url;
};

function HomeGallery() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [existingGalleryId, setExistingGalleryId] = useState(null);
  const [useUrlUpload, setUseUrlUpload] = useState(false);
  const [imageUrls, setImageUrls] = useState([""]);
  const [urlPreviews, setUrlPreviews] = useState([]);
 
  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/gallery/home-galleries"
      );
      setGalleryImages(response.data.images || []);
      if (response.data.images.length > 0) {
        setExistingGalleryId(response.data.images[0]._id);
      }
    } catch (error) {
      console.error("Error fetching gallery images:", error);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
    
    // Update preview
    if (value) {
      const previewUrl = convertGoogleDriveUrl(value);
      const newPreviews = [...urlPreviews];
      newPreviews[index] = previewUrl;
      setUrlPreviews(newPreviews);
    }
  };

  const addUrlField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeUrlField = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    const newPreviews = urlPreviews.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    setUrlPreviews(newPreviews);
  };

  const handleUpload = async () => {
    setUploading(true);
    setError("");

    try {
      if (useUrlUpload) {
        // Upload using Google Drive URLs
        const validUrls = imageUrls.filter(url => url.trim() !== "");
        if (validUrls.length === 0) {
          setError("Please add at least one Google Drive URL.");
          setUploading(false);
          return;
        }

        await axios.post(
          `https://elitetrips-backend.onrender.com/api/gallery/home-gallery`,
          { images: validUrls },
          { headers: { "Content-Type": "application/json" } }
        );
        setImageUrls([""]);
        setUrlPreviews([]);
      } else {
        // Upload using file upload
        if (selectedFiles.length === 0) {
          setError("Please select at least one image to upload.");
          setUploading(false);
          return;
        }

        const formData = new FormData();
        for (let file of selectedFiles) {
          formData.append("images", file);
        }

        await axios.post(
          `https://elitetrips-backend.onrender.com/api/gallery/home-gallery`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setSelectedFiles([]);
      }
      
      fetchGalleryImages();
    } catch (error) {
      console.error("Error uploading images:", error);
      setError("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (galleryId, imageIndex) => {
    try {
      // Send request to delete a specific image by its index
      await axios.delete(
        `https://elitetrips-backend.onrender.com/api/gallery/home-gallery/${galleryId}/image/${imageIndex}`
      );
      fetchGalleryImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleDeleteGallery = async (galleryId) => {
    try {
      // Send request to delete the entire gallery
      await axios.delete(
        `https://elitetrips-backend.onrender.com/api/gallery/home-gallery/${galleryId}`
      );
      fetchGalleryImages();
    } catch (error) {
      console.error("Error deleting gallery:", error);
    }
  };

  const handleUpdateImage = async (galleryId, newFile, imageIndex) => {
    const formData = new FormData();
    formData.append("image", newFile);
    try {
      await axios.put(
        `https://elitetrips-backend.onrender.com/api/gallery/home-gallery/${galleryId}/image/${imageIndex}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      fetchGalleryImages();
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Home Gallery</h2>
      
      {/* Toggle between file upload and URL upload */}
      <div className="mb-6 flex justify-center">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={useUrlUpload}
            onChange={(e) => setUseUrlUpload(e.target.checked)}
            className="form-checkbox h-5 w-5 mr-2"
          />
          <span className="text-sm font-medium">Use Google Drive URLs instead of file upload</span>
        </label>
      </div>

      {/* Info Box for Google Drive */}
      {useUrlUpload && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">📌 How to Use Google Drive Images:</h3>
          <ol className="list-decimal ml-5 text-sm text-blue-900 space-y-1">
            <li>Upload your image to Google Drive</li>
            <li>Right-click → "Share" → Set to "Anyone with the link"</li>
            <li>Copy the shareable link</li>
            <li>Paste it below in the URL field</li>
            <li>Format: <code className="bg-blue-100 px-1 rounded">https://drive.google.com/file/d/FILE_ID/view</code></li>
          </ol>
        </div>
      )}

      <div className="mb-6">
        {useUrlUpload ? (
          /* Google Drive URL Input */
          <div className="space-y-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="border p-4 rounded-lg bg-gray-50">
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view"
                    className="flex-1 border rounded p-2"
                  />
                  {imageUrls.length > 1 && (
                    <button
                      onClick={() => removeUrlField(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {urlPreviews[index] && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 mb-1">🔍 Preview:</p>
                    <img
                      src={urlPreviews[index]}
                      alt={`Preview ${index}`}
                      className="w-32 h-32 object-cover rounded border-2 border-blue-300"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                      onLoad={(e) => {
                        e.target.style.display = 'block';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'none';
                      }}
                    />
                    <p className="text-red-500 text-xs mt-1" style={{display: 'none'}}>
                      ⚠️ Cannot load preview. Check if the image is shared publicly.
                    </p>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={addUrlField}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              + Add Another URL
            </button>
          </div>
        ) : (
          /* File Upload */
          <div className="text-center">
            <h3 className="text-red-500 text-center mb-4">Note: In one time only upload the images here as much you can 
              <br/>If uploaded differently it will not work.
            </h3>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
              className="mb-4 block mx-auto border border-gray-300 rounded-md p-2"
            />
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              {selectedFiles.length > 0 &&
                selectedFiles.map((file, index) => (
                  <div key={index} className="relative w-24 h-24">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${index}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        <div className="text-center mt-4">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className={`px-6 py-2 text-white rounded-md ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Gallery Images</h3>
        {galleryImages.length === 0 ? (
          <p className="text-center text-gray-500">
            No images found in the gallery.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((galleryItem) => (
              <div key={galleryItem._id} className="mb-6">
                {galleryItem.images.map((imageUrl, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-lg shadow-lg mb-2"
                  >
                    <img
                      src={imageUrl}
                      alt={`Gallery Image ${index}`}
                      className="w-full h-auto object-cover"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                      }}
                    />
                    <div className="absolute top-0 right-0 flex space-x-2 p-2">
                      <input
                        type="file"
                        onChange={(e) =>
                          handleUpdateImage(
                            galleryItem._id,
                            e.target.files[0],
                            index
                          )
                        }
                        className="hidden"
                        id={`update-${galleryItem._id}-${index}`}
                      />
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => handleDeleteGallery(galleryItem._id)}
                  className="bg-red-500 text-white rounded-md mt-4 p-2 w-full"
                >
                  Delete Gallery
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeGallery;
