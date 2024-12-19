
const authRouter=require('./auth');
const courseRouter=require('./course');
const reviewRouter=require('./review');
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
}

module.exports = router