import React, { useState, useEffect } from 'react';
import './Worksheet.scss';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { data, roomData, staffData } from './data';
import Appointment from './Components/Appointment';

const views = ['day'];
const group = ['roomId'];

const WorksheetContent = (props) => {
  <div className="worksheetContainer">
    <Scheduler
      dataSource={data}
      views={views}
      defaultCurrentDate={props.currentDate}
      defaultCurrentView="day"
      groups={group}
      startDayHour={0}
      endDayHour={24}
      showAllDayPanel={false}
      crossScrollingEnabled={false}
      cellDuration={30}
      editing={{ allowUpdating: false }}
      height="100%"
      appointmentComponent={Appointment}
    >
      <Resource dataSource={roomData} fieldExpr="roomId" label="Room" />
      <Resource dataSource={staffData} fieldExpr="staffId" label="Staff" useColorAsDefault="true" />
    </Scheduler>
  </div>;
};

const Worksheet = ({ value }) => {
  const [date, setDate] = useState(value);
  useEffect(() => () => <WorksheetContent currentDate={value} />, [value]);
};

export default Worksheet;
