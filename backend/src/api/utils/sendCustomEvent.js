const socketInstance = require("../../socket");

const sendCustomEvent = (userId, eventName, eventData) => {
    try {
        const io = socketInstance.getIo(); // Lấy đối tượng io
        const userSocketId = socketInstance.getUserSocketId(userId); // Lấy socket ID từ map
        if (userSocketId) {
            io.to(userSocketId).emit(eventName, eventData); // Phát sự kiện
            console.log(`Event ${eventName} emitted to user ${userId}`);
        } else {
            console.log(`User ${userId} is not connected`);
        }
    } catch (error) {
        console.error("Error emitting event:", error);
    }
};

module.exports = { sendCustomEvent };