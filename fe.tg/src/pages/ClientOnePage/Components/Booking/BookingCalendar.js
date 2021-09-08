import React, { useState, useEffect, useRef, memo } from 'react';
import Calendar from 'react-calendar';
import './BookingCalendar.scss';

import { AvailableTimeList } from './AvailableTimeList';
import { fetchTimeList } from '../../../../api/clientBooking-api';

const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const BookingCalendar = memo(() => {
  const [date, setDate] = useState(new Date());
  const [timeList, setTimeList] = useState([]);

  const formatDate = (inputDate) => {
    const dateNum = inputDate.getDate();
    const dateMon = inputDate.getMonth() + 1;
    const dateYear = inputDate.getFullYear();
    const myDate = `${dateYear}-${dateMon > 9 ? '' : '0'}${dateMon}-${
      dateNum > 9 ? '' : '0'
    }${dateNum}`;
    return myDate;
  };

  const myDate = formatDate(date);
  let preDate = usePrevious(date);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (newDate, e) => {
    e.stopPropagation();
    if (preDate) preDate = preDate.toLocaleDateString();
    let currentDate = null;
    if (newDate) currentDate = newDate.toLocaleDateString();
    if (preDate === undefined) setIsOpen(true);
    if (preDate === currentDate) setIsOpen(!isOpen);
    if (preDate !== currentDate) setIsOpen(true);
    const fetchDate = formatDate(newDate);
    fetchTimeList(fetchDate)
      .then((res) => setTimeList(res))
      .catch((error) => {
        throw new Error(`Booking Calendar - handle click ${error}`);
      });
  };

  return (
    <div>
      <div className="BookingCalendarContainer">
        <div className="BookingCalendarContainer__calendar">
          <Calendar onChange={setDate} value={date} minDate={new Date()} onClickDay={handleClick} />
        </div>
        <div className="BookingCalendarContainer__timeList">
          {isOpen ? <AvailableTimeList timeList={timeList} myDate={myDate} /> : null}
        </div>
      </div>
    </div>
  );
});

export default BookingCalendar;
