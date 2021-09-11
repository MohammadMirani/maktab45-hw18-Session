const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");

const {
  getSignInForm,
  login,
  getSignUpForm,
  createUser,
} = require("./user.service");
const {
  signUpValidation,
  signInValidation,
} = require("./middleware/user.validation");
const signInChecker = require("../../tools/signinChecker");

router.get("/signIn", signInChecker, getSignInForm);
router.post("/signIn", validate(signInValidation, {}, {}), login);
router.get("/signUp", getSignUpForm);
router.post("/signUp", validate(signUpValidation, {}, {}), createUser);

router.get("/logout", (req, res, next) => {
  res.clearCookie("user_sid")
  // req.session.user = undefined;
  return res.redirect("/auth/signin");
});

module.exports = router;
