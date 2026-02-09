import React from 'react';
import Nav from "./components/Nav.js";
import Dropnav from "./components/Dropnav.js";
import MainFooter from "./components/Footer/MainFooter.js";
import Forms from "./components/Forms.js";

const Form = () => {
  return (
    <>
    <Nav />
    <Dropnav />
    <div className='bg-[#ffffe6] pb-[20px] pt-[120px]'>
    <Forms />  
    </div>
    <MainFooter />
    </>
  );
};

export default Form;
