
const authRouter=require('./auth');
const courseRouter=require('./course');
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
}

module.exports = router