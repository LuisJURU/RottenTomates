const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Endpoint para obtener comentarios por ID de película
router.get('/comments/:movieId', async (req, res) => {
  const { movieId } = req.params;

  try {
    // Buscar comentarios y popular el campo "user" para obtener el nombre de usuario
    const comments = await Comment.find({ movieId }).populate('user', 'username');
    if (comments.length === 0) {
      return res.status(404).json({ message: 'No se encontraron comentarios para esta película.' });
    }
    res.json(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error.message);
    res.status(500).json({ message: 'Error al obtener los comentarios.' });
  }
});

// Endpoint para agregar un comentario
router.post('/comments', async (req, res) => {
  const { movieId, userId, rating, comment } = req.body;

  try {
    // Crear un nuevo comentario
    const newComment = new Comment({
      movieId,
      user: userId, // ID del usuario que escribe el comentario
      rating,
      comment
    });

    await newComment.save();
    res.status(201).json({ message: 'Comentario agregado exitosamente.' });
  } catch (error) {
    console.error('Error al agregar el comentario:', error.message);
    res.status(500).json({ message: 'Error al agregar el comentario.' });
  }
});

module.exports = router;