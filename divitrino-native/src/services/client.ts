import axios, { AxiosRequestConfig } from "axios";

import env from "../../env";
import { store, getToken } from "../store";

const client = axios.create({
  baseURL: env.baseApi,
});

console.warn(env.baseApi);

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
