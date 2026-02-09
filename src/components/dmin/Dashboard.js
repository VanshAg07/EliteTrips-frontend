import React, { useState } from "react";
import States from "./States/States";
import FooterIconsManager from "./Dashboard/FooterIconsManager";
import OurTeam from "./Dashboard/OurTeam";
import HomeGallery from "./Dashboard/HomeGallery";
import PromotionalBanner from "./Dashboard/PromotionalBanner";
import HomePageBannerCards from "./Dashboard/HomePageBannerCards";
import HomeInternationalComponent from "./Dashboard/HomeInternationalComponent";
import HomeNationalComponent from "./Dashboard/HomeNationalComponent";
import HomeHoneymoon from "./Dashboard/HomeHoneymoon";
import OfferHomePage from "./Dashboard/OfferHomePage";
import NavOfferComponent from "./Dashboard/NavOffer";
import HeroImage from "./Dashboard/HeroImage";
import PackagesVideo from "./Dashboard/PackagesVideo";
import CorporatePartners from "./Dashboard/Corporate/CorporatePartners";
import CorporateHome from "./Dashboard/Corporate/CorporateHome";
import Flipcard from "./FlipCard/Flipcard";
import AddBackground from "./AddBackground";
import YoutubeDetails from "./Dashboard/YoutubeDetails";
import GalleryPage from "./Dashboard/GalleryPage";
import HallOfFrame from "./Dashboard/HallOfFrame";
import PaymentPage from "./PaymentPage";
import ReelVideo from "./Dashboard/ReelVideo";
import AuthImage from "./Dashboard/AuthImage";
import StateImages from "./Dashboard/StateImages";
import PageGallery from "./Dashboard/PageGallery";
function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const items = [
    { name: "States", component: <States /> },
    {
      name: "HomePage Banner Cards",
      component: <HomePageBannerCards />,
    }, // Replace with actual component
    {
      name: "Home Image Gallery",
      component: <HomeGallery />,
    }, // Replace with actual component
    { name: "Footer Details", component: <FooterIconsManager /> },
    { name: "Team Details", component: <OurTeam /> },
    {
      name: "Promotional Banner",
      component: <OfferHomePage />,
    }, // Replace with actual component
    {
      name: "HomePage National Details",
      component: <HomeNationalComponent />,
    }, // Replace with actual component
    {
      name: "HomePage International Details",
      component: <HomeInternationalComponent />,
    }, // Replace with actual component
    {
      name: "HomePage Honeymoon Details",
      component: <HomeHoneymoon />,
    },
    {
      name: "Nav Bar Details",
      component: <NavOfferComponent />,
    },
    {
      name: "Hero Image",
      component: <HeroImage />,
    },
    {
      name: "Packages Video",
      component: <PackagesVideo />,
    },
    {
      name: "Corporate Partners",
      component: <CorporatePartners />,
    },
    {
      name: "Corporate Home",
      component: <CorporateHome />,
    },
    {
      name: "Flipcard",
      component: <Flipcard />,
    },
    {
      name: "Main Pages Background Images",
      component: <AddBackground />,
    },
    {
      name: "Youtube",
      component: <YoutubeDetails />,
    },
    {
      name: "Hall Of Frame",
      component: <HallOfFrame />,
    },
    {
      name: "Payment Page",
      component: <PaymentPage />,
    },
    {
      name: "Reel Video",
      component: <ReelVideo />,
    },
    {
      name: "Login/Sign Pages",
      component: <AuthImage />,
    },
    {
      name: "National, International,Honeymoon Card Images",
      component: <StateImages />,
    },
    // {
    //   name: "Gallery Page",
    //   component: <PageGallery />,
    // },
  ];
  const handleCardClick = (component) => {
    setSelectedComponent(component);
  };
  return (
    <div className="dashboard-container">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="card p-4 border border-gray-300 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition-all"
            onClick={() => handleCardClick(item.component)}
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
          </div>
        ))}
      </div>

      <div className="mt-8">
        {selectedComponent ? (
          <div className="selected-component p-4 border-t border-gray-300">
            {selectedComponent}
          </div>
        ) : (
          <p className="text-gray-500">Select a card to view the details.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
