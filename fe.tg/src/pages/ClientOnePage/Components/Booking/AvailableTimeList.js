import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Button } from '@material-ui/core';
import './timeList.scss';
import CustomerAppointmentForm from './CustomerAppointmentForm';
import { fetchRoomName } from '../../../../api/clientBooking-api';
import SeparationLine from '../DecorativeElements/SeparationLine';

export const AvailableTimeList = (props) => {
  const { timeList, myDate } = props;
  const [room, setRoom] = useState('');
  const [startTime, setStartTime] = useState('');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const handlePropagation = (e) => {
    e.stopPropagation();
  };

  const showRef = useRef();
  showRef.current = showAppointmentForm;

  const handleClick = (e, time, fetchDate) => {
    setShowAppointmentForm(true);
    const serviceStartTime = time.split('-')[0];
    setStartTime(serviceStartTime);
    fetchRoomName(fetchDate, serviceStartTime)
      .then((res) => setRoom(res))
      .catch((error) => {
        throw new Error(`Available Time List - handle click ${error}`);
      });
  };

  const cancelModal = () => {
    setShowAppointmentForm(false);
  };

  return (
    <div onClick={handlePropagation} onKeyDown={handlePropagation}>
      <div className="blankSpace" />
      <div className="timeList">
        <p>
          {' '}
          Available Appointments on 
          <b>{myDate}</b>
        </p>
        {!timeList && <p>Loading</p>}
        <ul>
          {timeList.map((item, index) => (
            <div key={index}>
              <SeparationLine />
              <li key={index} className="timeItem">
                <div>
                  <FontAwesomeIcon icon={faClock} color="#73d6ca" spin />
                  &nbsp; &nbsp;
                  <span>{item}</span>
                </div>
                <Button variant="outlined" onClick={(e) => handleClick(e, item, myDate)}>
                  Book
                </Button>
              </li>
            </div>
          ))}
        </ul>
      </div>
      {showAppointmentForm && (
        <CustomerAppointmentForm
          data={[myDate, startTime, room]}
          cancelModal={() => cancelModal()}
        />
      )}
    </div>
  );
};

export default AvailableTimeList;
