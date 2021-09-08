import { LOAD_WEEK_SCHEDULE, LOAD_ALL_STAFF } from './actionsTypes';
import { getWeekStaffList, getAllStaffList } from '../../api/schedule';

export const loadAllStaff = (content) => ({
  type: LOAD_ALL_STAFF,
  payload: {
    allStaffList: content,
  },
});

export const loadWeekSchedule = (content) => ({
  type: LOAD_WEEK_SCHEDULE,
  payload: {
    weekSchedule: content,
  },
});

export const fetchWeekSchedule = (content) => (dispatch) => {
  getWeekStaffList(content.date).then((res) => {
    dispatch(loadWeekSchedule(res));
  });
};

export const fetchAllStaff = () => (dispatch) => {
  getAllStaffList().then((res) => {
    dispatch(loadAllStaff(res));
  });
};
