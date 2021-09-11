const { Joi } = require("express-validation");

const signInValidation = {
  body: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  }),
};
const signUpValidation = {
  body: Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string()
      .min(5)
      .regex(/(?=.*[0-9])/)
      .required(),
  }),
};

module.exports = { signInValidation, signUpValidation };
