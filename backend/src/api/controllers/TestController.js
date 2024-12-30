const TestService = require('../services/TestService');

class TestController {
  async createTest(req, res) {
    try {
      const { courseSlug, sectionId } = req.params;
      const test = await TestService.createTest(courseSlug, sectionId, req.body);

      res.status(201).json({ message: 'Test created successfully', test });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create test', error: error.message });
    }
  }

  async deleteTest(req, res) {
    const { courseSlug, sectionId, testId } = req.params;

    try {
      const result = await TestService.deleteTest(courseSlug, sectionId, testId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error deleting test:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getTest(req, res) {
    const { testId } = req.params;

    try {
      const test = await TestService.getTestById(testId);
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }
      res.status(200).json(test);
    } catch (error) {
      console.error('Error fetching test:', error);
      res.status(500).json({ message: 'Failed to fetch test', error: error.message });
    }
  }

  async updateTest(req, res) {
    const { testId } = req.params;

    try {
      const updatedTest = await TestService.updateTest(testId, req.body);
      if (!updatedTest) {
        return res.status(404).json({ message: 'Test not found' });
      }
      res.status(200).json({ message: 'Test updated successfully', updatedTest });
    } catch (error) {
      console.error('Error updating test:', error);
      res.status(500).json({ message: 'Failed to update test', error: error.message });
    }
  }
}

module.exports = new TestController();
