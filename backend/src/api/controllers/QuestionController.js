const QuestionService = require('../services/QuestionService');

class QuestionController {
  constructor() {
    this.questionService = new QuestionService();
  }

  async createQuestion(req, res) {
    try {
      const question = await this.questionService.createQuestion(req.body);
      res.status(201).json({ message: 'Question created successfully', question });
    } catch (error) {
      console.error('Error creating question:', error);
      res.status(500).json({ message: 'Failed to create question', error: error.message });
    }
  }

  async getAllQuestions(req, res) {
    try {
      const questions = await this.questionService.getAllQuestions();
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
      res.status(500).json({ message: 'Failed to fetch questions', error: error.message });
    }
  }

  async getQuestionById(req, res) {
    const { questionId } = req.params;
    try {
      const question = await this.questionService.getQuestionById(questionId);
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.status(200).json(question);
    } catch (error) {
      console.error('Error fetching question:', error);
      res.status(500).json({ message: 'Failed to fetch question', error: error.message });
    }
  }

  async updateQuestion(req, res) {
    const { questionId } = req.params;
    try {
      const updatedQuestion = await this.questionService.updateQuestion(questionId, req.body);
      if (!updatedQuestion) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.status(200).json({ message: 'Question updated successfully', updatedQuestion });
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({ message: 'Failed to update question', error: error.message });
    }
  }

  async deleteQuestion(req, res) {
    const { questionId } = req.params;
    try {
      const deletedQuestion = await this.questionService.deleteQuestion(questionId);
      if (!deletedQuestion) {
        return res.status(404).json({ message: 'Question not found' });
      }
      res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
      console.error('Error deleting question:', error);
      res.status(500).json({ message: 'Failed to delete question', error: error.message });
    }
  }
}

module.exports = QuestionController;
