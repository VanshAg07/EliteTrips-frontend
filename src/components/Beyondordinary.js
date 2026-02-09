import React from 'react';

const services = [
  {
    title: 'Full Spectrum Services',
    description: "Everything You Need for a Flawless Experience – premier stays, insightful guides, effortless travel, and more. Relax and let us handle the details!",
    bgColor: 'white',
    icon: '🌍',
  },
  {
    title: 'Hassle-Free Passports',
    description: "Plan your journey, and leave the passport hassles to us!",
    bgColor: 'white',
    icon: '🛂',
  },
  {
    title: 'Luxurious Escapes & Air Travel',
    description: "Reaching your dream destinations is effortless. We’ll ensure you enjoy lavish accommodations and seamless flights!",
    bgColor: 'white',
    icon: '✈️',
  },
  {
    title: 'Friendly Locals',
    description: 'Your friendly locals are ready to take you on an unforgettable journey through each unique locale.',
    bgColor: 'white',
    icon: '👥',
  },
  {
    title: 'Frame-Worthy Experiences',
    description: "We've got a team that can help you snap those amazing pics you'll cherish forever.",
    bgColor: 'white',
    icon: '📸',
  },
  {
    title: 'Timeless Memories',
    description: 'We guarantee a seamless adventure, enriched with lasting memories that you’ll hold close to your heart.',
    bgColor: 'white',
    icon: '✨',
  },
];

function App() {
  return (
    <div className="bg-gray-50 flex flex-col items-center px-4 sm:px-8">
      {/* Heading Section */}
      <header className="w-full max-w-screen-md text-center mt-10">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center leading-tight sm:text-xl">
          Extraordinary <span className="text-blue-500">Experiences</span>
        </h1>
        <p className="text-lg sm:text-xl mt-2 sm:mt-4 text-gray-600">
          We believe that business travels should always be extraordinary experiences.
        </p>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mt-10 w-full max-w-screen-lg text-center mb-20">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 sm:p-6 bg-white shadow-md rounded-lg"
          >
            {/* Icon */}
            <div className="text-5xl sm:text-6xl mb-4">{service.icon}</div>

            {/* Title */}
            <p className="text-gray-800 font-semibold text-lg sm:text-xl mb-2">
              {service.title}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
