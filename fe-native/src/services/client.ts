import axios, { AxiosRequestConfig } from "axios";
import Constants from "expo-constants";

const baseURL = Constants?.manifest?.extra?.baseApi;

// import { store } from "store";
// import {  getToken } from "store/app.reducer";

const client = axios.create({
  baseURL,
});

const apiReqInterceptor = (
  config: AxiosRequestConfig
  // getState = store.getState
) => {
  console.log("Api request sent:", config.url, config.baseURL);

  const token = "";

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
