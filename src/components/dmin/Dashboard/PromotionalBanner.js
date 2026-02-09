import React, { useState, useEffect } from "react";
import axios from "axios";

function PromotionalBanner() {
  const [banners, setBanners] = useState([]);
  const [currentBannerId, setCurrentBannerId] = useState(null);
  const [newBanner, setNewBanner] = useState({
    title: "",
    description: "",
    image: null,
    link: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchBanners();
  }, []);

  // Fetch all banners
  const fetchBanners = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/home/homepage-banner"
      );
      setBanners(response.data);
    } catch (error) {
      console.error("Error fetching banners:", error);
      setError("Failed to fetch banners");
    }
  };

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBanner({ ...newBanner, [name]: value });
  };

  // Handle image file change
  const handleImageChange = (event) => {
    setNewBanner({ ...newBanner, image: event.target.files[0] });
  };

  // Add or update a banner
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", newBanner.title);
    formData.append("description", newBanner.description);
    formData.append("image", newBanner.image);
    formData.append("link", newBanner.link);

    try {
      if (currentBannerId) {
        // Update existing banner
        await axios.put(
          `https://elitetrips-backend.onrender.com/api/home/homepage-banner/${currentBannerId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSuccessMessage("Banner updated successfully!");
      } else {
        // Add new banner
        await axios.post(
          "https://elitetrips-backend.onrender.com/api/home/homepage-banner",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setSuccessMessage("Banner added successfully!");
      }

      setNewBanner({ title: "", description: "", image: null, link: "" });
      setCurrentBannerId(null);
      fetchBanners();
    } catch (error) {
      console.error("Error adding/updating banner:", error);
      setError("Failed to add/update banner");
    }
  };

  // Edit a banner
  const handleEditBanner = (banner) => {
    setCurrentBannerId(banner._id);
    setNewBanner({
      title: banner.title,
      description: banner.description,
      image: null,
      link: banner.link,
    });
    setError("");
    setSuccessMessage("");
  };

  // Delete a banner
  const handleDeleteBanner = async (id) => {
    try {
      await axios.delete(
        `https://elitetrips-backend.onrender.com/api/home/homepage-banner/${id}`
      );
      fetchBanners();
      setSuccessMessage("Banner deleted successfully!");
    } catch (error) {
      console.error("Error deleting banner:", error);
      setError("Failed to delete banner");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Promotional Banners
      </h2>

      {/* Form to add or update a banner */}
      <form onSubmit={handleFormSubmit} className="mb-6">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Banner Title"
            value={newBanner.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Banner Description"
            value={newBanner.description}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="link"
            placeholder="Banner Link"
            value={newBanner.link}
            onChange={handleInputChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className={`bg-${
            currentBannerId ? "yellow" : "blue"
          }-500 text-white px-4 py-2 rounded hover:bg-${
            currentBannerId ? "yellow" : "blue"
          }-600`}
        >
          {currentBannerId ? "Update Banner" : "Add Banner"}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mt-2">{successMessage}</p>
        )}
      </form>

      {/* Display list of banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {banners.map((banner) => (
          <div key={banner._id} className="border border-gray-300 p-4 rounded">
            <img
              src={`${banner.image}`}
              alt={banner.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="font-bold text-lg">{banner.title}</h3>
            <p className="text-gray-600">{banner.description}</p>
            <a
              href={banner.link}
              className="text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit Link
            </a>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => handleEditBanner(banner)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteBanner(banner._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
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

export default PromotionalBanner;
