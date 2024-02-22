import axios from 'axios';

const baseURL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('ACCESS_TOKEN') as string);
    config.headers.Authorization = `Bearer ${token}`;
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
