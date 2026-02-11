import React from "react";
import axios from "axios";

const Forms = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  // Handle input changes and update state
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // Handle form submission
  const submitForm = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Validate form data
    if (!formData.name || !formData.email || !formData.phone) {
      setError("Please fill out all required fields.");
      return;
    }

    try {
      // Send form data to the backend
      const res = await axios.post(
        "https://elitetrips-backend.onrender.com/api/contact/contact-home",
        formData
      );

      // If the request is successful, clear the form and show success message
      if (res.status === 200) {
        setFormData({
          name: "",
          email: "",
          message: "",
          phone: "",
        });
        setSuccess("Your message has been sent successfully.");
        setError("");
      }
    } catch (err) {
      // Handle error case
      setError("Failed to send the message. Please try again later.");
      setSuccess("");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center py-4">
      <h1 className="text-center md:text-2xl text-xl lg:text-4xl font-bold mb-4">
        Need Assistance
      </h1>
      <div className="flex items-center justify-center px-4 flex-1 max-h-[85vh]">
        <div className="shadow-[0_10px_15px_rgba(0,0,0,0.5)] rounded-lg flex flex-col md:flex-row items-stretch justify-center w-[80vw] h-full max-h-[75vh]">
          <div className="md:w-[40vw] flex-shrink-0 bg-white flex items-center justify-center rounded-lg hidden md:flex">
            <img src="/Contact.png" alt="Illustration" className="w-[90%] h-auto max-h-[70vh] object-contain" />
          </div>
          <div className="bg-[#e1feff] rounded-lg shadow-lg p-4 md:p-6 md:w-[40vw] flex-shrink-0 flex flex-col justify-center overflow-y-auto">
            <h2 className="text-cyan-500 text-lg font-bold mb-1">
              Need Assistance?
            </h2>
            <h3 className="text-base font-semibold mb-4">
              Contact us now!
            </h3>
            <form onSubmit={submitForm}>
              <div className="mb-3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="name"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. DJ Bravo"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="mb-3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="phone"
                >
                  Phone Number *
                </label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your 10 digit number"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="mb-3">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email ID *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Bravo@example.com"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any Message"
                  className="w-full border border-gray-300 p-2 rounded-md"
                  rows="2"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-cyan-500 text-white font-bold py-2 rounded-md transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forms;
