const mongoose = require('mongoose');
require('dotenv').config();

//console.log();'mongodb://localhost:27017/my-education-dev'
//'mongodb+srv://2php2692004:conchimlahet@du-an-dau-tay.3zmkc.mongodb.net/?retryWrites=true&w=majority&appName=du-an-dau-tay/my-education-dev'
async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!', error);
    }
}

module.exports = { connect };