import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};

export const movieslice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setToMovies: (state, action) => {
      state.movies = action.payload;
    },
    clearToMovies: (state) => {
      state.movies = [];
    },
    addToMovies: (state, action) => {
      const newMovie = action.payload;
      state.movies = [...state.movies, ...newMovie];
    },
    editMovies: (state, action) => {
      const { id, text } = action.payload;
      const existingMovie = state.movies.find((movie) => movie.id === id);
      if (existingMovie) {
        existingMovie.title = text;
      }
    },
    removeFromMovies: (state, action) => {
      const id = action.payload;
      state.movies = state.movies.filter((movie) => movie.id !== id);
    },
    changeMoviestatus: (state, action) => {
      const uuid = action.payload;
      const existingMovie = state.movies.find((movie) => movie.uuid === uuid);
      if (!existingMovie?.favorited) {
        existingMovie.favorited = true;
      } else {
        existingMovie.favorited = false;
      }
    },
  },
});

export const {
  setToMovies,
  clearToMovies,
  addToMovies,
  editMovies,
  removeFromMovies,
  changeMoviestatus,
} = movieslice.actions;

export const findByUuid = (state, uuid) =>
  state.movies.movies.find((movie) => movie.uuid === uuid);

export default movieslice.reducer;
