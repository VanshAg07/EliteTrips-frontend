import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GroupDetailsEdit = () => {
  const [groupDetails, setGroupDetails] = useState([]);
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    description: [""],
    duration: "",
    numberOfPax: "",
    image: [""],
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  const fetchGroupDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/group-tours/group-details"
      );
      setGroupDetails(response.data.data);
    } catch (error) {
      console.error("Error fetching group details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear error message on change
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...formData.description];
    updatedDescriptions[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      description: updatedDescriptions,
    }));
    setError(""); // Clear error message on change
  };

  const handleImageChange = (e) => {
    const filename = e.target.value.split("/").pop(); // Get only the filename
    setFormData((prevData) => ({
      ...prevData,
      image: [filename], // Set only the filename in the state
    }));
    setError(""); // Clear error message on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5001/api/group-tours/group-details/${editingId}`,
          formData
        );
        toast.success("Group detail updated successfully!"); // Success toast
      } else {
        await axios.post(
          "http://localhost:5001/api/group-tours/group-details",
          formData
        );
        toast.success("Group detail added successfully!"); // Success toast
      }
      fetchGroupDetails();
      resetForm();
    } catch (error) {
      setError("Error saving group detail. Please try again.");
      toast.error("Error saving group detail. Please try again."); // Error toast
      console.error("Error saving group detail", error);
    }
  };

  const resetForm = () => {
    setFormData({
      type: "",
      name: "",
      description: [""],
      duration: "",
      numberOfPax: "",
      image: [""],
    });
    setEditingId(null);
  };

  const handleEdit = (groupDetail) => {
    setFormData({
      type: groupDetail.type,
      name: groupDetail.name,
      description: groupDetail.description,
      duration: groupDetail.duration,
      numberOfPax: groupDetail.numberOfPax,
      image: [groupDetail.image[0].split("/").pop()], // Set only the filename for editing
    });
    setEditingId(groupDetail._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5001/api/group-tours/group-details/${id}`
      );
      toast.success("Group detail deleted successfully!"); // Success toast
      fetchGroupDetails(); // Refresh the list after deletion
    } catch (error) {
      toast.error("Error deleting group detail. Please try again."); // Error toast
      console.error("Error deleting group detail", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Group Details</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form className="mb-6 p-4 border rounded shadow" onSubmit={handleSubmit}>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type (School, University, Sports, Adventure)"
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        {formData.description.map((desc, index) => (
          <input
            key={index}
            type="text"
            value={desc}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
            placeholder={`Description ${index + 1}`}
            required
            className="block w-full p-2 mb-4 border rounded"
          />
        ))}
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration"
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          name="numberOfPax"
          value={formData.numberOfPax}
          onChange={handleChange}
          placeholder="Number of Pax"
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          name="image"
          value={formData.image[0]} // Now this will only show the filename
          onChange={handleImageChange} // Change this to the new handler
          placeholder="Image Filename" // Updated placeholder
          required
          className="block w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update" : "Add"} Group Detail
        </button>
      </form>
      <h2 className="text-xl font-semibold mb-2">Existing Group Details</h2>
      <ul className="space-y-4">
        {groupDetails.map((groupDetail) => (
          <li key={groupDetail._id} className="p-4 border rounded shadow">
            <h3 className="text-lg font-bold">{groupDetail.name}</h3>
            <p>Type: {groupDetail.type}</p>
            <p>Duration: {groupDetail.duration}</p>
            <p>Number of Pax: {groupDetail.numberOfPax}</p>
            <img
              src={groupDetail.image[0]}
              alt={groupDetail.name}
              className="h-32 w-32 object-cover rounded mb-2"
            />
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(groupDetail)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(groupDetail._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default GroupDetailsEdit;
