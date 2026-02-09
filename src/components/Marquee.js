import React, { Component } from "react";

import './Marquee.css';
import img1 from "../img/dubai.jpg";
import img2 from "../img/Maldives.jpg";
import img3 from "../img/Europe.jpg";
import img4 from "../img/bali.jpg";
import img5 from '../img/HimachalPradesh.png';
import img6 from '../img/Uttarakhand.png';
import img7 from '../img/Kashmir.png';
import img8 from '../img/kerala.png';
import img9 from '../img/goa.png';
import img10 from '../img/karnataka.png';

export default class Marquee extends Component {
  render() {
    const images = [
      { src: img1 },
      { src: img2 },
      { src: img3 },
      { src: img4 },
      { src: img5 },
      { src: img6 },
      { src: img7 },
      { src: img8 },
      { src: img9 },
      { src: img10 }
    ];

    // Duplicate the images array to create a seamless loop
    const duplicatedImages = [...images, ...images];

    return (
      <div className="marquee-container">
        <h1>Most Loved Destinations</h1>
        <div className="marquee">
          {duplicatedImages.map((image, index) => (
            <img key={index} src={image.src} alt={`Image ${index + 1}`} className="marquee-image" />
          ))}
          
        </div>
        <div>
        </div>
      </div>
    );
  }
}