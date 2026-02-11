import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

// helper function to convert Google Drive URL to displayable format
const convertGoogleDriveUrl = (url) => {
  if (!url) return url;

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

function OurTeam() {
  const [teamId, setTeamId] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [instagram, setInstagram] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [useGoogleDrive, setUseGoogleDrive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    axios
      .get("https://elitetrips-backend.onrender.com/api/home/get-team-member")
      .then((response) => {
        console.log(response.data); // Add this to check the response format
        const data = response.data;
        setTeamMembers(data.data); // Ensure it's always an array
      })
      .catch((error) => {
        console.error("Error fetching team members:", error);
        setTeamMembers([]); // Reset to an empty array in case of an error
      });
  }, [reloadData]);

  // Update preview when Google Drive URL changes
  useEffect(() => {
    if (imageUrl && useGoogleDrive) {
      const converted = convertGoogleDriveUrl(imageUrl);
      setPreviewUrl(converted);
    } else {
      setPreviewUrl("");
    }
  }, [imageUrl, useGoogleDrive]);

  // Pre-fill the input fields when editing a team member
  const handleEdit = (member) => {
    setTeamId(member._id);
    setName(member.name);
    setPosition(member.position);
    setDescription(member.description);
    setLinkedIn(member.linkedIn);
    setInstagram(member.instagram);

    // Check if image is a Google Drive URL
    const memberImage = Array.isArray(member.image) ? member.image[0] : member.image;
    if (memberImage && (memberImage.includes('drive.google.com') || memberImage.includes('lh3.googleusercontent.com'))) {
      setUseGoogleDrive(true);
      setImageUrl(memberImage);
      setPreviewUrl(memberImage);
      setImage(null);
    } else {
      setUseGoogleDrive(false);
      setImageUrl("");
      setPreviewUrl("");
      setImage(memberImage);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);
    formData.append("description", description);
    formData.append("linkedIn", linkedIn);
    formData.append("instagram", instagram);

    // Handle Google Drive URL or file upload
    if (useGoogleDrive && imageUrl) {
      formData.append("imageUrl", imageUrl);
    } else if (image) {
      formData.append("image", image);
    }

    try {
      if (teamId) {
        await axios.put(
          `https://elitetrips-backend.onrender.com/api/home/add-team-member/${teamId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Team member updated successfully!");
      } else {
        await axios.post(
          "https://elitetrips-backend.onrender.com/api/home/add-team-member",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Team member added successfully!");
      }

      // Reset the form after submission
      setName("");
      setPosition("");
      setImage(null);
      setDescription("");
      setLinkedIn("");
      setInstagram("");
      setTeamId(null);
      setUseGoogleDrive(false);
      setImageUrl("");
      setPreviewUrl("");
      setReloadData(!reloadData);
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Error submitting the form");
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://elitetrips-backend.onrender.com/api/home/add-team-member/${id}`)
      .then(() => {
        setReloadData(!reloadData);
      })
      .catch((error) => {
        console.error("Error deleting team member:", error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Team Management</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          {teamId ? "Edit" : "Add"} Team Member
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Position</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">LinkedIn</label>
            <input
              type="url"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Instagram</label>
            <input
              type="url"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={useGoogleDrive}
                onChange={(e) => {
                  setUseGoogleDrive(e.target.checked);
                  if (!e.target.checked) {
                    setImageUrl("");
                    setPreviewUrl("");
                  }
                }}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Use Google Drive URL</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Image</label>
            {useGoogleDrive ? (
              <div className="space-y-2">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Paste Google Drive share link here"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required={!teamId}
                />
                <p className="text-xs text-gray-500">
                  Example: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
                </p>
                {previewUrl && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Preview:</p>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full border"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            ) : (
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-md"
                onChange={handleImageChange}
                required={!teamId} // Only require the image when adding a new member
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-md"
          >
            {teamId ? "Update" : "Create"} Team Member
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Team Members</h2>
        <ul className="space-y-4">
          {Array.isArray(teamMembers) &&
            teamMembers.map((member) => (
              <li
                key={member._id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div>
                    <h3 className="text-lg font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.position}</p>
                    <p className="text-sm">
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        LinkedIn
                      </a>
                    </p>
                    <p className="text-sm">
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500"
                      >
                        Instagram
                      </a>
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => handleEdit(member)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default OurTeam;
