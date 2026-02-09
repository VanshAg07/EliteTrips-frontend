import React, { useEffect, useState } from "react";
import axios from "axios";

function PaymentPage() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [newStatus, setNewStatus] = useState("non-active");
  const [editingImage, setEditingImage] = useState(null);
  const [updatedImage, setUpdatedImage] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("non-active");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/corporate/payment-image"
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
    if (!newImage) return setError("Image file is required.");
    try {
      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("status", newStatus);

      await axios.post(
        "http://localhost:5001/api/corporate/payment-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setNewImage(null);
      setNewStatus("non-active");
      fetchImages();
    } catch (error) {
      setError("Error adding image. Please try again.");
      console.error(error);
    }
  };

  const updateImage = async (id) => {
    if (!updatedImage && !updatedStatus)
      return setError("Updated image or status is required.");
    try {
      const formData = new FormData();
      if (updatedImage) formData.append("image", updatedImage);
      formData.append("status", updatedStatus);

      await axios.put(
        `http://localhost:5001/api/corporate/payment-image/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setEditingImage(null);
      setUpdatedImage(null);
      setUpdatedStatus("non-active");
      fetchImages();
    } catch (error) {
      setError("Error updating image. Please try again.");
      console.error(error);
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/corporate/payment-image/${id}`
      );
      fetchImages();
    } catch (error) {
      setError("Error deleting image. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Payment Page Image
      </h2>

      {error && (
        <div className="bg-red-200 text-red-800 p-2 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      <div className="flex items-center mb-6">
        <input
          type="file"
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            setError(null);
            setNewImage(e.target.files[0]);
          }}
        />
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          className="ml-4 px-4 py-2 border rounded-lg"
        >
          <option value="active">Active</option>
          <option value="non-active">Non-active</option>
        </select>
        <button
          onClick={addImage}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
                <input
                  type="file"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setUpdatedImage(e.target.files[0])}
                />
                <select
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg mt-2"
                >
                  <option value="active">Active</option>
                  <option value="non-active">Non-active</option>
                </select>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => updateImage(img._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditingImage(null)}
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
                  />
                )}
                <p className="text-sm text-gray-600">Status: {img.status}</p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => {
                      setEditingImage(img._id);
                      setUpdatedStatus(img.status);
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

export default PaymentPage;
