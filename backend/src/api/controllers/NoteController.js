const CourseService = require('../services/CourseService.js');
const NoteService = require('../services/NoteService.js');


class CourseController{
    async addNote(req, res) {
        try {
            const { lessonId } = req.params;
            const { content, time } = req.body;
            const note = await CourseService.addNote(lessonId, req.user.userId, content, time);
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi thêm ghi chú', error });
        }
    }
    async updateNote(req, res) {
        try {
            const { noteId } = req.params;
            const { content } = req.body;
            const note = await NoteService.updateNote(noteId, content);
            res.json(note);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi cập nhật ghi chú', error });
        }
    }
    async deleteNote (req, res) {
        try {
            const { noteId } = req.params;
            await NoteService.deleteNote(noteId);
            res.json({message: 'Ghi chú đã được xóa'});
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Lỗi khi xóa ghi chú', error });
        }
    }
}
module.exports = new CourseController;