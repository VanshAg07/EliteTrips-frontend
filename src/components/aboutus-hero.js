import React from 'react';
import { FaUserTie, FaHandshake, FaShuttleVan } from 'react-icons/fa';

const Hero = () => {
  const superpowers = [
    {
      title: "Adventure Coordinators",
      icon: <FaUserTie size={50} className="mb-4 text-yellow-500" />,
      description:
        "Our trip leaders are experienced professionals trained by leading travel institutes. With strong leadership skills and a passion for exploration, they ensure every journey is safe, well-managed, and unforgettable.",
    },
    {
      title: "Community Partners",
      icon: <FaHandshake size={50} className="mb-4 text-yellow-500" />,
      description:
        "We collaborate with trusted local vendors who warmly welcome our travelers. These partnerships support local communities while delivering authentic, responsible, and comfortable travel experiences.",
    },
    {
      title: "Driving Experts",
      icon: <FaShuttleVan size={50} className="mb-4 text-yellow-500" />,
      description:
        "Our professional local drivers prioritize safety and comfort, expertly navigating diverse terrains while helping travelers discover both popular routes and hidden destinations.",
    },
  ];

  return (
    <div className="bg-gray-50 flex flex-col items-center px-4 sm:px-8">
      <header className="w-full max-w-screen-md text-center mt-10">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center leading-tight sm:text-xl">
          The Heroes Powering Our Journey of Community Excellence        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 w-full max-w-screen-lg text-center mb-20">
        {superpowers.map((power, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 sm:p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105"
          >
            <div className="text-5xl mb-4">{power.icon}</div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">{power.title}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{power.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
