import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Worksheet.scss';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import { roomData, staffData } from './data';
import Appointment from './Components/Appointment';
import { getAvailableStaffList, getAvailableServiceList } from '../../../../api/worksheet';

const views = ['day'];
const group = ['roomId'];

const Worksheet = (props) => {
  const [dataL, setDataL] = useState([]);
  const {date} = props;

  useEffect(() => {
    async function fetchServiceList() {
      await getAvailableStaffList(date);
      const serviceList = await getAvailableServiceList(date);
      setDataL(serviceList);
      setWorksheet(renderWorksheet);
    }
    fetchServiceList();
  }, [date]);

  const renderWorksheet = () => (
    <Scheduler
      onOptionChanged={handlePropertyChange}
      dataSource={dataL}
      defaultCurrentDate={date}
      views={views}
      defaultCurrentView="day"
      groups={group}
      startDayHour={8}
      endDayHour={18}
      showAllDayPanel={false}
      crossScrollingEnabled={false}
      cellDuration={30}
      editing={{
          allowAdding: false,
          allowUpdating: false,
          allowDeleting: false,
          allowDragging: false,
        }}
      onAppointmentDblClick={handleDblClickAppointment}
      onCellClick={handleCellClick}
      height="100%"
      appointmentComponent={Appointment}
    >
      <Resource dataSource={roomData} fieldExpr="roomId" label="Room" />
      <Resource
        dataSource={staffData}
        fieldExpr="staffId"
        label="Staff"
        useColorAsDefault="true"
      />
    </Scheduler>
    );
  const [worksheet, setWorksheet] = useState(renderWorksheet);

  return <div className="worksheetContainer">{worksheet}</div>;
};

const handlePropertyChange = (e) => {
  if (e.name === 'date') {
    console.log(`Date has changed, new date state will be ${e.value}`);
  } else if (e.name === 'selectedCellData') {
    console.log(e);
  }
};

const handleDblClickAppointment = (e) => {
  if (e.appointmentElement) {
    e.cancel = true;
    window.alert('there is an appointment');
  }
};

const butt = () => (
  <div color="blue" shadowSize={2}>
    Click Me
  </div>
);
const handleCellClick = (e) => {
  console.log(e);
  const a = React.createElement(butt, { className: 'test' }, 'clickme');
  console.log(a);
};

export default Worksheet;
