const Joi = require("joi");

module.exports = {
  body: {
    email: Joi.string()
      .email()
      .required(),
    username: Joi.string().required(),
    password: Joi.string()
      .required()
      .min(5)
  }
};
