const jwt = require('jsonwebtoken');
const crypto = require('crypto');
//const bcrypt = require('bcrypt');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');
const AuthService = require('../services/AuthService');

class AuthController{
  async register(req, res, next) {
    const { username, password, role, displayName, email, phone } = req.body;
    try {
      // Sử dụng AuthService để đăng ký người dùng
      const { accessToken, refreshToken, role: userRole } = await AuthService.register(username, password, role, displayName, email, phone);
      res.status(201).json({ accessToken, refreshToken, role: userRole });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
    async google(req, res, next) {

        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const { token } = req.body;
        try {
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
          });
          const payload = ticket.getPayload();
          const { sub, email, name } = payload;
      
          let user = await User.findOne({ googleId: sub });
          if (!user) {
            user = new User({ googleId: sub, email, username: email, name, role: 'student', password: sub});
            await user.save();
          }
      
          const jwtToken = jwt.sign({ id: user._id, role: user.role }, 'conchimlahet', { expiresIn: '1h' });
          res.json({ token: jwtToken, role: user.role });
        } catch (error) {
          console.error('Lỗi xác thực Google', error);
          res.status(401).json({ message: 'Lỗi xác thực Google' });
        }
    }

    async login(req, res, next) {
      const { username, password } = req.body;
      try {
        const { accessToken, refreshToken, role, name } = await AuthService.login(username, password);
        
        // Kiểm tra vai trò hợp lệ
        if (!["student", "teacher"].includes(role)) {
          throw new Error('Vai trò không hợp lệ');
        }

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
        });

        res.json({ accessToken, role, name });
      } catch (error) {
        if (error.message === 'Sai tên đăng nhập' || error.message === 'Sai mật khẩu') {
          res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });
        } else {
          res.status(500).json({ message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' });
        }
      }
    }

    async requestRefreshToken(req, res, next) {
      try {
        const refreshToken = req.cookies.refreshToken;
        const { newAccessToken, newRefreshToken, role } = await AuthService.requestRefreshToken(refreshToken);
  
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
        });
        res.json({ accessToken: newAccessToken, role });
      } catch (error) {
        if (error.message === "You're not authenticated") {
          res.status(401).json(error.message);
        } else if (error.message === "Refresh token is not valid") {
          res.status(403).json(error.message);
        } else {
          res.status(500).json('Lỗi máy chủ');
        }
      }
    }
    async logout(req, res, next) {
      try {
        const refreshToken = req.cookies.refreshToken;
        await AuthService.logout(refreshToken);
        res.clearCookie('refreshToken');
        res.json({ message: 'Đăng xuất thành công' });
      } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ' });
      }
    }
    async sendVerifyCode(req, res, next) {
      const { email } = req.body;
      try {
        await AuthService.sendVerificationCodeWithSendGrid(email);
        res.json({ message: 'Email đã được gửi' });
      } catch (error) {
        res.status(500).json({ message: 'Lỗi máy chủ' });
      }
    }
    async verifyCode(req, res, next) {
      const { email ,verifyCode } = req.body;
      try {
        const token = await AuthService.verifyCode(email, verifyCode);
        res.json(token);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
    async resetPassword(req, res, next) {
      const { token, password } = req.body;
      try {
        await AuthService.resetPassword(token, password);
        res.json({ message: 'Đặt lại mật khẩu thành công' });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }

}
module.exports = new AuthController;