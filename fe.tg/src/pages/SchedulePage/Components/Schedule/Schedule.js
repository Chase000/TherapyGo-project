import React, { useState, useEffect } from 'react';
import './Schedule.scss';
import { connect } from 'react-redux';

const Schedule = (props) => {
  const [scheduleList, setScheduleList] = useState([]);
  const { weekSchedule } = props;
  const weekList = weekSchedule;

  useEffect(() => {
    setScheduleList(weekList);
  }, [weekList]);

  const renderScheduleHeader = () => (
    <tr>
      <th className="schedule-container__date">Date</th>
      <th className="schedule-container__available-staff-header">Available Staff</th>
    </tr>
    );

  const renderScheduleData = () => scheduleList.map((schedule, index) => {
      const { date, staffList } = schedule;
      return (
        <tr key={index}>
          <td className="schedule-container__date">
            <div className="td-name">{date}</div>
          </td>
          <td className="schedule-container__available-staff">
            {staffList.map((staff, i) => (
              <div className="schedule-container__available-staff__staffName" key={i}>
                <div className="td-name">{staff}</div>
              </div>
            ))}
          </td>
        </tr>
      );
    });

  return (
    <table className="schedule-container">
      <thead>{renderScheduleHeader()}</thead>
      <tbody>{renderScheduleData()}</tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  const { schedule } = state;
  const { weekSchedule, allStaffList } = schedule;
  return {
    weekSchedule,
    allStaffList,
  };
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Schedule);
