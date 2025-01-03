const jwt = require("jsonwebtoken");
const Message = require("./api/models/Message");
const User = require("./api/models/User");
const Course = require("./api/models/Course");
const Student = require("./api/models/Student");

// Map ánh xạ userId với socket.id
const userSocketMap = {};

module.exports = (io) => {
  // Middleware xác thực JWT cho Socket.IO
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error: Invalid token"));
      }
      socket.userId = decoded.userId; // Lưu userId từ JWT vào socket
      socket.role = decoded.role;
      next();
    });
  });

  // Xử lý sự kiện kết nối của người dùng
  io.on("connection", (socket) => {
    const userId = socket.userId;
    console.log(`User ${userId} connected with socket ID ${socket.id}`);

    // Lưu socket.id vào map
    userSocketMap[userId] = socket.id;

    // Tải tin nhắn cũ
    socket.on("load-messages", async (courseId) => {
      try {
        const course = await Course.findById(courseId);
        const receiverID = course.teacher;
        const messages = await Message.find({
          $or: [
            { sender: userId, receiver: receiverID },
            { receiver: userId, sender: receiverID },
          ],
        })

        const a = messages.sort((a, b) => a.sentAt - b.sentAt)

        const modifiedMessages = a.map((msg) => {
          if (socket.role === 'student') {
            return {
              ...msg._doc,
              sender: msg.sender.toString() === userId ? 'Bạn' : 'Teacher',
              receiver: msg.receiver.toString() === userId ? 'Bạn' : 'Teacher',
            };
          }
          else{
            return {
              ...msg._doc,
              sender: msg.sender.toString() === userId ? 'Bạn' : 'Student',
              receiver: msg.receiver.toString() === userId ? 'Bạn' : 'Student',
            };
          }
        });
        // Gửi tin nhắn cũ đến người dùng
        socket.emit("load old messages", modifiedMessages);
      } catch (error) {
        console.error("Error loading messages:", error);
        socket.emit("error", { message: "Failed to load messages" });
      }
    });

    socket.on("loadMessaged" , async ({receiverID, courseID}) => {

      try {
        const chatRoom = await Message.find({
          $and: [
            { course: courseID },
            {
              $or: [
                { sender: userId, receiver: receiverID },
                { receiver: userId, sender: receiverID },
              ],
            },
          ],
        }).sort({ createdAt: -1 })

        const student = await Student.findOne({ _id : receiverID })

        const data = chatRoom
            .sort((a, b) => a.sentAt - b.sentAt)
            .map(e => {
          return {
            message : e.content,
            sender : e.sender.toString() === userId ? "teacher" : "student",
            timestamp : e.sentAt,
            avatar : "https://via.placeholder.com/50"
          }
        })

        socket.emit("loadMessaged", data);
      }
      catch (error) {
        console.error("Error loading messages:", error);
        socket.emit("error", { message: "Failed to load messages" });
      }
    })


    // Tải tin nhắn gần đây
    socket.on("recent-messages", async () => {
      try {
        const friends = await User.find({ _id: { $ne: userId } });
        const recentMessages = await Promise.all(
          friends.map(async (friend) => {
            const messages = await Message.find({
              $or: [
                { sender: userId, receiver: friend._id },
                { receiver: userId, sender: friend._id },
              ],
            })
              .sort({ createdAt: -1 })
              .limit(1);

            if (messages.length > 0) {
              const message = messages[0];
              return {
                title: friend.name,
                receiverID: friend._id,
                message:
                  message.sender == userId
                    ? `Bạn: ${message.message}`
                    : `${friend.name}: ${message.message}`,
                timestamp: message.createdAt,
              };
            }
            return {
              title: friend.name,
              receiverID: friend._id,
              message: "No messages found",
              timestamp: new Date(),
            };
          })
        );

        // Sắp xếp tin nhắn gần đây theo thời gian
        recentMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        socket.emit("recent-messages", recentMessages);
      } catch (error) {
        console.error("Error loading recent messages:", error);
        socket.emit("error", { message: "Failed to load recent messages" });
      }
    });

    // Xử lý sự kiện gửi tin nhắn
    socket.on("chat message", async (data) => {
      try {
        const course = await Course.findById(data.courseId);
        const receiverID = course.teacher;
        const newMessage = new Message({
          sender: userId,
          receiver: receiverID,
          content: data.message,
          course : data.courseId
        });
        await newMessage.save();

        const receiverSocketId = userSocketMap[receiverID];
        if (receiverSocketId) {
          // Gửi tin nhắn đến người nhận qua socket ID
          io.to(receiverSocketId).emit("chat message", {
            sender: "student",
            message: data.message,
            timestamp: new Date(),
            avatar : "https://via.placeholder.com/50",
            studentId : userId
          });
        }
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("teacher chat message", async ({message, courseId,receiverID }) => {
      try {
        const newMessage = new Message({
          sender: userId,
          receiver: receiverID,
          content: message,
          course : courseId
        });
        await newMessage.save();

        const receiverSocketId = userSocketMap[receiverID];
        if (receiverSocketId) {

          // Gửi tin nhắn đến người nhận qua socket ID
          io.to(receiverSocketId).emit("teacher chat message", {
            sender: 'Teacher',
            receiver : "Bạn",
            content: message,
            sentAt: new Date(),

          });
        }
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    socket.on("selectStudent", async ({receiverID, courseID}) => {
      await Message.updateMany(
          {
            $and: [
              { course: courseID },
              {
                $or: [
                  { sender: userId, receiver: receiverID },
                  { receiver: userId, sender: receiverID },
                ],
              },
            ],
          },
          { $set: { readed: true } } // Cập nhật tất cả các tài liệu với readed = true
      );
    })

    // Xử lý sự kiện lấy tất cả đoạn chat
    socket.on("getAllMsg", async () => {
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
        const studentId = e.sender.toString() === userId ? e.receiver : e.sender
        const student = await Student.findOne({ _id : studentId })

        if(course === null){
          return null
        }

        return {
          id : i,
          teacherId : userId,
          studentId,
          courseName : course.name,
          studentName : student.name,
          studentAvatar : "https://via.placeholder.com/50",
          courseId : course._id,
          readed : e.readed
        }
      })

      const chatRoomHeader = await Promise.all(chatRoomData)

      const receiverSocketId = userSocketMap[userId];

      if (receiverSocketId) {
        // Gửi tin nhắn đến người nhận qua socket ID
        io.to(receiverSocketId).emit("getAllMsg", chatRoomHeader);
      }

    })

    // Xử lý sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      delete userSocketMap[userId]; // Xóa socket.id khỏi map
      console.log(`User ${userId} disconnected`);
    });
  });
};
