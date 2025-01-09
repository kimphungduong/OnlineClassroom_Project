const Message = require('../models/Message');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Course = require('../models/Course');

module.exports.GetAllMsgs = async (userId) => {
  try {
    const chatRoom = await Message.find({
              $or: [
                { sender: userId },
                { receiver: userId },
              ],
            })
            const uniqueMessages = []
            const seen = new Set()
    
            chatRoom
                .sort((a, b) => b.sentAt - a.sentAt)
                .forEach((e) => {
                  const key = [
                    e.course.toString(),
                    [e.sender, e.receiver].sort().join('_'),
                  ].join('|');
    
                  if (!seen.has(key)) {
                    uniqueMessages.push(e);
                    seen.add(key);
                  }
                })
    
            const chatRoomData = uniqueMessages.map(async (e, i) => {
              const course = await Course.findOne({
                _id : e.course
              })
              const receiverId = e.sender.toString() === userId ? e.receiver : e.sender
    
              const result = await Student.findOne({ _id: receiverId })
                              ?? await Teacher.findOne({ _id: receiverId });
    
              if(course === null){
                return null
              }
    
              return {
                id : i,
                teacherId : userId,
                studentId : receiverId,
                courseName : course.name,
                studentName : result.name,
                studentAvatar : result.avatar,
                courseId : course._id,
                readed : e.readed,
                role : result.role,
              }
            })
    
            return await Promise.all(chatRoomData)
  } catch (error) {
    throw error;
  }
}