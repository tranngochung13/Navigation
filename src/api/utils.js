import axios from 'axios';
import * as config from './config';

export default function callApi(endpoint, method, body) {
  return axios({
    method: method,
    url: `${config.URL_API}${endpoint}`,
    data: body,
  });
}
