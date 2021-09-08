import React from 'react';
import './NewAppointmentTable.scss';
import moment from 'moment';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';
import { deleteService } from '../../../../api/updateAppointment-api';
import { fetchOrderHistory } from '../../../../store/actions/userProfileActions';

const getDataPerPage = (orderHistoryData, rowsPerPage) => {
  const currentDate = Date.parse(moment().format('YYYY-M-DD'));
  const orderHistorySortData = orderHistoryData.sort(
    (a, b) => Date.parse(a.date) - Date.parse(b.date));
  const newService = [];
  let i = 0;
  for (i = 0; i < orderHistorySortData.length; i += 1) {
    if (currentDate - Date.parse(orderHistorySortData[i].date) <= 0) {
      newService.push(orderHistorySortData[i]);
    }
  }
  let result = [];
  if (newService.length <= rowsPerPage) {
    result = newService;
  } else {
    const endNumber = newService.length - 1;
    const startNumber = newService.length - 1 - rowsPerPage;
    result = newService.slice(startNumber, endNumber);
  }
  return result;
};

const cancelAppointment = (id, refreshPage) => {
  const customerIdls = sessionStorage.getItem('customer_id');
  const payload = { customerId: customerIdls };
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, cancel it!',
    cancelButtonText: 'Close',
  }).then((result) => {
    if (result.isConfirmed) {
      deleteService(id, 'customer').then((res) => {
        if (res.status === 200) {
          Swal.fire(
            'Appointment Cancelled!',
            'The appointment has been successfully cancelled.',
            'success',
          );
          refreshPage(payload);
        } else {
          Swal.fire(
            'Appointment Not Cancelled!',
            'There were error when cancelling this appointment. Please try again.',
            'error',
          );
        }
      });
    }
  });
};

const NewAppointmentTable = (props) => {
  let orderHistoryData = [];
  const { orderHistory , fetchOrderHistoryAction} = props;
  if (orderHistory.length !== 0) {
    const { serviceList } = orderHistory;
    if (serviceList !== undefined) {
      orderHistoryData = serviceList;
    }
  }

  const orderHistoryPerPage = getDataPerPage(orderHistoryData, 5);
  const currentDate = moment().format('YYYY-M-DD');;
  const refreshPage = fetchOrderHistoryAction;
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderHistoryPerPage.map((order, index) => currentDate <= order.date ? (
                <tr key={index}>
                  <td>{order.date}</td>
                  <td>{order.time}</td>
                  <td>{order.treatmentBodyPart}</td>
                  <td>{order.therapist}</td>
                  <td>{order.serviceDuration}</td>
                  <td>{order.price}</td>
                  <td>{order.paymentStatus}</td>
                  <td>
                    {order.date ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => cancelAppointment(order.serviceId, refreshPage)}
                      >
                        Cancel
                      </Button>
                      ) : null}
                  </td>
                </tr>
                ) : null)}
            </tbody>
          </table>
        </div>
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

const mapActionsToProps = {
  fetchOrderHistoryAction: fetchOrderHistory,
};

export default connect(mapStateToProps, mapActionsToProps)(NewAppointmentTable);
