const dashboard = (req, res, next) => {
    res.render('dashboard', {user: req.session.user})
};


module.exports = { dashboard };
