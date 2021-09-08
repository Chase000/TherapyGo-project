import React from 'react';
import './Appointment.scss';

const Appointment = (model) => {
  const { data } = model;
  const { appointmentData } = data;
  const { customerName, status } = appointmentData;
  return (
    <div className="colorBlockContainer">
      <div className="colorBlockContainer-top">
        <div className="colorBlockContainer-top__customerName">
          Client Name:
          {customerName}
        </div>
      </div>
      <div className="colorBlockContainer-bottom">
        <div className="colorBlockContainer-bottom__serviceStatus">
          Service Status:
          {status}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
