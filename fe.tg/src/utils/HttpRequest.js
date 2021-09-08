import axios from 'axios';
import errorHandler from './errorHandler';

class HttpRequest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getInsiderConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        'content-Type': 'application/json;charset=utf-8',
      },
      timeout: 10000,
    };
    return config;
  }

  interceptors(instance) {
    instance.interceptors.request.use(
      (config) => {
        const myConfig = config;
        this.token = window.sessionStorage.getItem('token');
        const authToken = `bearer ${this.token}`;
        if (this.token) {
          myConfig.headers.common.Authorization = authToken;
        }
        return myConfig;
      },
      (err) => {
        errorHandler(err);
        return Promise.reject(err);
      },
    );

    instance.interceptors.response.use(
      (res) => {
        if (res.status === 200) {
          return Promise.resolve(res.data);
        }
        return Promise.reject(res);
      },
      (err) => {
        errorHandler(err);
        return Promise.reject(err);
      },
    );
  }

  request(options) {
    const instance = axios.create();
    const newOption = Object.assign(this.getInsiderConfig(), options);
    this.interceptors(instance);
    return instance(newOption);
  }

  get(url, config) {
    const options = {
      method: 'get',
      url,
      ...config,
    };
    return this.request(options);
  }

  post(url, data) {
    return this.request({
      method: 'post',
      url,
      data,
    });
  }

  put(url, data) {
    return this.request({
      method: 'put',
      url,
      data,
    });
  }

  deleteById(url, id) {
    return this.request({
      method: 'delete',
      url,
      params: id,
    });
  }

  deleteByEmail(url, email) {
    return this.request({
      method: 'delete',
      url,
      data: email,
    });
  }
}

export default HttpRequest;
