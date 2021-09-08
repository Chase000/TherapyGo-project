import React from 'react';
import Calendar from 'react-calendar';
import './CalendarStatus.scss';

const CalendarStatus = ({ onChange, value }) => (
  <div>
    <Calendar onChange={onChange} value={value} className="worksheetCalendar" />
  </div>
);

export default CalendarStatus;
