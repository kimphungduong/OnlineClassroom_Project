require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');  
const cookieParser = require('cookie-parser'); // Thêm cookie-parser để xử lý cookie
const socketHandler = require('./socket');

const db = require('./configs/db');
db.connect();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer,{
  cors: {
    origin: "http://localhost:3001", // Frontend URL
    methods: ["GET", "POST"],
  },
});
const port = process.env.PORT || 3000;

const route = require('./api/routes'); 


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser()); 

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:3001', // Địa chỉ của ứng dụng font-end
  credentials: true // Cho phép gửi cookie
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method'));
app.use(morgan('combined'));

route(app);

const authenticateJWT = require('./configs/jwtConfig');
app.get('/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});


app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
});

socketHandler(io);

httpServer.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});