function loginChecker(req, res, next) {
  if (!req.session.user || !req.cookies.user_sid) {
    return res.redirect("/auth/signin");
  }
  return next();
}

module.exports = loginChecker;