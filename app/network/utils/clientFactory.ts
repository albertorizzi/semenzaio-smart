import axios, {AxiosHeaders} from 'axios';

export function clientFactory(
  baseUrl: string,
  timeout?: number,
  headers?: AxiosHeaders,
) {
  return axios.create({
    baseURL: baseUrl,
    timeout: timeout ? timeout : 60000,
    headers,
    responseType: 'json',
    withCredentials: true,
  });
}