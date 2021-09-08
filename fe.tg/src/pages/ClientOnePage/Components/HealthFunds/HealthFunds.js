import React from 'react';
import './HealthFunds.scss';
import MiddleBreak from '../DecorativeElements/MiddleBreak';
import HICAPS from '../../../../assets/images/HICAPS.png';

const HealthFunds = () => (
  <div>
    <div className="health-fund">
      <h1>Health Funds</h1>
      <MiddleBreak />
      <h2>HICAPS is now available!</h2>
      <p>
        Enjoy fast claiming on the spot with a wide range of health funds accepted, including but
        not limited to: MEDIBANK, BUPA, ST LUKES, HCF, NIB, AHM and so many more!
        {' '}
      </p>
      <img src={HICAPS} alt="HICAPS" className="health-fund__photo" />
    </div>
  </div>
  );

export default HealthFunds;
