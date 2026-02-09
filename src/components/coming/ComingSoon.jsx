import React from 'react';
import img from '../../img/comingsoon.jpg';

function ComingSoon() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <img src={img} alt="Coming Soon" className="w-auto h-auto" />
    </div>
  );
}

export default ComingSoon;