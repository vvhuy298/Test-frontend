import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import moviesReducer from './movies';
import searchReducer from './search';

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    search: searchReducer,
  },
});

export default store;
