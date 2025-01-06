
const authRouter=require('./auth');
const courseRouter=require('./course');
const reviewRouter=require('./review');
const uploadRouter=require('./upload');
const lessonRouter=require('./lesson');
const questionRouter=require('./question');
const noteRouter=require('./note');
const settingRouter=require('./setting');
const paymentRouter=require('./payment');
const cartRouter=require('./cart');
const subjectRouter=require('./subject');
const teacherRouter=require('./teacher');
const {authenticateJWT, authorizeTeacher, authorizeStudent}=require('../middlewares/AuthMiddleware');

function router(app)
{
    app.use('/api/auth', authRouter);
    app.use('/api/course',authenticateJWT , courseRouter);
    app.use('/api/note',authenticateJWT , noteRouter);
    app.use('/api/setting',authenticateJWT , settingRouter);
    app.use('/api/payment',authenticateJWT , paymentRouter);
    app.use('/api/cart',authenticateJWT , cartRouter);
    app.use('/api/review',authenticateJWT, reviewRouter);
    app.use('/api/upload',authenticateJWT, uploadRouter);
    app.use('/api/question',authenticateJWT, questionRouter);  
    app.use('/api/subject',authenticateJWT, subjectRouter);  
    app.use('/api/teacher',authenticateJWT, teacherRouter);  

}

module.exports = router