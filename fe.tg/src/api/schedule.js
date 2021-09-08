import axios from 'axios';
import config from '../config/index';

export const getAllStaffList = () =>
  axios.get(`${config.baseUrl.dev}/allStaffs`).then((res) => res.data);

export const getWeekStaffList = (date) =>
  axios.get(`${config.baseUrl.dev}/findWeekStaffList/${date}`).then((res) => res.data);

export const putTodayStaffList = (date, todayStaffList) =>
  axios.put(`${config.baseUrl.dev}/updateTodayStaffList/${date}`, todayStaffList);
