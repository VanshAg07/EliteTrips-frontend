import React from "react";
import "./Cancellation.css";
import Nav from "./Nav";
import FooterSection from "./Footersection";
import Footer from "../Footer";
import Dropnav from "../components/Dropnav"
import MainFooter from "./Footer/MainFooter";

const Cancellation = () => {

  return (
    <>
    <Nav />
    <Dropnav />
    <div className="cancel-container">
    <div className="cancellation-container">

      <div className="cancellation-header">
        <h1 className="text-3xl font-bold mb-6 text-center">Cancellation Policy</h1>
        <p className="cancellation-intro">
        NO REFUND SHALL BE MADE WITH RESPECT TO THE INITIAL BOOKING AMOUNT FOR ANY OF THE CANCELLATIONS. HOWEVER,
        </p>
      </div>

      <div className="table-container">
        <h1 className="package-title"></h1>
        <p className="policy-text">Cancellation Policy</p>
        <table className="cancellation-table">
          <thead>
            <tr>
              <th>Number Of Days Prior To Tour Date</th>
              <th>Cancellation Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>If cancellations are made 30 days before the start date of the trip.</td>
              <td>50% of the trip cost will be charged as cancellation fees.</td>
            </tr>
            <tr>
              <td>If cancellations are made 15-30 days before the start date of the trip,</td>
              <td>75% of the trip cost will be charged as cancellation fees.</td>
            </tr>
            <tr>
              <td>If cancellations are made within 0-15 days before the start date of the trip.</td>
              <td>100% of the trip cost will be charged as cancellation fees.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="cancellation-intro">
      In the case of unforeseen weather conditions or government restrictions, certain activities may be cancelled and in such cases, the operator
      will try his best to provide an alternate feasible activity. However, no refund will be provided for the same.
        </p>
    </div>
    </div>
    <MainFooter />
    </>
  );
};

export default Cancellation;
