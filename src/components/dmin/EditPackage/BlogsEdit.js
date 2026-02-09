import React, { useState, useEffect } from "react";
import axios from "axios";

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://elitetrips-backend.onrender.com/api/blog/blogs"
        );
        setBlogs(response.data.blogs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleEditClick = (blog) => {
    setSelectedBlog(blog);
    setIsEditing(true);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setSelectedBlog((prevBlog) => ({ ...prevBlog, [field]: value }));
  };

  const handleHeadingChange = (index, e, field) => {
    const value = e.target.value;
    const updatedHeadings = selectedBlog.blogHeading.map((heading, i) =>
      i === index ? { ...heading, [field]: value } : heading
    );
    setSelectedBlog((prevBlog) => ({
      ...prevBlog,
      blogHeading: updatedHeadings,
    }));
  };

  const handlePointChange = (headingIndex, pointIndex, e, field) => {
    const value = e.target.value;
    const updatedHeadings = selectedBlog.blogHeading.map((heading, i) => {
      if (i === headingIndex) {
        const updatedPoints = heading.points.map((point, j) =>
          j === pointIndex ? { ...point, [field]: value } : point
        );
        return { ...heading, points: updatedPoints };
      }
      return heading;
    });
    setSelectedBlog((prevBlog) => ({
      ...prevBlog,
      blogHeading: updatedHeadings,
    }));
  };

  const updateBlog = async () => {
    try {
      await axios.put(
        `https://elitetrips-backend.onrender.com/api/blog/blogs/${selectedBlog._id}`,
        selectedBlog
      );
      alert("Blog updated successfully");
      setIsEditing(false);
      setSelectedBlog(null);
      // Refresh blogs
      const response = await axios.get("https://elitetrips-backend.onrender.com/api/blog/blogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const deleteBlog = async (blogId) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`https://elitetrips-backend.onrender.com/api/blog/blogs/${blogId}`);
        alert("Blog deleted successfully");
        // Refresh blogs
        setBlogs(blogs.filter((blog) => blog._id !== blogId));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Blog Management</h2>

      {isEditing && selectedBlog ? (
        <div className="mb-6 border-t border-gray-300 pt-4">
          <h3 className="text-2xl font-semibold mb-4">
            Edit Blog: {selectedBlog.blogName}
          </h3>
          <input
            type="text"
            value={selectedBlog.blogName}
            onChange={(e) => handleInputChange(e, "blogName")}
            placeholder="Blog Name"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <input
            type="text"
            value={selectedBlog.blogTitle}
            onChange={(e) => handleInputChange(e, "blogTitle")}
            placeholder="Blog Title"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <textarea
            value={selectedBlog.blogDescription}
            onChange={(e) => handleInputChange(e, "blogDescription")}
            placeholder="Blog Description"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />

          {selectedBlog.blogHeading.map((heading, headingIndex) => (
            <div key={heading._id} className="mb-4">
              <h4 className="text-xl font-semibold">
                Heading: {heading.headingTitle}
              </h4>
              <input
                type="text"
                value={heading.headingTitle}
                onChange={(e) =>
                  handleHeadingChange(headingIndex, e, "headingTitle")
                }
                placeholder="Heading Title"
                className="w-full p-2 border border-gray-300 rounded mb-2"
              />
              <textarea
                value={heading.headingDescription}
                onChange={(e) =>
                  handleHeadingChange(headingIndex, e, "headingDescription")
                }
                placeholder="Heading Description"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              {heading.points.map((point, pointIndex) => (
                <div key={point._id} className="mb-2">
                  <h5 className="font-semibold">Point: {point.pointTitle}</h5>
                  <input
                    type="text"
                    value={point.pointTitle}
                    onChange={(e) =>
                      handlePointChange(
                        headingIndex,
                        pointIndex,
                        e,
                        "pointTitle"
                      )
                    }
                    placeholder="Point Title"
                    className="w-full p-2 border border-gray-300 rounded mb-1"
                  />
                  <textarea
                    value={point.pointDescription}
                    onChange={(e) =>
                      handlePointChange(
                        headingIndex,
                        pointIndex,
                        e,
                        "pointDescription"
                      )
                    }
                    placeholder="Point Description"
                    className="w-full p-2 border border-gray-300 rounded mb-4"
                  />
                </div>
              ))}
            </div>
          ))}

          <button
            onClick={updateBlog}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
          >
            Update Blog
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setSelectedBlog(null);
            }}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mb-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm"
            >
              <h3 className="text-xl font-semibold">{blog.blogName}</h3>
              <p className="text-gray-600">{blog.blogDescription}</p>
              <div className="flex gap-10">
                {/* Render blog images */}
                {/* <div className="mt-4">
                  {blog.blogImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Blog ${blog.blogName} Image ${index + 1}`}
                      className="w-32 h-32 mb-2 rounded"
                    />
                  ))}
                </div> */}
                {/* <div className="mt-4">
                  <img
                    src={blog.blogBackgroungImage}
                    className="w-32 h-32 mb-2 rounded"
                  />
                </div> */}
                {/* <div className="mt-4">
                  <img
                    src={blog.blogCardImage}
                    className="w-32 h-32 mb-2 rounded"
                  />
                </div> */}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditClick(blog)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManagement;
