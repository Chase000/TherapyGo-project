import React from 'react';
import './Booking.scss';
import MiddleBreak from '../DecorativeElements/MiddleBreak';
import Introduction from './Introduction';
import BookingCalendar from './BookingCalendar';

function Booking() {
  return (
    <div>
      <div className="BookingContainer">
        <div className="BookingContainer-title">
          <h1>Booking</h1>
          <MiddleBreak />
        </div>
        <div className="BookingContainer-content">
          <div className="BookingContainer-content__introduction">
            <Introduction />
          </div>
          <div className="BookingContainer-content__bookingCalendar">
            <BookingCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
