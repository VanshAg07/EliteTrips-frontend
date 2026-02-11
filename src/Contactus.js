import React, { useState } from "react";
import "./Contactus.css";
import Con from "./img/con-bg.png";
import { Link } from "react-router-dom";
import Nav from "./components/Nav";
import Dropnav from "./components/Dropnav";
import MainFooter from "./components/Footer/MainFooter";
import Mainreview from "./components/Mainreview";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNo: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restricting the contactNo input to digits only and a max length of 10
    if (name === "contactNo") {
      const re = /^[0-9\b]+$/;
      if (value === "" || (re.test(value) && value.length <= 10)) {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <>
      <Nav />
      <Dropnav />
      <div className="relative">
        <div className="hero-section-left-1 mt-[60px] md:mt-[105px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0 z-10"></div>
          <div className="relative flex flex-col items-center z-20">
            <div className="relative w-full flex items-start justify-center">
              <h1 className="ml-6 text-center text-white font-bold text-2xl xs:text-2xl sm:text-3xl lg:text-4xl leading-tight mt-4 sm:mt-8">
                Need Assistance?
              </h1>
            </div>
          </div>
        </div>
        <Mainreview />
      </div>

      <div className="contact-wrapper">
        <div>
          <img src={Con} alt="Contact Illustration" />
        </div>
        <div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h4>Facing Any Issues?</h4>
            <h2>Allow Us to Call You Back!</h2>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="contactNo">Contact No.:</label>
            <input
              type="tel"
              id="contactNo"
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              title="Contact number should be exactly 10 digits"
            />

            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit" className="btn-con">
              Submit
            </button>
          </form>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default ContactForm;