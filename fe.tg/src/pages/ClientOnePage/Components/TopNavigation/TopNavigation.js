import React from 'react';
import './TopNavigation.scss';

function TopNavigation() {
  return (
    <div className="TopNavigationBar">
      <div className="TopNavigationBar__list">
        <a href="#pos-homecover">HOME</a>
        <a href="#pos-aboutus">ABOUT US</a>
        <a href="#pos-treatments">TREATMENTS</a>
        <a href="#pos-booking">BOOKING</a>
        <a href="#pos-healthfunds">HEALTH FUNDS</a>
        <a href="#pos-contactus">CONTACT US</a>
        <a href="/login">LOGIN</a>
      </div>
    </div>
  );
}

export default TopNavigation;
