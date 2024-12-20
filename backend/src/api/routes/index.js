
const authRouter=require('./auth');
const courseRouter=require('./course');
const noteRouter=require('./note');
const {authenticateJWT, authorizeTeacher, authorizeStudent}=require('../middlewares/AuthMiddleware');

function router(app)
{
    app.use('/api/auth', authRouter);
    app.use('/api/course',authenticateJWT , courseRouter);
    app.use('/api/note',authenticateJWT , noteRouter);

}

module.exports = router