import axios from 'axios';

const baseURL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const bearer = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
const instance = axios.create({
  baseURL: baseURL,
});

instance.defaults.headers.common['Authorization'] = `Bearer ${bearer}`;

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
    if (token !== bearer) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// eslint-disable-next-line @typescript-eslint/ban-types
export function onResponseError(fn: Function) {
  return instance.interceptors.response.use(
    undefined,
    (error) => fn(error) || Promise.reject(error),
  );
}
export function onResponseErrorEject(id: number) {
  instance.interceptors.response.eject(id);
}

export default instance;
