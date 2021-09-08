import axios from 'axios';
import config from '../config/index';

const getBodyPartsAndDurationData = async (date, time, therapistName, roomName, id) => {
  let url = '';
  if (therapistName) {
    url = `${config.baseUrl.dev}/selectedDate/${date}/selectedTime/${time}/`+
    `selectedRoom/${roomName}/selectedTherapist/${therapistName}/id/${id}`;
  } else {
    url = `${config.baseUrl.dev}/selectedDate/${date}/selectedTime/${time}/`+
    `selectedRoom/${roomName}/id/${id}`;
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
    throw new Error(`Update Appointment API - get body parts and duration data ${error}`);
  }
  return null;
};

const getTherapist = async (date, time, bodyPartsAndDuration, id) => {
  let url = '';
  if (bodyPartsAndDuration) {
    const parts = bodyPartsAndDuration.split('--');
    const treatmentDuration = parts[1].split(' ')[0] * 1;
    url = `${config.baseUrl.dev}/selectedDate/${date}/selectedTime/${time}/`+
    `selectedTreatmentTime/${treatmentDuration}/id/${id}`;
  } else {
    url = `${config.baseUrl.dev}/selectedDate/${date}/selectedTime/${time}/id/${id}`;
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
    throw new Error(`Update Appointment API - get therapist ${error}`);
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
    throw new Error(`Update Appointment API - get default price ${error}`);
  }
  return null;
};

const deleteService = async (id, role) => {
  const url = `${config.baseUrl.dev}/${role}DeleteService/${id}`;
  try {
    const result = await axios.delete(url);
    return result;
  } catch (error) {
    throw new Error(`Update Appointment API - delete service ${error}`);
  }
};

export { getTherapist, getBodyPartsAndDurationData, getDefaultPrice, deleteService };
