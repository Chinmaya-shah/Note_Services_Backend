const express = require('express');
const router = express.Router();

const {
    createNote,
    getMyNotes,
    getSingleNote,
    updateNote,
    deleteNote,
} = require('../controllers/noteController');

const protect = require('../middleware/authMiddleware');

// Create & get my notes
router.post('/', protect, createNote);
router.get('/', protect, getMyNotes);

// Single note operations (ownership enforced)
router.get('/:id', protect, getSingleNote);
router.put('/:id', protect, updateNote);
router.delete('/:id', protect, deleteNote);

module.exports = router;
