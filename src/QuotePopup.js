import React from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
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
    <div className="border-2 border-[#03346e] mt-3 rounded-lg shadow-lg max-w-full mx-2 sm:max-w-lg sm:mx-auto">
      <div className="bg-[#03346e] p-3 border-b-2 border-[#03346e] rounded-t-md text-center">
        <p className="font-semibold text-sm md:text-xl text-white">
          Reach Out To Us
        </p>
      </div>
      <div className="p-4 bg-white rounded-b-lg">
        <form className="space-y-3" onSubmit={submitForm}>
          <div className="flex flex-col">
            <label className="font-semibold text-[#03346e] text-xs md:text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className="mt-1 p-2 border border-[#03346e] rounded-lg text-sm md:text-base"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-[#03346e] text-xs md:text-sm">
              Phone No
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={handleChange}
              id="phone"
              placeholder="e.g., 123-456-7890"
              className="mt-1 p-2 border border-[#03346e] rounded-lg text-sm md:text-base"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-[#03346e] text-xs md:text-sm">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., johndoe@example.com"
              className="mt-1 p-2 border border-[#03346e] rounded-lg text-sm md:text-base"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-[#03346e] text-xs md:text-sm">
              Destination
            </label>
            <input
              type="text"
              id="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g., Delhi"
              className="mt-1 p-2 border border-[#03346e] rounded-lg text-sm md:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#03346e] text-white font-semibold py-2 rounded-lg  transition-all duration-300 text-sm md:text-base"
          >
            Get Quotes
          </button>
          <div className="flex flex-col md:flex-row items-center justify-between mt-4 space-y-2 md:space-y-0">
            <a
              href={`https://wa.me/918852019731?text=${encodeURIComponent(
                whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full md:mr-2 bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition-all duration-300 text-sm md:text-base"
            >
              <FaWhatsapp className="text-lg md:text-xl mr-2" />
              WhatsApp
            </a>
            <button
              type="button"
              className="flex items-center justify-center w-full bg-[#03346e] text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-all duration-300 text-sm md:text-base"
              onClick={callNow}
            >
              <FaPhone className="text-lg md:text-xl mr-2 rotate-90" />
              Call Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const QuotePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex z-10 items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-sm md:mt-28 sm:max-w-md mx-4 h-[80%] sm:h-auto flex flex-col p-4">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 transition duration-300"
          >
            <RxCross2 size={24} />
          </button>
        </div>
        <div className="overflow-y-auto">
          <TripForms />
        </div>
      </div>
    </div>
  );
};

export default QuotePopup;
