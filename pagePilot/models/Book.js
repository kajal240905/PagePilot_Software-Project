const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  isbn: [{ type: String, unique: true }],  // Array of unique ISBNs for each copy
  totalCopies: { type: Number },  // Total number of copies of the book
  availableCopies: { type: Number}  // Available copies of the book
});

// Virtual field for availability statuso

bookSchema.virtual('isAvailable').get(function () {
  return this.availableCopies > 0;
});

// Include virtuals in JSON output
bookSchema.set('toJSON', { virtuals: true });
bookSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Book', bookSchema);
