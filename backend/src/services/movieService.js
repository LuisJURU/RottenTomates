const axios = require('axios');

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'df909bb4f66f7a249d14982f1d866d25'; // Reemplaza con tu clave de API

const getPopularMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/popular`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data.results;
};

const searchMovies = async (query) => {
  const response = await axios.get(`${apiUrl}/search/movie`, {
    params: {
      api_key: apiKey,
      query: query
    }
  });
  return response.data.results;
};

const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${apiUrl}/movie/${movieId}`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data;
};

module.exports = {
  getPopularMovies,
  searchMovies,
  getMovieDetails
};