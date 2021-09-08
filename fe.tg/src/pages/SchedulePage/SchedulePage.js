import React, { useState } from 'react';
import './SchedulePage.scss';
import { connect } from 'react-redux';
import axios from 'axios';
import NavBar from '../../components/NavigationBar/NavigationBar';
import StaffInput from './Components/StaffInput/StaffInput';
import Calendar from '../../components/CalendarAndDate/CalendarStatus';
import Schedule from './Components/Schedule/Schedule';
import { fetchWeekSchedule, fetchAllStaff } from '../../store/actions/scheduleAction';

const SchedulePage = (props) => {
  const [date, setDate] = useState(new Date());
  const dateNum = date.getDate();
  const dateMon = date.getMonth() + 1;
  const dateYear = date.getFullYear();
  const myDate = `${dateYear}-${dateMon > 9 ? '' : '0'}${dateMon}-${
    dateNum > 9 ? '' : '0'
  }${dateNum}`;
  const payload = { date: myDate };
  const { fetchWeekScheduleAction, fetchAllStaffAction } = props;
  const token = sessionStorage.getItem('token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  fetchWeekScheduleAction(payload);
  fetchAllStaffAction();

  return (
    <div>
      <NavBar />
      <div className="schedule-page">
        <div className="schedule-page__upper-section">
          <div className="schedule-page__upper-section__calendar">
            <Calendar onChange={setDate} value={date} />
          </div>
          <div className="schedule-page__upper-section__staff-input">
            <StaffInput date={myDate.toString()} />
          </div>
        </div>
        <div className="schedule-page__schedule-section">
          <Schedule />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {};
const mapActionsToProps = {
  fetchWeekScheduleAction: fetchWeekSchedule,
  fetchAllStaffAction: fetchAllStaff,
};

export default connect(mapStateToProps, mapActionsToProps)(SchedulePage);
