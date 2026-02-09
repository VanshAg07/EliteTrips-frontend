import React, { useState, useEffect } from "react";
import axios from "axios";

const BestActivities = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    stateName: "",
    time: "",
    title: "",
    description: "",
    img: null,
  });

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = () => {
    setLoading(true);
    axios
      .get("https://elitetrips-backend.onrender.com/api/trip/states")
      .then((response) => {
        const statesList = response.data.map((state) => ({
          name: state.stateName,
          id: state._id,
        }));
        // console.log("States:", statesList);
        setStates(statesList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img" && files.length > 0) {
      setForm((prevState) => ({
        ...prevState,
        img: files[0], // Save the file object in the form state
      }));
    } else {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("stateName", form.stateName);
    formData.append("time", form.time);
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.img) {
      formData.append("img", form.img);
    }

    try {
      const response = await axios.post(
        "https://elitetrips-backend.onrender.com/api/admin/addActivity",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Best activity added successfully!");
      setForm({
        stateName: "",
        time: "",
        title: "",
        description: "",
        img: null,
      });
      setLoading(false)

    } catch (error) {
      console.error(
        "Error adding activity:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to add activity. Please try again.");
      setLoading(false)

    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Add New Best Activity
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="stateName"
            className="block text-lg font-semibold mb-2"
          >
            State Name:
          </label>
          <select
            id="stateName"
            name="stateName"
            value={form.stateName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="time" className="block text-lg font-semibold mb-2">
            Time (e.g., 4 hours approx):
          </label>
          <input
            type="text"
            id="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="Enter time as text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        ></textarea>
        <input
          type="file"
          name="img"
          onChange={handleChange}
          accept="image/*"
          className="w-full p-2 border border-gray-300 rounded-lg"
        />

        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-600 text-white font-bold rounded ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default BestActivities;
