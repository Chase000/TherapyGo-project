import React from 'react';
import './History.scss';
import TopContainer from "../Components/TopContainer"
import NewAppointmentTable from "../Components/NewAppointmentTable/NewAppointmentTable"

function History() {
  return (
    <div className="history">
      <div className="history__top">
        <TopContainer />
      </div>
      <div className="history__body">
        <h1>Appointment List</h1>
        <NewAppointmentTable />
      </div>
    </div>
  );
}

export default History;