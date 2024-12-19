
const authRouter=require('./auth');
const courseRouter=require('./course');
const {authenticateJWT, authorizeTeacher, authorizeStudent}=require('../middlewares/AuthMiddleware');

function router(app)
{
    app.use('/api/auth', authRouter);
    app.use('/api/course',authenticateJWT , courseRouter);
}

module.exports = router