import React from 'react';
import './OrderHistoryTable.scss';
import { connect } from 'react-redux';
import moment from 'moment';

const getDataPerPage = (orderHistoryData, rowsPerPage) => {
  const currentDate = Date.parse(moment().format('YYYY-M-DD'));
  const orderHistorySortData = orderHistoryData.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date));
  const newService = [];
  let i = 0;
  for (i = 0; i < orderHistorySortData.length; i += 1) {
    if (currentDate - Date.parse(orderHistorySortData[i].date) > 0) {
      newService.push(orderHistorySortData[i]);
    }
  }
  let result = [];
  if (newService.length <= rowsPerPage) {
    result = newService;
  } else {
    result = newService.slice(0, rowsPerPage);
  }
  return result;
};

const OrderHistoryTable = (props) => {
  let orderHistoryData = [];
  const { orderHistory } = props;
  if (orderHistory.length !== 0) {
    const { serviceList } = orderHistory;
    if (serviceList !== undefined) {
      orderHistoryData = serviceList;
    }
  }

  const orderHistoryPerPage = getDataPerPage(orderHistoryData, 5);
  const currentDate = moment().format('YYYY-M-DD');

  return (
    <div className="order-history">
      <div className="activity-card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Service</th>
                <th>Staff</th>
                <th>Duration</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderHistoryPerPage.map((order, index) => currentDate > order.date ? (
                <tr key={index}>
                  <td>{order.date}</td>
                  <td>{order.time}</td>
                  <td>{order.treatmentBodyPart}</td>
                  <td>{order.therapist}</td>
                  <td>{order.serviceDuration}</td>
                  <td>{order.price}</td>
                  <td>{order.paymentStatus}</td>
                </tr>
                ) : null)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="table-footer">
        <h3>We only provide data for the 5 most recent appointments on this page.</h3>
        <h3>Please feel free to contact us if you need any further information.</h3>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const { userProfile } = state;
  const { userInformation, orderHistory } = userProfile;
  return {
    userInformation,
    orderHistory,
  };
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(OrderHistoryTable);
