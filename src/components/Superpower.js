import React from 'react';

const SuperpowerZone = () => {
  const superpowers = [
    {
      icon: '🤝',
      title: 'Team Escapades',
      description: 'Bring your team together for an exciting day of shared experiences and laughter outside the workplace.',
    },
    {
      icon: '💼',
      title: 'Corporate Adventures',
      description: 'Enhance team dynamics and productivity through adventures that transform aspirations into achievements.',
    },
    {
      icon: '🏆',
      title: 'Inspiration Expedition',
      description: 'Join your work crew for an exciting day that fuels inspiration and teamwork in a fresh setting.',
    },
    {
      icon: '🏖️',
      title: 'Work Retreats',
      description: 'Why work from the same place when you can achieve your goals in inspiring environments with our Work Retreats?',
    },
    {
      icon: '📅',
      title: 'Workshops',
      description: 'Turn typical workshops into inspiring adventures that blend skill-building, networking, and real-world applications.',
    },
    {
      icon: '🏛️',
      title: 'Exhibition',
      description: 'Uncover opportunities, network, and ignite creativity while enhancing your brand at global exhibitions.',
    },
  ];

  return (
    <div className="bg-gray-50 flex flex-col items-center px-4 sm:px-8">
      <header className="w-full max-w-screen-md text-center mt-10">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-center leading-tight sm:text-xl">
          Our <span>Strengths</span> Hub
        </h1>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 w-full max-w-screen-lg text-center mb-20">
        {superpowers.map((power, index) => (
          <div key={index} className="flex flex-col items-center p-4 sm:p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105">
            <div className="text-5xl mb-4">{power.icon}</div> {/* Icon */}
            <h2 className="text-lg sm:text-xl font-semibold mb-2">{power.title}</h2>
            <p className="text-gray-600 text-sm sm:text-base">{power.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperpowerZone;
