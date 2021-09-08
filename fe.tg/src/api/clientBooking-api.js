import axios from 'axios';
import config from '../config/index';

const fetchTimeList = async (date) => {
  const url = `${config.baseUrl.dev}/date/${date}`;
  try {
    const timeList = await axios.get(url);
    const timeListObj = timeList.data;
    const availableTimeList = [];
    for (const key in timeListObj) {
      if (timeListObj[key]) {
        availableTimeList.push(key);
      }
    }
    return availableTimeList;
  } catch (error) {
    throw new Error(`Get time list error`, error);
  }
};

const fetchRoomName = async (myDate, startTime) => {
  const url = `${config.baseUrl.dev}/date/${myDate}/startTime/${startTime}/duration/60`;
  try {
    const res = await axios.get(url);
    const {
      data: { availableRooms, code },
    } = res;
    if (code === 200) {
      return availableRooms[0];
    }
  } catch (error) {
    throw new Error(`Fetch available room error`, error);
  }
  return null;
};

export { fetchRoomName, fetchTimeList };
