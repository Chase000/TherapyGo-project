import { LOAD_STAFF_LIST, LOAD_EXIST_APPOINTMENT, LOAD_NOTIFICATION } from './actionsTypes';
import { getAvailableServiceList, getAllNotification } from '../../api/worksheet';

export const loadNotification = (content) => ({
  type: LOAD_NOTIFICATION,
  payload: {
    notifications: content,
  },
});
export const loadStaffList = (content) => ({
  type: LOAD_STAFF_LIST,
  payload: {
    staffList: content,
  },
});

export const loadExistAppointment = (content) => ({
  type: LOAD_EXIST_APPOINTMENT,
  payload: {
    existAppointment: content,
  },
});

export const fetchStaffList = (content) => (dispatch) => {
  getAvailableServiceList(content.date).then((res) => {
    dispatch(loadStaffList(res[1].todayStaffs));
  });
};

export const fetchExistAppointment = (content) => (dispatch) => {
  getAvailableServiceList(content.date).then((res) => {
    if (res.length !== 0) {
      dispatch(loadExistAppointment(res[0].existAppointments));
    }
  });
};

export const fetchNotification = () => (dispatch) => {
  getAllNotification().then((res) => {
    dispatch(loadNotification(res));
  });
};
