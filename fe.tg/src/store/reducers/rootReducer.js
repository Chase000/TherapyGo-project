import { combineReducers } from 'redux';

import schedule from './schedule';
import userProfile from './userProfile'
import workSheet from './worksheet'

const rootReducers = combineReducers({
  schedule,
  userProfile,
  workSheet
});

export default rootReducers;