import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import TopContainer from '../Components/TopContainer';

const getNextService = (orderHistoryData) => {
  const currentDate = Date.parse(moment().format('YYYY-M-DD'));
  let i;
  const newService = [];
  const orderHistorySortData = orderHistoryData.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date));
  for (i = 0; i < orderHistorySortData.length; i += 1) {
    if (currentDate - Date.parse(orderHistorySortData[i].date) < 0) {
      newService.push(orderHistorySortData[i].date);
    }
  }
  if (newService.length === 0) {
    newService.push('No Appointment');
  }
  return newService;
};

const getLastService = (orderHistoryData) => {
  const currentDate = Date.parse(moment().format('YYYY-M-DD'));
  let i;
  const newService = [];
  const orderHistorySortData = orderHistoryData.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date));
  for (i = 0; i < orderHistorySortData.length; i += 1) {
    if (currentDate - Date.parse(orderHistorySortData[i].date) > 0) {
      newService.push(orderHistorySortData[i].date);
    }
  }
  if (newService.length === 0) {
    newService.push('No Appointment');
  }
  return newService;
};

const getMemberPoints = (orderHistoryData) => {
  let totalPayment = 0;
  for (let i = 0; i < orderHistoryData.length; i += 1) {
    if (orderHistoryData[i].paymentStatus === 'Paid') {
      totalPayment += orderHistoryData[i].price;
    }
  }
  return totalPayment / 10;
};
const getDataPerPage = (orderHistoryData, rowsPerPage) => {
  let result = [];
  if (orderHistoryData.length < 4) {
    result = orderHistoryData;
    const emptyNumber = result.length;
    for (let j = emptyNumber; j < rowsPerPage; j += 1) {
      const OrderInfo = {
        date: '',
        OrderNumber: j + 1,
        time: '',
        treatmentBodyPart: '',
        serviceDuration: '',
        therapist: '',
        paymentStatus: '',
        roomId: '',
        serviceStatus: '',
      };
      result.push(OrderInfo);
    }
  } else if (orderHistoryData.length === rowsPerPage) {
    result = orderHistoryData;
  } else {
    const endNumber = orderHistoryData.length - 1;
    const startNumber = orderHistoryData.length - 1 - rowsPerPage;
    result = orderHistoryData.slice(startNumber, endNumber);
  }
  return result;
};

function Home(props) {
  let orderHistoryData = [];
  const { orderHistory } = props;
  if (orderHistory.length !== 0) {
    if (orderHistory.serviceList !== undefined) {
      orderHistoryData = orderHistory.serviceList;
    }
  }
  const orderHistoryPerPage = getDataPerPage(orderHistoryData, 4);
  const nextServiceTime = getNextService(orderHistoryData);
  const lastServiceTime = getLastService(orderHistoryData);
  const memberPoints = getMemberPoints(orderHistoryData);
  const { userInformation } = props;
  const { firstName, mobile, email } = userInformation;
  return (
    <div className="home">
      <div className="home__top">
        <TopContainer />
      </div>
      <main>
        <h2 className="dash-title">Overview</h2>
        <div className="dash-cards">
          <div className="card-single">
            <div className="userProfile-card-body">
              <span className="ti-briefcase" />
              <div>
                <h5>Last Service</h5>
                <h4>{lastServiceTime[0]}</h4>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/userProfile/History">View all</Link>
            </div>
          </div>

          <div className="card-single">
            <div className="userProfile-card-body">
              <span className="ti-briefcase" />
              <div>
                <h5>Next Service</h5>
                <h4>{nextServiceTime[nextServiceTime.length - 1]}</h4>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/userProfile/Appointment">View all</Link>
            </div>
          </div>

          <div className="card-single">
            <div className="userProfile-card-body">
              <span className="ti-check-box" />
              <div>
                <h5>Member Point</h5>
                <h4>{memberPoints}</h4>
              </div>
            </div>
            <div className="card-footer">
              <a href="/userProfile">View all</a>
            </div>
          </div>
        </div>

        <section className="recent">
          <div className="activity-grid">
            <div className="activity-card">
              <h3>Recent activity</h3>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Service Name</th>
                      <th>Service Date</th>
                      <th>Service Price</th>
                      <th>Service Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHistoryPerPage.map((order, index) => (
                      <tr key={index}>
                        <td>{order.treatmentBodyPart}</td>
                        <td>{order.date}</td>
                        <td>{order.price}</td>
                        <td>{order.serviceDuration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="summary">
              <div className="summary-card">
                <div className="summary-single">
                  <div>
                    <h3>Popular Services</h3>
                  </div>
                </div>
                <div className="summary-single">
                  <div>
                    <h6>1. Neck & Shoulders</h6>
                    <h6>2. Lower Back</h6>
                    <h6>3. Head, Neck & Shoulders</h6>
                    <h6>4. Hips & Legs</h6>
                    <h6>5. Back, Hips & Legs</h6>
                  </div>
                </div>
              </div>

              <div className="bday-card">
                <div className="bday-flex">
                  <div className="bday-img" />
                  <div className="bday-info">
                    <h5>{firstName}</h5>
                    <small>
                      {mobile}
                      <br />
                    </small>
                    <small>{email}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { userProfile } = state;
  const { userInformation, orderHistory } = userProfile;
  return {
    userInformation,
    orderHistory,
  };
};

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(Home);
