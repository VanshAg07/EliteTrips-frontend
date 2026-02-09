import axios from "axios";
import React from "react";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

function TripForms() {
  const whatsappMessage = "Hello, I need assistance with my issue.";
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
  });

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.destination
    ) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5001/api/contact/contact-trip",
        formData
      );

      if (res.status === 200) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          destination: "",
        });
        setSuccess("Your message has been sent successfully.");
        setError("");
      }
    } catch (err) {
      setError("Failed to send the message. Please try again later.");
      setSuccess("");
    }
  };

  const callNow = () => {
    window.open("tel:918287804179");
  };

  return (
    <div className="border-2 border-blue-500 mt-5 rounded-lg shadow-lg max-w-lg mx-auto sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
      <div className="bg-blue-500 p-3 border-b-2 border-blue-400 rounded-t-lg text-center">
        <p className="font-semibold text-xl md:text-2xl text-white">
          Reach Out To Us
        </p>
      </div>
      <div className="p-6 bg-white rounded-b-lg">
        <form className="space-y-5" onSubmit={submitForm}>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-700 text-sm md:text-base">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="eg. John Doe"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-700 text-sm md:text-base">
              Phone No
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={handleChange}
              id="phone"
              placeholder="eg. 123-456-7890"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-700 text-sm md:text-base">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="eg. johndoe@example.com"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-blue-700 text-sm md:text-base">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="eg. Delhi"
              className="mt-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm md:text-base"
          >
            Get Quotes
          </button>
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 space-y-4 sm:space-y-0">
            <a
              href={`https://wa.me/918852019731?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center flex-1 bg-green-500 text-white font-semibold py-3 rounded-lg hover:bg-green-600 transition-all duration-300 text-sm md:text-base mr-0 sm:mr-2"
            >
              <FaWhatsapp className="text-xl mr-2" />
              WhatsApp
            </a>
            <button
              type="button"
              className="flex items-center justify-center flex-1 bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm md:text-base ml-0 sm:ml-2"
              onClick={callNow}
            >
              <FaPhone className="text-xl transform mr-2 rotate-90" />
              Call Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TripForms;
