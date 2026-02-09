import React, { useEffect, useState } from "react";
import Popup1 from "./Popup";
import Popup2 from "./Popup2";

const PopupManager = () => {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  // Timer for Popup1
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setShowPopup1(true);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer1);
  }, []);

  // Timer for Popup2
  useEffect(() => {
    const timer2 = setTimeout(() => {
      setShowPopup2(true);
    }, 30000); // 30 seconds

    return () => clearTimeout(timer2);
  }, []);

  const handleClosePopup1 = () => {
    setShowPopup1(false);
  };

  const handleClosePopup2 = () => {
    setShowPopup2(false);
  };

  return (
    <>
      {showPopup1 && <Popup1 onClose={handleClosePopup1} />}
      {showPopup2 && <Popup2 onClose={handleClosePopup2} />}
    </>
  );
};

export default PopupManager;
