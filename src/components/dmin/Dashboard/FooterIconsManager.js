import React, { useState, useEffect } from "react";
import axios from "axios";

const FooterIconsManager = () => {
  const [icons, setIcons] = useState([]);
  const [newIcon, setNewIcon] = useState({
    name: "",
    url: "",
    iconImage: null,
  });
  const [editingIcon, setEditingIcon] = useState(null);

  useEffect(() => {
    fetchIcons();
  }, []);

  const fetchIcons = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/home/footer-icons"
      );
      setIcons(response.data);
    } catch (error) {
      console.error("Error fetching icons:", error);
    }
  };

  const handleAddIcon = async () => {
    const formData = new FormData();
    formData.append("name", newIcon.name);
    formData.append("url", newIcon.url);
    if (newIcon.iconImage) {
      formData.append("iconImage", newIcon.iconImage);
    }

    try {
      await axios.post(
        "http://localhost:5001/api/home/footer-icons",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setNewIcon({ name: "", url: "", iconImage: null });
      fetchIcons();
    } catch (error) {
      console.error("Error adding icon:", error);
    }
  };

  const handleEditIcon = async (id) => {
    const formData = new FormData();
    formData.append("name", editingIcon.name);
    formData.append("url", editingIcon.url);
    if (editingIcon.iconImage) {
      formData.append("iconImage", editingIcon.iconImage);
    }

    try {
      await axios.put(
        `http://localhost:5001/api/home/footer-icons/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditingIcon(null);
      fetchIcons();
    } catch (error) {
      console.error("Error updating icon:", error);
    }
  };

  const handleDeleteIcon = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/home/footer-icons/${id}`);
      fetchIcons();
    } catch (error) {
      console.error("Error deleting icon:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600">
        Footer Icons Manager
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Icon
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newIcon.name}
            onChange={(e) => setNewIcon({ ...newIcon, name: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="URL"
            value={newIcon.url}
            onChange={(e) => setNewIcon({ ...newIcon, url: e.target.value })}
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            onChange={(e) =>
              setNewIcon({ ...newIcon, iconImage: e.target.files[0] })
            }
            className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleAddIcon}
          className="mt-4 bg-blue-500 text-white font-medium rounded-lg p-2 w-full hover:bg-blue-600 transition-colors duration-300"
        >
          Add Icon
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Footer Icons
        </h2>
        <ul className="space-y-4">
          {icons.length > 0 ? (
            icons.map((icon) => (
              <li
                key={icon._id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                {editingIcon?._id === icon._id ? (
                  <div className="flex gap-4 w-full">
                    <input
                      type="text"
                      value={editingIcon.name}
                      onChange={(e) =>
                        setEditingIcon({ ...editingIcon, name: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                    <input
                      type="text"
                      value={editingIcon.url}
                      onChange={(e) =>
                        setEditingIcon({ ...editingIcon, url: e.target.value })
                      }
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                    <input
                      type="file"
                      onChange={(e) =>
                        setEditingIcon({
                          ...editingIcon,
                          iconImage: e.target.files[0],
                        })
                      }
                      className="border border-gray-300 rounded-lg p-2 w-full"
                    />
                    <button
                      onClick={() => handleEditIcon(icon._id)}
                      className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingIcon(null)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4">
                      <img
                        src={icon.iconImage[0]} // Adjust if the iconImage array contains multiple images
                        alt={icon.name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {icon.name}
                        </h3>
                        <p className="text-sm text-gray-500">{icon.url}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingIcon(icon)}
                        className="bg-yellow-500 text-white p-2 rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteIcon(icon._id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No icons available.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FooterIconsManager;
