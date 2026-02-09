import React, { useState, useEffect } from "react";
import axios from "axios";

// Helper function to convert Google Drive URL to lh3 format for preview
const convertGoogleDriveUrl = (url) => {
  if (!url) return '';
  
  // Already in lh3 format
  if (url.includes('lh3.googleusercontent.com')) {
    return url;
  }
  
  // Extract file ID from various Google Drive URL formats
  let fileId = null;
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileMatch = url.match(/\/file\/d\/([^\/]+)/);
  if (fileMatch) {
    fileId = fileMatch[1];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([^&]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }
  
  // Format: https://drive.google.com/uc?id=FILE_ID
  const ucMatch = url.match(/uc\?.*id=([^&]+)/);
  if (ucMatch) {
    fileId = ucMatch[1];
  }
  
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  return url;
};

function AuthImage() {
  const [signInData, setSignInData] = useState({
    phoneImage: null,
    image: null,
  });
  const [signInList, setSignInList] = useState([]);
  const [selectedSignIn, setSelectedSignIn] = useState(null);
  
  // New state for Google Drive URL mode
  const [useGoogleDrive, setUseGoogleDrive] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [phoneImageUrl, setPhoneImageUrl] = useState('');

  useEffect(() => {
    fetchSignIns();
  }, []);

  const fetchSignIns = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/popup/auth-image"
      );
      setSignInList(response.data);
    } catch (error) {
      console.error("Error fetching sign-ins:", error);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSignInData((prevData) => ({
      ...prevData,
      [name]: files[0],  // Update only the relevant field (either phoneImage or image)
    }));
  };
  
  const createSignIn = async () => {
    try {
      let response;
      
      if (useGoogleDrive) {
        // Send URLs directly as JSON
        response = await axios.post(
          "https://elitetrips-backend.onrender.com/api/popup/auth-image",
          {
            imageUrl: imageUrl || undefined,
            phoneImageUrl: phoneImageUrl || undefined,
          }
        );
      } else {
        // Send files as FormData
        const formData = new FormData();
        if (signInData.image) formData.append("image", signInData.image);
        if (signInData.phoneImage)
          formData.append("phoneImage", signInData.phoneImage);

        response = await axios.post(
          "https://elitetrips-backend.onrender.com/api/popup/auth-image",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      
      setSignInList((prevList) => [...prevList, response.data]);
      setSignInData({ phoneImage: null, image: null });
      setImageUrl('');
      setPhoneImageUrl('');
    } catch (error) {
      console.error("Error creating sign-in:", error);
    }
  };

  const updateSignIn = async () => {
    try {
      let response;
      
      if (useGoogleDrive) {
        // Send URLs directly as JSON
        response = await axios.put(
          `https://elitetrips-backend.onrender.com/api/popup/auth-image/${selectedSignIn._id}`,
          {
            imageUrl: imageUrl || undefined,
            phoneImageUrl: phoneImageUrl || undefined,
          }
        );
      } else {
        // Send files as FormData
        const formData = new FormData();
        if (signInData.image) formData.append("image", signInData.image);
        if (signInData.phoneImage)
          formData.append("phoneImage", signInData.phoneImage);

        response = await axios.put(
          `https://elitetrips-backend.onrender.com/api/popup/auth-image/${selectedSignIn._id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      
      setSignInList((prevList) =>
        prevList.map((item) =>
          item._id === response.data._id ? response.data : item
        )
      );
      setSelectedSignIn(null);
      setSignInData({ phoneImage: null, image: null });
      setImageUrl('');
      setPhoneImageUrl('');
    } catch (error) {
      console.error("Error updating sign-in:", error);
    }
  };

  const deleteSignIn = async (id) => {
    try {
      await axios.delete(`https://elitetrips-backend.onrender.com/api/popup/auth-image/${id}`);
      setSignInList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting sign-in:", error);
    }
  };

  const loadSignIn = (signIn) => {
    setSelectedSignIn(signIn);
    setSignInData({
      phoneImage: null,
      image: null,
    });
    setImageUrl('');
    setPhoneImageUrl('');
  };

  // Helper to get displayable image URL
  const getImageUrl = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) {
      return convertGoogleDriveUrl(img);
    }
    return `https://elitetrips-backend.onrender.com/upload/${img}`;
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Sign In Management
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          selectedSignIn ? updateSignIn() : createSignIn();
        }}
        className="space-y-4"
      >
        {/* Toggle for upload mode */}
        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={useGoogleDrive}
              onChange={(e) => setUseGoogleDrive(e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">Use Google Drive URL</span>
          </label>
        </div>

        {useGoogleDrive ? (
          <>
            {/* Desktop Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Desktop Image URL (Google Drive)
              </label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Paste Google Drive share link"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imageUrl && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Preview:</p>
                  <img
                    src={convertGoogleDriveUrl(imageUrl)}
                    alt="Desktop Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Phone Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Image URL (Google Drive)
              </label>
              <input
                type="text"
                value={phoneImageUrl}
                onChange={(e) => setPhoneImageUrl(e.target.value)}
                placeholder="Paste Google Drive share link"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {phoneImageUrl && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Preview:</p>
                  <img
                    src={convertGoogleDriveUrl(phoneImageUrl)}
                    alt="Phone Preview"
                    className="w-32 h-32 object-cover rounded-lg border"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Desktop Image (File Upload)
              </label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Image (File Upload)
              </label>
              <input
                type="file"
                name="phoneImage"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
          </>
        )}
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

      <h3 className="text-xl font-semibold text-gray-800 mt-6">
        Existing Sign Ins
      </h3>
      <ul className="space-y-4 mt-4">
        {signInList.map((signIn) => (
          <li
            key={signIn._id}
            className="border p-4 rounded-lg shadow-sm bg-gray-50"
          >
            <div className="flex space-x-4">
              {signIn.image && signIn.image[0] && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Desktop Image:</p>
                  <img
                    src={getImageUrl(signIn.image[0])}
                    alt="Desktop"
                    className="rounded-lg w-32 h-32 object-cover"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </div>
              )}
              {signIn.phoneImage && signIn.phoneImage[0] && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Phone Image:</p>
                  <img
                    src={getImageUrl(signIn.phoneImage[0])}
                    alt="Phone"
                    className="rounded-lg w-32 h-32 object-cover"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                  />
                </div>
              )}
            </div>
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

export default AuthImage;
