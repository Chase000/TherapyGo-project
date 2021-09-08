import React from 'react';
import './HamburgerMenu.scss';
import { slide as Menu } from 'react-burger-menu';

const HamburgerMenu = () => (
  <Menu>
    <a id="home" className="menu-item" href="#pos-homecover">
      Home
    </a>
    <a id="aboutUs" className="menu-item" href="#pos-aboutus">
      About Us
    </a>
    <a id="treatments" className="menu-item" href="#pos-treatments">
      Treatments
    </a>
    <a id="booking" className="menu-item" href="#pos-booking">
      Booking
    </a>
    <a id="healthFunds" className="menu-item" href="#pos-healthfunds">
      Health Funds
    </a>
    <a id="contactUs" className="menu-item" href="#pos-contactus">
      Contact Us
    </a>
    <a id="login" className="menu-item" href="/login">
      Login
    </a>
  </Menu>
  );

export default HamburgerMenu;
