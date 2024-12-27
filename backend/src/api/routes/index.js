
const authRouter=require('./auth');
const courseRouter=require('./course');
const noteRouter=require('./note');
const settingRouter=require('./setting');
const {authenticateJWT, authorizeTeacher, authorizeStudent}=require('../middlewares/AuthMiddleware');

function router(app)
{
    app.use('/api/auth', authRouter);
    app.use('/api/course',authenticateJWT , courseRouter);
    app.use('/api/note',authenticateJWT , noteRouter);
    app.use('/api/setting',authenticateJWT , settingRouter);

}

module.exports = router