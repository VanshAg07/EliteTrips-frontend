import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrashAlt, FaTimes } from "react-icons/fa";

function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [galleryId, setGalleryId] = useState(""); // For adding images to an existing gallery
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5001/api/home/gallery-page"
      );
      setImages(res.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setIsLoading(false);
  };

  const handleFileSelect = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const removeSelectedFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("images", file));
    setIsLoading(true);

    try {
      await axios.post(
        "http://localhost:5001/api/home/gallery-page",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      fetchImages();
      setSelectedFiles([]);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
    setIsLoading(false);
  };

  const deleteImage = async (id, imagePath) => {
    setIsLoading(true);
    try {
      await axios.delete(
        `http://localhost:5001/api/home/gallery-page/delete-image/${id}/${encodeURIComponent(
          imagePath
        )}`
      );
      fetchImages();
      alert("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
    }
    setIsLoading(false);
  };

  const openModal = (imgPath) => {
    setCurrentImage(imgPath);
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery Page</h1>

      {isLoading && <div className="text-center text-lg mb-4">Loading...</div>}

      {/* Plus Button to Select Files */}
      <div className="flex flex-col items-center mb-8">
        <label className="bg-blue-500 text-white rounded-full p-4 cursor-pointer hover:bg-blue-600 transition duration-150 flex items-center justify-center">
          <FaPlus size={24} />
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
        </label>
        <span className="text-gray-500 mt-2">Add Images</span>
      </div>

      {/* Selected Thumbnails with Upload Button */}
      {selectedFiles.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Selected Images</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 mb-4">
            {Array.from(selectedFiles).map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  className="w-full h-32 object-cover rounded-lg shadow-md"
                />
                <button
                  onClick={() => removeSelectedFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={uploadImages}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-150"
          >
            Upload All
          </button>
        </div>
      )}

      {/* Display All Images */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">All Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((gallery) => (
            <div key={gallery._id}>
              <h3 className="text-lg font-medium mb-2">
                Gallery ID: {gallery._id}
              </h3>
              <div className="grid gap-4">
                {gallery.images.map((imgPath, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={`http://localhost:5001/${imgPath}`}
                      alt="Gallery"
                      className="w-full h-32 object-cover rounded-lg shadow-md cursor-pointer"
                      onClick={() => openModal(imgPath)}
                    />
                    <button
                      onClick={() => deleteImage(gallery._id, imgPath)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded shadow-md hover:bg-red-600 transition duration-150"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg relative">
            <img
              src={`http://localhost:5001/${currentImage}`}
              alt="Current"
              className="max-w-full h-auto rounded-lg"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GalleryPage;
