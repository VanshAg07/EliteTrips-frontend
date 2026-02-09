import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import Dropnav from "../components/Dropnav";
import MainFooter from "./Footer/MainFooter";
import Mainreview from "../components/Mainreview.js";
import "./Blog.css";
import axios from "axios";

const Blog = () => {
  const [backgroundImages, setBackgroundImages] = useState([]);
  const [blogs, setBlogs] = useState([]);

  const fetchBackgroundImages = async () => {
    const response = await axios.get(
      "https://elitetrips-backend.onrender.com/api/background-images/images"
    );
    setBackgroundImages(response.data);
  };

  const fetchBlogs = async () => {
    const response = await axios.get("https://elitetrips-backend.onrender.com/api/blog/blogs");
    setBlogs(response.data.blogs);
  };

  useEffect(() => {
    fetchBackgroundImages();
    fetchBlogs();
  }, []);

  const nationalImages = backgroundImages.filter(
    (item) => item.type === "Blogs"
  );

  return (
    <>
      <Nav />
      <Dropnav />
      <div className="hero-section-left-1">
        {nationalImages.map((item) => (
          <div key={item._id} className="relative">
            {item.image.map((imgUrl, index) =>
              imgUrl.endsWith(".mp4") ? (
                <video
                  key={index}
                  className="w-full h-auto"
                  autoPlay
                  muted
                  loop
                >
                  <source src={imgUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img 
                  key={index} 
                  src={imgUrl} 
                  alt={`Image ${index}`}
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                />
              )
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-white font-bold text-2xl xs:text-2xl sm:text-3xl lg:text-4xl leading-tight mt-4 sm:mt-8 text-center">
                {item.heading}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-[130px] md:mt-0">
        <Mainreview />
      </div>
      <div>
        <h2 className="text-center pb-7 pt-7 text-2xl lg:text-3xl mb-5 text-gray-800 font-bold">
          Blogs
        </h2>
      </div>
      <div className="card-grid">
        {blogs.map((blog) => (
          <Link key={blog._id} to={`/blogdetails/${blog.blogTitle}`}>
            <div className="bg-white p-1 flex flex-col border-black border-2 items-center justify-between rounded-lg shadow-black shadow-lg transition-transform transform hover:translate-y-[-10px]">
              <img
                src={blog.blogCardImage}
                alt="Blog Card"
                className="w-auto h-[200px] sm:h-[250px] md:h-[300px] rounded-md"
              />
              <div className="w-full text-center">
                <h3 className="blog-h3 py-4 capitalize font-medium text-lg md:text-xl">
                  {blog.blogName}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <MainFooter />
    </>
  );
};

export default Blog;
