import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { IconContext } from 'react-icons';
import MenuIcon from '@material-ui/icons/Menu';
import { SidebarData } from './SidebarData';

const Navbar = ({ onChange, value }) => {
  if (value) {
    return (
      <div className="profile-navbar">
        <div className="profile-navbar__menu">
          <MenuIcon onClick={() => onChange(!value)} className="profile-navbar__menu__icon" />
        </div>
        <div className="profile-navbar__header">
          <div className="profile-navbar__header__btn" />
          <h3>TherapyGo</h3>
        </div>
        <div className="profile-navbar__box">
          <IconContext.Provider value={{ color: 'white' }}>
            {SidebarData.map((item, index) => (
              <div key={index} className="profile-nav-contain">
                <div key={index} className="profile-nav-contain__icon">
                  <Link to={item.path}>{item.icon}</Link>
                </div>
                <div key={index} className="profile-nav-contain__text">
                  <Link to={item.path}>{item.title}</Link>
                </div>
              </div>
              ))}
          </IconContext.Provider>
        </div>
      </div>
    );
  } 
    return (
      <div className="small-navbar">
        <div className="small-navbar__menu">
          <MenuIcon onClick={() => onChange(!value)} className="profile-navbar__menu__icon" />
        </div>
        <div className="profile-navbar-small-text-box">
          <IconContext.Provider value={{ color: 'white' }}>
            {SidebarData.map((item, index) => (
              <div key={index} className="small-nav-text">
                <Link to={item.path}>{item.icon}</Link>
              </div>
              ))}
          </IconContext.Provider>
        </div>
      </div>
    );
  
};

export default Navbar;
