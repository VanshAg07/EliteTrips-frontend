import React from "react";
import "./Privcy.css";
import Nav from "./Nav";
import FooterSection from "./Footersection";
import Footer from "../Footer";
import Dropnav from "../components/Dropnav";
import MainFooter from "./Footer/MainFooter";

const Privacy = () => {
  return (
    <>
      <Nav />
      <Dropnav />
      <div className="privacy-container">
        <div className="privacy-section">
          <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
          <p className="privacy-text">
            Welcome to EliteTripsIndia Pvt. Ltd ("we," "us," or "our"). We are
            dedicated to protecting your personal information and your right to
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website or utilize
            our services.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-title">Information We Collect</h2>
          <p className="privacy-text">
            <strong>1. Personal Information</strong>
            <br />
            While using our services, we may ask you to provide us with certain
            personally identifiable information that can be used to contact or
            identify you, including but not limited to:
            <ul>
              <li>1) Name</li>
              <li>2) Email Address</li>
              <li>3) Phone Number</li>
              <li>4) Address</li>
              <li>5) Date of Birth</li>
              <li>6) Passport Details</li>
              <li>7) Payment Information (credit/debit card details)</li>
              <li>8) Travel Preferences</li>
            </ul>
          </p>
        </div>

          <p className="privacy-text">
            <strong>2. Usage Data</strong>
            <br />
            We may also collect information that your browser sends whenever you visit our website or when you access the site through a mobile device. 
This Usage Data may include:
            <ul>
              <li>1) Your device's Internet Protocol address (e.g., IP address)</li>
              <li>2) Browser type and version</li>
              <li>3) Pages of our website that you visit</li>
              <li>4) Time and date of your visit</li>
              <li>5) Time spent on those pages</li>
              <li>6) Unique device identifiers</li>
              <li>7) Payment Information (credit/debit card details)</li>
              <li>8) Travel Preferences</li>
            </ul>
          </p>

          <p className="privacy-text pt-6">
            <strong>3. Cookies and Tracking Technologies</strong>
            <br />
            We use cookies and similar tracking technologies to track the activity on our website and store certain information. Cookies are files with a 
small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate 
when a cookie is being sent.
          </p>

        <div className="privacy-section">
          <h2 className="privacy-title"> How We Use Your Information</h2>
          <p className="privacy-text">
          We use the collected data for various purposes:
          <ul>
              <li>1) To Provide Services: Process your bookings, manage your itinerary, and fulfill requests related to your travel plans.</li>
              <li>2) To Communicate: Send you confirmations, updates, and notifications regarding your bookings and inquiries.</li>
              <li>3) To Improve Our Services: Understand how our services are used and enhance the user experience on our website.</li>
              <li>4) To Marketing Purposes: Send you promotional materials, newsletters, and other information that may be of interest to you, subject to your preferences.</li>
              <li>5) To Comply with Legal Obligations: Ensure compliance with applicable laws and regulations.</li>
            </ul>
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-title">Sharing Your Information</h2>
          <p className="privacy-text">
          We may share your personal information in the following situations:
          <ul>
              <li>With Service Providers: We may share your information with third-party vendors and service providers that assist us in delivering our services 
              (e.g., airlines, hotels, car rental companies).</li>
              <li>For Legal Reasons: We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
              <li>In Business Transfers: If we are involved in a merger, acquisition, or asset sale, your personal information may be transferred as part of that transaction.</li>
            </ul>
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-title">Data Security</h2>
          <p className="privacy-text">
          The security of your data is important to us, and we strive to implement and maintain reasonable security procedures and practices appropriate to the nature 
          of the information we store to protect it from unauthorized access, destruction, use, modification, or disclosure.
          </p>
          <p className="privacy-text">
          However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-title">Your Rights</h2>
          <p className="privacy-text">
          Under Indian law, you have certain rights regarding your personal information:
          </p>
          <ul className="privacy-text">
              <li>1) Right to Access: You can request copies of your personal information.</li>
              <li>2) Right to Rectification: You can request correction of any inaccurate or incomplete information we hold about you.</li>
              <li>3) Right to Erasure: You can request deletion of your personal information under certain circumstances.</li>
              <li>4) Right to Restrict Processing: You can request that we restrict the processing of your personal information.</li>
              <li>5) Right to Data Portability: You have the right to request that we transfer the data we have collected to another organization or directly to you, under certain conditions.</li>
            </ul>

            <div className="privacy-section">
          <h2 className="privacy-title"> Links to Other Websites</h2>
          <p className="privacy-text">
          Our policy discloses the privacy practices for our own web site only. Our site provides links to other websites also that are beyond our control. We shall in no way be 
responsible in a way for your use of such sites.
          </p>
        </div>
        
        <h2 className="privacy-title"> Contact Us</h2>
          <p className="privacy-text">
          If you have any questions or concerns about this privacy policy, please contact us at:
          </p>
          <address className="privacy-contact-details">
          EliteTripsINDIA PVT.LTD, <br />
          BOOKING@EliteTrips.COM <br />
          8130160795 <br />
          3rd Floor Plot, <br />
          Kakarola Housing Complex, <br/>
          103, Kakrola Rd, opposite DDA park,  <br/>
          Raju Enclave, Sector 15 Dwarka,  <br/>
          Dwarka, Delhi, 110078
          </address>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default Privacy;
