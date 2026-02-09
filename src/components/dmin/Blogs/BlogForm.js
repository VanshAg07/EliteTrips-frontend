import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogForm = () => {
  const [blogData, setBlogData] = useState({
    blogName: "",
    blogTitle: "",
    blogDescription: "",
    blogHeading: [],
    blogImages: [],
    blogBackgroungImage: null,
    blogCardImage: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleHeadingChange = (index, e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => {
      const updatedHeadings = [...prevData.blogHeading];
      updatedHeadings[index] = {
        ...updatedHeadings[index],
        [name]: value,
      };
      return { ...prevData, blogHeading: updatedHeadings };
    });
  };

  const handlePointChange = (headingIndex, pointIndex, e) => {
    const { name, value } = e.target;
    setBlogData((prevData) => {
      const updatedHeadings = [...prevData.blogHeading];
      updatedHeadings[headingIndex].points[pointIndex] = {
        ...updatedHeadings[headingIndex].points[pointIndex],
        [name]: value,
      };
      return { ...prevData, blogHeading: updatedHeadings };
    });
  };

  const addHeading = () => {
    setBlogData((prevData) => ({
      ...prevData,
      blogHeading: [
        ...prevData.blogHeading,
        { headingTitle: "", headingDescription: "", points: [] },
      ],
    }));
  };

  const addPoint = (headingIndex) => {
    const updatedHeadings = [...blogData.blogHeading];
    updatedHeadings[headingIndex].points.push({
      pointTitle: "",
      pointDescription: "",
    });
    setBlogData({ ...blogData, blogHeading: updatedHeadings });
  };

  const deleteHeading = (index) => {
    const updatedHeadings = [...blogData.blogHeading];
    updatedHeadings.splice(index, 1);
    setBlogData({ ...blogData, blogHeading: updatedHeadings });
  };

  const deletePoint = (headingIndex, pointIndex) => {
    const updatedHeadings = [...blogData.blogHeading];
    updatedHeadings[headingIndex].points.splice(pointIndex, 1);
    setBlogData({ ...blogData, blogHeading: updatedHeadings });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setBlogData((prevData) => ({
      ...prevData,
      blogImages: [...prevData.blogImages, ...files],
    }));
  };

  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogData((prevData) => ({
        ...prevData,
        blogBackgroungImage: file,
      }));
    }
  };

  const handleCardImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogData((prevData) => ({
        ...prevData,
        blogCardImage: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Blog Data:", blogData);
    const formData = new FormData();
    formData.append("blogName", blogData.blogName);
    formData.append("blogTitle", blogData.blogTitle);
    formData.append("blogDescription", blogData.blogDescription);

    blogData.blogHeading.forEach((heading, index) => {
      formData.append(`blogHeading[${index}][headingTitle]`, heading.headingTitle);
      formData.append(`blogHeading[${index}][headingDescription]`, heading.headingDescription);
      heading.points.forEach((point, pIndex) => {
        formData.append(`blogHeading[${index}].points[${pIndex}][pointTitle]`, point.pointTitle);
        formData.append(`blogHeading[${index}].points[${pIndex}][pointDescription]`, point.pointDescription);
      });
    });

    blogData.blogImages.forEach((image) => {
      formData.append("blogImages", image);
    });

    if (blogData.blogBackgroungImage) {
      formData.append("blogBackgroungImage", blogData.blogBackgroungImage);
    }
    if (blogData.blogCardImage) {
      formData.append("blogCardImage", blogData.blogCardImage);
    }

    try {
      const response = await axios.post("http://localhost:5001/api/blog/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Blog submitted successfully!");
      setBlogData({
        blogName: "",
        blogTitle: "",
        blogDescription: "",
        blogHeading: [],
        blogImages: [],
        blogBackgroungImage: null,
        blogCardImage: null,
      });
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to submit the blog. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Create a Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Blog Name:</label>
          <input
            type="text"
            name="blogName"
            value={blogData.blogName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Blog Title:</label>
          <input
            type="text"
            name="blogTitle"
            value={blogData.blogTitle}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Blog Description:</label>
          <textarea
            name="blogDescription"
            value={blogData.blogDescription}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <h3 className="font-medium">Blog Headings:</h3>
          {blogData.blogHeading.map((heading, index) => (
            <div key={index} className="border p-4 my-2 rounded">
              <h4 className="font-bold">Heading {index + 1}</h4>
              <input
                type="text"
                name="headingTitle"
                placeholder="Heading Title"
                value={heading.headingTitle}
                onChange={(e) => handleHeadingChange(index, e)}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <textarea
                name="headingDescription"
                placeholder="Heading Description"
                value={heading.headingDescription}
                onChange={(e) => handleHeadingChange(index, e)}
                required
                className="w-full border border-gray-300 p-2 rounded"
              />
              <h5 className="font-medium">Points:</h5>
              {heading.points.map((point, pIndex) => (
                <div key={pIndex} className="border p-2 my-2 rounded">
                  <input
                    type="text"
                    name="pointTitle"
                    placeholder="Point Title"
                    value={point.pointTitle}
                    onChange={(e) => handlePointChange(index, pIndex, e)}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  <textarea
                    name="pointDescription"
                    placeholder="Point Description"
                    value={point.pointDescription}
                    onChange={(e) => handlePointChange(index, pIndex, e)}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => deletePoint(index, pIndex)}
                    className="text-red-600"
                  >
                    Delete Point
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addPoint(index)}
                className="bg-green-600 text-white px-2 py-1 rounded"
              >
                Add Point
              </button>
              <button
                type="button"
                onClick={() => deleteHeading(index)}
                className="text-red-600"
              >
                Delete Heading
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHeading}
            className="bg-green-600 text-white px-2 py-1 rounded"
          >
            Add Heading
          </button>
        </div>
        <div>
          <label className="block font-medium">Upload Images: <br /><span className="text-red-500">Choose multiple images at a time according to the count of the headings. Like 3 heading so 3 images. </span></label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Background Image: <br /><span className="text-red-500">Background Image of the blog details page</span></label>
          <input
            type="file"
            onChange={handleBackgroundImageChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Card Image: <br />
          <span className="text-red-500">Card Image of the blog details page</span>
          </label>
          <input
            type="file"
            onChange={handleCardImageChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit Blog
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default BlogForm;
