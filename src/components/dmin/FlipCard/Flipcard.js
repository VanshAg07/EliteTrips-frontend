import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Flipcard = () => {
  const [stateName, setStateName] = useState("");
  const [flipPrice, setFlipPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Google Drive URL
  const [flipcardImages, setFlipcardImages] = useState([]); // File upload fallback
  const [useFileUpload, setUseFileUpload] = useState(false); // Toggle between URL and file
  const [selectedCategory, setSelectedCategory] = useState("national");
  const [flipcards, setFlipcards] = useState({
    national: [],
    international: [],
    honeymoon: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editFlipcardId, setEditFlipcardId] = useState(null);
  const [internationalStates, setInternationalStates] = useState([]);
  const [nationalStates, setNationalStates] = useState([]);
  const [honeymoonStates, setHoneymoonStates] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);

  useEffect(() => {
    fetchStateNames();
    fetchFlipcards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch state names from the API
  const fetchStateNames = async () => {
    try {
      const [internationalRes, nationalRes, honeymoonRes] = await Promise.all([
        axios.get("https://elitetrips-backend.onrender.com/api/admin/states"),
        axios.get("https://elitetrips-backend.onrender.com/api/trip/states"),
        axios.get("https://elitetrips-backend.onrender.com/api/honeymoon/states"),
      ]);
      
      console.log("📌 International States:", internationalRes.data);
      console.log("📌 National States:", nationalRes.data);
      console.log("📌 Honeymoon States:", honeymoonRes.data);
      
      setInternationalStates(internationalRes.data);
      setNationalStates(nationalRes.data);
      setHoneymoonStates(honeymoonRes.data);
      filterStatesByCategory(selectedCategory); // Use current selected category
      
      toast.success(`Loaded ${nationalRes.data.length} National, ${internationalRes.data.length} International, ${honeymoonRes.data.length} Honeymoon states`);
    } catch (error) {
      console.error("Error fetching states", error);
      toast.error("Failed to fetch states");
    }
  };

  const fetchFlipcards = async () => {
    try {
      const response = await axios.get(
        "https://elitetrips-backend.onrender.com/api/flip-card/flip"
      );
      const flipcardData = response.data;

      const parsedFlipcards = {
        national: flipcardData.national || [],
        international: flipcardData.international || [],
        honeymoon: flipcardData.honeymoon || [],
      };

      setFlipcards(parsedFlipcards);
    } catch (error) {
      console.error("Error fetching flipcards", error);
      toast.error("Failed to fetch flipcards");
    }
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFlipcardImages([...e.target.files]);
  };

  // Handle form submit for add/update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stateName) {
      toast.error("Please select a state.");
      return;
    }

    // Validate input: either URL or file must be provided
    if (!useFileUpload && !imageUrl) {
      toast.error("Please provide a Google Drive image URL.");
      return;
    }
    if (useFileUpload && flipcardImages.length === 0 && !isEditing) {
      toast.error("Please upload an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("stateName", stateName);
    formData.append("flipPrice", flipPrice);
    formData.append("flipOfferPrice", offerPrice);
    formData.append("category", selectedCategory);

    // Append image URL or file
    if (!useFileUpload && imageUrl) {
      formData.append("flipcardImageUrl", imageUrl);
    } else if (useFileUpload && flipcardImages.length > 0) {
      flipcardImages.forEach((image) => formData.append("flipcardImage", image));
    }

    try {
      if (isEditing && editFlipcardId) {
        await axios.put(
          `https://elitetrips-backend.onrender.com/api/flip-card/flip/${selectedCategory}/${editFlipcardId}`,
          formData
        );
        toast.success("Flipcard updated successfully!");
        setIsEditing(false);
        setEditFlipcardId(null);
      } else {
        await axios.post("https://elitetrips-backend.onrender.com/api/flip-card/flip", formData);
        toast.success("Flipcard added successfully!");
      }
      fetchFlipcards(); // Refresh the list
      clearForm();
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to save flipcard. Please try again.");
    }
  };

  // Clear form
  const clearForm = () => {
    setStateName("");
    setFlipPrice("");
    setOfferPrice("");
    setImageUrl("");
    setFlipcardImages([]);
    setSelectedCategory("national");
    setUseFileUpload(false);
    filterStatesByCategory("national");
  };

  // Filter states by category
  const filterStatesByCategory = (category) => {
    let filteredList = [];
    switch (category) {
      case "national":
        filteredList = nationalStates;
        break;
      case "international":
        filteredList = internationalStates;
        break;
      case "honeymoon":
        filteredList = honeymoonStates;
        break;
      default:
        filteredList = [];
    }
    setFilteredStates(filteredList);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterStatesByCategory(category);
    setStateName("");
  };

  const handleEdit = (category, flipcard) => {
    console.log(flipcard);
    setStateName(flipcard.stateName);
    setFlipPrice(flipcard.flipPrice);
    setOfferPrice(flipcard.flipOfferPrice);
    setSelectedCategory(category);
    setIsEditing(true);
    setEditFlipcardId(flipcard.flipcardId);
    
    // Check if image is a URL or filename
    if (flipcard.flipcardImage[0]?.startsWith('http')) {
      setImageUrl(flipcard.flipcardImage[0]);
      setUseFileUpload(false);
    } else {
      setUseFileUpload(true);
    }
    
    filterStatesByCategory(category);
  };

  const handleDelete = async (category, stateName) => {
    if (!stateName || !category) {
      console.error("State name or category is undefined");
      toast.error("Cannot delete: Invalid data");
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete ${stateName}?`)) {
      return;
    }

    try {
      await axios.delete(`https://elitetrips-backend.onrender.com/api/flip-card/flip`, {
        data: {
          category: category,
          stateName: stateName,
        },
      });
      toast.success("Flipcard deleted successfully!");
      fetchFlipcards();
    } catch (error) {
      console.error("Error deleting flipcard", error);
      toast.error("Failed to delete flipcard");
    }
  };

  return (
    <div className="flipcard-manager container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">🎴 Flipcard Manager - National (Home Page)</h2>
        <button
          onClick={() => {
            fetchStateNames();
            fetchFlipcards();
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          🔄 Refresh States
        </button>
      </div>
      
      {/* Debug Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4 text-sm">
        <p><strong>Debug Info:</strong></p>
        <p>National States Loaded: {nationalStates.length}</p>
        <p>International States Loaded: {internationalStates.length}</p>
        <p>Honeymoon States Loaded: {honeymoonStates.length}</p>
        <p>Currently Showing: {selectedCategory} ({filteredStates.length} states)</p>
      </div>
      
      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">📌 How to Use Google Drive Images:</h3>
        <ol className="list-decimal ml-5 text-sm text-blue-900 space-y-1">
          <li>Upload your image to Google Drive</li>
          <li>Right-click → "Share" → Set to "Anyone with the link"</li>
          <li>Copy the shareable link</li>
          <li>Paste it below in the "Google Drive Image URL" field</li>
          <li>Format: <code className="bg-blue-100 px-1 rounded">https://drive.google.com/file/d/FILE_ID/view</code></li>
        </ol>
        <p className="text-xs text-blue-700 mt-2">✅ Note: For National category, images will appear on the home page!</p>
      </div>

      {/* Tabs for categories */}
      <div className="flex space-x-4 mb-6">
        {["national", "international", "honeymoon"].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`p-2 rounded ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mb-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            State Name: 
            {filteredStates.length === 0 && (
              <span className="text-red-500 text-xs ml-2">
                ⚠️ No states found! Add states from "States" tab first.
              </span>
            )}
          </label>
          <select
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">
              {filteredStates.length === 0 
                ? `No ${selectedCategory} states available - Add from States tab` 
                : 'Select a state'}
            </option>
            {filteredStates.map((state) => (
              <option key={state._id} value={state.stateName}>
                {state.stateName}
              </option>
            ))}
          </select>
          {filteredStates.length > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Available states: {filteredStates.map(s => s.stateName).join(', ')}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Flip Price:</label>
          <input
            type="number"
            value={flipPrice}
            onChange={(e) => setFlipPrice(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="e.g., 5000"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Flip Offer Price:</label>
          <input
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            className="border rounded p-2 w-full"
            placeholder="e.g., 4500"
            required
          />
        </div>

        {/* Toggle between URL and File Upload */}
        <div className="mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useFileUpload}
              onChange={(e) => setUseFileUpload(e.target.checked)}
              className="form-checkbox h-5 w-5"
            />
            <span className="text-sm font-medium">Use file upload instead of Google Drive URL</span>
          </label>
        </div>

        {!useFileUpload ? (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              🔗 Google Drive Image URL:
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view"
            />
            {imageUrl && (
              <div className="mt-2 bg-gray-50 p-3 rounded border">
                <p className="text-xs text-gray-600 mb-2 font-semibold">🔍 Image Preview:</p>
                
                {/* Show extracted File ID */}
                {(() => {
                  // Check if it's already a googleusercontent.com URL
                  if (imageUrl.includes('googleusercontent.com')) {
                    return (
                      <div className="flex items-start gap-3">
                        <img 
                          src={imageUrl}
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded border-2 border-blue-300"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                        />
                        <div className="text-green-600 text-xs p-2 bg-green-50 rounded flex-1">
                          <p className="font-semibold">✅ Google Photos URL detected!</p>
                        </div>
                      </div>
                    );
                  }
                  
                  // Extract file ID from various formats
                  let fileId = null;
                  const fileIdMatch = imageUrl.match(/\/d\/([^/]+)/);
                  if (fileIdMatch) {
                    fileId = fileIdMatch[1].split('?')[0];
                  }
                  if (!fileId) {
                    const ucMatch = imageUrl.match(/[?&]id=([^&]+)/);
                    if (ucMatch) fileId = ucMatch[1];
                  }
                  if (!fileId) {
                    const openMatch = imageUrl.match(/open\?id=([^&]+)/);
                    if (openMatch) fileId = openMatch[1];
                  }
                  
                  // Use lh3.googleusercontent.com format for direct image embedding
                  const directUrl = fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : imageUrl;
                  
                  return (
                    <>
                      {fileId && (
                        <div className="mb-2 text-xs bg-blue-50 p-2 rounded">
                          <p><strong>✅ File ID Extracted:</strong> <code className="bg-white px-1">{fileId}</code></p>
                          <p className="mt-1"><strong>📸 Direct Image URL:</strong></p>
                          <p className="break-all bg-white p-1 rounded mt-1 text-[10px]">{directUrl}</p>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-3">
                        <img 
                          src={directUrl}
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded border-2 border-blue-300"
                          referrerPolicy="no-referrer"
                          crossOrigin="anonymous"
                          onLoad={(e) => {
                            console.log('✅ Image loaded successfully:', directUrl);
                            e.target.nextSibling.style.display = 'none';
                            e.target.nextSibling.nextSibling.style.display = 'block';
                          }}
                          onError={(e) => {
                            console.error('❌ Image failed to load:', directUrl);
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                            e.target.nextSibling.nextSibling.style.display = 'none';
                          }}
                        />
                        <div style={{display: 'none'}} className="text-red-600 text-xs p-2 bg-red-50 rounded flex-1">
                          <p className="font-semibold">⚠️ Cannot load preview</p>
                          <p className="mt-1">Possible reasons:</p>
                          <ul className="list-disc ml-4 mt-1">
                            <li>Image not shared publicly</li>
                            <li>Wrong sharing settings</li>
                            <li>File ID not extracted correctly</li>
                          </ul>
                          <p className="mt-2 font-semibold">Fix:</p>
                          <ol className="list-decimal ml-4 mt-1">
                            <li>Go to Google Drive</li>
                            <li>Right-click image → Share</li>
                            <li>Set to "Anyone with the link"</li>
                            <li>Permission: "Viewer"</li>
                          </ol>
                        </div>
                        <div style={{display: 'none'}} className="text-green-600 text-xs p-2 bg-green-50 rounded flex-1">
                          <p className="font-semibold">✅ Image loaded successfully!</p>
                          <p className="mt-1">Ready to save.</p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              📁 Flipcard Images (File Upload):
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="border rounded p-2 w-full"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
            {isEditing ? "Update Flipcard" : "Add Flipcard"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={clearForm}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-bold mb-2">Flipcards List</h3>
      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2 bg-gray-100 p-2 rounded">
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Flipcards
        </h4>
        <ul className="space-y-2">
          {flipcards[selectedCategory] &&
          flipcards[selectedCategory].length > 0 ? (
            flipcards[selectedCategory].map((flipcard) => (
              <li
                key={flipcard._id}
                className="border p-4 rounded-lg flex justify-between items-center hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  {flipcard.flipcardImage.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${flipcard.stateName} Flipcard`}
                      className="w-20 h-20 object-cover rounded border-2 border-gray-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80?text=Image+Error';
                      }}
                    />
                  ))}
                  <div className="flex flex-col">
                    <strong className="text-lg">{flipcard.stateName}</strong>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Original Price:</span> ₹{flipcard.flipPrice}
                    </div>
                    <div className="text-sm text-green-600">
                      <span className="font-medium">Offer Price:</span> ₹{flipcard.flipOfferPrice}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(selectedCategory, flipcard)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(selectedCategory, flipcard.stateName)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-gray-500 text-center p-4">No flipcards found for {selectedCategory}.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Flipcard;
