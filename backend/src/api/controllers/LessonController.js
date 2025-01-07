const LessonService = require('../services/LessonService');

class LessonController {
  async createLesson(req, res) {
    try {
      const { courseSlug, sectionId } = req.params;
      const lesson = await LessonService.createLesson(
        courseSlug,
        sectionId,
        req.body,
        req.files
      );

      res.status(201).json({ message: 'Lesson created successfully', lesson });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create lesson', error: error.message });
    }
  }
  async deleteLesson(req, res) {
    const { courseSlug, sectionId, lessonId } = req.params;

    try {
      const result = await LessonService.deleteLesson(courseSlug, sectionId, lessonId);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error deleting lesson:', error);
      res.status(500).json({ message: error.message });
    }
  }

  async getLesson(req, res) {
    const { lessonId } = req.params;

    try {
      const lesson = await LessonService.getLessonById(lessonId);
      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      res.status(200).json(lesson);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      res.status(500).json({ message: 'Failed to fetch lesson', error: error.message });
    }
  }
  async updateLesson(req, res) {
    const { lessonId } = req.params;
    console.log('updateLesson', req.params);
    try {
      const updatedLesson = await LessonService.updateLesson(lessonId, req.body);
      if (!updatedLesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      res.status(200).json({ message: 'Lesson updated successfully', updatedLesson });
    } catch (error) {
      // console.error('Error updating lesson:', error);
      res.status(500).json({ message: 'Failed to update lesson', error: error.message });
    }
  }
}

module.exports = new LessonController();
