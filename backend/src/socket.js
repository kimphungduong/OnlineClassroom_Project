const jwt = require("jsonwebtoken");
const Message = require("./api/models/Message");
const User = require("./api/models/User");
const Course = require("./api/models/Course");

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
        }).sort({ createdAt: 1 });

        const modifiedMessages = messages.map((msg) => {
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
        });
        await newMessage.save();

        const receiverSocketId = userSocketMap[data.receiver];
        if (receiverSocketId) {
          // Gửi tin nhắn đến người nhận qua socket ID
          io.to(receiverSocketId).emit("chat message", {
            sender: userId,
            message: data.message,
            timestamp: new Date(),
          });
        }
      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    // Xử lý sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      delete userSocketMap[userId]; // Xóa socket.id khỏi map
      console.log(`User ${userId} disconnected`);
    });
  });
};
