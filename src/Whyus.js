import React from 'react'
import './Whyus.css'
import happy from './img/happy.png'
import prize from './img/prize.png'
import customer from './img/customer.png'
import booking from './img/booking.png'


const Whyus = () => {
  return (
    <div className='wrapper'>
    <div className="top">
        <h1 className='h-w'>Why Choose Us</h1>
        <p>We help our clients throughout the trip</p>
    </div>

    <div className="info">
        <div className="info-1">
            <img className='img' src={happy} alt="" />
            <p>5000+</p>
            <p>Happy Customers</p>
        </div>

        <div className="info-2">
        <img className='img' src={prize} alt="" />
            <p>Best Prize</p>
            <p>In Industry</p>
        </div>

        <div className="info-3">
        <img className='img' src={customer} alt="" />
            <p>24 x 7</p>
            <p>Customer Services</p>
        </div>

        <div className="info-4">
      
        <img className='img' src={booking} alt="" />
            <p>  Hassle Free</p>
            <p>Bookings</p>
        </div>

    </div>
      
    </div>
  )
}

export default Whyus
