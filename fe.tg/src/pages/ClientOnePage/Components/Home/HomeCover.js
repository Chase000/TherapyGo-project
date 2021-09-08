import React from 'react';
import './HomeCover.scss';

function HomeCover() {
  return (
    <div className="HomeCover">
      <div className="HomeCover-title">
        <div className="HomeCover-title__main">TherapyGo</div>
        <div className="HomeCover-title__sub">Relax, Renew, Revive</div>
      </div>

      <div className="HomeCover-content">
        <p className="HomeCover-content__promote-text">
          <em>$10 off</em>
&ensp;for service over&ensp;
          <em>$65</em>
&ensp;on Saturday and Sunday.
          <br />
          * Private Health Insurance Rebate Available Upon Request.
        </p>
      </div>

      <div className="HomeCover-bottom">
        <a href="#pos-booking">CHECK AVAILABILITY</a>
      </div>
    </div>
  );
}

export default HomeCover;
