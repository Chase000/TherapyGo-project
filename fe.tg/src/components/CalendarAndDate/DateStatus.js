import React from 'react';
import './DateStatus.scss';

const DateStatus = ({ value }) => (
  <div className="date">
    <div>
      Choose an appointment date
      <span> : </span>
      {value}
    </div>
  </div>
);

export default DateStatus;
