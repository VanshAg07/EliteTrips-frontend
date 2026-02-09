import React, { useEffect, useState } from "react";
import axios from "axios";

// Helper function to convert Google Drive URL for preview
const convertGoogleDriveUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  
  // Already in lh3 format
  if (url.includes('lh3.googleusercontent.com') || url.includes('googleusercontent.com')) {
    return url;
  }
  
  let fileId = null;
  
  // Format: https://drive.google.com/file/d/FILE_ID/view
  const fileIdMatch = url.match(/\/d\/([^/]+)/);
  if (fileIdMatch) {
    fileId = fileIdMatch[1].split('?')[0];
  }
  
  // Format: https://drive.google.com/open?id=FILE_ID or uc?id=
  if (!fileId) {
    const ucMatch = url.match(/[?&]id=([^&]+)/);
    if (ucMatch) fileId = ucMatch[1];
  }
  
  if (fileId) {
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  
  return url;
};

const States = () => {
  const [refresh, setRefresh] = useState(0);
  const [internationalStates, setInternationalStates] = useState([]);
  const [nationalStates, setNationalStates] = useState([]);
  const [honeymoonStates, setHoneymoonStates] = useState([]);
  const [offerStates, setOfferStates] = useState([]);
  
  // New state forms with URL support
  const [newInternationalState, setNewInternationalState] = useState({
    name: "",
    imageUrl: "",
    image: null,
    useFileUpload: false,
  });
  const [newNationalState, setNewNationalState] = useState({
    name: "",
    imageUrl: "",
    image: null,
    useFileUpload: false,
  });
  const [newHoneymoonState, setNewHoneymoonState] = useState({
    name: "",
    imageUrl: "",
    image: null,
    useFileUpload: false,
  });
  const [newOffer, setNewOffer] = useState({
    name: "",
    imageUrl: "",
    image: null,
    useFileUpload: false,
  });

  // Fetch states for each category
  const fetchStates = async () => {
    try {
      const [
        internationalRes,
        nationalRes,
        honeymoonRes,
        offerRes,
      ] = await Promise.all([
        axios.get("https://elitetrips-backend.onrender.com/api/admin/states"),
        axios.get("https://elitetrips-backend.onrender.com/api/trip/states"),
        axios.get("https://elitetrips-backend.onrender.com/api/honeymoon/states"),
        axios.get("https://elitetrips-backend.onrender.com/api/offer/states"),
      ]);
      setInternationalStates(internationalRes.data);
      setNationalStates(nationalRes.data);
      setHoneymoonStates(honeymoonRes.data);
      setOfferStates(offerRes.data);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, [refresh]);
  const addInternationalState = async () => {
    if (!newInternationalState.name) {
      alert("Please enter a state name");
      return;
    }
    if (!newInternationalState.useFileUpload && !newInternationalState.imageUrl) {
      alert("Please provide a Google Drive image URL");
      return;
    }
    if (newInternationalState.useFileUpload && !newInternationalState.image) {
      alert("Please upload an image file");
      return;
    }
    
    const formData = new FormData();
    formData.append("stateName", newInternationalState.name);
    
    if (!newInternationalState.useFileUpload && newInternationalState.imageUrl) {
      formData.append("stateImageUrl", newInternationalState.imageUrl);
    } else if (newInternationalState.image) {
      formData.append("stateImage", newInternationalState.image);
    }
    
    try {
      const response = await axios.post(
        `https://elitetrips-backend.onrender.com/api/admin/international-state`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setNewInternationalState({ name: "", imageUrl: "", image: null, useFileUpload: false });
        fetchStates();
        setRefresh((prev) => prev + 1);
      }
    } catch (error) {
      console.error(`Error adding international state`, error);
    }
  };

  const addOfferState = async () => {
    if (!newOffer.name) {
      alert("Please enter a state name");
      return;
    }
    if (!newOffer.useFileUpload && !newOffer.imageUrl) {
      alert("Please provide a Google Drive image URL");
      return;
    }
    if (newOffer.useFileUpload && !newOffer.image) {
      alert("Please upload an image file");
      return;
    }
    
    const formData = new FormData();
    formData.append("stateName", newOffer.name);
    
    if (!newOffer.useFileUpload && newOffer.imageUrl) {
      formData.append("stateImageUrl", newOffer.imageUrl);
    } else if (newOffer.image) {
      formData.append("stateImage", newOffer.image);
    }
    
    try {
      const response = await axios.post(
        `https://elitetrips-backend.onrender.com/api/offer/states`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setNewOffer({ name: "", imageUrl: "", image: null, useFileUpload: false });
        fetchStates();
        setRefresh((prev) => prev + 1);
      }
    } catch (error) {
      console.error(`Error adding offer state`, error);
    }
  };

  const addNationalState = async () => {
    if (!newNationalState.name) {
      alert("Please enter a state name");
      return;
    }
    if (!newNationalState.useFileUpload && !newNationalState.imageUrl) {
      alert("Please provide a Google Drive image URL");
      return;
    }
    if (newNationalState.useFileUpload && !newNationalState.image) {
      alert("Please upload an image file");
      return;
    }
    
    const formData = new FormData();
    formData.append("stateName", newNationalState.name);
    
    if (!newNationalState.useFileUpload && newNationalState.imageUrl) {
      formData.append("stateImageUrl", newNationalState.imageUrl);
    } else if (newNationalState.image) {
      formData.append("stateImage", newNationalState.image);
    }
    
    try {
      const response = await axios.post(
        `https://elitetrips-backend.onrender.com/api/trip/state`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setNewNationalState({ name: "", imageUrl: "", image: null, useFileUpload: false });
        fetchStates();
        setRefresh((prev) => prev + 1);
      }
    } catch (error) {
      console.error(`Error adding national state`, error);
    }
  };
  
  const addHoneymoonState = async () => {
    if (!newHoneymoonState.name) {
      alert("Please enter a state name");
      return;
    }
    if (!newHoneymoonState.useFileUpload && !newHoneymoonState.imageUrl) {
      alert("Please provide a Google Drive image URL");
      return;
    }
    if (newHoneymoonState.useFileUpload && !newHoneymoonState.image) {
      alert("Please upload an image file");
      return;
    }
    
    const formData = new FormData();
    formData.append("stateName", newHoneymoonState.name);
    
    if (!newHoneymoonState.useFileUpload && newHoneymoonState.imageUrl) {
      formData.append("stateImageUrl", newHoneymoonState.imageUrl);
    } else if (newHoneymoonState.image) {
      formData.append("stateImage", newHoneymoonState.image);
    }
    
    try {
      const response = await axios.post(
        `https://elitetrips-backend.onrender.com/api/honeymoon/states`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        setNewHoneymoonState({ name: "", imageUrl: "", image: null, useFileUpload: false });
        fetchStates();
        setRefresh((prev) => prev + 1);
      }
    } catch (error) {
      console.error(`Error adding honeymoon state`, error);
    }
  };

  // Delete state functions for each category
  const deleteOfferState = async (_id) => {
    try {
      await axios.delete(`https://elitetrips-backend.onrender.com/api/offer/states/${_id}`);
      fetchStates();
    } catch (error) {
      console.error(`Error deleting international state`, error);
    }
  };

  const deleteInternationalState = async (_id) => {
    try {
      await axios.delete(`https://elitetrips-backend.onrender.com/api/admin/state/${_id}`);
      fetchStates();
    } catch (error) {
      console.error(`Error deleting international state`, error);
    }
  };

  const deleteNationalState = async (_id) => {
    try {
      await axios.delete(`https://elitetrips-backend.onrender.com/api/trip/state/${_id}`);
      fetchStates();
    } catch (error) {
      console.error(`Error deleting international state`, error);
    }
  };

  const deleteHoneymoonState = async (_id) => {
    try {
      await axios.delete(`https://elitetrips-backend.onrender.com/api/honeymoon/state/${_id}`);
      fetchStates();
    } catch (error) {
      console.error(`Error deleting international state`, error);
    }
  };
  
  // Edit state management
  const [editModal, setEditModal] = useState(false);
  const [editingState, setEditingState] = useState({
    id: "",
    name: "",
    imageUrl: "",
    category: "", // 'national', 'international', 'honeymoon', 'offer'
  });
  
  const openEditModal = (state, category) => {
    const currentImageUrl = state.stateImage && state.stateImage[0] 
      ? (state.stateImage[0].startsWith('http') ? state.stateImage[0] : '')
      : '';
    setEditingState({
      id: state._id,
      name: state.stateName,
      imageUrl: currentImageUrl,
      category: category,
    });
    setEditModal(true);
  };
  
  const closeEditModal = () => {
    setEditModal(false);
    setEditingState({ id: "", name: "", imageUrl: "", category: "" });
  };
  
  const updateState = async () => {
    if (!editingState.name) {
      alert("Please enter a state name");
      return;
    }
    if (!editingState.imageUrl) {
      alert("Please provide a Google Drive image URL");
      return;
    }
    
    const formData = new FormData();
    formData.append("stateName", editingState.name);
    formData.append("stateImageUrl", editingState.imageUrl);
    
    let apiUrl = "";
    switch (editingState.category) {
      case "national":
        apiUrl = `https://elitetrips-backend.onrender.com/api/trip/state/${editingState.id}`;
        break;
      case "international":
        apiUrl = `https://elitetrips-backend.onrender.com/api/admin/state/${editingState.id}`;
        break;
      case "honeymoon":
        apiUrl = `https://elitetrips-backend.onrender.com/api/honeymoon/state/${editingState.id}`;
        break;
      case "offer":
        apiUrl = `https://elitetrips-backend.onrender.com/api/offer/states/${editingState.id}`;
        break;
      default:
        alert("Invalid category");
        return;
    }
    
    try {
      await axios.put(apiUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("State updated successfully!");
      closeEditModal();
      fetchStates();
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Error updating state", error);
      alert("Error updating state");
    }
  };
  
  const handleImageChange = (e, setState) => {
    const file = e.target.files[0];
    if (file) {
      setState((prevState) => ({ ...prevState, image: file }));
    }
  };
  return (
    <div className="p-8 min-h-screen bg-gray-100" key={refresh}>
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-600">
        Manage States
      </h1>
      
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">📌 How to Use Google Drive Images:</h3>
        <ol className="list-decimal ml-5 text-sm text-blue-900 space-y-1">
          <li>Upload your image to Google Drive</li>
          <li>Right-click → "Share" → Set to "Anyone with the link"</li>
          <li>Copy the shareable link</li>
          <li>Paste it in the "Google Drive Image URL" field</li>
          <li>Format: <code className="bg-blue-100 px-1 rounded">https://drive.google.com/file/d/FILE_ID/view</code></li>
        </ol>
      </div>
      
      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit State</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">State Name:</label>
              <input
                type="text"
                value={editingState.name}
                onChange={(e) => setEditingState(prev => ({ ...prev, name: e.target.value }))}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-gray-700">Google Drive Image URL:</label>
              <input
                type="text"
                value={editingState.imageUrl}
                onChange={(e) => setEditingState(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                placeholder="https://drive.google.com/file/d/FILE_ID/view"
              />
            </div>
            
            {editingState.imageUrl && (
              <div className="mb-4 bg-gray-50 p-3 rounded border">
                <p className="text-xs text-gray-600 mb-2 font-semibold">Preview:</p>
                <img 
                  src={convertGoogleDriveUrl(editingState.imageUrl)}
                  alt="Preview" 
                  className="w-full h-40 object-cover rounded"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={updateState}
                className="flex-1 bg-blue-500 text-white font-medium rounded-lg p-3 hover:bg-blue-600 transition-all duration-300"
              >
                Save Changes
              </button>
              <button
                onClick={closeEditModal}
                className="flex-1 bg-gray-300 text-gray-800 font-medium rounded-lg p-3 hover:bg-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* State Category Cards */}

        {/* NATIONAL STATE CARD */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            National
          </h2>
          <input
            type="text"
            placeholder="Add National State"
            value={newNationalState.name}
            onChange={(e) => setNewNationalState(prev => ({ ...prev, name: e.target.value }))}
            className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          
          {/* Toggle between URL and File Upload */}
          <label className="flex items-center space-x-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={newNationalState.useFileUpload}
              onChange={(e) => setNewNationalState(prev => ({ ...prev, useFileUpload: e.target.checked }))}
              className="form-checkbox h-4 w-4"
            />
            <span className="text-sm">Use file upload instead</span>
          </label>
          
          {!newNationalState.useFileUpload ? (
            <>
              <input
                type="text"
                placeholder="Google Drive Image URL"
                value={newNationalState.imageUrl}
                onChange={(e) => setNewNationalState(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              {newNationalState.imageUrl && (
                <div className="mb-3 bg-gray-50 p-2 rounded border">
                  <p className="text-xs text-gray-600 mb-1">Preview:</p>
                  <img 
                    src={convertGoogleDriveUrl(newNationalState.imageUrl)}
                    alt="Preview" 
                    className="w-full h-24 object-cover rounded"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setNewNationalState)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 text-sm"
            />
          )}
          
          <button
            onClick={addNationalState}
            className="bg-blue-500 text-white font-medium rounded-lg p-3 mb-4 w-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Add Place
          </button>
          <h3 className="font-semibold text-gray-700 mb-2">States:</h3>
          <ul className="space-y-2">
            {nationalStates.length > 0 ? (
              nationalStates.map((state) => (
                <li
                  key={state._id}
                  className="flex justify-between items-center bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    {state.stateImage && state.stateImage[0] && (
                      <img 
                        src={state.stateImage[0].startsWith('http') ? state.stateImage[0] : `https://elitetrips-backend.onrender.com/upload/${state.stateImage[0]}`}
                        alt={state.stateName} 
                        className="w-8 h-8 object-cover rounded"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    )}
                    <span className="text-gray-800">{state.stateName}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(state, 'national')}
                      className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNationalState(state._id)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No states available.</p>
            )}
          </ul>
        </div>
        
        {/* INTERNATIONAL STATE CARD */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            International
          </h2>
          <input
            type="text"
            placeholder="Add International State"
            value={newInternationalState.name}
            onChange={(e) => setNewInternationalState(prev => ({ ...prev, name: e.target.value }))}
            className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          
          {/* Toggle between URL and File Upload */}
          <label className="flex items-center space-x-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={newInternationalState.useFileUpload}
              onChange={(e) => setNewInternationalState(prev => ({ ...prev, useFileUpload: e.target.checked }))}
              className="form-checkbox h-4 w-4"
            />
            <span className="text-sm">Use file upload instead</span>
          </label>
          
          {!newInternationalState.useFileUpload ? (
            <>
              <input
                type="text"
                placeholder="Google Drive Image URL"
                value={newInternationalState.imageUrl}
                onChange={(e) => setNewInternationalState(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              {newInternationalState.imageUrl && (
                <div className="mb-3 bg-gray-50 p-2 rounded border">
                  <p className="text-xs text-gray-600 mb-1">Preview:</p>
                  <img 
                    src={convertGoogleDriveUrl(newInternationalState.imageUrl)}
                    alt="Preview" 
                    className="w-full h-24 object-cover rounded"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setNewInternationalState)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 text-sm"
            />
          )}
          
          <button
            onClick={addInternationalState}
            className="bg-blue-500 text-white font-medium rounded-lg p-3 mb-4 w-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Add Place
          </button>
          <h3 className="font-semibold text-gray-700 mb-2">States:</h3>
          <ul className="space-y-2">
            {internationalStates.length > 0 ? (
              internationalStates.map((state) => (
                <li
                  key={state._id}
                  className="flex justify-between items-center bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    {state.stateImage && state.stateImage[0] && (
                      <img 
                        src={state.stateImage[0].startsWith('http') ? state.stateImage[0] : `https://elitetrips-backend.onrender.com/upload/${state.stateImage[0]}`}
                        alt={state.stateName} 
                        className="w-8 h-8 object-cover rounded"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    )}
                    <span className="text-gray-800">{state.stateName}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(state, 'international')}
                      className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteInternationalState(state._id)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No states available.</p>
            )}
          </ul>
        </div>
        
        {/* HONEYMOON STATE CARD */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Honeymoon
          </h2>
          <input
            type="text"
            placeholder="Add Honeymoon Places"
            value={newHoneymoonState.name}
            onChange={(e) => setNewHoneymoonState(prev => ({ ...prev, name: e.target.value }))}
            className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          
          {/* Toggle between URL and File Upload */}
          <label className="flex items-center space-x-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={newHoneymoonState.useFileUpload}
              onChange={(e) => setNewHoneymoonState(prev => ({ ...prev, useFileUpload: e.target.checked }))}
              className="form-checkbox h-4 w-4"
            />
            <span className="text-sm">Use file upload instead</span>
          </label>
          
          {!newHoneymoonState.useFileUpload ? (
            <>
              <input
                type="text"
                placeholder="Google Drive Image URL"
                value={newHoneymoonState.imageUrl}
                onChange={(e) => setNewHoneymoonState(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              {newHoneymoonState.imageUrl && (
                <div className="mb-3 bg-gray-50 p-2 rounded border">
                  <p className="text-xs text-gray-600 mb-1">Preview:</p>
                  <img 
                    src={convertGoogleDriveUrl(newHoneymoonState.imageUrl)}
                    alt="Preview" 
                    className="w-full h-24 object-cover rounded"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setNewHoneymoonState)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 text-sm"
            />
          )}
          
          <button
            onClick={addHoneymoonState}
            className="bg-blue-500 text-white font-medium rounded-lg p-3 mb-4 w-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Add Place
          </button>
          <h3 className="font-semibold text-gray-700 mb-2">States:</h3>
          <ul className="space-y-2">
            {honeymoonStates.length > 0 ? (
              honeymoonStates.map((state) => (
                <li
                  key={state._id}
                  className="flex justify-between items-center bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    {state.stateImage && state.stateImage[0] && (
                      <img 
                        src={state.stateImage[0].startsWith('http') ? state.stateImage[0] : `https://elitetrips-backend.onrender.com/upload/${state.stateImage[0]}`}
                        alt={state.stateName} 
                        className="w-8 h-8 object-cover rounded"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    )}
                    <span className="text-gray-800">{state.stateName}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(state, 'honeymoon')}
                      className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteHoneymoonState(state._id)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No states available.</p>
            )}
          </ul>
        </div>
        
        {/* OFFERS STATE CARD */}
        <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Offers
          </h2>
          <input
            type="text"
            placeholder="Add Offer Place"
            value={newOffer.name}
            onChange={(e) => setNewOffer(prev => ({ ...prev, name: e.target.value }))}
            className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          
          {/* Toggle between URL and File Upload */}
          <label className="flex items-center space-x-2 cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={newOffer.useFileUpload}
              onChange={(e) => setNewOffer(prev => ({ ...prev, useFileUpload: e.target.checked }))}
              className="form-checkbox h-4 w-4"
            />
            <span className="text-sm">Use file upload instead</span>
          </label>
          
          {!newOffer.useFileUpload ? (
            <>
              <input
                type="text"
                placeholder="Google Drive Image URL"
                value={newOffer.imageUrl}
                onChange={(e) => setNewOffer(prev => ({ ...prev, imageUrl: e.target.value }))}
                className="border border-gray-300 rounded-lg p-3 w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              {newOffer.imageUrl && (
                <div className="mb-3 bg-gray-50 p-2 rounded border">
                  <p className="text-xs text-gray-600 mb-1">Preview:</p>
                  <img 
                    src={convertGoogleDriveUrl(newOffer.imageUrl)}
                    alt="Preview" 
                    className="w-full h-24 object-cover rounded"
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <input
              type="file"
              onChange={(e) => handleImageChange(e, setNewOffer)}
              className="border border-gray-300 rounded-lg p-3 w-full mb-4 text-sm"
            />
          )}
          
          <button
            onClick={addOfferState}
            className="bg-blue-500 text-white font-medium rounded-lg p-3 mb-4 w-full hover:bg-blue-600 transition-all duration-300 transform hover:scale-105"
          >
            Add Place
          </button>
          <h3 className="font-semibold text-gray-700 mb-2">States:</h3>
          <ul className="space-y-2">
            {offerStates.length > 0 ? (
              offerStates.map((state) => (
                <li
                  key={state._id}
                  className="flex justify-between items-center bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors duration-200 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    {state.stateImage && state.stateImage[0] && (
                      <img 
                        src={state.stateImage[0].startsWith('http') ? state.stateImage[0] : `https://elitetrips-backend.onrender.com/upload/${state.stateImage[0]}`}
                        alt={state.stateName} 
                        className="w-8 h-8 object-cover rounded"
                        referrerPolicy="no-referrer"
                        crossOrigin="anonymous"
                      />
                    )}
                    <span className="text-gray-800">{state.stateName}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(state, 'offer')}
                      className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteOfferState(state._id)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No states available.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default States;
