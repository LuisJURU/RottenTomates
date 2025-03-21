const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Ruta para guardar un comentario (sin autenticación)
router.post('/', async (req, res) => {
  const { movieId, rating, comment } = req.body;

  if (!movieId || !rating) {
    return res.status(400).json({ message: 'Faltan datos requeridos' });
  }

  try {
    const newComment = new Comment({
      movieId,
      userId: null, // No hay usuario autenticado
      rating,
      comment,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error al guardar el comentario:', error);
    res.status(500).json({ message: 'Error al guardar el comentario' });
  }
});

module.exports = router;