import { LOAD_USER_INFORMATION, LOAD_ORDER_HISTORY } from './actionsTypes';
import { getUserInformation, getOrderHistory } from '../../api/userProfile';

export const loadOrderHistory = (content) => ({
  type: LOAD_ORDER_HISTORY,
  payload: {
    orderHistory: content,
  },
});

export const fetchOrderHistory = (content) => (dispatch) => {
  getOrderHistory(content.customerId).then((res) => {
    dispatch(loadOrderHistory(res));
  });
};

export const loadUserInformation = (content) => ({
  type: LOAD_USER_INFORMATION,
  payload: {
    userInformation: content,
  },
});

export const fetchUserProfile = (content) => (dispatch) => {
  getUserInformation(content.customerId).then((res) => {
    dispatch(loadUserInformation(res));
  });
};
