import axios from 'axios';
import config from '../config/index';

export const clientLoginPOST = (user) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      const response = axios
        .post(`${config.baseUrl.dev}/admin/login`, user)
        .then((res) => res.data)
        .catch(() => {
          console.log('Email/Password is incorrect');
        });
      resolve(response);
    }, 100);
  });
  return promise;
};

export default clientLoginPOST;
