import React, { useState, useEffect } from "react";
import axios from "axios";

const OfferHomePage = () => {
  const [offers, setOffers] = useState([]);
  const [formData, setFormData] = useState({
    image: [],
    phoneImage: [],
    status: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [previewImage, setPreviewImage] = useState(""); // For image preview
  const [previewPhoneImage, setPreviewPhoneImage] = useState(""); // For phone image preview

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/home/home-offers"
      );
      setOffers(response.data.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = Array.from(e.target.files);

    if (name === "image") {
      setFormData({ ...formData, image: files });
      // Set the preview image to the first selected file if available
      if (files.length > 0) {
        setPreviewImage(URL.createObjectURL(files[0]));
      }
    } else if (name === "phoneImage") {
      setFormData({ ...formData, phoneImage: files });
      // Set the preview phone image to the first selected file if available
      if (files.length > 0) {
        setPreviewPhoneImage(URL.createObjectURL(files[0]));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("status", formData.status);

    // Append image files
    formData.image.forEach((file) => {
      formDataToSubmit.append("image", file);
    });

    // Append phone image files
    formData.phoneImage.forEach((file) => {
      formDataToSubmit.append("phoneImage", file);
    });

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5001/api/home/home-offers/${editingId}`,
          formDataToSubmit
        ); // Update offer
      } else {
        await axios.post(
          "http://localhost:5001/api/home/add-home-offer",
          formDataToSubmit
        ); // Create offer
      }
      setFormData({ image: [], phoneImage: [], status: false });
      setEditingId(null);
      setPreviewImage(""); // Reset preview image after submission
      setPreviewPhoneImage(""); // Reset phone image preview after submission
      fetchOffers(); // Refresh the list of offers
    } catch (error) {
      console.error("Error saving offer:", error);
    }
  };

  const handleEdit = (offer) => {
    setFormData({
      image: offer.image, // Keep the old image path
      status: offer.status,
      phoneImage: offer.phoneImage, // Keep the old phone image path
    });
    setEditingId(offer._id);

    // Set the preview image to the first image of the selected offer
    if (offer.image.length > 0) {
      setPreviewImage(`http://localhost:5001/upload/${offer.image[0]}`);
    }
    if (offer.phoneImage.length > 0) {
      setPreviewPhoneImage(
        `http://localhost:5001/upload/${offer.phoneImage[0]}`
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/home/home-offers/${id}`);
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Offers</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-6 bg-white p-4 rounded shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="image"
          >
            Images:
          </label>
          {/* Display the preview image if available */}
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-32 object-cover rounded mb-2"
            />
          )}
          <input
            type="file"
            name="image"
            multiple
            onChange={handleFileChange}
            // required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="phoneImage"
          >
            Phone Images:
          </label>
          {/* Display the preview phone image if available */}
          {previewPhoneImage && (
            <img
              src={previewPhoneImage}
              alt="Phone Preview"
              className="w-full h-32 object-cover rounded mb-2"
            />
          )}
          <input
            type="file"
            name="phoneImage"
            multiple
            onChange={handleFileChange}
            // required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={() =>
                setFormData({ ...formData, status: !formData.status })
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Active Status</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
        >
          {editingId ? "Update Offer" : "Add Offer"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4">Current Offers</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {offers.map((offer) => (
          <li key={offer._id} className="bg-white shadow-md rounded p-4">
            <img
              src={`http://localhost:5001/upload/${offer.image[0]}`}
              alt="Offer"
              className="w-full h-32 object-cover rounded"
            />
            <div className="mt-2 flex justify-between items-center">
              <span
                className={`text-sm ${
                  offer.status ? "text-green-600" : "text-red-600"
                }`}
              >
                {offer.status ? "Active" : "Inactive"}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(offer)}
                  className="mr-2 text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offer._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OfferHomePage;
