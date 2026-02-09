import React from "react";
import "./Interguide.css"
const Interguide = () => {
  return (
    <div class="travel-guidelines-container">
      <h1 class="guidelines-heading">International Trips Travel Guidelines</h1>
      <p class="guidelines-description">
        For any country which you may plan to travel, make sure to check on the
        travel restrictions or advisory by the government. You must check the
        travel agency well before going ahead with them to avoid the frauds.
      </p>
      <ol class="guidelines-list">
        <li>
          Post pandemic travel has made it compulsory for tourists to be
          vaccinated. Some countries also check the 72 hours RTPCR reports.
        </li>
        <li>
          Check visa requirements and submit the documents beforehand to delay
          the approval which might result in visa cancellation.
        </li>
        <li>
          Having a travel insurance is a plus to protect yourself against
          unforeseen circumstances, including medical emergencies, trip
          cancellation, and loss of personal belongings.
        </li>
        <li>
          Pack light and bring only essential items. Check the weather
          conditions in the country you are visiting and pack accordingly. And
          be aware of the local customs and laws in the country you are
          visiting.
        </li>
        <li>
          Exchange currency before you leave or upon arrival at your destination
          to avoid high exchange rates. It is advisable to carry enough cash in
          hand to avoid the hassles later. Keep the money safe and safeguard
          your valuables.
        </li>
      </ol>
    </div>
  );
};

export default Interguide;
