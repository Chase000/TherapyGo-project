import config from '../config/index';
import HttpRequest from './HttpRequest';

const baseUrl =
  process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.process;

const axios = new HttpRequest(baseUrl);

export default axios;
