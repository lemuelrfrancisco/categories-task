import axios, { AxiosInstance } from "axios";

const applyDefaultInterceptors = (client: AxiosInstance) => {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );
};

const configureHttpClient = (client: AxiosInstance) => {
  applyDefaultInterceptors(client);
  return client;
};

const initializeHttpClient = (baseUrl?: string) => {
  const client = axios.create({
    baseURL: baseUrl,
  });
  return configureHttpClient(client);
};

export const httpClient = initializeHttpClient(
  // "http://localhost:3001/"
  "https://react-learning-server.onrender.com/"
);
