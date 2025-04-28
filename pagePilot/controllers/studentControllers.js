

const Book = require('../models/Book');
const User = require('../models/User');

// 🔍 Search Books
const searchBooks = async (req, res) => {
  const { query } = req.query;

  try {
    const books = query && query.trim() !== ""
      ? await Book.find({
          $or: [
            { title: new RegExp(query, 'i') },
            { author: new RegExp(query, 'i') },
            { genre: new RegExp(query, 'i') }
          ]
        })
      : await Book.find(); // No search query => return all books

    res.status(200).json({ books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching books', error });
  }
};

// 📄 View Student Profile
const viewStudentProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId).populate('borrowedBooks.book');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
};

module.exports = {
  searchBooks,
  viewStudentProfile
};
