import React from 'react';

const services = [
  {
    id: 1,
    icon: '🌍',
    title: 'Personalized solutions designed to fit your organization’s unique requirements.',
  },
  {
    id: 2,
    icon: '💼',
    title: 'Professional event organizers to ensure everything runs smoothly.',
  },
  {
    id: 3,
    icon: '🗺️',
    title: 'Unique itineraries and experiences crafted to support your objectives.',
  },
  {
    id: 4,
    icon: '📋',
    title: 'Thorough attention and devotion to creating outstanding experiences.',
  },
];

function App() {
  return (
    <div className="bg-gray-50 flex flex-col items-center px-4 sm:px-8">
      {/* Heading Section */}
      <header className="w-full max-w-screen-md text-center mt-10">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center leading-tight sm:text-xl">
          Our Secret to <span className="text-blue-500">Spellbinding</span>{' '}
          <span className="text-blue-500">Moments</span>
        </h1>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 mt-10 w-full max-w-screen-lg text-center mb-20">
        {services.map(service => (
          <div key={service.id} className="flex flex-col items-center p-4 sm:p-6 bg-white shadow-md rounded-lg">
            {/* Icon */}
            <div className="text-5xl sm:text-6xl mb-4">{service.icon}</div>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg">
              {service.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
