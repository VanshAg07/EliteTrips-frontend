import React, { useEffect, useState } from "react";

const WhyTravello = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const reasons = [
    {
      title: "Curated Experiences",
      description:
        "Handpicked destinations and activities tailored to create unforgettable memories for every traveler.",
      icon: "✨",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-blue-50",
    },
    {
      title: "24/7 Support",
      description:
        "Round-the-clock assistance throughout your journey. We're always just a call away, anytime, anywhere.",
      icon: "🎧",
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-purple-50",
    },
    {
      title: "Best Price Guarantee",
      description:
        "Transparent pricing with no hidden costs. Get the best value for your dream vacation.",
      icon: "💰",
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-green-50",
    },
    {
      title: "Trusted by Thousands",
      description:
        "Join our community of happy travelers who have explored the world with confidence and joy.",
      icon: "❤️",
      color: "from-orange-500 to-yellow-400",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="why-travello-container py-16 px-4 w-full bg-gradient-to-b from-[#f8fafc] to-[#e2e8f0]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
          Why EliteTrips?
        </h2>
        <p className="text-center text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          We make your travel dreams come true with exceptional service and unforgettable experiences
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl ${reason.bgColor} p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Icon circle */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${reason.color} flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {reason.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#03346e] transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {reason.description}
              </p>
              
              {/* Bottom decorative line */}
              <div className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${reason.color} group-hover:w-full transition-all duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-[#03346e]">500+</div>
            <div className="text-gray-600 mt-1">Happy Travelers</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-[#03346e]">50+</div>
            <div className="text-gray-600 mt-1">Destinations</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-[#03346e]">100+</div>
            <div className="text-gray-600 mt-1">Tour Packages</div>
          </div>
          <div className="p-4">
            <div className="text-3xl md:text-4xl font-bold text-[#03346e]">4.9</div>
            <div className="text-gray-600 mt-1">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyTravello;
