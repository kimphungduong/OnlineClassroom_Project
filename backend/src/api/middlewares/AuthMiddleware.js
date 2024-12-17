const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to authorize students
const authorizeStudent = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Access denied: Students only' });
  }
  next();
};

// Middleware to authorize teachers
const authorizeTeacher = (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Access denied: Teachers only' });
  }
  next();
};

module.exports = {
  authenticateJWT,
  authorizeStudent,
  authorizeTeacher,
};