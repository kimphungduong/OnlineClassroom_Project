// AuthService.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const redisClient = require('../../configs/redisClient')
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

class AuthService {
  
  async register(username, password, role, name, email, phone) {
    // Kiểm tra tên đăng nhập hoặc email đã tồn tại
    const existingStudent = await Student.findOne({ $or: [{ username }, { email }] });
    const existingTeacher = await Teacher.findOne({ $or: [{ username }, { email }] });
    if (existingStudent || existingTeacher) {
      throw new Error('Tên đăng nhập đã tồn tại');
    }

    // Kiểm tra role hợp lệ
    const validRoles = ['student', 'teacher'];
    if (!validRoles.includes(role)) {
      throw new Error('Vai trò không hợp lệ');
    }
    var user;
    if (role === 'student') {
      const student = new Student({ username, password, role, name, email, phone });
      await student.save();
      user = student;
    } else {
      const teacher = new Teacher({ username, password, role, name, email, phone });
      await teacher.save();
      user = teacher;
    }
    

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    await redisClient.set(user._id.toString(), refreshToken, 'EX', 7 * 24 * 60 * 60);

    return { accessToken, refreshToken, role: user.role };
  }

  async login(username, password) {
    const student = await Student.findOne({ username });
    const teacher = await Teacher.findOne({ username });
    if (!student && !teacher) {
      throw new Error('Sai tên đăng nhập');
    }
    var user = student || teacher;
    try {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        throw new Error('Sai mật khẩu');
      }
    }
    catch (err) {
      throw new Error('Lỗi máy chủ');
    }
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    await redisClient.set(user._id.toString(), refreshToken, 'EX', 7 * 24 * 60 * 60);

    return { accessToken, refreshToken, role: user.role, name: user.name };
  }
  
  async requestRefreshToken(refreshToken) {
    if (!refreshToken) throw new Error("You're not authenticated");
  
    try {
      // Giải mã refreshToken để lấy userId
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const userId = decoded.userId;
  
      // Kiểm tra refreshToken trong Redis
      const storedToken = await redisClient.get(userId.toString());
      if (!storedToken || storedToken !== refreshToken) {
        throw new Error("Refresh token is not valid");
      }
  
      // Tạo mới access token và refresh token
      const newAccessToken = jwt.sign({ userId, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
      const newRefreshToken = jwt.sign({ userId, role: decoded.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
  
      // Cập nhật refresh token mới vào Redis
      await redisClient.set(userId.toString(), newRefreshToken, 'EX', 7 * 24 * 60 * 60);
  
      return { newAccessToken, newRefreshToken, role: decoded.role };
    } catch (err) {
      console.error("Error refreshing token:", err);
      throw new Error("Refresh token is not valid or expired");
    }
  }
  async logout(refreshToken) {
    if (!refreshToken) throw new Error("You're not authenticated");
  
    try {
      // Giải mã refreshToken để lấy userId
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const userId = decoded.userId;
  
      // Xóa refreshToken khỏi Redis
      await redisClient.del(userId.toString());
      console.log(`Logout successful for user: ${userId}`);
    } catch (err) {
      console.error("Error during logout:", err);
      throw new Error("Invalid or expired refresh token");
    }
  }
  
}

module.exports = new AuthService();