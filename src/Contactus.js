import React, { useState } from "react";
import "./Contactus.css";
import Con from "./img/con-bg.png";
import { Link } from "react-router-dom";

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
      <div className="heading-section-1">
        <h1>Need Assistance?</h1>
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

            <a class="btn-con"> Submit</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactForm;