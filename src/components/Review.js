import React from "react";
import image1 from '../img/homeglry1.png';  
import image2 from '../img/homeglry2.png';
import image3 from '../img/homeglry3.png';
import image4 from '../img/homeglry4.png';
import image5 from '../img/homeglry5.png';
import image6 from '../img/homeglry6.png';


const testimonials = [
  {
    name: "Suganddha Srivastava",
    image: image1, 
    text: "It was a great experience. It was my 1st trip and i am totally satisfied with the trip. From day-0 to last day. Each and everything was upto mark...",
    link: "https://www.google.com/maps/contrib/111246981183817513719?hl=en-GB&ved=1t:31294&ictx=111 ", 
  },
  {
    name: "Sourabh Kumar",
    image: image2,
    text: "The trip was nicely organised. Well executed and the tour agency keeps us updated regarding our stay and weather conditions.the trip was exciting and full of fun...",
    link: "https://www.google.com/maps/contrib/108265947728680746954?hl=en-GB&ved=1t:31294&ictx=111", 
  },
  {
    name: "Archana Awati",
    image: image3,
    text: "It was really a good experience🙌 Every arrangements was too good to stay Mr. Dhurv and Imran  is very supportive, looking forward for same in future as well...",
    link: "https://www.google.com/maps/contrib/107576252700218379342?hl=en-GB&ved=1t:31294&ictx=111", 
  },
  {
    name: "Durgesh shrama",
    image: image4,
    text: "This was my first experience of traveling through any travel agent And I'm glad he's a traveler EliteTrips. Our entire group had very good hotel and food facilities...",
    link: "https://www.google.com/maps/contrib/100009953611017844363?hl=en-GB&ved=1t:31294&ictx=111", 
  },
  {
    name: "shakeel ahmed",
    image: image5,
    text: "Trip was awesome, Thank you for making my trip absolute perfection! This trip was amazing because of you.trip was awesome & memorable. I will join you once again...",
    link: "https://www.google.com/maps/contrib/102821257312318355982?hl=en-GB&ved=1t:31294&ictx=111", 
  },
  {
    name: "Pavan Karri",
    image: image6,
    text: "Good Travel Agency with multiple travel package options. Hotel bookings are very nice, all hotels are hygienic and well maintained along with good food.Thanks for...", 
    link: "https://www.google.com/maps/contrib/116307069423064573360?hl=en-GB&ved=1t:31294&ictx=111", 
  },
];

const TestimonialCard = ({ name, image, text, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-[#0a0a0a] shadow-md p-4 text-sm sm:text-base lg:text-lg transition-all duration-300">
      <div className="flex items-center mb-2">
        <img src={image} alt={name} className="w-10 h-10 rounded-full mr-4" />
        <div>
          <h3 className="font-bold text-gray-800">{name}</h3>
          <div className="text-yellow-400 text-xs sm:text-sm">
            ★★★★★
          </div>
        </div>
      </div>
      <p className="text-gray-600">{text}</p>
      <div className="text-right"> {/* Align the button to the right */}
        <a 
          href={link} 
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security best practice
          className="mt-4 inline-block text-red-600 font-semibold text-sm sm:text-base transition duration-200"
        >
          Continue Reading
        </a>
      </div>
    </div>
  );
};


const Testimonials = () => {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-[#ffffe6] w-4/5 mx-auto">
      <h2 className="text-center md:text-2xl text-xl lg:text-4xl font-bold md:mb-8 mb-2">
      Narratives of the Travelers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
