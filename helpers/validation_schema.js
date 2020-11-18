const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    email: Joi.string()
              .email()
              .lowercase()
              .required(),
              
    password: Joi.string()
                 .pattern(new RegExp('^[a-zA-Z0-9]+$'))
                 .min(6)
                 .required()
});

module.exports = {
    authSchema
};