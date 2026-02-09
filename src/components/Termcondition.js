import React from "react";
import "./T&c.css";
import Nav from "./Nav";
import FooterSection from "./Footersection";
import Footer from "../Footer";
import Dropnav from "../components/Dropnav";
import MainFooter from "./Footer/MainFooter";

const Termcondition = () => {
  return (
    <>
      <Nav />
      <Dropnav />
      <div className="terms-container">
        <div className="terms-section">
          <h1 className="text-3xl font-bold mb-6 text-center">Terms & Conditions</h1>
          <p className="terms-text">
            EliteTripsand its organizers strictly prohibit the utilization of
            any Narcotics and Banned Substances during the tours and would not
            be responsible for any adversities due to the same.
          </p>
          <p className="terms-text">
            Weapon, Fireworks and toxic substances are not allowed at this Tour
            Management would not be responsible for any person who has been
            found guilty under the Indian Law. Please cooperate with us in
            keeping the environment clean and safe. All guests must carry a
            Govt. issued Valid ID Card Registrations/Tickets once booked cannot
            be exchanged, cancelled or refunded. EliteTripsis not responsible
            for your whereabouts or safety if you are outside the hotel
            premises.
          </p>
          <p className="terms-text">
            EliteTripswon't be responsible for any loss or damage of Goods
            belonging to the travelers. Management accepts no responsibility for
            injuries or the loss/theft of any personal property during the tour.
            The organizers reserve the rights to evict any traveler anytime
            without any refund, if his/her actions violates any hotel rules or
            incase of any misbehavior with our co travelers. Only travelers
            staying with T10 will be allowed Hotel & if you intend to bring
            guests from outside, you have to pre-notify us.
          </p>
          <p className="terms-text">
            EliteTripsis not responsible for any delay or alterations in the
            program or indirectly incurred expenses in cases such as natural
            hazards, accidents, weather conditions, landslides, political
            closure/ any untoward incident.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="terms-title">Safety And Precautions</h2>
          <p className="terms-text">
            Committed to delivering a clean and safe environment through health
            and safety protocols. One of our highest priorities is the health,
            safety, and security of our guests, and team members. COVID-19 has
            fundamentally changed the way we live, and we are adjusting our
            daily operations to fit within the new normal. In response to this,
            we and a team of experts have reviewed our existing health and
            safety processes and developed a new safety protocol. This in depth
            cleanliness and disinfection protocol and is designed to ensure your
            safety and peace of mind from travelling to check-in to check-out.
            Increasing eleaning and disinfection frequency throughout the
            premises, with a special focus on recreational and relaxation areas.
            Increasing cleaning and disinfecting frequency of Kids Clubs, paying
            attention to high-touch items. Implementing physical distancing
            measures in outside spaces. Increase cleaning and disinfection
            frequency of all hotel areas, paying special attention to high touch
            items.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="terms-title"> Important:</h2>
          <p className="terms-text">
            If the trip gets cancelled by EliteTripsdue to any new guidelines
            or some changes or government precautions on Covid-19, The booking
            amount i.e. INR 2000/- -OR whatever we take will get refunded to the
            respective traveler. But, the train cancellation charges will apply
            i.e. to be paid by the traveler himself/herself (as per the govt,
            say)-the amount will be deducted from INR 3000/- & rest amount will
            be refunded. (we won't take any extra charges from you for our
            personal loss)
          </p>
          <p className="terms-text">
            If the traveler plans to change the property for stay in God after
            reaching there fact that she/he has paid rest of the amount then,
            only 50% of the amount
          </p>
          <p className="terms-text">
            will be refunded to the traveler. (booking amount still remains
            non-refundable L.E. INR 3000/-)
          </p>
          <p className="terms-text">
            If the Traveler wants to extend the tour on personal basis then
            she/he needs to make a confirmation by their parents/ guardian for
            the same & responsibility of the company ends at this point of time.
          </p>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Termcondition;
