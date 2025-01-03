const CartService = require("../services/CartService");

class CartController {
    async getCart(req, res, next) {
        try {
            const userId = req.user.userId;
            const cart = await CartService.findCartByUserId(userId);
            if (!cart) {
                return res.json([]);
            }
            res.json(cart);
        }
        catch (error) {
            console.error("Lỗi lấy giỏ hàng:", error);
            res.status(500).json({ message: "Lỗi lấy giỏ hàng" });
        }
    }

    // API đồng bộ giỏ hàng khi login
    async addToCart(req, res) {
        try {
            const { courseIds } = req.body;
            const userId = req.user.userId;

            const cart = await CartService.addItem(userId, courseIds);
            res.json(cart);
        } catch (error) {
            console.error("Lỗi cập nhật giỏ hàng:", error);
            res.status(500).json({ message: "Lỗi cập nhật giỏ hàng" });
        }
    }

    async removeFromCart(req, res) {
        try {
            const { courseId } = req.body;
            const userId = req.user.userId;

            const cart = await CartService.removeFromCart(userId, courseId);
            res.json(cart);
        } catch (error) {
            console.error("Lỗi cập nhật giỏ hàng:", error);
            res.status(500).json({ message: "Lỗi cập nhật giỏ hàng" });
        }
    }
}

module.exports = new CartController();
