/**
 Client for interacting with backend
 */
 import {AxiosInstance} from 'axios';
 import {clientFactory} from '../utils/clientFactory';
import Configuration from './configuration/configuration';

 export default class Client {
   api: AxiosInstance;
   config: Configuration;
  
   constructor({serverUrl}: {serverUrl: string}) {
    this.api = clientFactory(serverUrl);
    this.config = new Configuration(this.api);
   }
 
 }


 export const getClient = (): Client => {
   return new Client({
     serverUrl: 'https://semenzaio-smart-default-rtdb.europe-west1.firebasedatabase.app',
   });
 };