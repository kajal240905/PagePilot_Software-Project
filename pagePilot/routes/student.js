const express = require('express');
const { searchBooks,  viewStudentProfile } = require('../controllers/studentControllers');
const auth = require('../middlewares/auth');
const router = express.Router();

// Student Routes
router.get('/search', auth, searchBooks); // Search books

router.get('/profile', auth, viewStudentProfile); // View student profile

module.exports = router;
