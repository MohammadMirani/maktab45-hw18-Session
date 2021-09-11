const path = require("path");
const url = require("url");
const User = require(path.join(__dirname, "../../database/models/user.model"));
const bcrypt = require("bcrypt");
const getSignInForm = (req, res, next) => {
  res.render("signin", { err: null });
};

const login = async (req, res, next) => {
  try {
    const targetUser = await User.findOne({ username: req.body.username });
    if (targetUser) {
      bcrypt.compare(req.body.password, targetUser.password, (err, isMatch) => {
        console.log(isMatch);
        if (err) return res.status(500).send();
        if (!isMatch) {
          return res.render("signin", {
            err: "doesn't match username and password",
          });
        }
        req.session.user = targetUser;
        return res.redirect(
          url.format({ pathname: "/dashboard", query: { msg: "" } })
        );
      });
    }
  } catch (err) {}
};
const getSignUpForm = (req, res, next) => {
  res.render("signup", { err: null, successful: false });
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await new User(req.body);
    await newUser.save();
    res.redirect("/auth/signin");
    // res.render("signin", { err: null, successful: true });
  } catch (err) {
    if (err.code === 11000) {
      return res.render("signup", { err: "Duplicate user", successful: false });
    } else {
      return res.render("signup", { err: "Internal server error!" });
    }
  }
};

module.exports = { getSignInForm, login, getSignUpForm, createUser };
