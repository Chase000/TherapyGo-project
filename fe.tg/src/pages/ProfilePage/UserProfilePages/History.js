import React from 'react';
import './History.scss';
import TopContainer from "../Components/TopContainer"
import OrderHistoryTable from "../Components/OrderHistoryTable/OrderHistoryTable"

function History() {
  return (
    <div className="history">
      <div className="history__top">
        <TopContainer />
      </div>
      <div className="history__body">
        <h1>Order History List</h1>
        <OrderHistoryTable />
      </div>
    </div>
  );
}

export default History;
