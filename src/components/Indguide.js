import React from "react";
import "./Indguide.css"
const Indguide = () => {
  return (
    <div class="travel-guidelines-container">
      <h1 class="guidelines-heading">India Trips Travel Guidelines</h1>
      <ol class="guidelines-list">
        <li>
        Travellers should ensure that their passport is valid for atleast six months and has a Visa stamp in it.
        </li>
        <li>
        Travellers should have both the doses of the COVID-19 vaccinations.
        </li>
        <li>
        Travellers from China, Hong Kong, Singapore,Thailand and Japan do not need to get pre departure COVID testing anymore.
        </li>
        <li>
        All travellers arriving from outside of India need to follow all the necessary Covid protocols, and must wear mask if required.
        </li>
        <li>
        Any traveller catching the symptoms of Covid-19 must islote themselves and inform the nearest medical facility about the same.
        </li>
      </ol>
    </div>
  );
};

export default Indguide;
