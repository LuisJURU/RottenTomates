const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al usuario
  rating: { type: Number, required: true },
  comment: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);