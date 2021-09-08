import axios from 'axios';
import config from '../config/index';

const getBodyPartsAndDurationData = async (date, time, therapistName, roomName) => {
  let url = '';
  if (therapistName) {
    url =
      `${config.baseUrl.dev}/selectedDate/${date}/selectedTime/${time}/` +
      `selectedRoom/${roomName}/selectedTherapist/${therapistName}`;
  } else {
    url = 
    `${config.baseUrl.dev}/selectedDate/${date}/selectedTime/${time}/selectedRoom/${roomName}`;
  }
  try {
    const {
      data: { availableTreatmentList, code },
    } = await axios.get(url);
    if (code === 200) {
      return availableTreatmentList;
    }
    if (code === 404) {
      const result = ['None'];
      return result;
    }
  } catch (error) {
    throw new Error(`Get body parts and duration error`, error);
  }
  return null;
};

const getTherapist = async (date, time, bodyPartsAndDuration) => {
  let url = '';
  if (bodyPartsAndDuration) {
    const parts = bodyPartsAndDuration.split('--');
    const treatmentDuration = parts[1].split(' ')[0] * 1;
    url =
      `${config.baseUrl.dev}/selectedDate/${date}/selectedTime/${time}/` +
      `selectedTreatmentTime/${treatmentDuration}`;
  } else {
    url = `${config.baseUrl.dev}/selectedDate/${date}/selectedTime/${time}`;
  }
  try {
    let therapistList = await axios.get(url);
    const { code } = therapistList.data;
    if (code === 200) {
      therapistList = therapistList.data.therapistList;
      const list = therapistList.map((p) => p.firstName);
      return list;
    }
    if (code === 404) {
      const list = ['None'];
      return list;
    }
  } catch (error) {
    throw new Error(`getTherapist error is:---->`, error);
  }
  return null;
};

const getDefaultPrice = async (treatmentBodyPart, treatmentDuration, treatmentStyle) => {
  try {
    const url = `${config.baseUrl.dev}/treatmentPrice`;
    if (treatmentBodyPart !== 'None') {
      const res = await axios.post(url, {
        treatmentBodyPart,
        treatmentDuration,
        treatmentStyle,
      });
      return res.data;
    }
    if (treatmentBodyPart === 'None') {
      return 'None';
    }
  } catch (error) {
    throw new Error(`getDefaultPrice error is:---->`, error);
  }
  return null;
};

const submit = async (values, role) => {
  const url = `${config.baseUrl.dev}/${role}book`;
  try {
    const result = await axios.post(url, values);
    if (role === 'customer') {
      return result.data;
    }
    const { code } = result.data;
    return code;
  } catch (error) {
    throw new Error(`submit error is::---->`, error);
  }
};

const updateSubmit = async (values, serviceId) => {
  const url = `${config.baseUrl.dev}/update/${serviceId}`;
  try {
    const result = await axios.put(url, values);
    return result;
  } catch (error) {
    throw new Error(`submit error is::---->`, error);
  }
};

export { getTherapist, getBodyPartsAndDurationData, getDefaultPrice, submit, updateSubmit };
