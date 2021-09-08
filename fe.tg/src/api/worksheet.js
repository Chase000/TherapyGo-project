import axios from 'axios';
import config from '../config/index';

export const getAvailableServiceList = (date) =>
  axios.get(`${config.baseUrl.dev}/schedule/existAppointment/${date}`).then(res => res.data);

export const getAllNotification = () =>
  axios.get(`${config.baseUrl.dev}/notifications`).then(res => res.data);

export const markAllNotificationAsRead = () =>
  axios.put(`${config.baseUrl.dev}/updateNotification`, { new: false }).then(res => res.status);

export const getUserNearestAppointment = (mobile) => 
  axios.get(`${config.baseUrl.dev}/searchServices/${mobile}`).then(res => res);
