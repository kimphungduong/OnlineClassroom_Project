const { getAll, setRead } = require("../services/NotificationService")

module.exports.getAllNotification = async (req, res) => {
    try {
        const userId = req.user.userId
        const data = await getAll(userId)
        res.json({
            success: true,
            data : data
        });
    }
    catch (e) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi thêm bài viết', error });
    }
}

module.exports.setRead = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { notificationId } = req.params;
        await setRead(userId, notificationId)
        res.json({
            success: true
        });
    }
    catch (e) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi thêm bài viết', error });
    }


}