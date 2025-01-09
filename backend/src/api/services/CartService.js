const Cart = require("../models/Cart");
const Course = require("../models/Course");
const UserSerivce = require("./UserService");

class CartService {
    async findCartByUserId(userId) {
        return await Cart.findOne({ userId }).populate({
        path: 'courseIds',
        model: 'Course', // Liên kết với bảng Course
        select: 'name price description image rating teacher', // Chỉ lấy các trường cần thiết
        populate: { path: 'teacher', model: 'Teacher', select: 'name' }
      })
      .lean();
    }

    async addItem(userId, courseId) {
      try {
        // Tìm học viên (Student) theo ID
        const user = await UserSerivce.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Kiểm tra xem khóa học đã được đăng ký chưa
        const alreadyRegistered = user.registeredCourses.some(
            (registeredCourse) => registeredCourse.course.toString() === courseId
        );
        if (alreadyRegistered) {
            throw new Error('Khóa học đã được đăng ký');
        }

        // Tìm giỏ hàng của học viên
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Nếu chưa có giỏ hàng, khởi tạo giỏ hàng mới
            cart = new Cart({
                userId,
                courseIds: [courseId]
            });
        } else {
            // Kiểm tra xem khóa học đã có trong giỏ hàng chưa
            if (cart.courseIds.includes(courseId)) {
                throw new Error('Khóa học đã có trong giỏ hàng');
            }

            // Thêm khóa học vào giỏ hàng
            cart.courseIds.push(courseId);
        }

        // Lưu giỏ hàng vào cơ sở dữ liệu
        await cart.save();

        return cart; // Trả về giỏ hàng sau khi cập nhật
    } catch (error) {
        console.error("Error adding item to cart:", error);
        throw new Error(error.message || 'Failed to add item to cart');
    }
  } 
  

    async removeFromCart(userId, courseId) {
        try {
          // Tìm giỏ hàng theo userId
          let cart = await Cart.findOne({ userId });
          if (!cart) {
            throw new Error('Cart not found');
          }
      
          // Lọc bỏ courseId cần xóa
          cart.courseIds = cart.courseIds.filter(
            (id) => id.toString() !== courseId.toString()
          );
      
          // Lưu lại thay đổi
          await cart.save();
      
          console.log('Updated cart:', cart);
          return cart;
        } catch (error) {
          console.error('Error removing course from cart:', error);
          throw error;
        }
    }
}

module.exports = new CartService();
