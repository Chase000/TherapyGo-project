import React from 'react';
import './ContactUs.scss';
import MiddleBreak from "../DecorativeElements/MiddleBreak";
import ShopDetails from './ShopDetails';
import Form from './Form';
import Map from './Map';

const ContactUs = () => {
  const navigateToFB = () => {
    window.open('https://www.facebook.com/ritasorientalmassage/', '_blank');
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <MiddleBreak />
      <div className="contact-us__middle-section">
        <ShopDetails navigateToFB={navigateToFB} />
        <Form />
      </div>
      <div className="contact-us__map-section">
        <Map />
      </div>
    </div>
  );
};

export default ContactUs;
