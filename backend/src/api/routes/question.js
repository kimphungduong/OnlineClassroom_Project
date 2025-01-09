const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/QuestionController');

const questionController = new QuestionController();

// Routes
router.post('/', (req, res) => questionController.createQuestion(req, res)); // Create a question
router.get('/', (req, res) => questionController.getAllQuestions(req, res)); // Get all questions
router.get('/:questionId', (req, res) => questionController.getQuestionById(req, res)); // Get question by ID
router.put('/:questionId', (req, res) => questionController.updateQuestion(req, res)); // Update question
router.delete('/:questionId', (req, res) => questionController.deleteQuestion(req, res)); // Delete question

module.exports = router;
