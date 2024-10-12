const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// GET notes
router.get('/', noteController.getNotes);

// POST new note
router.post('/', noteController.createNote);

// DELETE note
router.delete('/:id', noteController.deleteNote);

module.exports = router;
