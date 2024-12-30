
const authRouter=require('./auth');
const courseRouter=require('./course');
const reviewRouter=require('./review');
const uploadRouter=require('./upload');
const lessonRouter=require('./lesson');
const questionRouter=require('./question');

function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/');
    }
    // if(req.session.authenticated != true)
    // {
    //     return res.redirect('/authen-verify');
    // }
    next();
}
function router(app)
{
    app.use('/api/auth', authRouter);
    app.use('/api/course', courseRouter);
    app.use('/api/review', reviewRouter);
    app.use('/api/upload', uploadRouter);
    app.use('/api/question', questionRouter);
}

module.exports = router