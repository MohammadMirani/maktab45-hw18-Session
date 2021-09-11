function signInChecker(req, res, next) {

  if (req.session.user && req.cookies.user_sid) {

    return res.redirect("/dashboard");
  }
  return next();
}

module.exports = signInChecker;
