import React from 'react';
import './Footer.scss';

const Footer = () => (
  <div className="footer">
    &copy;
    {new Date().getFullYear()}
    {' '}
    Copyright: Team Stacked
  </div>
);

export default Footer;
