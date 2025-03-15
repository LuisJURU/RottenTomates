const axios = require('axios');

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'df909bb4f66f7a249d14982f1d866d25'; // Reemplaza con tu clave de API

const getPopularMovies = async (page = 1) => {
  const response = await axios.get(`${apiUrl}/movie/popular`, {
    params: {
      api_key: apiKey,
      page: page
    }
  });
  return response.data.results;
};

const getNewMovies = async (page = 1) => {
  const response = await axios.get(`${apiUrl}/movie/now_playing`, {
    params: {
      api_key: apiKey,
      page: page
    }
  });
  return response.data.results;
};

const getFeaturedMovies = async (page = 1) => {
  const response = await axios.get(`${apiUrl}/movie/upcoming`, {
    params: {
      api_key: apiKey,
      page: page
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

const getBestMoviesOfMonth = async () => {
  const response = await axios.get(`${apiUrl}/movie/top_rated`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data.results;
};

const getCategories = async () => {
  const response = await axios.get(`${apiUrl}/genre/movie/list`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data.genres;
};

const getMoviesByCategory = async (categoryId, page = 1) => {
  const response = await axios.get(`${apiUrl}/discover/movie`, {
    params: {
      api_key: apiKey,
      with_genres: categoryId,
      page: page
    }
  });
  return response.data.results;
};

module.exports = {
  getPopularMovies,
  getNewMovies,
  getFeaturedMovies,
  searchMovies,
  getMovieDetails,
  getBestMoviesOfMonth,
  getCategories,
  getMoviesByCategory
};