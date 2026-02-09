import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MainFooter from "./Footer/MainFooter";
import Nav from "./Nav";
import Dropnav from "../components/Dropnav";

const BlogDetails = () => {
  const { blogTitle } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/blog/blogs/${blogTitle}`
      );
      setBlog(response.data.blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [blogTitle]);

  // Display loading indicator or blog content
  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Handle case where blog data is not found
  if (!blog) {
    return <div className="text-center p-4">Blog not found</div>;
  }

  return (
    <div className="flex flex-col items-center w-full">
      <Nav />
      <Dropnav />
      {/* Background Image with Blog Title */}
      <div className="relative w-full h-[80vh] mb-8">
        <img
          src={blog.blogBackgroundImage}
          alt={blog.blogTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute md:top-36 top-20 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-black font-semibold py-2 px-4 rounded-full">
          {blog.blogName}
        </div>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-2xl font-semibold py-3 px-8 rounded-lg">
          {blog.blogTitle}
        </div>
      </div>

      {/* Blog Description */}
      <div className="w-[70%] bg-[#03346e] p-8 rounded-lg shadow-lg mb-10">
        <p className="text-gray-800 text-lg text-white font-medium leading-relaxed">
          {blog.blogDescription}
        </p>
      </div>

      {/* Blog Content with Images, Headings, and Points */}
      {blog.blogHeading.map((heading, index) => (
        <div key={heading._id} className="w-[70%] mb-12">
          {/* Display image for each heading */}
          {blog.blogImages[index] && (
            <img
              src={blog.blogImages[index]}
              alt={`Heading image ${index + 1}`}
              className="w-full h-80 object-cover rounded-lg mb-6 shadow-md"
            />
          )}
          {/* Heading and Points */}
          <h2 className="text-3xl font-bold text-[#03346e] mb-4">
            {heading.headingTitle}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {heading.headingDescription}
          </p>
          {heading.points.map((point) => (
            <div
              key={point._id}
              className="mb-4 pl-4 border-l-4 border-[#03346e]"
            >
              <h3 className="text-2xl font-semibold text-gray-800">
                {point.pointTitle}
              </h3>
              <p className="text-gray-600">{point.pointDescription}</p>
            </div>
          ))}
        </div>
      ))}

      {/* Footer */}
      <div className="w-full">
        <MainFooter />
      </div>
    </div>
  );
};

export default BlogDetails;
