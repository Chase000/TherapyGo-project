import React, { useState, useEffect } from 'react';
import './WorksheetPage.scss';
import { connect } from 'react-redux';
import axios from 'axios';
import Worksheet from './Components/Worksheet/Worksheet';
import Searchbar from './Components/DateAndSearch/Searchbar';
import DateStatus from '../../components/CalendarAndDate/DateStatus';
import CalendarStatus from '../../components/CalendarAndDate/CalendarStatus';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import StaffListSection from './Components/StaffListSection/StaffListSection';
import {
  fetchStaffList,
  fetchExistAppointment,
  fetchNotification,
} from '../../store/actions/worksheetActions';

function WorksheetPage(props) {
  const [date, setDate] = useState(new Date());
  const token = sessionStorage.getItem('token');
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  const dateNum = date.getDate();
  const dateMon = date.getMonth() + 1;
  const dateYear = date.getFullYear();
  const myDate = `${dateYear}-${dateMon > 9 ? '' : '0'}${dateMon}-${
    dateNum > 9 ? '' : '0'
  }${dateNum}`;

  useEffect(() => {
    const payload = { date: myDate };

    props.fetchStaffList(payload);
    props.fetchExistAppointment(payload);
  }, [myDate]);

  useEffect(() => {
    const interval = setInterval(() => {
      props.fetchNotification();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="worksheetPageContainer">
      <div className="worksheetPageContainer-navigationBar">
        <NavigationBar />
      </div>
      <div className="worksheetPageContainer-content flexSpaceEve">
        <div className="worksheetPageContainer-content__dateBar">
          <DateStatus
            value={myDate.toString()}
            className="worksheetPageContainer-content__dateBar__date"
          />
          <Searchbar className="worksheetPageContainer-content__dateBar__searchbar" />
        </div>
        <div className="worksheetPageContainer-content__worksheetPart flexRowSpBe">
          <div className="appointPage" id="appointPage" />
          <div className="alertPage" id="alertPage" />
          <div className="worksheetPageContainer-content__worksheetPart--leftBox">
            <div
              className="
          worksheetPageContainer-content__worksheetPart--leftBox__calenderBox flexCenter
            "
            >
              <CalendarStatus onChange={setDate} value={date} />
            </div>
            <div 
              className="worksheetPageContainer-content__worksheetPart--leftBox__staff flexCenter"
            >
              <StaffListSection />
            </div>
          </div>
          <div className="worksheetPageContainer-content__worksheetPart--rightBox flexCenter">
            <Worksheet date={myDate.toString()} value={myDate.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { workSheet } = state;
  const { staffList, existAppointment, notifications } = workSheet;
  return {
    staffList,
    existAppointment,
    notifications,
  };
};

const mapActionsToProps = {
  fetchStaffList,
  fetchExistAppointment,
  fetchNotification,
};

export default connect(mapStateToProps, mapActionsToProps)(WorksheetPage);
