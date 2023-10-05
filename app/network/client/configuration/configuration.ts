import {AxiosInstance, AxiosRequestConfig} from 'axios';

export default class Configuration {
  protected api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

    async getConfiguration(options?: AxiosRequestConfig) {
        return await this.api.get(`/configuration`, options);
    }

    async getCurrentCrop(options?: AxiosRequestConfig) {
        return await this.api.get(`/configuration/currentCrop`, options);
    }

    async getCrops(options?: AxiosRequestConfig) {
        return await this.api.get(`/configuration/crops`, options);
    }
  
}