const express = require('express');
const {
  getPopularMovies,
  getNewMovies,
  getFeaturedMovies,
  searchMovies,
  getMovieDetails,
  getBestMoviesOfMonth,
  getCategories,
  getMoviesByCategory
} = require('../services/movieService');

const router = express.Router();

router.get('/popular', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const movies = await getPopularMovies(page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas populares' });
  }
});

router.get('/new', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const movies = await getNewMovies(page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas nuevas' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const movies = await getFeaturedMovies(page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas destacadas' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const movies = await searchMovies(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar películas' });
  }
});

router.get('/details/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await getMovieDetails(movieId);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los detalles de la película' });
  }
});

router.get('/best', async (req, res) => {
  try {
    const movies = await getBestMoviesOfMonth();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las mejores películas del mes' });
  }
});

router.get('/categories', async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías' });
  }
});

router.get('/category/:id', async (req, res) => {
  try {
    const categoryId = req.params.id;
    const page = req.query.page || 1;
    const movies = await getMoviesByCategory(categoryId, page);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas por categoría' });
  }
});

module.exports = router;