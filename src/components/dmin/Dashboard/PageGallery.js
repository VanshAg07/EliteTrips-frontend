import React, { useState, useEffect } from "react";
import axios from "axios";

function PageGallery() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [existingGalleryId, setExistingGalleryId] = useState(null);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/gallery/home-galleries"
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

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError("Please select at least one image to upload.");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    for (let file of selectedFiles) {
      formData.append("images", file);
    }

    try {
      await axios.post(
        `http://localhost:5001/api/gallery/home-gallery`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSelectedFiles([]);
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
        `http://localhost:5001/api/gallery/home-gallery/${galleryId}/image/${imageIndex}`
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
        `http://localhost:5001/api/gallery/home-gallery/${galleryId}`
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
        `http://localhost:5001/api/gallery/home-gallery/${galleryId}/image/${imageIndex}`,
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

      <div className="mb-6 text-center">
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
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <div className="mt-8">
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
                    className="relative overflow-hidden rounded-lg shadow-lg"
                  >
                    <img
                      src={imageUrl}
                      alt={`Gallery Image ${index}`}
                      className="w-full h-auto object-cover"
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
                  className="bg-red-500 text-white rounded-md mt-4 p-2"
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

export default PageGallery;
