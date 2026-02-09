import React from "react";
import "./Card.css";
import Blog1 from "../img/Blog1.png";

const Crd = ({ image, title }) => {
  return (
    <div className="card">
      <img src={image} alt="Card" className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Crd;