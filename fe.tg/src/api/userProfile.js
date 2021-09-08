import axios from 'axios';
import config from '../config/index';

export const getUserInformation = (customerId) =>
  axios
    .get(`${config.baseUrl.dev}/customer/displayPersonalProfile/${customerId}`)
    .then((res) => res.data);

export const getOrderHistory = (customerId) =>
  axios.get(`${config.baseUrl.dev}/customer/${customerId}/orderhistory`).then((res) => res.data);

export const updateUserInformation = (customerId, newUserInfo) =>
  axios.put(`${config.baseUrl.dev}/customer/updatePersonalProfile/${customerId}`, newUserInfo);
