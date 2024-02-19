import { AxiosPromise } from 'axios';
import axios from './axios';

export const login = (payload: any): AxiosPromise => {
  return axios.post('/login', payload);
};

export const forgot = (payload: any): AxiosPromise => {
  return axios.post('/forget-password', payload);
};

export const updatePassword = (payload: any): AxiosPromise => {
  return axios.post('/reset-password', payload);
};

export const getMovies = (): AxiosPromise => {
  return axios.get('/movies');
};

export const favoriteMovie = (uuid: string, type: string): AxiosPromise => {
  return axios.post(`/movies/${uuid}/${type}`);
};
