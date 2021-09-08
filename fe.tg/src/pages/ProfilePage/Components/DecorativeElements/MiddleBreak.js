import React from 'react';
import './MiddleBreak.scss';
import feather from '../../../../assets/images/feather.PNG';

function MiddleBreak() {

return (
  <div className="MiddleBreakContainer">
    <hr className="MiddleBreakContainer__lefthr" />
    <img src={feather} alt="feather icon" className="MiddleBreakContainer__img" />
    <hr className="MiddleBreakContainer__righthr" />
  </div>
);

}

export default MiddleBreak;