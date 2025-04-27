const express = require('express');
const { addBook, deleteBook, updateBook, viewUserProfile, issueBook, returnBook, searchBooks } = require('../controllers/adminControllers');
const auth = require('../middlewares/auth');
const router = express.Router();

// Admin Routes
router.post('/add', auth, addBook);
router.delete('/delete/:isbn', auth, deleteBook);
router.put('/update', auth, updateBook);
router.post('/user', auth, viewUserProfile); // Admin can view any user's profile
router.post('/issue', auth, issueBook);
router.post('/return', auth, returnBook);
router.get('/search', auth, searchBooks); // Route for searching books

module.exports = router;
