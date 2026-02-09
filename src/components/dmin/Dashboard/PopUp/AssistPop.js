import React, { useState, useEffect } from "react";
import axios from "axios";

function AssistPop() {
  const [signInData, setSignInData] = useState({
    title: "",
    image: null,
    status: "Active", // Default status (stored as string for the UI)
  });
  const [signInList, setSignInList] = useState([]);
  const [selectedSignIn, setSelectedSignIn] = useState(null);

  useEffect(() => {
    fetchSignIns();
  }, []);

  const fetchSignIns = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/popup/assist"
      );
      setSignInList(response.data);
    } catch (error) {
      console.error("Error fetching sign-ins:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setSignInData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  const createSignIn = async () => {
    const formData = new FormData();
    formData.append("title", signInData.title);
    // Convert "Active"/"Inactive" to Boolean
    formData.append("status", signInData.status === "Active");
    if (signInData.image) formData.append("image", signInData.image);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/popup/assist",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSignInList((prevList) => [...prevList, response.data]);
      setSignInData({ title: "", image: null, status: "Active" });
    } catch (error) {
      console.error("Error creating sign-in:", error);
    }
  };

  const updateSignIn = async () => {
    const formData = new FormData();
    formData.append("title", signInData.title);
    // Convert "Active"/"Inactive" to Boolean
    formData.append("status", signInData.status === "Active");
    if (signInData.image) formData.append("image", signInData.image);

    try {
      const response = await axios.put(
        `http://localhost:5001/api/popup/assist/${selectedSignIn._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSignInList((prevList) =>
        prevList.map((item) =>
          item._id === response.data._id ? response.data : item
        )
      );
      setSelectedSignIn(null);
      setSignInData({ title: "", image: null, status: "Active" });
    } catch (error) {
      console.error("Error updating sign-in:", error);
    }
  };

  const deleteSignIn = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/popup/assist/${id}`);
      setSignInList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting sign-in:", error);
    }
  };

  const loadSignIn = (signIn) => {
    setSelectedSignIn(signIn);
    setSignInData({
      title: signIn.title,
      status: signIn.status ? "Active" : "Inactive", // Convert Boolean to string for UI
      image: null,
    });
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Assist Pop Up
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          selectedSignIn ? updateSignIn() : createSignIn();
        }}
        className="space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={signInData.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="status"
          value={signInData.status}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {selectedSignIn ? "Update" : "Create"} Sign In
          </button>
          {selectedSignIn && (
            <button
              type="button"
              onClick={() => setSelectedSignIn(null)}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold text-gray-800 mt-6">Existing Pop</h3>
      <ul className="space-y-4 mt-4">
        {signInList.map((signIn) => (
          <li
            key={signIn._id}
            className="border p-4 rounded-lg shadow-sm bg-gray-50"
          >
            <h4 className="font-medium text-lg">{signIn.title}</h4>
            <p className="text-gray-600">
              Status: {signIn.status ? "Active" : "Inactive"}
            </p>
            {signIn.image[0] && (
              <img
                src={`http://localhost:5001/upload/${signIn.image[0]}`}
                alt={signIn.title}
                className="mt-2 rounded-lg w-32 h-32 object-cover"
              />
            )}
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={() => loadSignIn(signIn)}
                className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteSignIn(signIn._id)}
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssistPop;
