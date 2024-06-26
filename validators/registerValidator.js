const Joi = require("joi");
const { allowedPreferences } = require("../constants");

const registerValidator = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  preferences: Joi.array()
    .optional()
    .min(1)
    .items(Joi.string().valid(...allowedPreferences)),
});

module.exports = registerValidator;
