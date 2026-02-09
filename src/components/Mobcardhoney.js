import React, { useEffect, useState } from "react";
import underline from "../img/underline.png"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import axios from "axios";

export default function Card() {
  const [stateData, setStateData] = useState({
    national: [],
    international: [],
    honeymoon: [],
  });

  useEffect(() => {
    fetchStateNames();
  }, []);

  // Fetch state names from the API
  const fetchStateNames = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/flip-card/flip"
      );
      setStateData(response.data); // Assuming the response data is in the expected format
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  // Prepare card data based on fetched states
  const cardData =
    stateData.honeymoon?.map((item) => ({
      id: item.stateName, // Assuming stateName is unique
      title: item.stateName,
      offerPrice: `${item.flipOfferPrice}/-`, // Adjust price format if necessary
      currency: "Starting Price Rs.",
      image: item.flipcardImage[0], // Taking the first image
      label: `${item.flipPrice}/-`, // Set label same as offer price
      url: `/places/${item.stateName}`, // Modify URL path as needed
    })) || [];
    
  return (
    <div className="">
      <div className="flex justify-between items-center mb-4 h-[10vh]">
        <div className="flex mt-40 ml-4 flex-col">
          <h1 className="text-lg font-bold">Honeymoon Packages</h1>
          <img src={underline} alt="underline" className="w-40 -mt-16" />
        </div>
        <a href="/national" className="text-red-500 text-sm mr-4">
          See All
        </a>
      </div>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {cardData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="product-card">
              {item.label ? (
                <div className="dealTag">
                  <span className="">Customised</span>
                  {/* {item.offerPrice}/ */}
                </div>
              ) : (
                ""
              )}
              <div className="product_card_info">
                <div className="product_image">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    crossOrigin="anonymous"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                    }}
                  />
                  <a href={item.url} title={item.title}></a>
                </div>
                <div className="product_wrapper">
                  <a href={item.url}>
                    <div className="product_name">{item.title}</div>
                  </a>
                  <div className="new-price">
                    {item.currency} {item.label}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
