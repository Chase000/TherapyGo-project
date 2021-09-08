import initialState from '../initialState';
import { LOAD_USER_INFORMATION, LOAD_ORDER_HISTORY } from '../actions/actionsTypes';

const _assign = require('lodash/assign');

const initialUserSate = initialState.userProfile;

const userProfile = (state = initialUserSate, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER_INFORMATION:
      return _assign({}, state, payload);
    case LOAD_ORDER_HISTORY:
      return _assign({}, state, payload);
    default:
      return state;
  }
};
export default userProfile;
