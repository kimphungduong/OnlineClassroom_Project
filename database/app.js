const mongoose = require('mongoose');
const seedData = require('./seed/seed');

// Kết nối MongoDB
mongoose.connect('mongodb+srv://php2692004:LnTuvPmwUWmRCU6y@vincent.juveo.mongodb.net/?retryWrites=true&w=majority&appName=Vincent/vincent', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
    seedData();
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error: ', err);
});

