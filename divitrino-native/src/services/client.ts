import axios, { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";

import { store, getToken } from "../store";

const baseURL = Constants?.manifest?.extra?.baseApi;

const client = axios.create({
  baseURL,
});

const apiReqInterceptor = (config: AxiosRequestConfig) => {
  console.log("Api request sent:", config.baseURL, config.url, config.method);

  const token = getToken(store.getState());

  if (token) {
    const headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
    return {
      ...config,
      headers,
    };
  }

  return config;
};

client.interceptors.request.use(apiReqInterceptor);

export default client;
