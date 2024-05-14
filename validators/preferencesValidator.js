const Joi = require("joi");
const { allowedPreferences } = require("../constants");

const preferencesValidator = Joi.object().keys({
  preferences: Joi.array()
    .required()
    .min(1)
    .items(Joi.string().valid(...allowedPreferences)),
});

module.exports = preferencesValidator;
