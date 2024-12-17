// AuthService.js
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary
let refreshTokens = [];
class AuthService {
  
  async register(username, password, role, name, email) {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Tên đăng nhập đã tồn tại');
    }

    const user = new User({ username, password , role, name, email });
    await user.save();

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Lưu refresh token vào cơ sở dữ liệu
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, role: user.role };
  }
  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('Sai tên đăng nhập');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Sai mật khẩu');
    }

    const accessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10s' });
    const refreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    refreshTokens.push(refreshToken);
    
    // Lưu refresh token vào cơ sở dữ liệu
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken, role: user.role };
  }
  async requestRefreshToken(refreshToken) {
    if (!refreshToken) {
      throw new Error("You're not authenticated");
    }

    if (!refreshTokens.includes(refreshToken)) {
      throw new Error("Refresh token is not valid");
    }

    return new Promise((resolve, reject) => {
      jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        if (err) {
          console.log(err);
          return reject(new Error("Refresh token is not valid"));
        }

        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        // Tạo access token và refresh token mới
        const newAccessToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '10s' });
        const newRefreshToken = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        resolve({ newAccessToken, newRefreshToken, role: user.role });
      });
    });
  }

  async logout(userId) {
    const user = await User.findById(userId);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }
}

module.exports = new AuthService();