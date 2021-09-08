import React from 'react';
import './LoginPage.scss';
import LoginButton from './LoginButton';
import logo from '../../assets/images/Logo.png'

const LoginPage = () => (
  <div className="main">
    <div className="main__right">
      <div className="main__right__top">
        <img src={logo} alt="Logo of TherapyGo Company." />
        <h1>THERAPY GO</h1>
        <h4>RELAX, RENEW, REVIVE</h4>
      </div>
      <LoginButton />
    </div>
  </div>
);

export default LoginPage;
