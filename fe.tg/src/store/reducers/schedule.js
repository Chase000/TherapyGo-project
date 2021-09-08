import initialState from '../initialState';
import { LOAD_WEEK_SCHEDULE, UPDATE_WEEK_SCHEDULE, LOAD_ALL_STAFF } from '../actions/actionsTypes';

const _assign = require('lodash/assign');

const initialScheduleSate = initialState.schedule;

const schedule = (state = initialScheduleSate, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_WEEK_SCHEDULE:
      return _assign({}, state, payload);
    case UPDATE_WEEK_SCHEDULE:
      return _assign({}, state, payload);
    case LOAD_ALL_STAFF:
      return _assign({}, state, payload);
    default:
      return state;
  }
};
export default schedule;
