const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
//const bcrypt = require('bcrypt');
const User = require('../models/User');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');
const AuthService = require('../services/AuthService');

class AuthController{
  async register(req, res, next) {
    const { username, password, role, name, email } = req.body;
    try {
      // Kiểm tra email hoặc username đã tồn tại
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: "Username hoặc Email đã tồn tại" });
      }

      // Tạo hồ sơ giáo viên hoặc học viên
      let profile;
      if (role === "teacher") {
        profile = new Teacher({ name });
      } else if (role === "student") {
        profile = new Student({ name });
      } else {
        return res.status(400).json({ message: "Vai trò không hợp lệ" });
      }
      await profile.save();

      // Tạo tài khoản người dùng
      const user = new User({
        username,
        password,
        email,
        role,
        profileId: profile._id, // Liên kết tới Teacher hoặc Student
      });
      await user.save();

      res.status(201).json({ message: "Đăng ký thành công" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Đã xảy ra lỗi máy chủ" });
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
  
    async forgotPassword(req, res, next) {
      const { email } = req.body;
  
      try {
        // Kiểm tra email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "Email không tồn tại" });
        }
  
        // Tạo token đặt lại mật khẩu
        const resetToken = crypto.randomBytes(32).toString("hex");
  
        // Lưu token trong cơ sở dữ liệu (mã hóa)
        user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // Token hết hạn sau 10 phút
        await user.save();
  
        // Gửi email đặt lại mật khẩu
        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
  
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Đặt lại mật khẩu",
          html: `<p>Nhấn vào liên kết sau để đặt lại mật khẩu:</p>
                 <a href="${resetUrl}">${resetUrl}</a>`,
        });
  
        res.json({ message: "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn." });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi máy chủ" });
      }
    }

    async resetPassword(req, res, next) {
      const { token, newPassword } = req.body;
  
      try {
        // Tìm người dùng bằng token
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
        const user = await User.findOne({
          resetPasswordToken: hashedToken,
          resetPasswordExpires: { $gt: Date.now() }, // Token còn hiệu lực
        });
  
        if (!user) {
          return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }
  
        // Cập nhật mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined; // Xóa token
        user.resetPasswordExpires = undefined; // Xóa thời gian hết hạn
        await user.save();
  
        res.json({ message: "Mật khẩu đã được cập nhật thành công" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Đã xảy ra lỗi máy chủ" });
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
}
module.exports = new AuthController;