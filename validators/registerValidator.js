const Joi = require("joi");
const { allowedPreferences } = require("../constants");

const registerValidator = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  preferences: Joi.array()
    .required()
    .items(Joi.string().valid(...allowedPreferences)),
});

module.exports = registerValidator;
