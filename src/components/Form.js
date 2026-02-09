import React from 'react';
import icon1 from "../img/con-bg.png";
const Forms = () => {
  return (
    <>
<h1 className="pt-14 md:pt-20 text-2xl md:text-4xl font-bold text-center text-gray-800">
          Contact Form
      </h1>
      <div className="min-h-screen flex items-center justify-center px-4">
        {/* Container for form and image */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">

          {/* Right side form */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 w-full max-w-md md:max-w-lg">
            <h2 className="text-cyan-500 text-lg font-semibold mb-1">
              EliteTrips Calling?
            </h2>
            <h3 className="text-lg font-semibold mb-6">
              Allow Us to Call You Back!
            </h3>
            <form>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="e.g. John Smith"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  Phone Number *
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your 10 digit number"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email ID *
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john@example.com"
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Any Message"
                  className="w-full border border-gray-300 p-2 rounded-md"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 rounded-md transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      </>
  );
};

export default Forms;