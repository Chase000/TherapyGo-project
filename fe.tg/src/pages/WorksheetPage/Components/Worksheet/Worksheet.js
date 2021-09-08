import React, { useState, useEffect } from 'react';
import './Worksheet.scss';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Scheduler, { Resource } from 'devextreme-react/scheduler';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { roomData } from './data';
import Appointment from './Components/Appointment';
import AppointmentForm from '../../../../components/newAppointment/AppointmentForm';
import EditAppointmentForm from '../../../../components/EditAppointment/EditAppointmentForm';
import {
  fetchStaffList,
  fetchExistAppointment,
  fetchNotification,
} from '../../../../store/actions/worksheetActions';
import AppointmentTooltip from './Components/AppointmentTooltip';

const views = ['day'];
const group = ['roomId'];

const Worksheet = (props) => {
  const [dataL, setDataL] = useState([]);
  const [staffL, setStaffL] = useState([]);
  const { date, staffList, existAppointment } = props;

  useEffect(() => {
    setStaffL(props.staffList);
    setDataL(props.existAppointment);
  }, [staffList, existAppointment]);

  const handleDblClickAppointment = (e) => {
    if (e.appointmentElement) {
      e.cancel = true;
      const {
        therapistName,
        roomId,
        serviceId,
        serviceType,
        bodyParts,
        mobileNumber,
        customerName,
        paymentMethod,
        treatmentPrice,
      } = e.appointmentData;
      const startDate = e.appointmentData.startDate.slice(0, 10);
      const startTime = e.appointmentData.startDate.slice(11, 19);
      const editForm = (
        <EditAppointmentForm
          startDate={startDate}
          startTime={startTime}
          roomId={`table${roomId}`}
          sourceData={dataL}
          refreshPage={props.fetchExistAppointment}
          therapist={therapistName}
          serviceId={serviceId}
          serviceType={serviceType}
          bodyParts={bodyParts}
          mobileNumber={mobileNumber}
          customerName={customerName}
          paymentType={paymentMethod}
          treatmentPrice={treatmentPrice}
        />
      );
      ReactDOM.hydrate(editForm, document.getElementById('appointPage'));
    }
  };

  const handleCellClick = (e) => {
    const ddd = e.cellData.startDate.toLocaleDateString().slice(0, 10);
    const startDay = `${ddd.slice(6, 10)}-${ddd.slice(3, 5)}-${ddd.slice(0, 2)}`;
    const appform = (
      <AppointmentForm
        startDate={startDay}
        startTime={e.cellData.startDate.toLocaleTimeString()}
        roomId={`table${e.cellData.groups.roomId}`}
        sourceData={dataL}
        refreshPage={props.fetchExistAppointment}
      />
    );
    ReactDOM.hydrate(appform, document.getElementById('appointPage'));
  };

  const renderWorksheet = () => (
    <Scheduler
      dataSource={dataL}
      currentDate={date}
      views={views}
      defaultCurrentView="day"
      groups={group}
      startDayHour={8}
      endDayHour={18}
      showAllDayPanel={false}
      crossScrollingEnabled={false}
      cellDuration={10}
      editing={{
        allowAdding: false,
        allowUpdating: false,
        allowDeleting: false,
        allowDragging: false,
      }}
      onAppointmentDblClick={handleDblClickAppointment}
      onCellClick={handleCellClick}
      height="100%"
      appointmentTooltipComponent={AppointmentTooltip}
      appointmentComponent={Appointment}
    >
      <Resource dataSource={roomData} fieldExpr="roomId" label="Room" />
      <Resource dataSource={staffL} fieldExpr="staffId" label="Staff" useColorAsDefault="true" />
    </Scheduler>
  );

  return <div className="worksheetContainer">{renderWorksheet()}</div>;
};

const mapStateToProps = (state) => {
  const { workSheet } = state;
  const { staffList, existAppointment } = workSheet;
  return {
    staffList,
    existAppointment,
  };
};
const mapActionsToProps = {
  fetchStaffList,
  fetchExistAppointment,
  fetchNotification,
};
export default connect(mapStateToProps, mapActionsToProps)(Worksheet);
