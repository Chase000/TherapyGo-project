import React from 'react';
import './AppointmentTooltip.scss';

const AppointmentTooltip = (model) => {
  const { data } = model;
  const { appointmentData } = data;
  const { bodyParts, serviceType, serviceTime, treatmentPrice } = appointmentData;
  const serviceItemBind = `${serviceType}, ${bodyParts}`;
  const serviceItem = serviceItemBind.substring(0, serviceItemBind.length - 8);
  return (
    <div className="tooltipContainer">
      <div>
        Service Item:
        {serviceItem}
      </div>
      <div>
        Service Time:
        {serviceTime}
      </div>
      <div>
        Price: $
        {treatmentPrice}
      </div>
    </div>
  );
};

export default AppointmentTooltip;
