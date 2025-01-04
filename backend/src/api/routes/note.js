const express = require ('express');
const router =express.Router();

const noteController= require('../controllers/NoteController');

router.put('/:noteId',noteController.updateNote);
router.delete('/:noteId',noteController.deleteNote);
router.post('/:lessonId/notes',noteController.addNote);


module.exports = router;