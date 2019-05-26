const Joi = require("joi");

module.exports = {
  body: {
    title: Joi.string()
      .min(1)
      .required(),
    rootId: Joi.string()
  }
};
