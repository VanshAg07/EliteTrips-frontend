import React, { useState, useEffect } from "react";
import axios from "axios";

function EditInternationalActivity() {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [form, setForm] = useState({
    stateName: "",
    time: "",
    title: "",
    description: "",
    img: null,
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = () => {
    setLoading(true);
    axios
      .get("http://localhost:5001/api/admin/international/getActivity")
      .then((response) => {
        setStates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const openEditPopup = (activity) => {
    setSelectedActivity(activity);
    setForm({
      stateName: activity.stateName || "",
      time: activity.time || "",
      title: activity.title || "",
      description: activity.description || "",
      img: null, // Reset file input
    });
    setIsPopupOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prevForm) => ({
      ...prevForm,
      img: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedActivity) {
      alert("No activity selected for editing.");
      return;
    }

    const formData = new FormData();
    formData.append("stateName", form.stateName);
    formData.append("time", form.time);
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.img) {
      formData.append("img", form.img);
    }

    axios
      .put(
        `http://localhost:5001/api/admin/international/editActivity/${selectedActivity._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        alert("Activity updated successfully!");
        setIsPopupOpen(false);
        fetchStates();
      })
      .catch((error) => {
        console.error("Error updating activity:", error);
        alert("Failed to update activity.");
      });
  };

  const handleDelete = (activity) => {
    try {
      axios
        .delete(
          `http://localhost:5001/api/admin/international/deleteActivity/${activity._id}`
        )
        .then((response) => {
          console.log(response.data);
          fetchStates();
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          InterNational Activities
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading activities...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {states.map((activity) => (
              <div
                key={activity._id}
                className="border border-gray-300 rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <h3 className="text-lg font-semibold">{activity.stateName}</h3>
                <p>
                  <strong>Time:</strong> {activity.time}
                </p>
                <p>
                  <strong>Title:</strong> {activity.title}
                </p>
                <p className="truncate">
                  <strong>Description:</strong> {activity.description}
                </p>
                {activity.img && (
                  <img
                    src={`http://localhost:5001/upload/${activity.img}`}
                    alt={activity.stateName}
                    className="mt-2 rounded"
                  />
                )}
                <button
                  onClick={() => openEditPopup(activity)}
                  className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(activity)}
                  className="mt-4 ml-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Edit Activity
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="stateName" className="block text-gray-700 mb-2">
                  State Name:
                </label>
                <input
                  type="text"
                  id="stateName"
                  name="stateName"
                  value={form.stateName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-gray-700 mb-2">
                  Time:
                </label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  value={form.time}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-gray-700 mb-2">
                  Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div>
                <label htmlFor="img" className="block text-gray-700 mb-2">
                  Image:
                </label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  onChange={handleImageChange}
                  className="w-full text-gray-700"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsPopupOpen(false)}
                  className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditInternationalActivity;
