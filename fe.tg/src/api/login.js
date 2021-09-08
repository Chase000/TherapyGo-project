import axios from '../utils/axios';

const login = (loginInfo) => {
  const url = '/admin/login';
  return axios.post(url, {
    ...loginInfo,
  });
};

const signup = (signInfo) => {
  const url = '/admin/signup';
  return axios.post(url, {
    ...signInfo,
  });
};

const forget = (passwordInfo) => {
  const url = '/admin/forget';
  return axios.post(url, {
    ...passwordInfo,
  });
};

const updatePassword = (info) => {
  const url = '/admin/updatepassoword';
  return axios.put(url, {
    ...info,
  });
};

export { login, signup, forget, updatePassword };
