const axios = require('axios');
const Comment = require('../models/Comment'); // Importa el modelo Comment

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY; // Reemplaza con tu clave de API

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

const rateMovie = async (movieId, rating, comment) => {
  try {
    const newComment = new Comment({
      movieId,
      rating,
      comment,
    });

    const result = await newComment.save(); // Guarda el comentario en MongoDB
    return { success: true, message: 'Calificación guardada con éxito', data: result };
  } catch (error) {
    console.error('Error al guardar la calificación:', error);
    throw new Error('No se pudo guardar la calificación');
  }
};

module.exports = {
  getPopularMovies,
  getNewMovies,
  getFeaturedMovies,
  searchMovies,
  getMovieDetails,
  getBestMoviesOfMonth,
  getCategories,
  getMoviesByCategory,
  rateMovie,
};