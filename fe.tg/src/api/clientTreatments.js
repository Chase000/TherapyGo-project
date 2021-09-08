import axios from 'axios';
import config from '../config/index';

export const getAllTreatment = () =>
  axios.get(`${config.baseUrl.dev}/treatmentList`).then((res) => res.data);

export default getAllTreatment;