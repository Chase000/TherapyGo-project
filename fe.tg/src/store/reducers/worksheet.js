import initialState from '../initialState';
import {
  LOAD_STAFF_LIST,
  LOAD_EXIST_APPOINTMENT,
  LOAD_NOTIFICATION,
} from '../actions/actionsTypes';

const _assign = require('lodash/assign');

const initialUserSate = initialState.workSheet;

const workSheet = (state = initialUserSate, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_STAFF_LIST:
      return _assign({}, state, payload);
    case LOAD_EXIST_APPOINTMENT:
      return _assign({}, state, payload);
    case LOAD_NOTIFICATION:
      return _assign({}, state, payload);
    default:
      return state;
  }
};
export default workSheet;
