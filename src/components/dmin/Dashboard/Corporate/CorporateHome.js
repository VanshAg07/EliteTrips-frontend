import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CorporateHome() {
  const [corporates, setCorporates] = useState([]);
  const [form, setForm] = useState({
    headingTitle: "",
    heading: [
      {
        title: "",
        headingDescription: "",
        subHeading: "",
        points: [""],
      },
    ],
    description: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchCorporates();
  }, []);

  const fetchCorporates = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/corporate/create-corporate-landing"
      );
      setCorporates(response.data.data);
    } catch (error) {
      console.error("Error fetching corporates:", error);
      toast.error("Failed to fetch corporates.");
    }
  };

  const handleInputChange = (e, index = null, pointIndex = null) => {
    const { name, value } = e.target;
    if (name === "headingTitle" || name === "description") {
      setForm({ ...form, [name]: value });
    } else if (
      name === "title" ||
      name === "headingDescription" ||
      name === "subHeading"
    ) {
      const updatedHeadings = [...form.heading];
      updatedHeadings[index][name] = value;
      setForm({ ...form, heading: updatedHeadings });
    } else if (pointIndex !== null) {
      const updatedHeadings = [...form.heading];
      updatedHeadings[index].points[pointIndex] = value;
      setForm({ ...form, heading: updatedHeadings });
    }
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setForm({ ...form, [name]: e.target.files });
  };

  const addHeading = () => {
    setForm({
      ...form,
      heading: [
        ...form.heading,
        { title: "", headingDescription: "", subHeading: "", points: [""] },
      ],
    });
  };

  const removeHeading = (index) => {
    const updatedHeadings = form.heading.filter((_, i) => i !== index);
    setForm({ ...form, heading: updatedHeadings });
  };

  const addPoint = (index) => {
    const updatedHeadings = [...form.heading];
    updatedHeadings[index].points.push("");
    setForm({ ...form, heading: updatedHeadings });
  };

  const removePoint = (index, pointIndex) => {
    const updatedHeadings = [...form.heading];
    updatedHeadings[index].points = updatedHeadings[index].points.filter(
      (_, i) => i !== pointIndex
    );
    setForm({ ...form, heading: updatedHeadings });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("headingTitle", form.headingTitle);
    formData.append("description", form.description);
    formData.append("heading", JSON.stringify(form.heading));
    if (form.image) {
      Array.from(form.image).forEach((file) => formData.append("image", file));
    }

    try {
      if (editingId) {
        await axios.put(
          `https://elitetrips-backend.onrender.com/api/corporate/update-corporate-landing/${editingId}`,
          formData
        );
        toast.success("Corporate updated successfully!");
      } else {
        await axios.post(
          "https://elitetrips-backend.onrender.com/api/corporate/create-corporate-landing",
          formData
        );
        toast.success("Corporate added successfully!");
      }
      fetchCorporates();
      resetForm();
    } catch (error) {
      console.error("Error saving corporate:", error);
      toast.error("Failed to save corporate.");
    }
  };

  const handleEdit = (corporate) => {
    setEditingId(corporate._id);
    setForm({
      headingTitle: corporate.headingTitle,
      heading: corporate.heading,
      description: corporate.description,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://elitetrips-backend.onrender.com/api/corporate/delete-corporate-landing/${id}`
      );
      toast.success("Corporate deleted successfully!");
      fetchCorporates();
    } catch (error) {
      console.error("Error deleting corporate:", error);
      toast.error("Failed to delete corporate.");
    }
  };

  const resetForm = () => {
    setForm({
      headingTitle: "",
      heading: [
        {
          title: "",
          headingDescription: "",
          subHeading: "",
          points: [""],
        },
      ],
      description: "",
      image: null,
    });
    setEditingId(null);
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Corporate Management</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="headingTitle"
          placeholder="Heading Title"
          value={form.headingTitle}
          onChange={(e) => handleInputChange(e)}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={(e) => handleInputChange(e)}
          className="border p-2 rounded w-full mt-2"
          required
        />
        {form.heading.map((heading, index) => (
          <div key={index} className="mt-4 border p-4 rounded">
            <input
              type="text"
              name="title"
              placeholder="Heading Title"
              value={heading.title}
              onChange={(e) => handleInputChange(e, index)}
              className="border p-2 rounded w-full"
              required
            />
            <textarea
              name="headingDescription"
              placeholder="Heading Description"
              value={heading.headingDescription}
              onChange={(e) => handleInputChange(e, index)}
              className="border p-2 rounded w-full mt-2"
              required
            />
            <input
              type="text"
              name="subHeading"
              placeholder="Sub Heading"
              value={heading.subHeading}
              onChange={(e) => handleInputChange(e, index)}
              className="border p-2 rounded w-full mt-2"
              required
            />
            <div className="mt-2">
              {heading.points.map((point, pointIndex) => (
                <div key={pointIndex} className="flex mt-2">
                  <input
                    type="text"
                    placeholder="Point"
                    value={point}
                    onChange={(e) => handleInputChange(e, index, pointIndex)}
                    className="border p-2 rounded w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removePoint(index, pointIndex)}
                    className="ml-2 bg-red-500 text-white px-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addPoint(index)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Point
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeHeading(index)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Remove Heading
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addHeading}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Heading
        </button>
        <div className="mt-4">
          <label>Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border p-2 rounded w-full mt-2"
            multiple
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            {editingId ? "Update" : "Add"} Corporate
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {corporates.length > 0 ? (
          corporates.map((corporate) => (
            <div
              key={corporate._id}
              className="border rounded p-4 flex flex-col"
            >
              <div className="mb-4">
                {corporate.image && corporate.image.length > 0 ? (
                  <img
                    src={corporate.image}
                    alt="Corporate"
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>
              <h3 className="font-bold">{corporate.headingTitle}</h3>
              <p>{corporate.description}</p>
              <button
                onClick={() => handleEdit(corporate)}
                className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(corporate._id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No corporates found.</p>
        )}
      </div>
    </div>
  );
}

export default CorporateHome;
