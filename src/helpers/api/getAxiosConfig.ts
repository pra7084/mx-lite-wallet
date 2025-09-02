import { AxiosRequestConfig } from 'axios';
import { getBaseURL } from './getBaseURL';
import { apiTimeout } from '../../config/sharedConfig';

export const getAxiosConfig = (url: string): AxiosRequestConfig => ({
  baseURL: getBaseURL(),
  url,
  method: 'GET',
  timeout: apiTimeout
});
