/**
 * Example Frontend Component Updates
 * 
 * This file shows how to update admin panel components
 * to accept Google Drive URLs instead of file uploads
 */

import React, { useState, useEffect } from "react";
import axios from "axios";

// ============================================
// EXAMPLE 1: Gallery Image Upload
// ============================================

// OLD VERSION (File Upload)
const GalleryUploadOLD = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    files.forEach((file) => {
      formData.append("tripImages", file);
    });

    await axios.post("http://localhost:5001/api/gallery/honeymoon", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Gallery Name"
      />
      <input 
        type="file" 
        multiple 
        onChange={(e) => setFiles([...e.target.files])} 
      />
      <button type="submit">Upload</button>
    </form>
  );
};

// NEW VERSION (URL Input)
const GalleryUploadNEW = () => {
  const [imageUrls, setImageUrls] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Split URLs by newline and filter empty lines
    const urlArray = imageUrls.split('\n').filter(url => url.trim());
    
    await axios.post("http://localhost:5001/api/gallery/honeymoon", {
      name,
      tripImages: urlArray
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Gallery Name"
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <textarea 
        value={imageUrls}
        onChange={(e) => setImageUrls(e.target.value)}
        placeholder="Enter Google Drive/Photos URLs (one per line)"
        rows="10"
        className="w-full mb-4 px-4 py-2 border rounded"
      />
      <div className="text-sm text-gray-600 mb-4">
        <p>How to get Google Drive link:</p>
        <ol className="list-decimal ml-4">
          <li>Upload image to Google Drive</li>
          <li>Right-click → "Get link"</li>
          <li>Set to "Anyone with the link"</li>
          <li>Copy and paste the link here</li>
        </ol>
      </div>
      <button 
        type="submit"
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Gallery
      </button>
    </form>
  );
};

// ============================================
// EXAMPLE 2: Video Upload
// ============================================

// OLD VERSION
const VideoUploadOLD = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("videoTitle", title);
    formData.append("video", videoFile);

    await axios.post("http://localhost:5001/api/reel", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Video Title"
      />
      <input 
        type="file" 
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])} 
      />
      <button type="submit">Upload Video</button>
    </form>
  );
};

// NEW VERSION
const VideoUploadNEW = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [urlLink, setUrlLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await axios.post("http://localhost:5001/api/reel", {
      videoTitle: title,
      videoSubtitle: subtitle,
      urlLink,
      video: [videoUrl]  // Send as array
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Video Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Enter video title"
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Video Subtitle</label>
        <input 
          type="text" 
          value={subtitle} 
          onChange={(e) => setSubtitle(e.target.value)} 
          placeholder="Enter subtitle"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">URL Link</label>
        <input 
          type="text" 
          value={urlLink} 
          onChange={(e) => setUrlLink(e.target.value)} 
          placeholder="Enter URL"
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Google Drive Video URL</label>
        <input 
          type="text" 
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Paste Google Drive video URL here"
          className="w-full px-4 py-2 border rounded"
          required
        />
        <div className="text-sm text-gray-600 mt-2">
          <p>Example: https://drive.google.com/file/d/YOUR_FILE_ID/view</p>
        </div>
      </div>

      <button 
        type="submit"
        className="w-full px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Save Video
      </button>
    </form>
  );
};

// ============================================
// EXAMPLE 3: Multiple Images with Preview
// ============================================

const MultiImageUploadNEW = () => {
  const [urls, setUrls] = useState([""]);
  const [name, setName] = useState("");

  const addUrlField = () => {
    setUrls([...urls, ""]);
  };

  const removeUrlField = (index) => {
    const newUrls = urls.filter((_, i) => i !== index);
    setUrls(newUrls);
  };

  const updateUrl = (index, value) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validUrls = urls.filter(url => url.trim());
    
    await axios.post("http://localhost:5001/api/gallery/home", {
      name,
      images: validUrls
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Gallery Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Image URLs</label>
        {urls.map((url, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input 
              type="text"
              value={url}
              onChange={(e) => updateUrl(index, e.target.value)}
              placeholder="Paste Google Drive/Photos URL"
              className="flex-1 px-4 py-2 border rounded"
            />
            {url && (
              <img 
                src={url} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            {urls.length > 1 && (
              <button 
                type="button"
                onClick={() => removeUrlField(index)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button 
          type="button"
          onClick={addUrlField}
          className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
        >
          + Add Another Image
        </button>
      </div>

      <button 
        type="submit"
        className="w-full px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Gallery
      </button>
    </form>
  );
};

// ============================================
// EXAMPLE 4: Bulk URL Input (Textarea)
// ============================================

const BulkImageUploadNEW = () => {
  const [bulkUrls, setBulkUrls] = useState("");
  const [name, setName] = useState("");
  const [preview, setPreview] = useState([]);

  const handleUrlsChange = (e) => {
    const text = e.target.value;
    setBulkUrls(text);
    
    // Generate preview
    const urlArray = text.split('\n').filter(url => url.trim());
    setPreview(urlArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlArray = bulkUrls.split('\n').filter(url => url.trim());
    
    await axios.post("http://localhost:5001/api/gallery/international", {
      name,
      tripImages: urlArray
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Gallery Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full px-4 py-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Image URLs (one per line)
            </label>
            <textarea 
              value={bulkUrls}
              onChange={handleUrlsChange}
              placeholder="Paste URLs here, one per line"
              rows="15"
              className="w-full px-4 py-2 border rounded font-mono text-sm"
            />
            <p className="text-sm text-gray-600 mt-2">
              Total images: {preview.length}
            </p>
          </div>

          <button 
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Gallery
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div className="grid grid-cols-2 gap-2 max-h-[600px] overflow-y-auto">
            {preview.map((url, index) => (
              <div key={index} className="relative">
                <img 
                  src={url} 
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" fill="red">Error</text></svg>';
                  }}
                />
                <span className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export {
  GalleryUploadOLD,
  GalleryUploadNEW,
  VideoUploadOLD,
  VideoUploadNEW,
  MultiImageUploadNEW,
  BulkImageUploadNEW
};
