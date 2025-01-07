const Question = require('../models/Question');

class QuestionService {
  async createQuestion(questionData) {
    const question = new Question(questionData);
    return await question.save();
  }

  async getAllQuestions() {
    return await Question.find();
  }

  async getQuestionById(questionId) {
    return await Question.findById(questionId);
  }

  async updateQuestion(questionId, updatedData) {
    return await Question.findByIdAndUpdate(questionId, updatedData, { new: true });
  }

  async deleteQuestion(questionId) {
    return await Question.findByIdAndDelete(questionId);
  }
}

module.exports = QuestionService;
